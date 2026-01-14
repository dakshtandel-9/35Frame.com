import ServicePageLayout from "@/components/ServicePageLayout";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import heroImage from "@/assets/service-engagement.jpg";

const EngagementPhotography = () => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEngagementImages = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("portfolio_images")
          .select("image_url")
          .eq("category", "Engagement")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching engagement images:", error);
          setGalleryImages([]);
        } else if (data) {
          const supabaseImages = data.map((img) => img.image_url);
          setGalleryImages(supabaseImages);
        }
      } catch (err) {
        console.error("Failed to fetch engagement images:", err);
        setGalleryImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEngagementImages();
  }, []);

  const coverageItems = [
    "Haldi Ceremony Coverage",
    "Mehendi Photography",
    "Sangeet Night Coverage",
    "Engagement Portraits",
    "Family Group Photos",
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
      title="Premium Engagement, Haldi & Mehendi Photography"
      subtitle="Capturing the Colors and Joy of Your Pre-Wedding Celebrations"
      heroImage={heroImage}
      heroPosition="bottom"
      description="The celebrations leading up to your wedding are filled with color, tradition, and unbridled joy. From the vibrant yellows of Haldi to the intricate beauty of Mehendi designs, and the energetic performances of Sangeet night, these ceremonies are precious moments that deserve to be captured beautifully. Our photographers specialize in capturing the essence of these celebrations, preserving the laughter, the dance moves, and the emotional moments that make these events unforgettable."
      coverageItems={coverageItems}
      galleryImages={galleryImages}
    />
  );
};

export default EngagementPhotography;
