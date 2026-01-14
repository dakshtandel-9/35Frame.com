import ServicePageLayout from "@/components/ServicePageLayout";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import heroImage from "@/assets/naming-hero.jpg";

const NamingCeremony = () => {
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("portfolio_images")
                    .select("image_url")
                    .eq("category", "Naming Ceremony")
                    .order("created_at", { ascending: false });

                if (error) {
                    console.error("Error fetching naming ceremony images:", error);
                    setGalleryImages([]);
                } else if (data) {
                    const images = data.map((img) => img.image_url);
                    setGalleryImages(images);
                }
            } catch (err) {
                console.error("Failed to fetch naming ceremony images:", err);
                setGalleryImages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const coverageItems = [
        "Traditional Ceremony Coverage",
        "Ritual Documentation",
        "Family Portraits",
        "Baby Close-ups",
        "Candid Moments",
        "Guest Photography",
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
            title="Naming Ceremony Photography"
            subtitle="Capturing the Sacred Beginning of Your Little One's Journey"
            heroImage={heroImage}
            heroPosition="center"
            description="The naming ceremony is a beautiful tradition that marks the beginning of your child's identity. At 35 Frames, we understand the sacred significance of this celebration. Our photographers capture every blessing, every ritual, and every loving glance exchanged during this special ceremony. From the traditional customs to the joyful family gatherings, we document these precious moments with care and sensitivity."
            coverageItems={coverageItems}
            galleryImages={galleryImages}
        />
    );
};

export default NamingCeremony;
