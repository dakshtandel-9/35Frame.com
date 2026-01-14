import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload, Pencil, Trash2, Image, Loader2, ArrowLeft, X, Images, CheckSquare, Square, Lock, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

interface PortfolioImage {
    id: string;
    image_url: string;
    category: string;
    title: string | null;
    created_at: string;
}

const categories = ["Wedding", "Pre-Wedding", "Engagement", "Candid", "Birthday", "Couple Portraits", "Naming Ceremony"];

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const Admin = () => {
    // Authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [authError, setAuthError] = useState("");

    const [images, setImages] = useState<PortfolioImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [title, setTitle] = useState("");
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Bulk upload state
    const [bulkFiles, setBulkFiles] = useState<File[]>([]);
    const [bulkCategory, setBulkCategory] = useState("");
    const [bulkPreviews, setBulkPreviews] = useState<string[]>([]);
    const [bulkUploading, setBulkUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });

    // Edit state
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingImage, setEditingImage] = useState<PortfolioImage | null>(null);
    const [editCategory, setEditCategory] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [saving, setSaving] = useState(false);

    // Delete state
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deletingImage, setDeletingImage] = useState<PortfolioImage | null>(null);
    const [deleting, setDeleting] = useState(false);

    // Bulk delete state
    const [bulkSelectMode, setBulkSelectMode] = useState(false);
    const [selectedImageIds, setSelectedImageIds] = useState<Set<string>>(new Set());
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);
    const [bulkDeleting, setBulkDeleting] = useState(false);

    const { toast } = useToast();

    // Check authentication on mount
    useEffect(() => {
        const authStatus = sessionStorage.getItem("admin_authenticated");
        if (authStatus === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    // Handle login
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem("admin_authenticated", "true");
            setAuthError("");
            setPassword("");
        } else {
            setAuthError("Incorrect password. Please try again.");
        }
    };

    // Handle logout
    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem("admin_authenticated");
    };

    // Fetch images on mount (only when authenticated)
    useEffect(() => {
        if (isAuthenticated) {
            fetchImages();
        }
    }, [isAuthenticated]);

    const fetchImages = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from("portfolio_images")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setImages(data || []);
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Error fetching images",
                description: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    // Handle file selection
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    // Upload image
    const handleUpload = async () => {
        if (!selectedFile || !selectedCategory) {
            toast({
                variant: "destructive",
                title: "Missing fields",
                description: "Please select an image and category",
            });
            return;
        }

        setUploading(true);
        try {
            const fileExt = selectedFile.name.split(".").pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `portfolio/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("portfolio")
                .upload(filePath, selectedFile);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from("portfolio")
                .getPublicUrl(filePath);

            const { error: dbError } = await supabase
                .from("portfolio_images")
                .insert({
                    image_url: publicUrl,
                    category: selectedCategory,
                    title: title || null,
                });

            if (dbError) throw dbError;

            toast({
                title: "Success!",
                description: "Image uploaded successfully",
            });

            setSelectedFile(null);
            setSelectedCategory("");
            setTitle("");
            setPreviewUrl(null);
            fetchImages();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Upload failed",
                description: error.message,
            });
        } finally {
            setUploading(false);
        }
    };

    // Handle bulk file selection
    const handleBulkFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const fileArray = Array.from(files);
            setBulkFiles(fileArray);
            const previews = fileArray.map(file => URL.createObjectURL(file));
            setBulkPreviews(previews);
        }
    };

    // Remove a file from bulk selection
    const removeBulkFile = (index: number) => {
        const newFiles = bulkFiles.filter((_, i) => i !== index);
        const newPreviews = bulkPreviews.filter((_, i) => i !== index);
        URL.revokeObjectURL(bulkPreviews[index]);
        setBulkFiles(newFiles);
        setBulkPreviews(newPreviews);
    };

    // Bulk upload images
    const handleBulkUpload = async () => {
        if (bulkFiles.length === 0 || !bulkCategory) {
            toast({
                variant: "destructive",
                title: "Missing fields",
                description: "Please select images and a category",
            });
            return;
        }

        setBulkUploading(true);
        setUploadProgress({ current: 0, total: bulkFiles.length });

        let successCount = 0;
        let failCount = 0;

        try {
            for (let i = 0; i < bulkFiles.length; i++) {
                const file = bulkFiles[i];
                setUploadProgress({ current: i + 1, total: bulkFiles.length });

                try {
                    const fileExt = file.name.split(".").pop();
                    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                    const filePath = `portfolio/${fileName}`;

                    const { error: uploadError } = await supabase.storage
                        .from("portfolio")
                        .upload(filePath, file);

                    if (uploadError) throw uploadError;

                    const { data: { publicUrl } } = supabase.storage
                        .from("portfolio")
                        .getPublicUrl(filePath);

                    const { error: dbError } = await supabase
                        .from("portfolio_images")
                        .insert({
                            image_url: publicUrl,
                            category: bulkCategory,
                            title: null,
                        });

                    if (dbError) throw dbError;
                    successCount++;
                } catch (error) {
                    console.error(`Failed to upload ${file.name}:`, error);
                    failCount++;
                }
            }

            if (failCount === 0) {
                toast({
                    title: "Success!",
                    description: `All ${successCount} images uploaded successfully`,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Partial upload",
                    description: `${successCount} uploaded, ${failCount} failed`,
                });
            }

            bulkPreviews.forEach(url => URL.revokeObjectURL(url));
            setBulkFiles([]);
            setBulkCategory("");
            setBulkPreviews([]);
            setUploadProgress({ current: 0, total: 0 });
            fetchImages();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Bulk upload failed",
                description: error.message,
            });
        } finally {
            setBulkUploading(false);
        }
    };

    // Open edit dialog
    const openEditDialog = (image: PortfolioImage) => {
        setEditingImage(image);
        setEditCategory(image.category);
        setEditTitle(image.title || "");
        setEditDialogOpen(true);
    };

    // Save edit
    const handleSaveEdit = async () => {
        if (!editingImage) return;

        setSaving(true);
        try {
            const { error } = await supabase
                .from("portfolio_images")
                .update({
                    category: editCategory,
                    title: editTitle || null,
                })
                .eq("id", editingImage.id);

            if (error) throw error;

            toast({
                title: "Success!",
                description: "Image updated successfully",
            });

            setEditDialogOpen(false);
            setEditingImage(null);
            fetchImages();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Update failed",
                description: error.message,
            });
        } finally {
            setSaving(false);
        }
    };

    // Open delete dialog
    const openDeleteDialog = (image: PortfolioImage) => {
        setDeletingImage(image);
        setDeleteDialogOpen(true);
    };

    // Handle delete
    const handleDelete = async () => {
        if (!deletingImage) return;

        setDeleting(true);
        try {
            const urlParts = deletingImage.image_url.split("/");
            const fileName = urlParts[urlParts.length - 1];
            const filePath = `portfolio/${fileName}`;

            await supabase.storage.from("portfolio").remove([filePath]);

            const { error: dbError } = await supabase
                .from("portfolio_images")
                .delete()
                .eq("id", deletingImage.id);

            if (dbError) throw dbError;

            toast({
                title: "Deleted!",
                description: "Image deleted successfully",
            });

            setDeleteDialogOpen(false);
            setDeletingImage(null);
            fetchImages();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Delete failed",
                description: error.message,
            });
        } finally {
            setDeleting(false);
        }
    };

    // Toggle image selection for bulk delete
    const toggleImageSelection = (imageId: string) => {
        const newSelection = new Set(selectedImageIds);
        if (newSelection.has(imageId)) {
            newSelection.delete(imageId);
        } else {
            newSelection.add(imageId);
        }
        setSelectedImageIds(newSelection);
    };

    // Select/deselect all images
    const toggleSelectAll = () => {
        if (selectedImageIds.size === images.length) {
            setSelectedImageIds(new Set());
        } else {
            setSelectedImageIds(new Set(images.map(img => img.id)));
        }
    };

    // Handle bulk delete
    const handleBulkDelete = async () => {
        if (selectedImageIds.size === 0) return;

        setBulkDeleting(true);
        let successCount = 0;
        let failCount = 0;

        try {
            const imagesToDelete = images.filter(img => selectedImageIds.has(img.id));

            for (const image of imagesToDelete) {
                try {
                    const urlParts = image.image_url.split("/");
                    const fileName = urlParts[urlParts.length - 1];
                    const filePath = `portfolio/${fileName}`;

                    await supabase.storage.from("portfolio").remove([filePath]);

                    const { error: dbError } = await supabase
                        .from("portfolio_images")
                        .delete()
                        .eq("id", image.id);

                    if (dbError) throw dbError;
                    successCount++;
                } catch (error) {
                    console.error(`Failed to delete ${image.id}:`, error);
                    failCount++;
                }
            }

            if (failCount === 0) {
                toast({
                    title: "Deleted!",
                    description: `Successfully deleted ${successCount} image${successCount !== 1 ? 's' : ''}`,
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Partial delete",
                    description: `${successCount} deleted, ${failCount} failed`,
                });
            }

            setBulkDeleteDialogOpen(false);
            setSelectedImageIds(new Set());
            setBulkSelectMode(false);
            fetchImages();
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Bulk delete failed",
                description: error.message,
            });
        } finally {
            setBulkDeleting(false);
        }
    };

    // Login page
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-violet-950 via-slate-900 to-indigo-950 flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <Card className="w-full max-w-md bg-slate-900/40 border-slate-700/50 backdrop-blur-xl shadow-2xl relative z-10">
                    <CardHeader className="text-center pb-8">
                        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/50 transform hover:scale-105 transition-transform">
                            <Lock className="w-10 h-10 text-white" />
                        </div>
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                            Admin Portal
                        </CardTitle>
                        <p className="text-slate-400 mt-3 text-sm">Secure access to portfolio management</p>
                    </CardHeader>
                    <CardContent className="pb-8">
                        <form onSubmit={handleLogin} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-slate-300 text-sm font-medium">Access Code</Label>
                                <div className="relative group">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setAuthError("");
                                        }}
                                        placeholder="Enter your password"
                                        className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-500 pr-12 h-12 focus:border-violet-500 focus:ring-violet-500/20 transition-all"
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-violet-400 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {authError && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                    <p className="text-red-400 text-sm flex items-center gap-2">
                                        <X className="w-4 h-4" />
                                        {authError}
                                    </p>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white h-12 font-medium shadow-lg shadow-violet-500/30 transition-all hover:shadow-xl hover:shadow-violet-500/40"
                            >
                                <Lock className="w-4 h-4 mr-2" />
                                Access Dashboard
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <Link to="/" className="text-slate-400 hover:text-violet-400 text-sm transition-colors inline-flex items-center gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Return to Website
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-lg">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="text-slate-400 hover:text-violet-400 transition-colors p-2 hover:bg-slate-800/50 rounded-lg">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                                    Portfolio Manager
                                </h1>
                                <p className="text-xs text-slate-500 mt-0.5">Admin Dashboard</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link to="/portfolio">
                                <Button variant="outline" className="border-slate-600/50 text-slate-300 hover:bg-slate-800/50 hover:text-white hover:border-violet-500/50 transition-all">
                                    <Image className="w-4 h-4 mr-2" />
                                    View Gallery
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                onClick={handleLogout}
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 hover:border-red-500/50 transition-all"
                            >
                                <Lock className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8 space-y-6">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/20 backdrop-blur">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm font-medium">Total Images</p>
                                    <p className="text-3xl font-bold text-white mt-1">{images.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-violet-500/20 rounded-xl flex items-center justify-center">
                                    <Images className="w-6 h-6 text-violet-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border-indigo-500/20 backdrop-blur">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm font-medium">Categories</p>
                                    <p className="text-3xl font-bold text-white mt-1">{categories.length}</p>
                                </div>
                                <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                                    <Image className="w-6 h-6 text-indigo-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20 backdrop-blur">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm font-medium">Selected</p>
                                    <p className="text-3xl font-bold text-white mt-1">{selectedImageIds.size}</p>
                                </div>
                                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                                    <CheckSquare className="w-6 h-6 text-emerald-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Single Upload */}
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm shadow-xl">
                    <CardHeader className="border-b border-slate-700/50 bg-gradient-to-r from-violet-500/5 to-transparent">
                        <CardTitle className="text-white flex items-center gap-3">
                            <div className="w-10 h-10 bg-violet-500/20 rounded-lg flex items-center justify-center">
                                <Upload className="w-5 h-5 text-violet-400" />
                            </div>
                            <div>
                                <span className="text-lg">Single Upload</span>
                                <p className="text-xs text-slate-400 font-normal mt-0.5">Upload one image with custom details</p>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <div className="space-y-2">
                                <Label htmlFor="image" className="text-slate-300 text-sm font-medium">Image File</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileSelect}
                                    className="bg-slate-800/50 border-slate-600/50 text-slate-300 file:bg-violet-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-md file:mr-4 hover:border-violet-500/50 transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-slate-300 text-sm font-medium">Category</Label>
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-slate-300 hover:border-violet-500/50 transition-colors">
                                        <SelectValue placeholder="Choose category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700">
                                        {categories.map((cat) => (
                                            <SelectItem key={cat} value={cat} className="text-slate-300 focus:bg-violet-500/20 focus:text-white">
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-slate-300 text-sm font-medium">Title <span className="text-slate-500">(Optional)</span></Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Image title"
                                    className="bg-slate-800/50 border-slate-600/50 text-slate-300 placeholder:text-slate-500 hover:border-violet-500/50 focus:border-violet-500 transition-colors"
                                />
                            </div>

                            <div className="flex items-end">
                                <Button
                                    onClick={handleUpload}
                                    disabled={uploading || !selectedFile || !selectedCategory}
                                    className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {uploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4 mr-2" />
                                            Upload Image
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {previewUrl && (
                            <div className="mt-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                                <p className="text-slate-400 text-sm mb-3 font-medium">Preview:</p>
                                <img src={previewUrl} alt="Preview" className="max-w-xs rounded-lg border border-slate-600/50 shadow-lg" />
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Bulk Upload */}
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm shadow-xl">
                    <CardHeader className="border-b border-slate-700/50 bg-gradient-to-r from-emerald-500/5 to-transparent">
                        <CardTitle className="text-white flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                                <Images className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <span className="text-lg">Bulk Upload</span>
                                <p className="text-xs text-slate-400 font-normal mt-0.5">Upload multiple images to one category</p>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="bulk-images" className="text-slate-300 text-sm font-medium">Select Multiple Images</Label>
                                <Input
                                    id="bulk-images"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleBulkFileSelect}
                                    className="bg-slate-800/50 border-slate-600/50 text-slate-300 file:bg-emerald-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-md file:mr-4 hover:border-emerald-500/50 transition-colors"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bulk-category" className="text-slate-300 text-sm font-medium">Category for all images</Label>
                                <Select value={bulkCategory} onValueChange={setBulkCategory}>
                                    <SelectTrigger className="bg-slate-800/50 border-slate-600/50 text-slate-300 hover:border-emerald-500/50 transition-colors">
                                        <SelectValue placeholder="Choose category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-800 border-slate-700">
                                        {categories.map((cat) => (
                                            <SelectItem key={cat} value={cat} className="text-slate-300 focus:bg-emerald-500/20 focus:text-white">
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-end">
                                <Button
                                    onClick={handleBulkUpload}
                                    disabled={bulkUploading || bulkFiles.length === 0 || !bulkCategory}
                                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {bulkUploading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Uploading {uploadProgress.current}/{uploadProgress.total}...
                                        </>
                                    ) : (
                                        <>
                                            <Images className="w-4 h-4 mr-2" />
                                            Upload {bulkFiles.length} Image{bulkFiles.length !== 1 ? 's' : ''}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {bulkUploading && (
                            <div className="mt-4">
                                <div className="flex justify-between text-sm text-slate-400 mb-1">
                                    <span>Uploading...</span>
                                    <span>{Math.round((uploadProgress.current / uploadProgress.total) * 100)}%</span>
                                </div>
                                <div className="w-full bg-slate-700 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {bulkPreviews.length > 0 && (
                            <div className="mt-4">
                                <p className="text-slate-400 text-sm mb-2 font-medium">
                                    Selected Images ({bulkFiles.length}):
                                </p>
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                                    {bulkPreviews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full aspect-square object-cover rounded-lg border border-slate-600"
                                            />
                                            <button
                                                onClick={() => removeBulkFile(index)}
                                                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                            <span className="absolute bottom-1 left-1 bg-black/60 text-white text-xs px-1 rounded">
                                                {index + 1}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Portfolio Images */}
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm shadow-xl">
                    <CardHeader className="border-b border-slate-700/50">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-white flex items-center gap-2">
                                <Image className="w-5 h-5" />
                                Portfolio Images ({images.length})
                            </CardTitle>
                            {images.length > 0 && (
                                <div className="flex items-center gap-2">
                                    {bulkSelectMode && (
                                        <>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={toggleSelectAll}
                                                className="border-slate-600/50 text-slate-300 hover:bg-slate-800/50"
                                            >
                                                {selectedImageIds.size === images.length ? (
                                                    <>
                                                        <Square className="w-4 h-4 mr-1" />
                                                        Deselect All
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckSquare className="w-4 h-4 mr-1" />
                                                        Select All
                                                    </>
                                                )}
                                            </Button>
                                            {selectedImageIds.size > 0 && (
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => setBulkDeleteDialogOpen(true)}
                                                    className="bg-red-500 hover:bg-red-600"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-1" />
                                                    Delete {selectedImageIds.size} Selected
                                                </Button>
                                            )}
                                        </>
                                    )}
                                    <Button
                                        size="sm"
                                        variant={bulkSelectMode ? "secondary" : "outline"}
                                        onClick={() => {
                                            setBulkSelectMode(!bulkSelectMode);
                                            if (bulkSelectMode) {
                                                setSelectedImageIds(new Set());
                                            }
                                        }}
                                        className={bulkSelectMode
                                            ? "bg-violet-500 hover:bg-violet-600 text-white"
                                            : "border-slate-600/50 text-slate-300 hover:bg-slate-800/50"
                                        }
                                    >
                                        {bulkSelectMode ? (
                                            <>
                                                <X className="w-4 h-4 mr-1" />
                                                Cancel
                                            </>
                                        ) : (
                                            <>
                                                <CheckSquare className="w-4 h-4 mr-1" />
                                                Bulk Select
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
                            </div>
                        ) : images.length === 0 ? (
                            <div className="text-center py-12 text-slate-400">
                                <Image className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>No images uploaded yet</p>
                                <p className="text-sm mt-2">Upload your first image above</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {images.map((image) => (
                                    <div
                                        key={image.id}
                                        className={`group relative rounded-lg overflow-hidden bg-slate-800/50 border transition-all duration-200 ${bulkSelectMode && selectedImageIds.has(image.id)
                                                ? "border-violet-500 ring-2 ring-violet-500/50"
                                                : "border-slate-600/50"
                                            } ${bulkSelectMode ? "cursor-pointer" : ""}`}
                                        onClick={bulkSelectMode ? () => toggleImageSelection(image.id) : undefined}
                                    >
                                        {bulkSelectMode && (
                                            <div className="absolute top-2 left-2 z-10">
                                                {selectedImageIds.has(image.id) ? (
                                                    <CheckSquare className="w-6 h-6 text-violet-500 bg-slate-900/80 rounded" />
                                                ) : (
                                                    <Square className="w-6 h-6 text-slate-400 bg-slate-900/80 rounded" />
                                                )}
                                            </div>
                                        )}

                                        <div className="aspect-[4/3]">
                                            <img
                                                src={image.image_url}
                                                alt={image.title || image.category}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        </div>

                                        {!bulkSelectMode && (
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                    onClick={() => openEditDialog(image)}
                                                    className="bg-white/20 hover:bg-white/30 text-white"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => openDeleteDialog(image)}
                                                    className="bg-red-500/80 hover:bg-red-600"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        )}

                                        <div className="p-3">
                                            <p className="text-white font-medium truncate">
                                                {image.title || "Untitled"}
                                            </p>
                                            <p className="text-violet-400 text-sm">{image.category}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="bg-slate-800 border-slate-700 text-white">
                    <DialogHeader>
                        <DialogTitle>Edit Image</DialogTitle>
                        <DialogDescription className="text-slate-400">
                            Update the category or title of this image
                        </DialogDescription>
                    </DialogHeader>

                    {editingImage && (
                        <div className="space-y-4">
                            <img
                                src={editingImage.image_url}
                                alt="Edit preview"
                                className="w-full h-40 object-cover rounded-lg"
                            />

                            <div className="space-y-2">
                                <Label className="text-slate-300">Category</Label>
                                <Select value={editCategory} onValueChange={setEditCategory}>
                                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-300">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-slate-700 border-slate-600">
                                        {categories.map((cat) => (
                                            <SelectItem key={cat} value={cat} className="text-slate-300 focus:bg-slate-600">
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-slate-300">Title (Optional)</Label>
                                <Input
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Enter title"
                                    className="bg-slate-700 border-slate-600 text-slate-300 placeholder:text-slate-500"
                                />
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setEditDialogOpen(false)}
                            className="border-slate-600 text-slate-300 hover:bg-slate-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveEdit}
                            disabled={saving}
                            className="bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Alert Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent className="bg-slate-800 border-slate-700 text-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Image</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-400">
                            Are you sure you want to delete this image? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    {deletingImage && (
                        <img
                            src={deletingImage.image_url}
                            alt="Delete preview"
                            className="w-full h-32 object-cover rounded-lg"
                        />
                    )}

                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-slate-600 text-slate-300 hover:bg-slate-700">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={deleting}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            {deleting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                "Delete"
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Bulk Delete Alert Dialog */}
            <AlertDialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
                <AlertDialogContent className="bg-slate-800 border-slate-700 text-white max-w-lg">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-400">
                            Delete {selectedImageIds.size} Image{selectedImageIds.size !== 1 ? 's' : ''}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-400">
                            Are you sure you want to delete these {selectedImageIds.size} images? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                        {images
                            .filter(img => selectedImageIds.has(img.id))
                            .slice(0, 8)
                            .map(img => (
                                <img
                                    key={img.id}
                                    src={img.image_url}
                                    alt="Delete preview"
                                    className="w-full aspect-square object-cover rounded-lg"
                                />
                            ))}
                        {selectedImageIds.size > 8 && (
                            <div className="w-full aspect-square rounded-lg bg-slate-700 flex items-center justify-center text-slate-400 text-sm">
                                +{selectedImageIds.size - 8} more
                            </div>
                        )}
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-slate-600 text-slate-300 hover:bg-slate-700">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleBulkDelete}
                            disabled={bulkDeleting}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            {bulkDeleting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete All
                                </>
                            )}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Admin;
