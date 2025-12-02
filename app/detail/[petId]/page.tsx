"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DetailFooter from "./DetailFooter";
import DetailPetCard, { PetDetail } from "./DetailPetCard";

export default function DetailPage({ params }: { params: Promise<{ petId: string }> }) {
    const { petId } = React.use(params);
    const [pet, setPet] = useState<PetDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPetDetail = async () => {
            try {
                const res = await fetch(`/api/pets/${petId}`);
                if (!res.ok) {
                    throw new Error("동물 정보를 불러오는데 실패했습니다.");
                }
                const data = await res.json();
                setPet(data);
            } catch (err: any) {
                setError(err.message ?? "알 수 없는 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchPetDetail();
    }, [petId]);

    return (
        <div className="min-h-screen bg-[#f9f8F6] flex flex-col">
            <Header />

            <main className="flex-1 flex items-center justify-center px-4 py-10">
                {loading && (
                    <p className="text-xl text-gray-500">
                        정보를 불러오는 중입니다...
                    </p>
                )}

                {!loading && (error || !pet) && (
                    <p className="text-xl text-red-500">
                        {error || "동물을 찾을 수 없습니다."}
                    </p>
                )}

                {!loading && !error && pet && (
                    <DetailPetCard pet={pet} />
                )}
            </main>

            <DetailFooter />
        </div>
    );
}
