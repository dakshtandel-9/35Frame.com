import ServicePageLayout from "@/components/ServicePageLayout";
import heroImage from "@/assets/prewedding-hero.jpg";
import img1 from "@/assets/prewedding-01.jpg";
import img2 from "@/assets/prewedding-02.jpg";
import img3 from "@/assets/prewedding-03.jpg";
import img4 from "@/assets/prewedding-04.jpg";
import img5 from "@/assets/prewedding-05.jpg";
import img6 from "@/assets/prewedding-06.jpg";

const PreWeddingPhotography = () => {
  const coverageItems = [
    "Location Scouting",
    "Outfit Consultation",
    "Multiple Locations",
    "Drone Photography",
    "Cinematic Shots",
    "Romantic Portraits",
    "All HD Edited Photos",
    "Online Gallery Access",
    "Printed Photo Book",
  ];

  const galleryImages = [img1, img2, img3, img4, img5, img6];

  return (
    <ServicePageLayout
      title="Luxury Pre-Wedding Shoot"
      subtitle="Celebrate Your Love Story Before the Big Day"
      heroImage={heroImage}
      heroPosition="top"
      description="Your pre-wedding shoot is a celebration of your journey together. Whether you dream of a romantic beach sunset, a picturesque mountain backdrop, or an urban adventure, we create stunning imagery that captures the essence of your relationship. Our pre-wedding sessions are relaxed, fun, and designed to bring out the genuine connection between you and your partner. These photos become cherished memories and beautiful additions to your wedding invitations, save-the-dates, and home décor."
      coverageItems={coverageItems}
      galleryImages={galleryImages}
    />
  );
};

export default PreWeddingPhotography;
