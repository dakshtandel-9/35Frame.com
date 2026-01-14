import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

interface PortfolioItem {
  id: string;
  image: string;
  category: string;
}

const PortfolioSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch images from Supabase
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("portfolio_images")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(12);

        if (error) {
          console.error("Error fetching portfolio images:", error);
          setPortfolioItems([]);
        } else if (data) {
          const items: PortfolioItem[] = data.map((img) => ({
            id: img.id,
            image: img.image_url,
            category: img.category,
          }));
          setPortfolioItems(items);
        }
      } catch (err) {
        console.error("Failed to fetch portfolio images:", err);
        setPortfolioItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);

      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const scrollNode = scrollRef.current;
    if (scrollNode) {
      scrollNode.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => scrollNode.removeEventListener("scroll", handleScroll);
    }
  }, [portfolioItems]);

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused || portfolioItems.length === 0) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;

        if (scrollLeft >= maxScroll - 5) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          const scrollAmount = clientWidth > 768 ? 450 + 24 : clientWidth * 0.85 + 24;
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, portfolioItems]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-luxury uppercase text-primary mb-4">
            Our Work
          </p>
          <h2 className="text-section-title text-foreground mb-6">
            Portfolio
          </h2>
          <p className="text-subtitle max-w-2xl mx-auto">
            Timeless • Cinematic • Editorial
          </p>
        </div>

        {/* Portfolio Slider */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : portfolioItems.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-body text-muted-foreground text-lg">
              No portfolio images yet. Upload images from the admin dashboard.
            </p>
          </div>
        ) : (
          <div
            className="relative group/slider"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory scrollbar-hide px-4 -mx-4 md:px-0 md:mx-0"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {portfolioItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex-none w-[85vw] md:w-[450px] group relative image-hover aspect-[3/2] cursor-pointer snap-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={item.image}
                    alt={`${item.category} Photography`}
                    className="w-full h-full object-cover transition-transform duration-700"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <p className="font-body text-sm tracking-luxury uppercase text-primary">
                      {item.category}
                    </p>
                  </div>
                  {/* Border effect on hover */}
                  <div className="absolute inset-4 border border-primary/0 group-hover:border-primary/40 transition-all duration-500" />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => scroll("left")}
              className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 flex items-center justify-center text-primary transition-all duration-300 z-10 hover:bg-primary hover:text-primary-foreground focus:outline-none",
                showLeftArrow ? "opacity-100 visible" : "opacity-0 invisible"
              )}
              aria-label="Previous"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => scroll("right")}
              className={cn(
                "absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-primary/20 flex items-center justify-center text-primary transition-all duration-300 z-10 hover:bg-primary hover:text-primary-foreground focus:outline-none",
                showRightArrow ? "opacity-100 visible" : "opacity-0 invisible"
              )}
              aria-label="Next"
            >
              <ChevronRight size={24} />
            </button>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/30">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* View More Link */}
        <div className="text-center mt-12">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 font-body text-sm tracking-luxury uppercase text-primary hover:text-foreground transition-colors duration-300"
          >
            View All Works
            <span className="w-8 h-px bg-current" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
