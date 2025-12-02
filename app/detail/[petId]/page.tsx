"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Calendar, Scale, Info, Phone, Home } from "lucide-react";
import DetailFooter from "./DetailFooter";
import BackButton from "@/components/ui/BackButton";

interface PetDetail {
    id: string;
    imageSrc: string;
    breed: string;
    location: string;
    color: string;
    birthYear: string;
    weight: string;
    status: string;
    sex: string;
    neuter: string;
    description: string;
    shelterName: string;
    shelterTel: string;
    shelterAddr: string;
    noticeNo: string;
    happenDt: string;
    happenPlace: string;
}

export default function Detail({ params }: { params: Promise<{ petId: string }> }) {
    const [pet, setPet] = useState<PetDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { petId } = React.use(params);

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
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPetDetail();
    }, [petId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f9f8F6] flex flex-col">
                <Header />
                <div className="flex-1 flex justify-center items-center">
                    <p className="text-xl text-gray-500">정보를 불러오는 중입니다...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !pet) {
        return (
            <div className="min-h-screen bg-[#f9f8F6] flex flex-col">
                <Header />
                <div className="flex-1 flex justify-center items-center">
                    <p className="text-xl text-red-500">{error || "동물을 찾을 수 없습니다."}</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f9f8F6] flex flex-col">
            <Header />
            <main className="container mx-auto px-4 py-10 max-w-7xl flex flex-1 items-center">
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                        {/* Left: Image */}
                        <div className="relative h-[300px] lg:h-auto bg-gray-100">
                            {pet.imageSrc ? (
                                <Image
                                    src={pet.imageSrc}
                                    alt={pet.breed}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    이미지 없음
                                </div>
                            )}
                            <div className="absolute top-5 left-5">
                                <span className="px-5 py-2 bg-white/90 backdrop-blur-sm rounded-full text-[16px] font-semibold text-brown shadow-sm">
                                    {pet.status}
                                </span>
                            </div>
                        </div>

                        {/* Right: Info */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <div className="mb-6">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-3xl font-black text-gray-900 mb-2">{pet.breed}</h1>
                                    <BackButton />
                                </div>
                                <p className="text-gray-500 flex items-center gap-2">
                                    <span className="inline-block w-2 h-2 rounded-full bg-gray-300"></span>
                                    공고번호: {pet.noticeNo}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="space-y-1 pb-3">
                                    <p className="text-sm text-brown inline-block border-b border-[#CFC6B8] px-1">성별 / 중성화</p>
                                    <p className="font-medium text-gray-900 pt-0.5">{pet.sex} / {pet.neuter}</p>
                                </div>
                                <div className="space-y-1 pb-3">
                                    <p className="text-sm text-brown inline-block border-b border-[#CFC6B8] px-1">나이 / 체중</p>
                                    <p className="font-medium text-gray-900 pt-0.5">{pet.birthYear} / {pet.weight}</p>
                                </div>
                                <div className="space-y-1 pb-3">
                                    <p className="text-sm text-brown inline-block border-b border-[#CFC6B8] px-1">색상</p>
                                    <p className="font-medium text-gray-900 pt-0.5">{pet.color}</p>
                                </div>
                                <div className="space-y-1 pb-3">
                                    <p className="text-sm text-brown inline-block border-b border-[#CFC6B8] px-1">접수일</p>
                                    <p className="font-medium text-gray-900 pt-0.5">{pet.happenDt}</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3 p-4 bg-[#f9f8F6] rounded-xl">
                                    <Info className="w-5 h-5 text-brown mt-0.5 shrink-0" />
                                    <div>
                                        <p className="font-bold text-gray-900 mb-1">특이사항</p>
                                        <p className="text-gray-600 leading-relaxed">{pet.description}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-[#f9f8F6] rounded-xl">
                                    <MapPin className="w-5 h-5 text-brown mt-0.5 shrink-0" />
                                    <div>
                                        <p className="font-bold text-gray-900 mb-1">발견 장소</p>
                                        <p className="text-gray-600">{pet.happenPlace}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Home className="w-5 h-5 text-brown" />
                                    보호소 정보
                                </h3>
                                <div className="space-y-2 text-gray-600 mb-6">
                                    <p><span className="font-medium text-gray-900 mr-2">이름:</span> {pet.shelterName}</p>
                                    <p><span className="font-medium text-gray-900 mr-2">주소:</span> {pet.shelterAddr}</p>
                                </div>
                                <a
                                    href={`tel:${pet.shelterTel}`}
                                    className="flex items-center justify-center gap-2 w-full bg-orange-400 text-white py-4 rounded-xl font-bold hover:bg-orange transition-colors"
                                >
                                    <Phone className="w-5 h-5" />
                                    {pet.shelterTel}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <DetailFooter />
        </div>
    );
}