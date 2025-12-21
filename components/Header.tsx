"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/buddi3-logo.png";

export default function Header() {
    return (
        <header className="flex justify-between border border-[#7c7069]/20 w-full items-start px-3 py-2 pb-3">
            <div className="flex items-center pl-2 pt-1 gap-2">
                <Link href="/">
                    <Image
                        src={Logo}
                        alt="로고"
                        width={100}
                        height={100}
                        priority
                    />
                </Link>
            </div>

            <nav className="flex items-end gap-8 mt-4 mr-10">
                <Link
                    href="/"
                    className="text-[#555] text-[19px] font-medium hover:text-orange transition-colors duration-200"
                >
                홈
                </Link>
                <Link
                    href="/dashboard"
                    className="text-[#555] text-[19px] font-medium hover:text-orange transition-colors duration-200"
                >   
                대시보드
                </Link>
                <Link
                    href="/search"
                    className="text-[#555] text-[19px] font-medium hover:text-orange transition-colors duration-200"
                >  
                검색
                </Link>
                <Link
                    href="/about"
                    className="text-[#555] text-[19px] font-medium hover:text-orange transition-colors duration-200"
                > 
                소개
                </Link>
                <Link
                    href="/guide"
                    className="text-[#555] text-[19px] font-medium hover:text-orange transition-colors duration-200"
                > 
                입양 안내
                </Link>
                <Link
                    href="/review"
                    className="text-[#555] text-[19px] font-medium hover:text-orange transition-colors duration-200"
                > 
                입양 후기
                </Link>
            </nav>
        </header>
    )
}