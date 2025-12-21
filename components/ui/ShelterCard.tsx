import React from 'react';

interface ShelterCardProps {
    careRegNo: string;
    careNm: string;
    region?: string;
    address?: string;
    tel?: string;
}

export default function ShelterCard({ careRegNo, careNm, region, address, tel }: ShelterCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-brown cursor-pointer group">
            <div className="p-6">
                {/* 보호소 아이콘 */}
                <div className="w-16 h-16 bg-orange/90 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                    </svg>
                </div>

                {/* 보호소 이름 */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-brown transition-colors line-clamp-2 min-h-[3.5rem]">
                    {careNm}
                </h3>

                {/* 지역 정보 */}
                {region && (
                    <div className="flex items-center gap-2 mb-2">
                        <svg
                            className="w-4 h-4 text-gray-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        <span className="text-sm text-gray-600 font-medium">{region}</span>
                    </div>
                )}

                {/* 주소 */}
                {address && (
                    <div className="flex items-start gap-2 mb-2">
                        <svg
                            className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                        </svg>
                        <span className="text-xs text-gray-500 line-clamp-2">{address}</span>
                    </div>
                )}

                {/* 전화번호 */}
                {tel && (
                    <div className="flex items-center gap-2 mb-3">
                        <svg
                            className="w-4 h-4 text-gray-400 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                        </svg>
                        <span className="text-xs text-gray-600">{tel}</span>
                    </div>
                )}

                {/* 등록번호 */}
                <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">등록번호</span>
                        <span className="text-xs font-mono text-gray-600">{careRegNo}</span>
                    </div>
                </div>
            </div>

            {/* 하단 액션 영역 */}
            <div className="bg-gray-50 px-6 py-3 group-hover:bg-brown/5 transition-colors">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 group-hover:text-brown font-medium transition-colors">
                        자세히 보기
                    </span>
                    <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-brown group-hover:translate-x-1 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
