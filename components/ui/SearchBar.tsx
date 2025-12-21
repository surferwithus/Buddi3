"use client";

import { Search } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/Button"

interface SearchBarProps {
    placeholder: string;
}

export default function SearchBar({ placeholder, value, onChange, onSearch }: {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearch?: () => void;
}) {
    return (
        <div className="relative flex flex-1 justify-center items-center w-full pt-4">
            <input className="w-full max-w-xl h-[45px] rounded-md outline-none border border-[#e0d6c5] py-[9px] pl-4 mr-3 mb-5 text-md outline-2 placeholder:text-brown/50"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && onSearch) {
                        onSearch();
                    }
                }}
            >
            </input>
            <Button variant="search" onClick={onSearch} className="mb-5">
                <Search className="w-5 h-5 mr-2 text-white" />
                검색
            </Button>
        </div>
    )
}