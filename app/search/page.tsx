"use client"

import React, { useEffect, useState, useMemo } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PetCard from "@/components/ui/PetCard"
import PetCardSkeleton from "@/components/ui/PetCardSkeleton"
import SearchBar from "@/components/ui/SearchBar";
import Pagination from "@/components/ui/Pagination"
import Link from "next/link";

export default function Search() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        type: "all",
        gender: "all",
        region: "all"
    });
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 9;

    const REGIONS = [
        "서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산",
        "세종", "강원", "충남", "충북", "전남", "전북", "경남", "경북", "제주"
    ];

    useEffect(() => {
        const fetchPets = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/pets');
                const data = await res.json();

                const items = data.response.body.items.item.map((pet: any) => ({
                    id: pet.desertionNo,
                    imageSrc: pet.popfile1 || pet.popfile2 || pet.evntImg || '/placeholder-pet.jpg',
                    breed: pet.kindNm,
                    location: pet.careAddr.split(" ").slice(0, 3).join(" "),
                    color: pet.colorCd,
                    birthYear: pet.age,
                    weight: pet.weight,
                    status: pet.processState,
                    tags: [pet.sexCd, pet.neuterYn],
                    upKindCd: pet.upKindCd,
                    upKindNm: pet.upKindNm
                }));

                setPets(items);
            } catch (error) {
                console.error("Failed to fetch pets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    const regionMap: { [key: string]: string } = useMemo(() => ({
        "충남": "충청남도", "충북": "충청북도",
        "전남": "전라남도", "전북": "전라북도",
        "경남": "경상남도", "경북": "경상북도",
        "광주": "광주광역시", "대구": "대구광역시",
        "대전": "대전광역시", "부산": "부산광역시",
        "서울": "서울특별시", "인천": "인천광역시",
        "울산": "울산광역시", "제주": "제주"
    }), []);

    const filteredPets = useMemo(() => {
        if (!pets.length) return [];

        const term = searchTerm.toLowerCase();

        return pets.filter((pet: any) => {
            let typeMatch = true;
            const upKindNm = pet.upKindNm || "";
            if (filters.type === 'dog') typeMatch = upKindNm === "개" || upKindNm.includes("개");
            else if (filters.type === 'cat') typeMatch = upKindNm === "고양이" || upKindNm.includes("고양이");
            else if (filters.type === 'other') typeMatch = upKindNm !== "개" && !upKindNm.includes("개") && upKindNm !== "고양이" && !upKindNm.includes("고양이");

            let genderMatch = true;
            if (filters.gender !== 'all') {
                genderMatch = pet.tags.includes(filters.gender);
            }

            let regionMatch = true;
            if (filters.region !== 'all') {
                const searchStr = regionMap[filters.region] || filters.region;
                regionMatch = pet.location.includes(searchStr);
            }

            if (!typeMatch || !genderMatch || !regionMatch) return false;

            if (term) {
                const readableTags = pet.tags.map((tag: string) => {
                    if (tag === "M") return "수컷";
                    if (tag === "F") return "암컷";
                    if (tag === "Q") return "미상";
                    if (tag === "Y") return "중성화 완료";
                    if (tag === "N") return "중성화 미완";
                    return tag;
                });

                const matchesSearch = (
                    pet.breed.toLowerCase().includes(term) ||
                    pet.location.toLowerCase().includes(term) ||
                    pet.color.toLowerCase().includes(term) ||
                    pet.status.toLowerCase().includes(term) ||
                    readableTags.some((tag: string) => tag.toLowerCase().includes(term))
                );

                if (!matchesSearch) return false;
            }

            return true;
        });
    }, [pets, searchTerm, filters, regionMap]);

    const totalPages = useMemo(() =>
        Math.ceil(filteredPets.length / ITEMS_PER_PAGE),
        [filteredPets.length]
    );

    // 필터링 후 현재 페이지가 총 페이지 수를 초과하면 첫 페이지로 조정
    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    const currentPets = useMemo(() =>
        filteredPets.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        ),
        [filteredPets, currentPage]
    );

    return (
        <div className="min-h-screen bg-background text-black text-center">
            <Header />
            <h1 className="font-black text-[50px] pt-10">
                유기동물 검색
            </h1>
            <h3 className="text-brown text-[21px] mt-1 mb-5">
                새로운 가족을 기다리는 아이들을 지금 바로 만나보세요
            </h3>
            <SearchBar
                placeholder="품종, 지역, 색상, 상태 등으로 검색해보세요."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
                onSearch={() => { }}
            />

            {/* 필터링 */}
            <div className="bg-white rounded-2xl p-6 mx-[120px] mt-6 mb-8 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                    <div className="flex gap-2">
                        {[
                            { key: 'all', label: '전체' },
                            { key: 'dog', label: '강아지' },
                            { key: 'cat', label: '고양이' },
                            { key: 'other', label: '기타' }
                        ].map((type) => (
                            <button
                                key={type.key}
                                onClick={() => {
                                    setFilters(prev => ({ ...prev, type: type.key }));
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filters.type === type.key
                                    ? "bg-brown text-white shadow-md"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                    }`}
                            >
                                {type.label}
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-8 bg-gray-200 hidden md:block"></div>

                    <div className="flex gap-2">
                        {[
                            { key: 'all', label: '성별 전체' },
                            { key: 'M', label: '수컷' },
                            { key: 'F', label: '암컷' }
                        ].map((gender) => (
                            <button
                                key={gender.key}
                                onClick={() => {
                                    setFilters(prev => ({ ...prev, gender: gender.key }));
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filters.gender === gender.key
                                    ? "bg-brown text-white shadow-md"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                    }`}
                            >
                                {gender.label}
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-8 bg-gray-200 hidden md:block"></div>

                    <div className="flex gap-2">
                        {[
                            { key: 'Y', label: '중성화 완료' },
                            { key: 'N', label: '중성화 미완' }
                        ].map((gender) => (
                            <button
                                key={gender.key}
                                onClick={() => {
                                    setFilters(prev => ({ ...prev, gender: gender.key }));
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${filters.gender === gender.key
                                    ? "bg-brown text-white shadow-md"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                    }`}
                            >
                                {gender.label}
                            </button>
                        ))}
                    </div>

                    <div className="w-px h-8 bg-gray-200 hidden md:block"></div>

                    <div>
                        <select
                            value={filters.region}
                            onChange={(e) => {
                                setFilters(prev => ({ ...prev, region: e.target.value }));
                                setCurrentPage(1);
                            }}
                            className="px-4 py-2 rounded-full text-sm font-bold bg-gray-100 text-gray-500 border-none focus:ring-2 focus:ring-brown focus:bg-white transition-all cursor-pointer"
                        >
                            <option value="all">모든 지역</option>
                            {REGIONS.map(region => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9 mx-[120px]">
                    {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                        <PetCardSkeleton key={index} />
                    ))}
                </div>
            ) : filteredPets.length === 0 ? (
                <div className="mx-[120px] py-20">
                    <p className="text-gray-500 text-lg">
                        검색 결과가 없습니다. 다른 조건으로 검색해보세요.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-9 mx-[120px] mb-10">
                        {currentPets.map((pet: any) => (
                            <Link key={pet.id} href={`/detail/${pet.id}`}>
                                <PetCard {...pet} />
                            </Link>
                        ))}
                    </div>
                    {totalPages > 0 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            )}
            <Footer />
        </div>
    )
}
