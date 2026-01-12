import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sutirtha Chakraborty",
    text: "The service offered by 35 Frames Photography was fantastic, with the professionals explaining each and every process in detail. The final output was worth every single rupee. They were also punctual in completing the order.",
    event: "Wedding Photography",
  },
  {
    id: 2,
    name: "Devtha Kumar",
    text: "Somu did a great job capturing our daughter's naming ceremony. He was very meticulous and took his time to make my entire family feel comfortable. Most certainly recommend his service.",
    event: "Naming Ceremony",
  },
  {
    id: 3,
    name: "Priya & Rahul",
    text: "The images were beyond stunning, and we were captivated by the artistry and attention to detail. They truly captured the essence of our special day.",
    event: "Wedding Photography",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 lg:py-32 bg-cinematic">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <p className="font-body text-sm tracking-luxury uppercase text-primary mb-4">
            Client Stories
          </p>
          <h2 className="text-section-title text-foreground mb-16">
            What They Say
          </h2>

          {/* Testimonial */}
          <div className="relative">
            <Quote className="w-16 h-16 text-primary/30 mx-auto mb-8" />
            
            <blockquote className="font-body text-xl lg:text-2xl text-foreground leading-relaxed italic mb-8">
              "{testimonials[currentIndex].text}"
            </blockquote>
            
            <div className="mb-12">
              <p className="font-display text-lg text-primary">
                {testimonials[currentIndex].name}
              </p>
              <p className="font-body text-sm text-muted-foreground tracking-wide uppercase">
                {testimonials[currentIndex].event}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index === currentIndex ? "bg-primary" : "bg-border"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
