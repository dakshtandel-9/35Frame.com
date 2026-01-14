import ServicePageLayout from "@/components/ServicePageLayout";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import heroImage from "@/assets/wedding-hero.jpg";

const WeddingPhotography = () => {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeddingImages = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("portfolio_images")
          .select("image_url")
          .eq("category", "Wedding")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching wedding images:", error);
          setGalleryImages([]);
        } else if (data) {
          const supabaseImages = data.map((img) => img.image_url);
          setGalleryImages(supabaseImages);
        }
      } catch (err) {
        console.error("Failed to fetch wedding images:", err);
        setGalleryImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeddingImages();
  }, []);

  const coverageItems = [
    "Full Day Coverage",
    "Candid Photography",
    "Traditional Portraits",
    "Drone Shots",
    "Same Day Edits",
    "Premium Photo Album",
    "All HD Edited Photos",
    "Online Gallery Access",
    "Multiple Photographers",
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
      title="Luxury Candid Wedding Photography"
      subtitle="Capturing Every Precious Moment of Your Special Day"
      heroImage={heroImage}
      heroPosition="bottom"
      description="At 35 Frames, we believe every wedding tells a unique story. Our candid wedding photography captures the raw emotions, stolen glances, and joyful celebrations that make your day truly special. From the nervous excitement of getting ready to the heartfelt vows and exuberant dancing, we document every precious moment with artistic precision and emotional depth. Our team of experienced photographers blends seamlessly into your celebration, ensuring natural and authentic images that you'll treasure forever."
      coverageItems={coverageItems}
      galleryImages={galleryImages}
    />
  );
};

export default WeddingPhotography;
