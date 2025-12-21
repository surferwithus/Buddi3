import { Code, Palette, Layout, BarChart3 } from "lucide-react";

export default function TechStackSection() {
    const techStack = [
        {
            icon: <Code className="h-8 w-8 text-orange" />,
            title: "Next.js + TS",
            description: "React 기반의 풀스택 프레임워크와 타입스크립트를 통해 서버 사이드 렌더링과 API 라우트를 구현했습니다."
        },
        {
            icon: <Palette className="h-8 w-8 text-orange" />,
            title: "Tailwind CSS",
            description: " CSS 프레임워크로 빠르고 일관된 UI를 구현했습니다."
        },
        {
            icon: <Layout className="h-8 w-8 text-orange" />,
            title: "Radix UI",
            description: "접근성이 뛰어난 UI 컴포넌트 라이브러리로 Accordion 등의 컴포넌트를 사용했습니다."
        },
        {
            icon: <BarChart3 className="h-8 w-8 text-orange" />,
            title: "Recharts",
            description: "대시보드의 통계 데이터를 시각화하기 위한 차트 라이브러리입니다."
        }
    ];

    return (
        <section className="mx-20 mb-12">
            <h3 className="text-center text-3xl text-black font-bold mb-8">
                사용 기술 스택
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {techStack.map((tech, index) => (
                    <div
                        key={index}
                        className="rounded-xl border bg-white shadow-sm p-6 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-orange-light rounded-xl flex items-center justify-center">
                                {tech.icon}
                            </div>
                            <h4 className="text-xl font-bold text-black">
                                {tech.title}
                            </h4>
                        </div>
                        <p className="text-brown text-[16px]">
                            {tech.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}

