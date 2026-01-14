import ServicePageLayout from "@/components/ServicePageLayout";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import heroImage from "@/assets/prewedding-hero.jpg";

const PreWeddingPhotography = () => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreWeddingImages = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("portfolio_images")
          .select("image_url")
          .eq("category", "Pre-Wedding")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching pre-wedding images:", error);
          setGalleryImages([]);
        } else if (data) {
          const supabaseImages = data.map((img) => img.image_url);
          setGalleryImages(supabaseImages);
        }
      } catch (err) {
        console.error("Failed to fetch pre-wedding images:", err);
        setGalleryImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPreWeddingImages();
  }, []);

  const coverageItems = [
    "Location Scouting",
    "Outfit Consultation",
    "Multiple Locations",
    "Drone Photography",
    "Cinematic Shots",
    "Romantic Portraits",
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
      title="Luxury Pre-Wedding Shoot"
      subtitle="Celebrate Your Love Story Before the Big Day"
      heroImage={heroImage}
      heroPosition="top"
      description="Your pre-wedding shoot is a celebration of your journey together. Whether you dream of a romantic beach sunset, a picturesque mountain backdrop, or an urban adventure, we create stunning imagery that captures the essence of your relationship. Our pre-wedding sessions are relaxed, fun, and designed to bring out the genuine connection between you and your partner. These photos become cherished memories and beautiful additions to your wedding invitations, save-the-dates, and home décor."
      coverageItems={coverageItems}
      galleryImages={galleryImages}
    />
  );
};

export default PreWeddingPhotography;
