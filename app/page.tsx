import HeroSection from "@/components/HeroSection";
import ClinicMarquee from "@/components/ClinicMarquee";
import AboutSection from "@/components/AboutSection";
import ServicesHighlightStrip from "@/components/ServicesHighlightStrip";
import WhyChooseUs from "@/components/WhyChooseUs";
import AppointmentSection from "@/components/AppointmentSection";
import PainAreasSection from "@/components/PainAreasSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import TreatmentsSection from "@/components/TreatmentsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <ClinicMarquee />
      <AboutSection />
      <ServicesHighlightStrip />
      <WhyChooseUs />
      <AppointmentSection />
      <PainAreasSection />
      <TestimonialsSection />
      <TreatmentsSection />
      <Footer />
    </main>
  );
}
