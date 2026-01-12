import { Button } from "@/components/ui/button";
import heroImage from "@/assets/0010.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury Wedding Photography"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Tagline */}
          <p className="font-body text-sm tracking-luxury uppercase text-primary mb-6 animate-fade-in">
            Premium Wedding Photography
          </p>

          {/* Main Heading */}
          <h1 className="text-hero text-foreground mb-8 animate-fade-in-up">
            Stories Told Through
            <span className="block italic text-primary">Heartfelt Photography</span>
          </h1>

          {/* Subtitle */}
          <p className="text-subtitle max-w-2xl mx-auto mb-12 opacity-0 animate-fade-in-delay-1">
            At 35 Frames Photography, we don't just click pictures — we capture emotions, 
            moments, and stories. From weddings to birthdays, our team delivers complete 
            event coverage with professional clarity and warmth.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-delay-2">
            <Button variant="hero" asChild>
              <a href="#portfolio">View Portfolio</a>
            </Button>
            <Button variant="heroOutline" asChild>
              <a href="#contact">Book Your Date</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in-delay-3">
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent mx-auto mb-2" />
        <p className="font-body text-xs tracking-luxury uppercase text-muted-foreground">
          Scroll
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
