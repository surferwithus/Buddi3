import React from "react";

export default function PetCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
            {/* 이미지 스켈레톤 */}
            <div className="w-full h-64 bg-gray-200" />

            {/* 콘텐츠 스켈레톤 */}
            <div className="p-6 space-y-4">
                {/* 품종 */}
                <div className="h-6 bg-gray-200 rounded w-3/4" />

                {/* 위치 */}
                <div className="h-4 bg-gray-200 rounded w-1/2" />

                {/* 정보 그리드 */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-16" />
                        <div className="h-4 bg-gray-200 rounded w-20" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-16" />
                        <div className="h-4 bg-gray-200 rounded w-20" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-16" />
                        <div className="h-4 bg-gray-200 rounded w-20" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-16" />
                        <div className="h-4 bg-gray-200 rounded w-20" />
                    </div>
                </div>

                {/* 태그들 */}
                <div className="flex gap-2 pt-4">
                    <div className="h-6 bg-gray-200 rounded-full w-16" />
                    <div className="h-6 bg-gray-200 rounded-full w-20" />
                </div>
            </div>
        </div>
    );
}
