import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturedEvents from "@/components/FeaturedEvents";
import EventFeatures from "@/components/EventFeatures";
import TestimonialSection from "@/components/TestimonialSection";
import Faq from "@/components/Faq";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";


export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturedEvents/>
        <EventFeatures/>
        <TestimonialSection/>
        <Faq/>
        <ContactForm/>
        <Footer/>
        {/* The rest of the homepage will go here */}
      </main>
    </div>
  );
}
