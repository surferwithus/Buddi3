"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import PetCard from "@/components/ui/PetCard";

export default function RecentPetSection() {
  const [recentPets, setRecentPets] = useState([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
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

        setRecentPets(items.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch pets:", error);
      }
    };

    fetchPets();
  }, []);

  return (
    <section className="px-40 py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[45px] font-bold mb-4 text-black">
            최근 등록된 보호 동물
          </h2>
          <p className="text-xl text-brown">
            새롭게 보호소에 등록된 동물들을 확인하세요
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {recentPets.map((pet: any) => (
            <Link key={pet.id} href={`/detail/${pet.id}`}>
              <PetCard {...pet} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}