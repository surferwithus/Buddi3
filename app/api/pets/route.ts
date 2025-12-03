import { NextResponse } from 'next/server';
import { fetchAbandonmentPublicData } from '@/lib/api-client';

export async function GET() {
    try {
        const data = await fetchAbandonmentPublicData({
            pageNo: '1',
            numOfRows: '100'
        });

        return NextResponse.json(data);
    }
    catch (error: any) {
        console.error('API 호출 실패: ', error.message);
        return NextResponse.json(
            { error: '서버 오류 발생', message: error.message },
            { status: 500 }
        );
    }
}
