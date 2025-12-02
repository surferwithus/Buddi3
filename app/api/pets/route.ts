import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const baseUrl = 'https://apis.data.go.kr/1543061/abandonmentPublicService_v2';
        const serviceKey = 'JGfgJMUxG7LRicra1+4WOD1AIfFK4UAY+MoGAsXcSc8QOX1mf7dIDgg1zQC8c4OY7cQVVhCCMaeH6ChDITzNfA==';
        const method = '/abandonmentPublic_v2';

        const queryParams = new URLSearchParams({
            serviceKey,
            pageNo: '1',
            numOfRows: '9',
            _type: 'json'
        })

        const url = `${baseUrl}${method}?${queryParams.toString()}`
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        console.log('Fetching URL:', url);

        const data = await res.json();
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
