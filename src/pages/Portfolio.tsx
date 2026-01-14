import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import { supabase } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

interface PortfolioImage {
  id: string;
  src: string;
  category: string;
  title?: string | null;
}

const categories = ["All", "Wedding", "Pre-Wedding", "Engagement", "Candid", "Birthday", "Couple Portraits", "Naming Ceremony"];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [images, setImages] = useState<PortfolioImage[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch images from Supabase
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("portfolio_images")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching images:", error);
          setImages([]);
        } else if (data) {
          // Convert Supabase data to our format
          const supabaseImages: PortfolioImage[] = data.map((img) => ({
            id: img.id,
            src: img.image_url,
            category: img.category,
            title: img.title,
          }));
          setImages(supabaseImages);
        }
      } catch (err) {
        console.error("Failed to fetch images:", err);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const filteredImages = activeCategory === "All"
    ? images
    : images.filter(img => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-card">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="font-body text-sm tracking-luxury uppercase text-primary mb-4">
            Our Work
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Portfolio
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated collection of our finest work, capturing timeless moments
            and authentic emotions across weddings, pre-weddings, and engagements.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-body text-sm tracking-luxury uppercase px-6 py-2 transition-colors duration-300 ${activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-primary"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-body text-muted-foreground text-lg">
                No images found. Upload images from the admin dashboard.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative image-hover aspect-[3/2] cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={item.src}
                    alt={item.title || `${item.category} Photography`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <p className="font-body text-sm tracking-luxury uppercase text-primary">
                      {item.category}
                    </p>
                  </div>
                  <div className="absolute inset-4 border border-primary/0 group-hover:border-primary/40 transition-all duration-500" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-foreground mb-6">
            Ready to Create Your Story?
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Let's discuss how we can capture your special moments with the same artistry and care.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 font-body text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      <Footer />

      <Lightbox
        images={filteredImages.map(img => img.src)}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  );
};

export default Portfolio;
