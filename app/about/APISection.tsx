import { Database, MapPin, Search } from "lucide-react";

export default function APISection() {
    const apis = [
        {
            icon: <Database className="h-8 w-8 text-orange" />,
            title: "유기동물 공공데이터 API",
            apiName: "abandonmentPublicService_v2",
            description: "공공데이터포털에서 제공하는 유기동물 정보 조회 API를 사용하여 실시간 유기동물 데이터를 가져옵니다.",
            endpoint: "/abandonmentPublic_v2",
            features: [
                "유기동물 목록 조회",
                "상세 정보 확인",
                "이미지 데이터 제공",
                "보호소 정보 연계"
            ]
        },
        {
            icon: <MapPin className="h-8 w-8 text-orange" />,
            title: "보호소 정보 API",
            apiName: "shelter_v2",
            description: "전국 보호소 정보를 조회하여 지역별 보호소 위치와 연락처 정보를 제공합니다.",
            endpoint: "/shelter_v2",
            features: [
                "시도/시군구별 보호소 조회",
                "보호소 등록번호 및 이름",
                "지역별 필터링 지원"
            ]
        },
        {
            icon: <Search className="h-8 w-8 text-orange" />,
            title: "Next.js API Routes",
            apiName: "Custom API",
            description: "Next.js의 API Routes를 활용하여 공공 API를 프록시하고 캐싱을 구현했습니다.",
            endpoint: "/api/pets, /api/shelters",
            features: [
                "서버 사이드 데이터 페칭",
                "5분 캐싱 (revalidate: 300)",
                "에러 핸들링",
                "타입 안정성 보장"
            ]
        }
    ];

    return (
        <section className="mx-20 mb-12">
            <h3 className="text-center text-3xl text-black font-bold mb-8">
                사용 API
            </h3>
            <div className="space-y-6">
                {apis.map((api, index) => (
                    <div
                        key={index}
                        className="rounded-xl border bg-white shadow-sm p-8 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-16 h-16 bg-orange-light rounded-xl flex items-center justify-center flex-shrink-0">
                                {api.icon}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-2xl font-bold text-black mb-2">
                                    {api.title}
                                </h4>
                                <p className="text-brown text-[16px] mb-3">
                                    {api.description}
                                </p>
                                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                                    <p className="text-sm text-gray-600 mb-1">
                                        <span className="font-semibold">API 서비스:</span> {api.apiName}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">엔드포인트:</span> {api.endpoint}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-black mb-2">주요 기능:</p>
                                    <ul className="grid grid-cols-2 gap-2">
                                        {api.features.map((feature, idx) => (
                                            <li key={idx} className="text-sm text-brown flex items-center gap-2">
                                                <span className="text-orange">•</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 rounded-xl border bg-blue-50 p-6">
                <p className="text-center text-brown text-[16px]">
                    <span className="font-semibold text-black">데이터 출처:</span> 공공데이터포털 (data.go.kr) - 
                    농림축산식품부 유기동물 공공데이터
                </p>
            </div>
        </section>
    );
}

