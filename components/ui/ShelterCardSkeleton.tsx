import React from 'react';

export default function ShelterCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 animate-pulse">
            <div className="p-6">
                {/* 아이콘 스켈레톤 */}
                <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>

                {/* 제목 스켈레톤 */}
                <div className="h-6 bg-gray-200 rounded-lg mb-2 w-3/4"></div>

                {/* 지역 스켈레톤 */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>

                {/* 등록번호 스켈레톤 */}
                <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="h-3 bg-gray-200 rounded w-16"></div>
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                </div>
            </div>

            {/* 하단 영역 스켈레톤 */}
            <div className="bg-gray-50 px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
}
