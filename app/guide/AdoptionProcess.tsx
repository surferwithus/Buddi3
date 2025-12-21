import { Heart, CheckCircle, FileText, Home, Clock, Phone, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

const adoptionSteps = [
  {
    step: 1,
    title: "입양 동물 검색",
    description: "지역, 종류, 나이 등 조건에 맞는 동물을 검색하세요.",
    icon: Heart,
  },
  {
    step: 2,
    title: "보호소 방문 예약",
    description: "마음에 드는 동물이 있다면 보호소에 방문 예약을 합니다.",
    icon: Phone,
  },
  {
    step: 3,
    title: "동물과 만남",
    description: "보호소에서 직접 동물을 만나보고 교감해보세요.",
    icon: Home,
  },
  {
    step: 4,
    title: "입양 서류 작성",
    description: "입양 신청서와 필요 서류를 작성하고 제출합니다.",
    icon: FileText,
  },
  {
    step: 5,
    title: "입양 심사",
    description: "보호소에서 입양 적합성을 심사합니다.",
    icon: Clock,
  },
  {
    step: 6,
    title: "입양 완료",
    description: "심사 통과 후 새 가족을 맞이하세요!",
    icon: CheckCircle,
  },
];

export default function AdoptionProcess() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">입양 절차</h2>
          <p className="text-xl text-muted-foreground">6단계로 진행되는 입양 과정을 안내해드립니다</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adoptionSteps.map((step) => (
            <Card key={step.step} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="absolute top-4 right-4 w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-orange">{step.step}</span>
              </div>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange/20 transition-colors">
                  <step.icon className="w-6 h-6 text-orange" />
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}