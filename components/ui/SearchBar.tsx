"use client";

import { Search } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/Button"

interface SearchBarProps {
    placeholder: string;
}

export default function SearchBar({ placeholder }: SearchBarProps) {
    const [term, setTerm] = React.useState("");

    function handleSearchClick() {
        console.log("검색: ", term);
    }

    return (
        <div className="relative flex flex-1 justify-center items-center w-full py-4">
            <input className="w-full max-w-xl rounded-md outline-none border border-[#e0d6c5] py-[9px] pl-4 mr-3 mb-5 text-sm outline-2 placeholder:text-[#7c7069]"
                placeholder={placeholder}
                value={term}
                onChange={(e) => {
                    setTerm(e.target.value);
                }}
            >
            </input>
            <Button variant="primary" onClick={handleSearchClick} className="mb-5">
                <Search className="w-4 h-4 mr-2 text-white" />
                검색
            </Button>
        </div>
    )
}