import { Button } from "@/components/ui/button";
import aboutImage from "@/assets/about-image.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="image-hover aspect-[4/5] lg:aspect-[3/4]">
              <img
                src={aboutImage}
                alt="35 Frames Photography"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute top-6 left-6 right-6 bottom-6 border border-primary/30 pointer-events-none" />
            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-primary text-primary-foreground p-6 lg:p-8">
              <span className="block font-display text-4xl lg:text-5xl font-medium">10+</span>
              <span className="font-body text-sm tracking-wide uppercase">Years Experience</span>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <p className="font-body text-sm tracking-luxury uppercase text-primary mb-4">
              About Us
            </p>
            <h2 className="text-section-title text-foreground mb-8">
              Crafting Timeless
              <span className="block italic">Visual Legacies</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground font-body leading-relaxed">
              <p>
                35 Frames Photography is a premium wedding storytelling studio creating 
                cinematic, editorial, and cultural style imagery for weddings across 
                India and abroad.
              </p>
              <p>
                We believe every love story deserves to be told with artistry and 
                authenticity. Our team combines technical expertise with creative vision 
                to deliver photographs that you'll treasure for generations.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mt-10 mb-10">
              <div>
                <h4 className="font-display text-xl text-foreground mb-2">Our Story</h4>
                <p className="text-muted-foreground font-body">
                  A decade of capturing love stories with passion and precision.
                </p>
              </div>
              <div>
                <h4 className="font-display text-xl text-foreground mb-2">Our Vision</h4>
                <p className="text-muted-foreground font-body">
                  Creating timeless imagery that tells your unique love story.
                </p>
              </div>
            </div>

            <Button variant="outline">
              Learn More About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
