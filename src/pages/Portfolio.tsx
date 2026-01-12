import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";

import portfolio1 from "@/assets/portfolio-01.jpg";
import portfolio2 from "@/assets/portfolio-02.jpg";
import portfolio3 from "@/assets/portfolio-03.jpg";
import portfolio4 from "@/assets/portfolio-04.jpg";
import portfolio5 from "@/assets/portfolio-05.jpg";
import portfolio6 from "@/assets/portfolio-06.jpg";
import portfolio7 from "@/assets/portfolio-07.jpg";
import portfolio8 from "@/assets/portfolio-08.jpg";
import portfolio9 from "@/assets/portfolio-09.jpg";
import wedding1 from "@/assets/wedding-01.jpg";
import wedding2 from "@/assets/wedding-02.jpg";
import wedding3 from "@/assets/wedding-03.jpg";
import prewedding1 from "@/assets/prewedding-01.jpg";
import prewedding2 from "@/assets/prewedding-02.jpg";
import prewedding3 from "@/assets/prewedding-03.jpg";

const allImages = [
  { src: portfolio1, category: "All" },
  { src: portfolio2, category: "Pre-Wedding" },
  { src: wedding1, category: "Wedding" },
  { src: portfolio3, category: "Engagement" },
  { src: prewedding1, category: "Pre-Wedding" },
  { src: portfolio4, category: "Wedding" },
  { src: wedding2, category: "Wedding" },
  { src: portfolio5, category: "Wedding" },
  { src: prewedding2, category: "Pre-Wedding" },
  { src: portfolio6, category: "Wedding" },
  { src: portfolio7, category: "Engagement" },
  { src: wedding3, category: "Wedding" },
  { src: portfolio8, category: "Pre-Wedding" },
  { src: prewedding3, category: "Pre-Wedding" },
  { src: portfolio9, category: "Wedding" },
];

const categories = ["All", "Wedding", "Pre-Wedding", "Engagement"];

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages = activeCategory === "All" 
    ? allImages 
    : allImages.filter(img => img.category === activeCategory);

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
                className={`font-body text-sm tracking-luxury uppercase px-6 py-2 transition-colors duration-300 ${
                  activeCategory === category
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((item, index) => (
              <div
                key={index}
                className="group relative image-hover aspect-[3/2] cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={item.src}
                  alt={`${item.category} Photography`}
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
