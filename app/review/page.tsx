import { Heart, Star, Calendar, MapPin, Quote } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "./HeroSection";
import ReviewSection from "./ReviewSection";


export default function Review() {
    return (
        <div className="min-h-screen bg-[#f9f8F6] text-center">
            <Header />
            <HeroSection />
            <ReviewSection />
            <Footer />
        </div>
    )
}