import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/002.png";

const serviceLinks = [
  { label: "Wedding Photography", href: "/services/wedding-photography" },
  { label: "Pre-Wedding Photography", href: "/services/pre-wedding" },
  { label: "Wedding Films", href: "/services/wedding-films" },
  { label: "Engagement Photography", href: "/services/engagement" },
  { label: "Candid Photography", href: "/services/candid-photography" },
  { label: "Birthday Photography", href: "/services/birthday-photography" },
  { label: "Couple Portraits", href: "/services/couple-portraits" },
  { label: "Naming Ceremony", href: "/services/naming-ceremony" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-background border-b border-border/50"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={handleHomeClick}>
            <img
              src={logo}
              alt="35 Frames Photography"
              className="h-12 lg:h-16 w-auto brightness-0 invert"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            <button
              onClick={handleHomeClick}
              className="font-body text-sm tracking-luxury uppercase text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              Home
            </button>

            <Link
              to="/portfolio"
              className="font-body text-sm tracking-luxury uppercase text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              Portfolio
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="font-body text-sm tracking-luxury uppercase text-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-1"
              >
                Services
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-xl py-2 z-50">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.label}
                      to={service.href}
                      onClick={() => setIsServicesOpen(false)}
                      className="block px-4 py-2.5 font-body text-sm text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors duration-200"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              className="font-body text-sm tracking-luxury uppercase text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="font-body text-sm tracking-luxury uppercase text-foreground/80 hover:text-primary transition-colors duration-300"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Link to="/contact">
              <Button variant="outline" size="sm">
                Book Your Date
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${isMobileMenuOpen ? "max-h-[800px] pb-6" : "max-h-0"
            }`}
        >
          <nav className="flex flex-col gap-4 pt-4">
            <button
              onClick={handleHomeClick}
              className="font-body text-base tracking-wide uppercase text-foreground/80 hover:text-primary transition-colors duration-300 text-left"
            >
              Home
            </button>

            <Link
              to="/portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-body text-base tracking-wide uppercase text-foreground/80 hover:text-primary transition-colors duration-300 text-left"
            >
              Portfolio
            </Link>

            {/* Mobile Services Dropdown */}
            <div>
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="font-body text-base tracking-wide uppercase text-foreground/80 hover:text-primary transition-colors duration-300 flex items-center gap-2"
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${isMobileServicesOpen ? "max-h-[400px] mt-2" : "max-h-0"}`}>
                <div className="pl-4 flex flex-col gap-2 border-l border-border/50">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.label}
                      to={service.href}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsMobileServicesOpen(false);
                      }}
                      className="font-body text-sm text-foreground/70 hover:text-primary transition-colors duration-200"
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-body text-base tracking-wide uppercase text-foreground/80 hover:text-primary transition-colors duration-300 text-left"
            >
              About
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-body text-base tracking-wide uppercase text-foreground/80 hover:text-primary transition-colors duration-300 text-left"
            >
              Contact
            </Link>

            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="mt-4 w-fit">
                Book Your Date
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;