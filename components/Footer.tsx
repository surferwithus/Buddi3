"use client";

import Link from "next/link"
import { Button } from "@/components/ui/Button";
import { BarChart3, ArrowRight, Search, MapPin, Heart, Shield, Users } from "lucide-react";

export default function Footer() {
    return (
        // <footer className="bg-gray-100 text-gray-600 py-6 mt-10">
        //     <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-6">
        //         <p className="text-sm">
        //         © {new Date().getFullYear()} 발자국 리포트. All rights reserved.
        //         </p>

        //         <nav className="flex gap-4">
        //         <Link href="/privacy" className="hover:text-black transition-colors">
        //             개인정보처리방침
        //         </Link>
        //         <Link href="/terms" className="hover:text-black transition-colors">
        //             이용약관
        //         </Link>
        //         <Link href="/contact" className="hover:text-black transition-colors">
        //             문의하기
        //         </Link>
        //         </nav>
        //     </div>
        // </footer>
        <section className="py-24 bg-gradient-to-r from-orange to-green">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-5xl font-bold mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-2xl mb-12 max-w-2xl mx-auto font-light">
            당신의 선택이 한 생명을 구하고, 새로운 가족을 만듭니다
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-xl px-8 py-6 h-auto">
              <Link href="/search" className="inline-flex items-center justify-center gap-2">
                <Search className="mr-2 h-6 w-6" />
                입양 가능한 동물 보기
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-xl px-8 py-6 h-auto bg-background/20 hover:bg-background/30 border-background text-background">
              <Link href="/dashboard" className="inline-flex items-center justify-center gap-2">
                <BarChart3 className="mr-2 h-6 w-6" />
                현황 대시보드
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-xl px-8 py-6 h-auto bg-background/20 hover:bg-background/30 border-background text-background">
              <Link href="/about" className="inline-flex items-center justify-center gap-2">
                입양 절차 알아보기
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    )
}