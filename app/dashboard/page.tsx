"use client";

import { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { getAnimalKindName, getAnimalType } from "@/lib/utils/animalCodeMapper";
import Header from "@/components/Header";

const COLORS = {
    primary: "var(--chart-primary)",
    accent: "var(--chart-accent)",
    secondary: "var(--chart-secondary)",
    muted: "var(--chart-muted)",
};

const PIE_COLORS = [
    "var(--pie-color-1)",
    "var(--pie-color-2)",
];

const PIE_COLORS_ALT = [
    "var(--pie-alt-color-1)",
    "var(--pie-alt-color-2)",
];

interface DashboardStats {
    total: number;
    protected: number;
    adopted: number;
    ended: number;
    protectionStatus: { [key: string]: number };
    animalTypes: { [key: string]: number };
    neutered: number;
    notNeutered: number;
    male: number;
    female: number;
    dogCount: number;
    catCount: number;
    youngCount: number;
    adultCount: number;
    seniorCount: number;
    locationDistribution: { [key: string]: number };
}

export default function Dashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/pets");
                const rawData = await response.json();

                let data: any[] = [];
                if (rawData.response?.body?.items?.item) {
                    data = Array.isArray(rawData.response.body.items.item)
                        ? rawData.response.body.items.item
                        : [rawData.response.body.items.item];
                } else if (Array.isArray(rawData)) {
                    data = rawData;
                } else {
                    console.error("Unexpected data format:", rawData);
                    setLoading(false);
                    return;
                }

                const protectionStatus: { [key: string]: number } = {};
                const animalTypes: { [key: string]: number } = {};
                const locationDistribution: { [key: string]: number } = {};
                let neutered = 0;
                let notNeutered = 0;
                let male = 0;
                let female = 0;
                let dogCount = 0;
                let catCount = 0;
                let youngCount = 0;
                let adultCount = 0;
                let seniorCount = 0;
                let protectedCount = 0;
                let adopted = 0;
                let endedCount = 0;

                data.forEach((pet: any) => {
                    const status = pet.processState || "알 수 없음";
                    protectionStatus[status] = (protectionStatus[status] || 0) + 1;

                    if (status.includes("보호중") || status === "보호중") {
                        protectedCount++;
                    } else if (status.includes("입양")) {
                        adopted++;
                    } else if (status.includes("종료")) {
                        endedCount++;
                    }

                    const kindCd = pet.kindCd || "알 수 없음";
                    const breedName = getAnimalKindName(kindCd);
                    animalTypes[breedName] = (animalTypes[breedName] || 0) + 1;

                    const upKindNm = pet.upKindNm || "";
                    if (upKindNm === "개" || upKindNm.includes("개")) {
                        dogCount++;
                    } else if (upKindNm === "고양이" || upKindNm.includes("고양이")) {
                        catCount++;
                    }

                    const neuterStatus = pet.neuterYn || "U";
                    if (neuterStatus === "Y") {
                        neutered++;
                    } else if (neuterStatus === "N") {
                        notNeutered++;
                    }

                    const gender = pet.sexCd || "U";
                    if (gender === "M") {
                        male++;
                    } else if (gender === "F") {
                        female++;
                    }

                    const ageStr = pet.age || "";
                    const yearMatch = ageStr.match(/(\d{4})/);
                    if (yearMatch) {
                        const birthYear = parseInt(yearMatch[1]);
                        const age = new Date().getFullYear() - birthYear;
                        if (age <= 2) {
                            youngCount++;
                        } else if (age <= 7) {
                            adultCount++;
                        } else {
                            seniorCount++;
                        }
                    } else {
                        adultCount++;
                    }

                    const location = pet.careAddr || pet.orgNm || "알 수 없음";
                    const city = location.split(" ")[0];
                    locationDistribution[city] = (locationDistribution[city] || 0) + 1;
                });

                setStats({
                    total: data.length,
                    protected: protectedCount,
                    adopted,
                    ended: endedCount,
                    protectionStatus,
                    animalTypes,
                    neutered,
                    notNeutered,
                    male,
                    female,
                    dogCount,
                    catCount,
                    youngCount,
                    adultCount,
                    seniorCount,
                    locationDistribution,
                });
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const statusData = useMemo(() => {
        if (!stats) return [];
        return [
            { name: "보호중", value: stats.protected },
            { name: "입양완료", value: stats.adopted },
            { name: "종료", value: stats.ended }
        ];
    }, [stats?.protected, stats?.adopted, stats?.ended]);

    const typeData = useMemo(() => {
        if (!stats) return [];
        return [
            { name: "강아지", value: stats.dogCount },
            { name: "고양이", value: stats.catCount }
        ];
    }, [stats?.dogCount, stats?.catCount]);

    const genderData = useMemo(() => {
        if (!stats) return [];
        return [
            { name: "수컷", value: stats.male },
            { name: "암컷", value: stats.female }
        ];
    }, [stats?.male, stats?.female]);

    const neuterData = useMemo(() => {
        if (!stats) return [];
        return [
            { name: "중성화 완료", value: stats.neutered },
            { name: "중성화 미완료", value: stats.notNeutered }
        ];
    }, [stats?.neutered, stats?.notNeutered]);

    const ageData = useMemo(() => {
        if (!stats) return [];
        return [
            { name: "어린 동물 (0-2세)", value: stats.youngCount },
            { name: "성체 (3-7세)", value: stats.adultCount },
            { name: "노령 (8세 이상)", value: stats.seniorCount }
        ];
    }, [stats?.youngCount, stats?.adultCount, stats?.seniorCount]);

    const breedData = useMemo(() => {
        if (!stats) return [];
        return Object.entries(stats.animalTypes)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([name, value]) => ({ name, value }));
    }, [stats?.animalTypes]);

    const locationData = useMemo(() => {
        if (!stats) return [];
        return Object.entries(stats.locationDistribution)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([name, value]) => ({ name, value }));
    }, [stats?.locationDistribution]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container mx-auto px-4 py-16">
                    <div className="animate-pulse space-y-8">
                        <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <p className="text-muted-foreground">데이터를 불러올 수 없습니다.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-black">
            <Header />
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-black mb-4 text-foreground">
                        대시보드
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        유기동물 보호 현황을 한눈에 확인하세요
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <Card className="bg-gradient-to-br from-orange-100 to-orange-50 border-orange-200">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-orange">
                                {stats.total}
                            </CardTitle>
                            <CardDescription>전체 등록 동물</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-100 to-green-50 border-green-200">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-green">
                                {stats.protected}
                            </CardTitle>
                            <CardDescription>현재 보호중</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-100 to-orange-50 border-orange-200">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-orange">
                                {stats.adopted}
                            </CardTitle>
                            <CardDescription>입양 완료</CardDescription>
                        </CardHeader>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-100 to-green-50 border-green-200">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-green">
                                {stats.total > 0 ? ((stats.adopted / stats.total) * 100).toFixed(1) : 0}%
                            </CardTitle>
                            <CardDescription>입양 성공률</CardDescription>
                        </CardHeader>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Status Chart */}
                    <Card>
                        <CardHeader>
                            <CardTitle>보호 상태별 현황</CardTitle>
                            <CardDescription>보호중, 입양완료, 종료 상태별 통계</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={statusData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis dataKey="name" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            padding: '10px'
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="value" fill={COLORS.primary} name="동물 수" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>동물 종류별 분포</CardTitle>
                            <CardDescription>강아지와 고양이 비율</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={typeData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {typeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            padding: '10px'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>성별 분포</CardTitle>
                            <CardDescription>수컷과 암컷 비율</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={genderData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {genderData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={PIE_COLORS_ALT[index % PIE_COLORS_ALT.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            padding: '10px'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>중성화 현황</CardTitle>
                            <CardDescription>중성화 완료 및 미완료 통계</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={neuterData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis dataKey="name" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            padding: '10px'
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="value" fill={COLORS.accent} name="동물 수" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>연령대별 분포</CardTitle>
                            <CardDescription>나이에 따른 동물 분류</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={ageData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis dataKey="name" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            padding: '10px'
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="value" fill={COLORS.secondary} name="동물 수" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>품종별 분포 (상위 10개)</CardTitle>
                            <CardDescription>가장 많은 품종 통계</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={breedData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis type="number" stroke="#666" />
                                    <YAxis dataKey="name" type="category" width={100} stroke="#666" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            padding: '10px'
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="value" fill={COLORS.primary} name="동물 수" radius={[0, 8, 8, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>지역별 분포 (상위 10개)</CardTitle>
                            <CardDescription>보호소 위치별 동물 현황</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={locationData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis dataKey="name" stroke="#666" />
                                    <YAxis stroke="#666" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            padding: '10px'
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="value" fill={COLORS.muted} name="동물 수" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-12">
                    <Card>
                        <CardHeader>
                            <CardTitle>상세 통계 정보</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <h3 className="font-semibold text-lg text-foreground mb-4">보호 현황</h3>
                                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                                        <span className="text-muted-foreground">전체 등록 동물</span>
                                        <span className="font-bold text-lg text-orange">{stats.total}마리</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg border border-teal-100">
                                        <span className="text-muted-foreground">현재 보호중</span>
                                        <span className="font-bold text-lg text-green">{stats.protected}마리</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                                        <span className="text-muted-foreground">입양 완료</span>
                                        <span className="font-bold text-lg text-orange">{stats.adopted}마리</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="font-semibold text-lg text-foreground mb-4">동물 분류</h3>
                                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                                        <span className="text-muted-foreground">강아지</span>
                                        <span className="font-bold text-lg text-orange">{stats.dogCount}마리</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-teal-50 rounded-lg border border-teal-100">
                                        <span className="text-muted-foreground">고양이</span>
                                        <span className="font-bold text-lg text-green">{stats.catCount}마리</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                                        <span className="text-muted-foreground">중성화 비율</span>
                                        <span className="font-bold text-lg text-orange">
                                            {stats.total > 0 ? ((stats.neutered / stats.total) * 100).toFixed(1) : 0}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}