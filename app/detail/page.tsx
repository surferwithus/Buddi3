"use client"

import React from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PetCard from "@/components/ui/PetCard"
import SearchBar from "@/components/ui/SearchBar";
import Pagination from "@/components/ui/Pagination"
import { pets } from "@/mock-data/pets";

export default function Detail() {
    return (
        <div className="min-h-screen bg-[#f9f8F6] text-black text-center">
            <Header />
            <h1 className="font-black text-[50px] mt-15">
                유기동물 검색
            </h1>
            <h3 className="font-medium text-gray-500 text-[20px] mb-7 ">
                새로운 가족을 기다리는 아이들을 만나보세요
            </h3>
            <SearchBar placeholder="품종, 지역, 색상, 상태 등으로 검색해보세요."/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 mx-[100px]">
                {pets.map((pet) => (
                <PetCard
                    key={pet.id}
                    imageSrc={pet.imageSrc}
                    breed={pet.breed}
                    location={pet.location}
                    color={pet.color}
                    birthYear={pet.birthYear}
                    weight={pet.weight}
                    status={pet.status}
                    tags={pet.tags}
                />
                ))}
            </div>
            <Pagination />
            <Footer />
        </div>
    )
}
