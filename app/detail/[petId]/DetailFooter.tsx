import Link from "next/link"
import { Button } from "@/components/ui/Button";
import { BarChart3, ArrowRight, Search, MapPin, Heart, Shield, Users } from "lucide-react";

export default function DetailFooter() {
    return (
        <footer className="bg-background border text-gray-600 py-7">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-6">
                <p className="text-[17px]">
                © {new Date().getFullYear()} 발자국 리포트. All rights reserved.
                </p>

                <nav className="flex gap-4 text-[17px]">
                    <Link href="/privacy" className="hover:text-black transition-colors">
                        개인정보처리방침
                    </Link>
                    <Link href="/terms" className="hover:text-black transition-colors">
                        이용약관
                    </Link>
                    <Link href="/contact" className="hover:text-black transition-colors">
                        문의하기
                    </Link>
                </nav>
            </div>
        </footer>
    )
}