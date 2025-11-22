"use client"

import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-600 py-6 mt-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-6">
                <p className="text-sm">
                © {new Date().getFullYear()} 발자국 리포트. All rights reserved.
                </p>

                <nav className="flex gap-4">
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