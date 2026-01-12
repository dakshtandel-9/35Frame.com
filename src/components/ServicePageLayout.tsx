import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Lightbox from "./Lightbox";

interface ServicePageLayoutProps {
  title: string;
  subtitle: string;
  heroImage: string;
  heroPosition?: "top" | "center" | "bottom";
  description: string;
  coverageItems: string[];
  galleryImages: string[];
}

const ServicePageLayout = ({
  title,
  subtitle,
  heroImage,
  heroPosition = "center",
  description,
  coverageItems,
  galleryImages,
}: ServicePageLayoutProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const visibleImages = 4;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev + visibleImages >= galleryImages.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.max(0, galleryImages.length - visibleImages) : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[90vh] pt-24">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt={title}
            className="w-full h-full object-cover"
            style={{
              objectPosition: heroPosition === "top" ? "center 10%" : 
                              heroPosition === "bottom" ? "center 80%" : "center 15%"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-6 lg:px-12 pb-16">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground max-w-3xl leading-tight">
              {title}
            </h1>
            <p className="font-body text-lg text-muted-foreground mt-4">
              {subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Description & Gallery Preview */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-muted-foreground leading-relaxed text-lg">
                {description}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {galleryImages.slice(0, 6).map((img, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Includes */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl text-foreground">
              Coverage <span className="text-primary italic">Includes</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {coverageItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-primary">✓</span>
                <span className="font-body text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/#contact"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 font-body text-sm tracking-wider uppercase hover:bg-primary/90 transition-colors"
            >
              Book Your Session Now
            </Link>
          </div>
        </div>
      </section>

      {/* Full Width Gallery Carousel */}
      <section className="py-8 bg-background">
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / visibleImages)}%)`,
              }}
            >
              {galleryImages.map((img, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-1/2 md:w-1/3 lg:w-1/4 p-1 cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      <Lightbox
        images={galleryImages}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />
    </div>
  );
};

export default ServicePageLayout;
