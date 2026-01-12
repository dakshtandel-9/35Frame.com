import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Instagram, Facebook } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", phone: "", eventDate: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <p className="font-body text-sm tracking-luxury uppercase text-primary mb-4">
              Get In Touch
            </p>
            <h2 className="text-section-title text-foreground mb-8">
              Let's Create
              <span className="block italic">Magic Together</span>
            </h2>
            
            <p className="font-body text-lg text-muted-foreground mb-12 max-w-md">
              Ready to book your date? Let's meet over a coffee and bring your 
              imagination to life. We'd love to hear about your special day.
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
            </div>

            {/* Social Links */}
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

          {/* Contact Form */}
          <div className="bg-background p-8 lg:p-12 border border-border">
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
                    className="bg-card border-border text-foreground placeholder:text-muted-foreground font-body h-12"
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
                    className="bg-card border-border text-foreground placeholder:text-muted-foreground font-body h-12"
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
                    className="bg-card border-border text-foreground placeholder:text-muted-foreground font-body h-12"
                  />
                </div>
                <div>
                  <Input
                    type="date"
                    name="eventDate"
                    placeholder="Event Date"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="bg-card border-border text-foreground placeholder:text-muted-foreground font-body h-12"
                  />
                </div>
              </div>
              
              <div>
                <Textarea
                  name="message"
                  placeholder="Tell us about your event..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground font-body resize-none"
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
  );
};

export default ContactSection;
