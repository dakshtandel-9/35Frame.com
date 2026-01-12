import ServicePageLayout from "@/components/ServicePageLayout";
import heroImage from "@/assets/wedding-hero.jpg";
import img1 from "@/assets/wedding-01.jpg";
import img2 from "@/assets/wedding-02.jpg";
import img3 from "@/assets/wedding-03.jpg";
import img4 from "@/assets/wedding-04.jpg";
import img5 from "@/assets/wedding-05.jpg";
import img6 from "@/assets/wedding-06.jpg";
import img7 from "@/assets/wedding-07.jpg";

const WeddingPhotography = () => {
  const coverageItems = [
    "Full Day Coverage",
    "Candid Photography",
    "Traditional Portraits",
    "Drone Shots",
    "Same Day Edits",
    "Premium Photo Album",
    "All HD Edited Photos",
    "Online Gallery Access",
    "Multiple Photographers",
  ];

  const galleryImages = [img1, img2, img3, img4, img5, img6, img7];

  return (
    <ServicePageLayout
      title="Luxury Candid Wedding Photography"
      subtitle="Capturing Every Precious Moment of Your Special Day"
      heroImage={heroImage}
      heroPosition="bottom"
      description="At 35 Frames, we believe every wedding tells a unique story. Our candid wedding photography captures the raw emotions, stolen glances, and joyful celebrations that make your day truly special. From the nervous excitement of getting ready to the heartfelt vows and exuberant dancing, we document every precious moment with artistic precision and emotional depth. Our team of experienced photographers blends seamlessly into your celebration, ensuring natural and authentic images that you'll treasure forever."
      coverageItems={coverageItems}
      galleryImages={galleryImages}
    />
  );
};

export default WeddingPhotography;
