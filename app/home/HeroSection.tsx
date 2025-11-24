import { Button } from "@/components/ui/Button";
import heroImage from "@/assets/hero-image.jpeg";
import { Search, BarChart } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage.src})` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-300/70 to-orange-200/20" />
            </div>

            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-10 animate-fade-in">
                    새로운 가족을 기다립니다
                </h1>
                <p className="text-xl md:text-2xl font-normal mb-20 mx-auto">
                    사랑이 필요한 유기동물에게 따스한 손길을 건네주세요
                </p>
                <div className="flex flex-row gap-4 justify-center items-center">
                    <Button size="lg" variant="outline"
                        className="text-lg bg-white hover:bg-[#eeeeee]/90 border-none text-[#5a4a3a] h-16 px-8"
                        href="/about">
                        <BarChart className="mr-2 h-6 w-6" />
                        유기동물 현황 보기
                    </Button>
                    <Button size="lg" variant="outline" 
                        className="text-lg bg-white hover:bg-[#eeeeee]/90 border-none text-[#5a4a3a] h-16 px-8"
                        href="/search">
                        <Search className="mr-2 h-6 w-6" />
                        입양 가능한 동물 찾기
                    </Button>
                </div>
            </div>
        </section>
    );
}