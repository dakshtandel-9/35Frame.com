import portfolio1 from "@/assets/portfolio-01.jpg";
import portfolio2 from "@/assets/portfolio-02.jpg";
import portfolio3 from "@/assets/portfolio-03.jpg";
import portfolio4 from "@/assets/portfolio-04.jpg";
import portfolio5 from "@/assets/portfolio-05.jpg";
import portfolio6 from "@/assets/portfolio-06.jpg";
import portfolio7 from "@/assets/portfolio-07.jpg";
import portfolio8 from "@/assets/portfolio-08.jpg";
import portfolio9 from "@/assets/portfolio-09.jpg";

const portfolioItems = [
  { id: 1, image: portfolio1, category: "Pre-Wedding" },
  { id: 2, image: portfolio2, category: "Pre-Wedding" },
  { id: 3, image: portfolio3, category: "Engagements" },
  { id: 4, image: portfolio4, category: "Weddings" },
  { id: 5, image: portfolio5, category: "Weddings" },
  { id: 6, image: portfolio6, category: "Weddings" },
  { id: 7, image: portfolio7, category: "Couples" },
  { id: 8, image: portfolio8, category: "Pre-Wedding" },
  { id: 9, image: portfolio9, category: "Weddings" },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-background">
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

        {/* Portfolio Grid - Horizontal Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative image-hover aspect-[3/2] cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={item.image}
                alt={`${item.category} Photography`}
                className="w-full h-full object-cover"
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

        {/* View More Link */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center gap-2 font-body text-sm tracking-luxury uppercase text-primary hover:text-foreground transition-colors duration-300"
          >
            View All Works
            <span className="w-8 h-px bg-current" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
