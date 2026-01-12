import logo from "@/assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <img src={logo} alt="35 Frames Photography" className="h-12 w-auto mb-4" />
            <p className="font-body text-muted-foreground">
              Premium wedding photography studio crafting timeless visual legacies 
              for couples across India and abroad.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <a href="#home" className="font-body text-muted-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#portfolio" className="font-body text-muted-foreground hover:text-primary transition-colors">
                Portfolio
              </a>
              <a href="#services" className="font-body text-muted-foreground hover:text-primary transition-colors">
                Services
              </a>
              <a href="#about" className="font-body text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="font-body text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-4">Services</h4>
            <nav className="flex flex-col gap-2">
              <span className="font-body text-muted-foreground">Wedding Photography</span>
              <span className="font-body text-muted-foreground">Pre-Wedding Shoots</span>
              <span className="font-body text-muted-foreground">Cinematic Films</span>
              <span className="font-body text-muted-foreground">Engagement Sessions</span>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="line-gold mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-muted-foreground">
            © {currentYear} 35 Frames Photography. All rights reserved.
          </p>
          <p className="font-body text-sm text-muted-foreground">
            Crafted with love for timeless stories
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
