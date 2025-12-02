"use client";

import Image from "next/image";
import { MapPin, Palette, Calendar, Scale } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface PetCardProps {
    imageSrc: string;
    breed: string;
    location: string;
    color: string;
    birthYear: string;
    weight: number;
    tags?: string[];
    status?: string;
    className?: string;
}

export default function PetCard({
    imageSrc,
    breed,
    location,
    color,
    birthYear,
    weight,
    tags = [],
    status,
    className,
}: PetCardProps) {
    const readableTags = tags.map((tag) => {
        if (tag === "M") return "수컷";
        if (tag === "F") return "암컷";
        if (tag === "Q") return "미상";
        if (tag === "Y") return "중성화 완료";
        if (tag === "N") return "중성화 미완";
        return tag;
      });

    return (
        <div className=
            {cn("bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow", className)}>
            
            {/* image */}
            <div className="w-full h-64 relative">
                <Image 
                    src={imageSrc}
                    alt={breed}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                />
            </div>

            {/* name & status */}
            <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-bold text-gray-900">{breed}</h2>
                    <span className="text-xs bg-orange-300 text-white rounded-full px-2 py-1">
                        {status}
                    </span>
                </div>
            </div>

            {/* description */}
            <div className="p-4 pt-0">
                <ul className="space-y-1 text-sm text-gray-600 mb-3">
                    <li className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#a88e62]" />
                        {location}
                    </li>
                    <li className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-[#a88e62]" />
                        {color}
                    </li>
                    <li className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#a88e62]" />
                        {birthYear}
                    </li>
                    <li className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-[#a88e62]" />
                        {weight}
                    </li>
                </ul>

                {/* tag */}
                <div className="flex flex-wrap gap-2">
                    {readableTags.map((tag) => (
                        <span
                        key={tag}
                        className="text-xs border border-gray-300 rounded-full px-3 py-1 text-gray-700"
                        >
                        {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}