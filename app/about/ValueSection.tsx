import { ValueCard, ValueCardDescription } from "@/components/ui/ValueCard";
import { Heart, Shield, Users, HouseHeart, House } from "lucide-react";

export default function ValueSection() {
    return (
        <section className="m-20">
            <h3 className="text-center text-3xl text-black font-bold mb-5">
                우리의 가치
            </h3>
            <div className="flex grid grid-cols-2 gap-5">
                <ValueCard className="border-1 hover:shadow-xl p-5">
                    <ValueCardDescription className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-orange-light rounded-2xl flex items-center justify-center mb-12">
                            <Heart className="h-6 w-6 text-orange" />
                        </div>
                        <div className="p-2">
                            <h4 className="text-[20px] text-black font-bold pb-3">
                                사랑과 책임
                            </h4>
                            <p className="text-[16px]">
                                모든 생명은 사랑 받을 권리가 있습니다. <br/>
                                우리는 유기동물에게 따스한 가족을 만날 기회를 제공합니다.
                            </p>
                        </div>
                    </ValueCardDescription>
                </ValueCard>

                <ValueCard className="border-1 hover:shadow-xl p-5">
                    <ValueCardDescription className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-orange-light rounded-2xl flex items-center justify-center mb-12">
                            <Shield className="h-6 w-6 text-orange" />
                        </div>
                        <div className="p-2 pb-0">
                            <h4 className="text-[20px] text-black font-bold pb-3">
                                안전한 보호
                            </h4>
                            <p className="text-[16px]">
                                전문적인 보호 시설과 수의학적 케어를 통해 <br/>
                                동물들의 건강과 안전을 책임집니다.
                            </p>
                        </div>
                    </ValueCardDescription>
                </ValueCard>

                <ValueCard className="border-1 hover:shadow-xl p-5">
                    <ValueCardDescription className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-orange-light rounded-2xl flex items-center justify-center mb-12">
                            <Users className="h-6 w-6 text-orange" />
                        </div>
                        <div className="p-2 pb-0">
                            <h4 className="text-[20px] text-black font-bold pb-3">
                                함께하는 커뮤니티
                            </h4>
                            <p className="text-[16px]">
                                자원봉사자, 후원자, 입양 가족들과 함께 <br/>
                                더 나은 세상을 만들어갑니다.
                            </p>
                        </div>
                    </ValueCardDescription>
                </ValueCard>

                <ValueCard className="border-1 hover:shadow-xl p-5">
                    <ValueCardDescription className="flex items-center gap-2">
                        <div className="w-12 h-12 bg-orange-light rounded-2xl flex items-center justify-center mb-12">
                            <HouseHeart className="h-6 w-6 text-orange" />
                        </div>
                        <div className="p-2 pb-0">
                            <h4 className="text-[20px] text-black font-bold pb-3">
                                영원한 가족
                            </h4>
                            <p className="text-[16px]">
                                적합한 가족을 찾아 평생 함께 할 수 있도록 <br/>
                                신중한 입양 절차를 진행합니다.
                            </p>
                        </div>
                    </ValueCardDescription>
                </ValueCard>
            </div>
        </section>
    );
}