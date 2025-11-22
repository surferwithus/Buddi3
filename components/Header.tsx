"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Header() {
    return (
        <header className="flex justify-between border border-[#7c7069]/20 w-full items-start px-3 py-2 pb-3">
            <div className="flex items-center gap-2">
                <Image
                    src="/logo.png"
                    alt="로고"
                    width={40}
                    height={40}
                />
                <h1 className="text-[22px] font-bold mt-2 ml-2 text-black">
                    발자국 리포트
                </h1>
            </div>

            <nav className="flex items-end gap-5 mt-4 mr-4">
                <Link
                    href="/"
                    className="text-[#555] text-[18px] font-medium hover:text-orange-500 transition-colors duration-200"
                >
                홈
                </Link>
                <Link
                    href="/dashboard"
                    className="text-[#555] text-[18px] font-medium hover:text-orange-500 transition-colors duration-200"
                >   
                대시보드
                </Link>
                <Link
                    href="/detail"
                    className="text-[#555] text-[18px] font-medium hover:text-orange-500 transition-colors duration-200"
                >  
                검색
                </Link>
                <Link
                    href="/about"
                    className="text-[#555] text-[18px] font-medium hover:text-orange-500 transition-colors duration-200"
                > 
                소개
                </Link>
            </nav>
        </header>
    )
}