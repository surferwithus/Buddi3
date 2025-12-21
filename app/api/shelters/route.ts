import { NextResponse } from 'next/server';
import { fetchAbandonmentPublicData } from '@/lib/api-client';

export const revalidate = 3600;

export async function GET() {
    try {
        console.log('Fetching shelter data from abandonment public API...');

        const data = await fetchAbandonmentPublicData({
            pageNo: '1',
            numOfRows: '1000'
        });

        if (!data.response || !data.response.body || !data.response.body.items) {
            return NextResponse.json(
                { shelters: [], meta: { total: 0 } },
                {
                    headers: {
                        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
                    },
                }
            );
        }

        const items = Array.isArray(data.response.body.items.item)
            ? data.response.body.items.item
            : [data.response.body.items.item];

        const shelterMap = new Map<string, any>();

        items.forEach((pet: any) => {
            if (pet.careNm && pet.careAddr) {
                const careRegNo = pet.careRegNo || `shelter_${pet.careNm}`;

                if (!shelterMap.has(careRegNo)) {
                    const addressParts = pet.careAddr.split(' ');
                    let region = '기타';

                    if (addressParts.length > 0) {
                        const firstPart = addressParts[0];
                        if (firstPart.includes('서울')) region = '서울';
                        else if (firstPart.includes('부산')) region = '부산';
                        else if (firstPart.includes('대구')) region = '대구';
                        else if (firstPart.includes('인천')) region = '인천';
                        else if (firstPart.includes('광주')) region = '광주';
                        else if (firstPart.includes('대전')) region = '대전';
                        else if (firstPart.includes('울산')) region = '울산';
                        else if (firstPart.includes('세종')) region = '세종';
                        else if (firstPart.includes('경기')) region = '경기';
                        else if (firstPart.includes('강원')) region = '강원';
                        else if (firstPart.includes('충청북도') || firstPart.includes('충북')) region = '충북';
                        else if (firstPart.includes('충청남도') || firstPart.includes('충남')) region = '충남';
                        else if (firstPart.includes('전라북도') || firstPart.includes('전북')) region = '전북';
                        else if (firstPart.includes('전라남도') || firstPart.includes('전남')) region = '전남';
                        else if (firstPart.includes('경상북도') || firstPart.includes('경북')) region = '경북';
                        else if (firstPart.includes('경상남도') || firstPart.includes('경남')) region = '경남';
                        else if (firstPart.includes('제주')) region = '제주';
                    }

                    shelterMap.set(careRegNo, {
                        careRegNo,
                        careNm: pet.careNm,
                        region,
                        address: pet.careAddr,
                        tel: pet.careTel || ''
                    });
                }
            }
        });

        const shelters = Array.from(shelterMap.values());

        console.log(`✓ Extracted ${shelters.length} unique shelters from pet data`);

        return NextResponse.json(
            {
                shelters,
                meta: {
                    total: shelters.length,
                    source: 'abandonment_public_api'
                }
            },
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
                },
            }
        );
    } catch (error: any) {
        console.error('보호소 API 호출 실패: ', error.message);
        return NextResponse.json(
            { error: '서버 오류 발생', message: error.message },
            { status: 500 }
        );
    }
}
