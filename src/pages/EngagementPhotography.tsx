import ServicePageLayout from "@/components/ServicePageLayout";
import heroImage from "@/assets/service-engagement.jpg";
import img1 from "@/assets/0051.jpg";
import img2 from "@/assets/0052.jpg";
import img3 from "@/assets/0053.jpg";
import img4 from "@/assets/0054.jpg";
import img5 from "@/assets/0055.jpg";
import img6 from "@/assets/0056.jpg";

const EngagementPhotography = () => {
  const coverageItems = [
    "Haldi Ceremony Coverage",
    "Mehendi Photography",
    "Sangeet Night Coverage",
    "Engagement Portraits",
    "Family Group Photos",
    "Candid Moments",
    "All HD Edited Photos",
    "Online Gallery Access",
    "Quick Turnaround",
  ];

  const galleryImages = [img1, img2, img3, img4, img5, img6];

  return (
    <ServicePageLayout
      title="Premium Engagement, Haldi & Mehendi Photography"
      subtitle="Capturing the Colors and Joy of Your Pre-Wedding Celebrations"
      heroImage={heroImage}
      heroPosition="bottom"
      description="The celebrations leading up to your wedding are filled with color, tradition, and unbridled joy. From the vibrant yellows of Haldi to the intricate beauty of Mehendi designs, and the energetic performances of Sangeet night, these ceremonies are precious moments that deserve to be captured beautifully. Our photographers specialize in capturing the essence of these celebrations, preserving the laughter, the dance moves, and the emotional moments that make these events unforgettable."
      coverageItems={coverageItems}
      galleryImages={galleryImages}
    />
  );
};

export default EngagementPhotography;
