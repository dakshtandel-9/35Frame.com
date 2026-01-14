import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

// Fallback images for service cards
import service1 from "@/assets/service-wedding.jpg";
import service2 from "@/assets/service-prewedding.jpg";
import service3 from "@/assets/service-films.jpg";
import service4 from "@/assets/service-engagement.jpg";
import candidHero from "@/assets/candid-hero.png";
import birthdayHero from "@/assets/birthday-hero.png";
import coupleHero from "@/assets/couple-hero.png";
import namingHero from "@/assets/naming-hero.jpg";

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
}

const defaultServices: ServiceItem[] = [
  {
    id: 1,
    title: "Luxury Wedding Photography",
    description: "Complete wedding day coverage with cinematic storytelling and editorial portraits.",
    image: service1,
    link: "/services/wedding-photography",
    category: "Wedding",
  },
  {
    id: 2,
    title: "Pre-Wedding Shoots",
    description: "Romantic destination and themed photoshoots to celebrate your journey together.",
    image: service2,
    link: "/services/pre-wedding",
    category: "Pre-Wedding",
  },
  {
    id: 3,
    title: "Cinematic Wedding Films",
    description: "Beautifully crafted wedding films that capture the emotion and essence of your day.",
    image: service3,
    link: "/services/wedding-films",
    category: "Wedding",
  },
  {
    id: 4,
    title: "Engagement & Ceremonies",
    description: "Haldi, Mehendi, Sangeet, and engagement ceremony coverage with artistic flair.",
    image: service4,
    link: "/services/engagement",
    category: "Engagement",
  },
  {
    id: 5,
    title: "Candid Photography",
    description: "Natural, unposed moments that capture authentic emotions and real connections.",
    image: candidHero,
    link: "/services/candid-photography",
    category: "Candid",
  },
  {
    id: 6,
    title: "Birthday Photography",
    description: "Celebrate milestones with vibrant and joyful birthday party coverage.",
    image: birthdayHero,
    link: "/services/birthday-photography",
    category: "Birthday",
  },
  {
    id: 7,
    title: "Couple Portraits",
    description: "Romantic couple sessions celebrating your unique love story.",
    image: coupleHero,
    link: "/services/couple-portraits",
    category: "Couple Portraits",
  },
  {
    id: 8,
    title: "Naming Ceremony",
    description: "Sacred traditional ceremonies documented with care and sensitivity.",
    image: namingHero,
    link: "/services/naming-ceremony",
    category: "Naming Ceremony",
  },
];

const ServicesSection = () => {
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);

  // Fetch one image per category from Supabase
  useEffect(() => {
    const fetchServiceImages = async () => {
      try {
        // Fetch one image per category
        const categories = ["Wedding", "Pre-Wedding", "Engagement", "Candid", "Birthday", "Couple Portraits", "Naming Ceremony"];
        const imageMap: Record<string, string> = {};

        for (const category of categories) {
          const { data, error } = await supabase
            .from("portfolio_images")
            .select("image_url")
            .eq("category", category)
            .order("created_at", { ascending: false })
            .limit(1);

          if (!error && data && data.length > 0) {
            imageMap[category] = data[0].image_url;
          }
        }

        // Update services with Supabase images where available
        if (Object.keys(imageMap).length > 0) {
          setServices((prev) =>
            prev.map((service) => ({
              ...service,
              image: imageMap[service.category] || service.image,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch service images:", err);
      }
    };

    fetchServiceImages();
  }, []);

  return (
    <section id="services" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-body text-sm tracking-luxury uppercase text-primary mb-4">
            What We Offer
          </p>
          <h2 className="text-section-title text-foreground mb-6">
            Our Services
          </h2>
          <p className="text-subtitle max-w-2xl mx-auto">
            Complete event coverage with professional clarity and artistic warmth
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              to={service.link}
              key={service.id}
              className="group relative overflow-hidden cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="aspect-[3/4] image-hover">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="font-display text-xl lg:text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="mt-24">
          <div className="line-gold mb-16" />

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl lg:text-4xl font-display text-foreground mb-6">
                Why Choose <span className="text-primary">35 Frames</span>
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <span className="text-primary font-display text-4xl">01</span>
                <h4 className="font-display text-lg text-foreground mt-2 mb-2">Master Craftsmanship</h4>
                <p className="font-body text-muted-foreground text-sm">
                  10+ years of experience in capturing the most beautiful moments.
                </p>
              </div>
              <div>
                <span className="text-primary font-display text-4xl">02</span>
                <h4 className="font-display text-lg text-foreground mt-2 mb-2">Cinematic Color Tones</h4>
                <p className="font-body text-muted-foreground text-sm">
                  Exclusive editing style that brings your photos to life.
                </p>
              </div>
              <div>
                <span className="text-primary font-display text-4xl">03</span>
                <h4 className="font-display text-lg text-foreground mt-2 mb-2">Elite Creative Team</h4>
                <p className="font-body text-muted-foreground text-sm">
                  Passionate photographers dedicated to your vision.
                </p>
              </div>
              <div>
                <span className="text-primary font-display text-4xl">04</span>
                <h4 className="font-display text-lg text-foreground mt-2 mb-2">Luxury Albums</h4>
                <p className="font-body text-muted-foreground text-sm">
                  Handcrafted premium albums to cherish forever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
