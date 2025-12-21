// ===== Abandonment Public API =====
export const fetchAbandonmentPublicData = async (params: Record<string, string>) => {
    const baseUrl = 'https://apis.data.go.kr/1543061/abandonmentPublicService_v2';
    const serviceKey = 'JGfgJMUxG7LRicra1+4WOD1AIfFK4UAY+MoGAsXcSc8QOX1mf7dIDgg1zQC8c4OY7cQVVhCCMaeH6ChDITzNfA==';
    const method = '/abandonmentPublic_v2';

    const queryParams = new URLSearchParams({
        serviceKey,
        _type: 'json',
        ...params
    });

    const url = `${baseUrl}${method}?${queryParams.toString()}`;

    console.log('Fetching URL:', url);

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        throw new Error(`API call failed with status: ${res.status}`);
    }

    return await res.json();
};

// ===== Shelter API Types =====
export interface ShelterItem {
    careRegNo: string;  // 보호소 등록번호
    careNm: string;     // 보호소 이름
}

export interface ShelterResponse {
    header: {
        errorMsg: string;
        reqNo: string;
        resultCode: string;
        resultMsg: string;
    };
    body: {
        pageNo: string;
        items: {
            item: ShelterItem | ShelterItem[];  // 단일 항목 또는 배열
        };
        totalCount: string;
        numOfRows: string;
    };
}

export interface ShelterApiParams {
    upr_cd?: string;      // 시도코드 (시 데이터 O, 미입력 시 데이터 X)
    org_cd?: string;      // 시군구코드 (입력 시 데이터 O, 미입력 시 데이터 X)
    _type?: string;       // xml(기본값) 또는 json
    numOfRows?: string;   // 한 페이지 결과 수 (1,000 이하)
    pageNo?: string;      // 페이지 번호
}

// ===== Shelter API =====
export const fetchShelterData = async (params: ShelterApiParams): Promise<ShelterResponse> => {
    // abandonmentPublicService_v2로 변경 (같은 서비스 사용)
    const baseUrl = 'https://apis.data.go.kr/1543061/abandonmentPublicService_v2';
    const serviceKey = 'JGfgJMUxG7LRicra1+4WOD1AIfFK4UAY+MoGAsXcSc8QOX1mf7dIDgg1zQC8c4OY7cQVVhCCMaeH6ChDITzNfA==';
    const method = '/shelter_v2';

    const queryParams = new URLSearchParams({
        serviceKey,
        _type: params._type || 'json',
    });

    // 파라미터 추가
    if (params.upr_cd) queryParams.append('upr_cd', params.upr_cd);
    if (params.org_cd) queryParams.append('org_cd', params.org_cd);
    if (params.numOfRows) queryParams.append('numOfRows', params.numOfRows);
    if (params.pageNo) queryParams.append('pageNo', params.pageNo);

    const url = `${baseUrl}${method}?${queryParams.toString()}`;

    console.log('Fetching Shelter URL:', url);

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`Shelter API error (${res.status}):`, errorText);
        throw new Error(`Shelter API call failed with status: ${res.status}`);
    }

    const data = await res.json();

    console.log('Shelter API raw response:', JSON.stringify(data, null, 2));

    // API 응답이 response 객체로 감싸져 있을 수 있으므로 확인
    return data.response || data;
};
