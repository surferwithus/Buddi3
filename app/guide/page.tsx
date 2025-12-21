import GuideFooter from "./GuideFooter";
import Header from "@/components/Header";
import HeroSection from "./HeroSection";
import AdoptionProcess from "./AdoptionProcess";
import Checklist from "./Checklist";
import FaqSection from "./FaqSection";

export default function Guide() {
    return (
        <div className="min-h-screen bg-[#f9f8F6] text-black">
            <Header />
            <HeroSection />
            <AdoptionProcess />
            <Checklist />
            <FaqSection />
            <GuideFooter />
        </div> 
    )
}