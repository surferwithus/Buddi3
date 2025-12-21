import { Button } from "@/components/ui/Button";
import heroImage from "@/assets/hero-image1.jpg";
import { Search, BarChart3 } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage.src})` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-orange/60 to-green/20" />
            </div>

            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-5xl md:text-7xl font-black mb-10 animate-fade-in">
                    새로운 가족을 기다립니다
                </h1>
                <p className="text-xl md:text-2xl font-normal mb-20 mx-auto">
                    사랑이 필요한 유기동물에게 따스한 손길을 건네주세요
                </p>
                <div className="flex flex-row gap-4 justify-center items-center">
                    <Button href="/dashboard" size="md" variant="outline" className="text-xl px-8 py-6 h-auto bg-background/20 hover:bg-background/30 border-background text-background">
                        <BarChart3 className="mr-2 h-10 w-10" />
                        유기동물 현황 보기
                    </Button>
                    <Button href="/search" size="md" variant="outline" className="text-xl px-8 py-6 h-auto bg-background/20 hover:bg-background/30 border-background text-background">
                        <Search className="mr-2 h-10 w-10" />
                        입양 가능한 동물 찾기
                    </Button>
                </div>
            </div>
        </section>
    );
}