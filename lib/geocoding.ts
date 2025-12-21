// Geocoding utility to convert addresses to coordinates

export interface Coordinates {
    lat: number;
    lng: number;
}

// 주소를 좌표로 변환하는 함수 (Google Geocoding API 사용)
export async function geocodeAddress(address: string, apiKey: string): Promise<Coordinates | null> {
    try {
        const encodedAddress = encodeURIComponent(address);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK' && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        }

        console.warn(`Geocoding failed for address: ${address}, status: ${data.status}`);
        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
}

// 여러 주소를 한번에 변환 (rate limiting 고려)
export async function geocodeAddresses(
    addresses: string[],
    apiKey: string,
    delayMs: number = 200
): Promise<Map<string, Coordinates>> {
    const results = new Map<string, Coordinates>();

    for (const address of addresses) {
        const coords = await geocodeAddress(address, apiKey);
        if (coords) {
            results.set(address, coords);
        }

        // Rate limiting을 위한 딜레이
        if (delayMs > 0) {
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }

    return results;
}

// 한국 주요 도시의 대략적인 좌표 (geocoding 실패시 fallback)
export const KOREA_CITY_COORDINATES: { [key: string]: Coordinates } = {
    '서울': { lat: 37.5665, lng: 126.9780 },
    '부산': { lat: 35.1796, lng: 129.0756 },
    '대구': { lat: 35.8714, lng: 128.6014 },
    '인천': { lat: 37.4563, lng: 126.7052 },
    '광주': { lat: 35.1595, lng: 126.8526 },
    '대전': { lat: 36.3504, lng: 127.3845 },
    '울산': { lat: 35.5384, lng: 129.3114 },
    '세종': { lat: 36.4800, lng: 127.2890 },
    '경기': { lat: 37.4138, lng: 127.5183 },
    '강원': { lat: 37.8228, lng: 128.1555 },
    '충북': { lat: 36.8000, lng: 127.7000 },
    '충남': { lat: 36.5184, lng: 126.8000 },
    '전북': { lat: 35.7175, lng: 127.1530 },
    '전남': { lat: 34.8679, lng: 126.9910 },
    '경북': { lat: 36.4919, lng: 128.8889 },
    '경남': { lat: 35.4606, lng: 128.2132 },
    '제주': { lat: 33.4890, lng: 126.4983 }
};

// 주소에서 지역을 추출하고 대략적인 좌표 반환
export function getApproximateCoordinates(address: string, region?: string): Coordinates {
    // 지역이 제공된 경우 해당 지역의 좌표 사용
    if (region && KOREA_CITY_COORDINATES[region]) {
        return KOREA_CITY_COORDINATES[region];
    }

    // 주소에서 지역 추출
    for (const [city, coords] of Object.entries(KOREA_CITY_COORDINATES)) {
        if (address.includes(city)) {
            return coords;
        }
    }

    // 기본값: 대한민국 중심
    return { lat: 36.5, lng: 127.5 };
}
