import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import AppointmentSection from "@/components/AppointmentSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <AboutSection />
      <WhyChooseUs />
      <AppointmentSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
