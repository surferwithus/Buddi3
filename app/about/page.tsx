"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MissionSection from "./MissionSection";
import TechStackSection from "./TechStackSection";
import APISection from "./APISection";
import ContactSection from "./ContactSection";

export default function About() {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-20 py-10">
                <div className="flex flex-col justify-center items-center pb-20">
                    <h1 className="text-[50px] font-black pb-5 text-orange">
                        프로젝트 소개
                    </h1>
                    <p className="text-brown text-center text-[21px]">
                        주제 선정 이유, 사용 기술을 작성하였습니다.
                    </p>
                </div>
                <MissionSection />
                <TechStackSection />
                <APISection />
                <ContactSection />
            </div>
            <Footer />
        </div>
    );
}