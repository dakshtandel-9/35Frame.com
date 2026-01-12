import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import aboutImage from "@/assets/about-image.jpg";
import portfolio1 from "@/assets/portfolio-01.jpg";
import portfolio2 from "@/assets/portfolio-02.jpg";
import portfolio3 from "@/assets/portfolio-03.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-card">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="font-body text-sm tracking-luxury uppercase text-primary mb-4">
            Our Story
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            About Us
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Crafting timeless visual legacies, one frame at a time.
          </p>
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-16 lg:py-24 bg-background">
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
              <div className="absolute top-6 left-6 right-6 bottom-6 border border-primary/30 pointer-events-none" />
              <div className="absolute -bottom-6 -right-6 lg:-right-12 bg-primary text-primary-foreground p-6 lg:p-8">
                <span className="block font-display text-4xl lg:text-5xl font-medium">10+</span>
                <span className="font-body text-sm tracking-wide uppercase">Years Experience</span>
              </div>
            </div>

            {/* Content */}
            <div className="lg:pl-8">
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
                <p>
                  Founded with a passion for capturing genuine emotions, we've grown into 
                  a team of dedicated artists who approach each wedding as a unique story 
                  waiting to be told.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="font-body text-sm tracking-luxury uppercase text-primary mb-4">
              What Drives Us
            </p>
            <h2 className="text-section-title text-foreground">
              Our Philosophy
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 border border-primary/30 flex items-center justify-center">
                <span className="font-display text-2xl text-primary">01</span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-4">Authenticity</h3>
              <p className="font-body text-muted-foreground">
                We capture real moments and genuine emotions, creating images that 
                reflect the true essence of your celebration.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 border border-primary/30 flex items-center justify-center">
                <span className="font-display text-2xl text-primary">02</span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-4">Artistry</h3>
              <p className="font-body text-muted-foreground">
                Every frame is composed with intention, blending technical excellence 
                with creative vision for timeless results.
              </p>
            </div>
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-6 border border-primary/30 flex items-center justify-center">
                <span className="font-display text-2xl text-primary">03</span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-4">Connection</h3>
              <p className="font-body text-muted-foreground">
                We build genuine relationships with our couples, ensuring comfort 
                and trust that translates into beautiful, natural photographs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <span className="block font-display text-4xl lg:text-5xl text-primary mb-2">500+</span>
              <span className="font-body text-sm tracking-wide uppercase text-muted-foreground">Weddings Captured</span>
            </div>
            <div className="text-center">
              <span className="block font-display text-4xl lg:text-5xl text-primary mb-2">10+</span>
              <span className="font-body text-sm tracking-wide uppercase text-muted-foreground">Years Experience</span>
            </div>
            <div className="text-center">
              <span className="block font-display text-4xl lg:text-5xl text-primary mb-2">15+</span>
              <span className="font-body text-sm tracking-wide uppercase text-muted-foreground">Countries</span>
            </div>
            <div className="text-center">
              <span className="block font-display text-4xl lg:text-5xl text-primary mb-2">50+</span>
              <span className="font-body text-sm tracking-wide uppercase text-muted-foreground">Awards Won</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl text-foreground">
              Our Work Speaks
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[portfolio1, portfolio2, portfolio3].map((img, index) => (
              <div key={index} className="aspect-[3/2] overflow-hidden">
                <img
                  src={img}
                  alt={`Featured work ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 font-body text-sm tracking-luxury uppercase text-primary hover:text-foreground transition-colors duration-300"
            >
              View Full Portfolio
              <span className="w-8 h-px bg-current" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-foreground mb-6">
            Let's Create Together
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            Ready to tell your love story? We'd love to hear from you.
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
    </div>
  );
};

export default About;
