"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MissionSection from "./MissionSection";
import { ValueCard } from "@/components/ui/ValueCard";
import ValueSection from "./ValueSection";
import HowToSection from "./HowToSection";
import ContactSection from "./ContactSection";

export default function About() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-20 py-10">
                <div className="flex flex-col justify-center items-center pb-20">
                    <h1 className="text-[50px] font-bold pb-5 text-orange">
                        Buddi3는
                    </h1>
                    <p className="text-brown text-center text-[21px]">
                        버려지고 유기된 동물들에게 새로운 삶의 기회를 제공하고, <br />
                        책임감 있는 입양 문화를 만들어 가는 것을 목표로 합니다.
                    </p>
                </div>
                <MissionSection />
                <ValueSection />
                <HowToSection />
                <ContactSection />
            </div>
        </div>
    );
}