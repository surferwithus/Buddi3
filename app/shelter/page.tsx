"use client"

import React, { useEffect, useState, useMemo } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ShelterCard from "@/components/ui/ShelterCard";
import ShelterCardSkeleton from "@/components/ui/ShelterCardSkeleton";
import SearchBar from "@/components/ui/SearchBar";
import Pagination from "@/components/ui/Pagination";
import ShelterMap from "@/components/ui/ShelterMap";
import { getApproximateCoordinates } from "@/lib/geocoding";

interface ShelterItem {
    careRegNo: string;
    careNm: string;
    address?: string;
    tel?: string;
}

interface ShelterWithRegion extends ShelterItem {
    region: string;
}

interface ShelterLocation extends ShelterWithRegion {
    lat: number;
    lng: number;
}

export default function Shelter() {
    const [shelters, setShelters] = useState<ShelterWithRegion[]>([]);
    const [sheltersWithCoords, setSheltersWithCoords] = useState<ShelterLocation[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const ITEMS_PER_PAGE = 12;
    const GOOGLE_MAPS_API_KEY = "AIzaSyCzOWDWv7krzRQWBXURzWVjGA08yg6zjhA";

    const REGION_CODES: { [key: string]: string } = {
        "서울": "6110000",
        "부산": "6260000",
        "대구": "6270000",
        "인천": "6280000",
        "광주": "6290000",
        "대전": "6300000",
        "울산": "6310000",
        "세종": "5690000",
        "경기": "6410000",
        "강원": "6420000",
        "충북": "6430000",
        "충남": "6440000",
        "전북": "6450000",
        "전남": "6460000",
        "경북": "6470000",
        "경남": "6480000",
        "제주": "6500000"
    };

    const REGIONS = Object.keys(REGION_CODES);

    useEffect(() => {
        const fetchAllShelters = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/shelters');
                const data = await res.json();

                if (data.shelters) {
                    setShelters(data.shelters);

                    const sheltersWithLocation: ShelterLocation[] = data.shelters.map((shelter: ShelterWithRegion) => {
                        const coords = getApproximateCoordinates(shelter.address || '', shelter.region);
                        return {
                            ...shelter,
                            lat: coords.lat,
                            lng: coords.lng
                        };
                    });

                    setSheltersWithCoords(sheltersWithLocation);
                }
            } catch (error) {
                console.error("Failed to fetch shelters:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllShelters();
    }, []);

    const filteredShelters = useMemo(() => {
        if (!shelters.length) return [];

        const term = searchTerm.toLowerCase();

        return shelters.filter((shelter) => {
            const regionMatch = selectedRegion === "all" || shelter.region === selectedRegion;

            const searchMatch = !term || shelter.careNm.toLowerCase().includes(term);

            return regionMatch && searchMatch;
        });
    }, [shelters, searchTerm, selectedRegion]);

    const filteredSheltersWithCoords = useMemo(() => {
        if (!sheltersWithCoords.length) return [];

        const term = searchTerm.toLowerCase();

        return sheltersWithCoords.filter((shelter) => {
            const regionMatch = selectedRegion === "all" || shelter.region === selectedRegion;

            const searchMatch = !term || shelter.careNm.toLowerCase().includes(term);

            return regionMatch && searchMatch;
        });
    }, [sheltersWithCoords, searchTerm, selectedRegion]);

    const totalPages = useMemo(() =>
        Math.ceil(filteredShelters.length / ITEMS_PER_PAGE),
        [filteredShelters.length]
    );

    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    const currentShelters = useMemo(() =>
        filteredShelters.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            currentPage * ITEMS_PER_PAGE
        ),
        [filteredShelters, currentPage]
    );

    return (
        <div className="min-h-screen bg-background text-black text-center">
            <Header />
            <h1 className="font-black text-[50px] pt-10">
                보호소 찾기
            </h1>
            <h3 className="text-brown text-[21px] mt-1 mb-5">
                전국의 유기동물 보호소를 검색하고 찾아보세요
            </h3>
            <SearchBar
                placeholder="보호소 이름으로 검색해보세요"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
                onSearch={() => { }}
            />

            <div className="bg-white rounded-2xl p-6 mx-[120px] mt-6 mb-8 shadow-sm border border-gray-100">
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-700">지역:</span>
                            <select
                                value={selectedRegion}
                                onChange={(e) => {
                                    setSelectedRegion(e.target.value);
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

                        <div className="w-px h-8 bg-gray-200 hidden md:block"></div>

                        <div className="text-sm text-gray-600">
                            총 <span className="font-bold text-brown">{filteredShelters.length}</span>개의 보호소
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-full">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'list'
                                ? 'bg-brown text-white shadow-md'
                                : 'text-gray-600 hover:text-brown'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                                목록
                            </div>
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'map'
                                ? 'bg-brown text-white shadow-md'
                                : 'text-gray-600 hover:text-brown'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                지도
                            </div>
                        </button>
                    </div>
                </div>
            </div>


            {loading ? (
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 mx-[120px]">
                    {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                        <ShelterCardSkeleton key={index} />
                    ))}
                </div>
            ) : filteredShelters.length === 0 ? (
                <div className="mx-[120px] py-20">
                    <p className="text-gray-500 text-lg">
                        검색 결과가 없습니다. 다른 조건으로 검색해보세요.
                    </p>
                </div>
            ) : viewMode === 'map' ? (
                <div className="mx-[120px] mb-10">
                    <ShelterMap
                        shelters={filteredSheltersWithCoords}
                        apiKey={GOOGLE_MAPS_API_KEY}
                    />
                </div>
            ) : (
                <>
                    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 mx-[120px] mb-10">
                        {currentShelters.map((shelter) => (
                            <ShelterCard
                                key={shelter.careRegNo}
                                careRegNo={shelter.careRegNo}
                                careNm={shelter.careNm}
                                region={shelter.region}
                                address={shelter.address}
                                tel={shelter.tel}
                            />
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
    );
}