import { NextResponse } from 'next/server';
import { fetchAbandonmentPublicData } from '@/lib/api-client';

async function getParamsId(params: Promise<{ id: string }> | { id: string }): Promise<string> {
    if (params instanceof Promise) {
        const resolved = await params;
        return resolved.id;
    }
    return params.id;
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = await getParamsId(params);

    try {
        const data = await fetchAbandonmentPublicData({
            numOfRows: '100',
            pageNo: '1'
        });

        const items = data.response?.body?.items?.item;

        let pet = null;
        if (Array.isArray(items)) {
            pet = items.find((item: any) => item.desertionNo === id);
        } else if (items && items.desertionNo === id) {
            pet = items;
        }

        if (!pet) {
            return NextResponse.json(
                { error: '동물을 찾을 수 없습니다.' },
                { status: 404 }
            );
        }

        const formattedPet = {
            id: pet.desertionNo,
            imageSrc: pet.popfile1 || pet.popfile2 || pet.evntImg || '/placeholder-pet.jpg',
            breed: pet.kindNm ?? pet.kindFullNm ?? pet.kindCd,
            location: pet.careAddr,
            color: pet.colorCd,
            birthYear: pet.age,
            weight: pet.weight,
            status: pet.processState,
            sex: pet.sexCd === 'M' ? '수컷' : pet.sexCd === 'F' ? '암컷' : '미상',
            neuter: pet.neuterYn === 'Y' ? '완료' : pet.neuterYn === 'N' ? '미완료' : '미상',
            description: pet.specialMark,
            shelterName: pet.careNm,
            shelterTel: pet.careTel,
            shelterAddr: pet.careAddr,
            noticeNo: pet.noticeNo,
            happenDt: pet.happenDt,
            happenPlace: pet.happenPlace,
        };

        return NextResponse.json(formattedPet);

    } catch (error: any) {
        console.error('API 호출 실패: ', error.message);
        return NextResponse.json(
            { error: '서버 오류 발생', message: error.message },
            { status: 500 }
        );
    }
}
