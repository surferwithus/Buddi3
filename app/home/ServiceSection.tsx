import Link from "next/link";
import { ServiceCard, ServiceCardContent } from "@/components/ui/ServiceCard";
import { Button } from "@/components/ui/Button";
import { BarChart3, ArrowRight, Search, MapPin, Heart, Shield, Users } from "lucide-react";

export default function ServiceSection() {
    return (
        <section className="px-40 py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-[45px] font-bold mb-4 text-black">
                주요 서비스
              </h2>
              <p className="text-xl text-brown">
                데이터 기반의 투명한 정보 제공으로 유기동물 보호와 입양을 지원합니다
              </p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6 p-30 lg:px-[200px]">
                <ServiceCard className="col-span-3 border-2 hover:border-orange transition-all hover:shadow-xl">
                    <ServiceCardContent className="p-8">
                        <div className="w-16 h-16 bg-orange-light rounded-full flex items-center justify-center mb-6">
                            <BarChart3 className="h-8 w-8 text-orange" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-black">데이터 대시보드</h3>
                        <p className="text-brown mb-6">
                            유기동물 발생, 구조, 입양 현황을 실시간 차트와 그래프로 시각화하여 제공합니다
                        </p>
                        <Button asChild variant="outline" className="w-full hover:!bg-background">
                            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2">
                                대시보드 보기
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </ServiceCardContent>
                </ServiceCard>

                <ServiceCard className="col-span-3 border-2 hover:border-orange transition-all hover:shadow-xl">
                    <ServiceCardContent className="p-8">
                        <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mb-6">
                            <Search className="h-8 w-8 text-green" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-black">입양 동물 검색</h3>
                        <p className="text-brown mb-6">
                            품종, 지역, 색상 등 다양한 조건으로 입양 가능한 동물을 쉽게 찾아보실 수 있습니다
                        </p>
                        <Button variant="outline" className="w-full hover:!bg-background">
                            <Link href="/search" className="inline-flex items-center justify-center gap-2">
                                동물 찾아보기
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </ServiceCardContent>
                </ServiceCard>

                <ServiceCard className="col-span-2 border-2 hover:border-orange transition-all hover:shadow-xl">
                    <ServiceCardContent className="p-8">
                        <div className="w-16 h-16 bg-orange-light rounded-full flex items-center justify-center mb-6">
                            <MapPin className="h-8 w-8 text-orange" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-black">지역별 정보</h3>
                        <p className="text-brown mb-6">
                            내 주변 보호소 위치와 지역별 유기동물 현황을 한눈에 확인할 수 있습니다
                        </p>
                        <Button asChild variant="outline" className="w-full hover:!bg-background">
                            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2">
                                지역 정보 보기
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </ServiceCardContent>
                </ServiceCard>

                <ServiceCard className="col-span-2 border-2 hover:border-orange transition-all hover:shadow-xl">
                    <ServiceCardContent className="p-8">
                        <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mb-6">
                            <Heart className="h-8 w-8 text-green" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-black">입양 안내</h3>
                        <p className="text-brown mb-6">
                            입양 절차, 준비사항, 주의사항 등 입양에 필요한 모든 정보를 제공합니다
                        </p>
                        <Button asChild variant="outline" className="w-full hover:!bg-background">
                            <Link href="/guide" className="inline-flex items-center justify-center gap-2">
                                후기 보기
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </ServiceCardContent>
                </ServiceCard>

                <ServiceCard className="col-span-2 border-2 hover:border-orange transition-all hover:shadow-xl">
                    <ServiceCardContent className="p-8">
                        <div className="w-16 h-16 bg-orange-light rounded-full flex items-center justify-center mb-6">
                            <Users className="h-8 w-8 text-orange" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-black">입양 후기</h3>
                        <p className="text-brown mb-6">
                            성공적인 입양 사례와 후기를 통해 입양에 대한 확신을 가질 수 있습니다
                        </p>
                        <Button asChild variant="outline" className="w-full hover:!bg-background">
                            <Link href="/review" className="inline-flex items-center justify-center gap-2">
                                후기 보기
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </ServiceCardContent>
                </ServiceCard>
            </div>
          </div>
      </section>
    );
}