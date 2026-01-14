import ServicePageLayout from "@/components/ServicePageLayout";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import heroImage from "@/assets/birthday-hero.png";

const BirthdayPhotography = () => {
    const [galleryImages, setGalleryImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                const { data, error } = await supabase
                    .from("portfolio_images")
                    .select("image_url")
                    .eq("category", "Birthday")
                    .order("created_at", { ascending: false });

                if (error) {
                    console.error("Error fetching birthday images:", error);
                    setGalleryImages([]);
                } else if (data) {
                    const images = data.map((img) => img.image_url);
                    setGalleryImages(images);
                }
            } catch (err) {
                console.error("Failed to fetch birthday images:", err);
                setGalleryImages([]);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    const coverageItems = [
        "Kids Birthday Parties",
        "First Birthday Specials",
        "Themed Party Coverage",
        "Cake Smash Sessions",
        "Family Portraits",
        "Candid Moments",
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
            title="Birthday Photography"
            subtitle="Celebrating Milestones & Creating Lasting Memories"
            heroImage={heroImage}
            heroPosition="center"
            description="Birthdays are special milestones that deserve to be captured beautifully. Whether it's your little one's first birthday, a themed party, or a grand celebration, we document all the joy, laughter, and precious moments. From cake smash sessions to candid party shots, our birthday photography services ensure every smile and celebration is preserved for years to come."
            coverageItems={coverageItems}
            galleryImages={galleryImages}
        />
    );
};

export default BirthdayPhotography;
