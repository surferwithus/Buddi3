import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { CheckCircle } from "lucide-react";

const preparations = [
  {
    title: "주거 환경 점검",
    items: [
      "반려동물이 생활할 충분한 공간 확보",
      "위험한 물건이나 독성 식물 제거",
      "탈출 방지를 위한 창문, 문 안전장치 설치",
      "적절한 온도와 환기 유지"
    ]
  },
  {
    title: "필수 용품 준비",
    items: [
      "사료와 물그릇",
      "편안한 침대나 쿠션",
      "화장실 용품 (강아지: 패드, 고양이: 모래)",
      "목줄, 하네스, 인식표",
      "장난감과 놀이 용품"
    ]
  },
  {
    title: "의료 준비",
    items: [
      "가까운 동물병원 알아두기",
      "응급상황 대비 연락처 저장",
      "건강검진 및 예방접종 계획",
      "반려동물 보험 가입 고려"
    ]
  },
  {
    title: "가족 준비",
    items: [
      "가족 구성원 모두의 동의와 책임감 공유",
      "반려동물 돌봄 역할 분담",
      "알레르기 등 건강 문제 확인",
      "반려동물 양육 교육 이수"
    ]
  }
];

export default function Checklist() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">입양 전 준비사항</h2>
          <p className="text-xl text-muted-foreground">새로운 가족을 맞이하기 전 꼭 확인해주세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {preparations.map((prep, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange" />
                  {prep.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {prep.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange rounded-full mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}