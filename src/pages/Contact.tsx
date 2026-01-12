import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Instagram, Facebook, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", eventDate: "", eventType: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-card">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="font-body text-sm tracking-luxury uppercase text-primary mb-4">
            Get In Touch
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Contact Us
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to book your date? Let's meet over a coffee and bring your 
            imagination to life. We'd love to hear about your special day.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="font-display text-3xl text-foreground mb-8">
                Let's Create
                <span className="block italic">Magic Together</span>
              </h2>
              
              <p className="font-body text-lg text-muted-foreground mb-12 max-w-md">
                Whether you're planning an intimate ceremony or a grand celebration, 
                we're here to capture every precious moment.
              </p>

              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-primary/30 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Phone</p>
                    <p className="font-display text-lg text-foreground">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-primary/30 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Email</p>
                    <p className="font-display text-lg text-foreground">hello@35framesphotography.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-primary/30 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Location</p>
                    <p className="font-display text-lg text-foreground">Bangalore, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-primary/30 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-body text-sm text-muted-foreground">Working Hours</p>
                    <p className="font-display text-lg text-foreground">Mon - Sat: 10AM - 7PM</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <p className="font-body text-sm text-muted-foreground mb-4">Follow Us</p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 lg:p-12 border border-border">
              <h3 className="font-display text-2xl text-foreground mb-8">
                Request Availability
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground font-body h-12"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground font-body h-12"
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground font-body h-12"
                    />
                  </div>
                  <div>
                    <Input
                      type="date"
                      name="eventDate"
                      placeholder="Event Date"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground font-body h-12"
                    />
                  </div>
                </div>

                <div>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full h-12 px-3 bg-background border border-border text-foreground font-body rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="" className="text-muted-foreground">Select Event Type</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="prewedding">Pre-Wedding Shoot</option>
                    <option value="engagement">Engagement Photography</option>
                    <option value="films">Wedding Films</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your event..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="bg-background border-border text-foreground placeholder:text-muted-foreground font-body resize-none"
                  />
                </div>
                
                <Button type="submit" variant="gold" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-card">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl text-foreground">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border border-border p-6">
              <h3 className="font-display text-lg text-foreground mb-2">
                How far in advance should we book?
              </h3>
              <p className="font-body text-muted-foreground">
                We recommend booking 6-12 months in advance for wedding dates, especially during 
                peak season. For pre-wedding and engagement shoots, 2-3 months notice is usually sufficient.
              </p>
            </div>
            <div className="border border-border p-6">
              <h3 className="font-display text-lg text-foreground mb-2">
                Do you travel for destination weddings?
              </h3>
              <p className="font-body text-muted-foreground">
                Absolutely! We love capturing destination weddings across India and internationally. 
                Travel costs are discussed separately based on location.
              </p>
            </div>
            <div className="border border-border p-6">
              <h3 className="font-display text-lg text-foreground mb-2">
                How long until we receive our photos?
              </h3>
              <p className="font-body text-muted-foreground">
                Wedding photo delivery typically takes 4-6 weeks. Pre-wedding and engagement 
                shoots are delivered within 2-3 weeks of the session.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
