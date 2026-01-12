import ServicePageLayout from "@/components/ServicePageLayout";
import heroImage from "@/assets/films-hero.jpg";
import img1 from "@/assets/films-01.jpg";
import img2 from "@/assets/films-02.jpg";
import img3 from "@/assets/films-03.jpg";
import img4 from "@/assets/films-04.jpg";
import img5 from "@/assets/films-05.jpg";
import img6 from "@/assets/films-06.jpg";

const WeddingFilms = () => {
  const coverageItems = [
    "Cinematic Storytelling",
    "4K Ultra HD Quality",
    "Aerial Drone Footage",
    "Professional Audio",
    "Highlight Reel",
    "Full Ceremony Film",
    "Same Day Edit Option",
    "Background Music Licensed",
    "Digital Delivery",
  ];

  const galleryImages = [img1, img2, img3, img4, img5, img6];

  return (
    <ServicePageLayout
      title="Cinematic Wedding Films"
      subtitle="Your Love Story Told Through Motion Pictures"
      heroImage={heroImage}
      heroPosition="bottom"
      description="A photograph captures a moment, but a film captures the emotion, the laughter, the tears, and the music of your wedding day. Our cinematic wedding films are crafted with the artistry of a feature film, combining stunning visuals, professional audio, and thoughtful editing to create a timeless keepsake. From heartfelt vows to joyous celebrations, we weave together the moments that matter most into a beautiful narrative that you'll want to watch again and again."
      coverageItems={coverageItems}
      galleryImages={galleryImages}
    />
  );
};

export default WeddingFilms;
