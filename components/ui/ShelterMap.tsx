"use client"

import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

interface ShelterLocation {
    careRegNo: string;
    careNm: string;
    region: string;
    address?: string;
    tel?: string;
    lat: number;
    lng: number;
}

interface ShelterMapProps {
    shelters: ShelterLocation[];
    apiKey: string;
}

const mapContainerStyle = {
    width: '100%',
    height: '600px',
    borderRadius: '16px'
};

const defaultCenter = {
    lat: 36.5,
    lng: 127.5
};

export default function ShelterMap({ shelters, apiKey }: ShelterMapProps) {
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [selectedShelter, setSelectedShelter] = useState<ShelterLocation | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [nearestShelter, setNearestShelter] = useState<ShelterLocation | null>(null);

    const onLoad = useCallback((map: google.maps.Map) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    // 현재 위치 가져오기
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userPos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setUserLocation(userPos);

                    // 가장 가까운 보호소 찾기
                    if (shelters.length > 0) {
                        const nearest = findNearestShelter(userPos, shelters);
                        setNearestShelter(nearest);

                        // 지도 중심을 사용자 위치로 이동
                        if (map) {
                            map.panTo(userPos);
                            map.setZoom(12);
                        }
                    }
                },
                (error) => {
                    console.error("위치 정보를 가져올 수 없습니다:", error);
                    alert("위치 정보를 가져올 수 없습니다. 브라우저 설정을 확인해주세요.");
                }
            );
        } else {
            alert("이 브라우저는 위치 정보를 지원하지 않습니다.");
        }
    };

    // 두 지점 간의 거리 계산 (Haversine formula)
    const calculateDistance = (
        lat1: number,
        lng1: number,
        lat2: number,
        lng2: number
    ): number => {
        const R = 6371; // 지구 반지름 (km)
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const toRad = (value: number): number => {
        return (value * Math.PI) / 180;
    };

    // 가장 가까운 보호소 찾기
    const findNearestShelter = (
        userPos: { lat: number; lng: number },
        shelterList: ShelterLocation[]
    ): ShelterLocation => {
        let nearest = shelterList[0];
        let minDistance = calculateDistance(
            userPos.lat,
            userPos.lng,
            nearest.lat,
            nearest.lng
        );

        shelterList.forEach((shelter) => {
            const distance = calculateDistance(
                userPos.lat,
                userPos.lng,
                shelter.lat,
                shelter.lng
            );
            if (distance < minDistance) {
                minDistance = distance;
                nearest = shelter;
            }
        });

        return nearest;
    };

    // 지도 중심을 모든 마커가 보이도록 조정
    useEffect(() => {
        if (map && shelters.length > 0) {
            const bounds = new google.maps.LatLngBounds();
            shelters.forEach((shelter) => {
                bounds.extend({ lat: shelter.lat, lng: shelter.lng });
            });
            map.fitBounds(bounds);
        }
    }, [map, shelters]);

    return (
        <div className="relative">
            {/* 컨트롤 버튼 */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button
                    onClick={getUserLocation}
                    className="bg-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 font-bold text-brown hover:bg-brown hover:text-white"
                >
                    <svg
                        className="w-5 h-5"
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
                    내 위치에서 가장 가까운 보호소
                </button>
            </div>

            {/* 가장 가까운 보호소 정보 */}
            {nearestShelter && userLocation && (
                <div className="absolute bottom-4 left-4 z-10 bg-white p-4 rounded-2xl shadow-xl max-w-sm">
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 bg-orange/90 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg
                                className="w-6 h-6 text-white"
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
                        <div className="flex-1">
                            <p className="text-xs text-brown font-bold mb-1">가장 가까운 보호소</p>
                            <h4 className="font-bold text-gray-800 mb-1">{nearestShelter.careNm}</h4>
                            <p className="text-xs text-gray-600 mb-1">{nearestShelter.address}</p>
                            <p className="text-xs text-brown font-bold">
                                약 {calculateDistance(
                                    userLocation.lat,
                                    userLocation.lng,
                                    nearestShelter.lat,
                                    nearestShelter.lng
                                ).toFixed(1)}km
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={defaultCenter}
                    zoom={7}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={{
                        styles: [
                            {
                                featureType: "poi",
                                elementType: "labels",
                                stylers: [{ visibility: "off" }]
                            }
                        ]
                    }}
                >
                    {/* 사용자 위치 마커 */}
                    {userLocation && (
                        <Marker
                            position={userLocation}
                            icon={{
                                path: google.maps.SymbolPath.CIRCLE,
                                scale: 12,
                                fillColor: "#4285F4",
                                fillOpacity: 0.9,
                                strokeColor: "#ffffff",
                                strokeWeight: 4
                            }}
                            zIndex={1000}
                        />
                    )}

                    {/* 보호소 마커들 */}
                    {map && shelters.map((shelter) => {
                        const isNearest = nearestShelter?.careRegNo === shelter.careRegNo;

                        // Custom SVG marker
                        const markerSvg = `
                            <svg width="40" height="50" viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <filter id="shadow-${shelter.careRegNo}" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                                        <feOffset dx="0" dy="2" result="offsetblur"/>
                                        <feComponentTransfer>
                                            <feFuncA type="linear" slope="0.3"/>
                                        </feComponentTransfer>
                                        <feMerge>
                                            <feMergeNode/>
                                            <feMergeNode in="SourceGraphic"/>
                                        </feMerge>
                                    </filter>
                                </defs>
                                <g filter="url(#shadow-${shelter.careRegNo})">
                                    <!-- Marker pin shape -->
                                    <path d="M20 0C11.716 0 5 6.716 5 15c0 8.284 15 30 15 30s15-21.716 15-30c0-8.284-6.716-15-15-15z" 
                                          fill="${isNearest ? '#FF8C42' : '#8B4513'}" 
                                          stroke="#ffffff" 
                                          stroke-width="2"/>
                                    <!-- Inner circle -->
                                    <circle cx="20" cy="15" r="8" fill="#ffffff" opacity="0.9"/>
                                    <!-- Paw icon -->
                                    <g transform="translate(20, 15)">
                                        <ellipse cx="0" cy="1" rx="2.5" ry="3" fill="${isNearest ? '#FF8C42' : '#8B4513'}"/>
                                        <ellipse cx="-2.5" cy="-2" rx="1.8" ry="2.2" fill="${isNearest ? '#FF8C42' : '#8B4513'}"/>
                                        <ellipse cx="2.5" cy="-2" rx="1.8" ry="2.2" fill="${isNearest ? '#FF8C42' : '#8B4513'}"/>
                                        <ellipse cx="-4" cy="0.5" rx="1.5" ry="2" fill="${isNearest ? '#FF8C42' : '#8B4513'}"/>
                                        <ellipse cx="4" cy="0.5" rx="1.5" ry="2" fill="${isNearest ? '#FF8C42' : '#8B4513'}"/>
                                    </g>
                                </g>
                            </svg>
                        `;

                        return (
                            <Marker
                                key={shelter.careRegNo}
                                position={{ lat: shelter.lat, lng: shelter.lng }}
                                onClick={() => setSelectedShelter(shelter)}
                                icon={{
                                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(markerSvg),
                                    scaledSize: new google.maps.Size(40, 50),
                                    anchor: new google.maps.Point(20, 50)
                                }}
                                zIndex={isNearest ? 999 : 1}
                                animation={isNearest ? google.maps.Animation.BOUNCE : undefined}
                            />
                        );
                    })}

                    {/* 선택된 보호소 정보창 */}
                    {selectedShelter && (
                        <InfoWindow
                            position={{ lat: selectedShelter.lat, lng: selectedShelter.lng }}
                            onCloseClick={() => setSelectedShelter(null)}
                        >
                            <div className="p-2 max-w-xs">
                                <h3 className="font-bold text-gray-800 mb-2">
                                    {selectedShelter.careNm}
                                </h3>
                                <p className="text-sm text-gray-600 mb-1">
                                    <span className="font-semibold">지역:</span> {selectedShelter.region}
                                </p>
                                {selectedShelter.address && (
                                    <p className="text-sm text-gray-600 mb-1">
                                        <span className="font-semibold">주소:</span> {selectedShelter.address}
                                    </p>
                                )}
                                {selectedShelter.tel && (
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold">전화:</span> {selectedShelter.tel}
                                    </p>
                                )}
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
}
