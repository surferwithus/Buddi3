import { HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";

const faqs = [
    {
      question: "입양 비용은 얼마인가요?",
      answer: "보호소마다 다르지만, 일반적으로 중성화 수술비, 예방접종비 등이 포함된 5~15만원 정도의 분양비가 있습니다. 일부 보호소는 무료 입양을 진행하기도 합니다.",
    },
    {
      question: "입양 후 반환이 가능한가요?",
      answer: "원칙적으로 입양 후 반환은 권장하지 않습니다. 하지만 불가피한 사정이 있을 경우 보호소와 상담 후 진행할 수 있습니다. 신중한 결정을 부탁드립니다.",
    },
    {
      question: "입양 심사는 어떻게 진행되나요?",
      answer: "주거 환경, 가족 구성원, 반려동물 경험, 경제적 여건 등을 종합적으로 검토합니다. 일부 보호소는 가정 방문을 진행하기도 합니다.",
    },
    {
      question: "입양 후 사후 관리가 있나요?",
      answer: "많은 보호소에서 입양 후 1~3개월간 적응 상태를 확인합니다. 문제가 있을 경우 상담 및 교육 지원을 받을 수 있습니다.",
    },
    {
      question: "어떤 동물을 입양하면 좋을까요?",
      answer: "생활 패턴, 주거 환경, 가족 구성원에 맞는 동물을 선택하세요. 보호소 직원과 상담하면 적합한 동물을 추천받을 수 있습니다.",
    },
];

export default function FaqSection() {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
                    <HelpCircle className="w-8 h-8 text-orange" />
                    자주 묻는 질문
                    </h2>
                    <p className="text-xl text-muted-foreground">입양에 관한 궁금증을 해결해드립니다</p>
                </div>
                
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="bg-background rounded-lg border px-6">
                        <AccordionTrigger className="text-left font-semibold text-[13pt] hover:no-underline">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-brown text-[12pt]">
                            {faq.answer}
                        </AccordionContent>
                        </AccordionItem>
                    ))}
                    </Accordion>
                </div>
            </div>
      </section>
    )
}