"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/buddi3-logo.png";
import { ChevronDown } from "lucide-react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

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
                <Link href="/" className="text-[#555] text-[19px] font-medium hover:text-orange transition-colors">
                    홈
                </Link>
                <Link href="/dashboard" className="text-[#555] text-[19px] font-medium hover:text-orange transition-colors">
                    대시보드
                </Link>
                <Link href="/search" className="text-[#555] text-[19px] font-medium hover:text-orange transition-colors">
                    검색
                </Link>
                <Link href="/shelter" className="text-[#555] text-[19px] font-medium hover:text-orange transition-colors">
                    보호소
                </Link>
                <Link href="/about" className="text-[#555] text-[19px] font-medium hover:text-orange transition-colors">
                    소개
                </Link>

                <div
                    className="relative"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <span className="cursor-pointer flex items-center gap-1 text-[#555] text-[19px] font-medium hover:text-orange transition-colors">
                        입양
                        <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </span>

                    {isOpen && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-1
                                        flex flex-col
                                        bg-white border border-[#7c7069]/20
                                        rounded-md shadow-md min-w-[130px] z-50">
                            <Link
                                href="/guide"
                                className="px-4 py-2 text-[#555] hover:bg-orange/10 hover:text-orange transition"
                            >
                                입양 안내
                            </Link>
                            <Link
                                href="/review"
                                className="px-4 py-2 text-[#555] hover:bg-orange/10 hover:text-orange transition"
                            >
                                입양 후기
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
