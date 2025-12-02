"use client"

import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PetCard from "@/components/ui/PetCard"
import SearchBar from "@/components/ui/SearchBar";
import Pagination from "@/components/ui/Pagination"
import Link from "next/link";

export default function Search() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const fetchPets = async () => {
            const res = await fetch('/api/pets');
            const data = await res.json();

            const items = data.response.body.items.item.map((pet: any) => ({
                id: pet.desertionNo,
                imageSrc: pet.popfile1 ?? pet.popfile2 ?? pet.evntImg ?? null,
                breed: pet.kindNm,
                location: pet.careAddr.split(" ").slice(0, 3).join(" "),
                color: pet.colorCd,
                birthYear: pet.age,
                weight: pet.weight,
                status: pet.processState,
                tags: [pet.sexCd, pet.neuterYn]
            }));

            setPets(items);
        };

        fetchPets();
    }, []);

    return (
        <div className="min-h-screen bg-[#f9f8F6] text-black text-center">
            <Header />
            <h1 className="font-black text-[50px] pt-10">
                유기동물 검색
            </h1>
            <h3 className="text-brown text-[21px] mt-1 mb-5">
                새로운 가족을 기다리는 아이들을 지금 바로 만나보세요
            </h3>
            <SearchBar placeholder="품종, 지역, 색상, 상태 등으로 검색해보세요." />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mx-[100px]">
                {pets.map((pet: any) => (
                    <Link key={pet.id} href={`/detail/${pet.id}`}>
                        <PetCard {...pet} />
                    </Link>
                ))}
            </div>
            <Pagination />
            <Footer />
        </div>
    )
}
