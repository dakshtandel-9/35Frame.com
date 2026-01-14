import ServicePageLayout from "@/components/ServicePageLayout";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import heroImage from "@/assets/candid-hero.png";

const CandidPhotography = () => {
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("portfolio_images")
                    .select("image_url")
                    .eq("category", "Candid")
                    .order("created_at", { ascending: false });

                if (error) {
                    console.error("Error fetching candid images:", error);
                    setGalleryImages([]);
                } else if (data) {
                    const images = data.map((img) => img.image_url);
                    setGalleryImages(images);
                }
            } catch (err) {
                console.error("Failed to fetch candid images:", err);
                setGalleryImages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const coverageItems = [
        "Natural Moments Capture",
        "Documentary Style Photography",
        "Unposed Authentic Shots",
        "Emotional Storytelling",
        "Real Expressions",
        "Lifestyle Photography",
        "All HD Edited Photos",
        "Online Gallery Access",
        "Quick Turnaround",
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
            title="Candid Photography"
            subtitle="Capturing Authentic Moments & Real Emotions"
            heroImage={heroImage}
            heroPosition="center"
            description="Candid photography is all about capturing the real, unscripted moments that make life beautiful. At 35 Frames, we specialize in documenting genuine emotions, spontaneous laughter, and heartfelt connections without the need for posed shots. Our photographers blend into the background, allowing natural moments to unfold while we capture every precious detail that tells your unique story."
            coverageItems={coverageItems}
            galleryImages={galleryImages}
        />
    );
};

export default CandidPhotography;
