import ServicePageLayout from "@/components/ServicePageLayout";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import heroImage from "@/assets/couple-hero.png";

const CouplePortraits = () => {
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("portfolio_images")
                    .select("image_url")
                    .eq("category", "Couple Portraits")
                    .order("created_at", { ascending: false });

                if (error) {
                    console.error("Error fetching couple portraits:", error);
                    setGalleryImages([]);
                } else if (data) {
                    const images = data.map((img) => img.image_url);
                    setGalleryImages(images);
                }
            } catch (err) {
                console.error("Failed to fetch couple portraits:", err);
                setGalleryImages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const coverageItems = [
        "Romantic Couple Shoots",
        "Anniversary Photography",
        "Location-based Sessions",
        "Outdoor & Indoor Portraits",
        "Creative Concepts",
        "Lifestyle Photography",
        "All HD Edited Photos",
        "Online Gallery Access",
        "Printed Photo Book",
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading images...</p>
                </div>
            </div>
        );
    }

    return (
        <ServicePageLayout
            title="Couple Portraits"
            subtitle="Celebrating Love Through Beautiful Imagery"
            heroImage={heroImage}
            heroPosition="center"
            description="Couple portrait sessions are a wonderful way to celebrate your relationship, whether you're newly in love or celebrating decades together. Our sessions are relaxed, fun, and designed to capture the unique chemistry between you and your partner. From scenic outdoor locations to intimate indoor settings, we create stunning portraits that tell your love story beautifully."
            coverageItems={coverageItems}
            galleryImages={galleryImages}
        />
    );
};

export default CouplePortraits;
