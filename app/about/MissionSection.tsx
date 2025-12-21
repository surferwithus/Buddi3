export default function MissionSection() {
    return (
        <section className="mx-20 rounded-xl border bg-gradient-to-r from-orange/5 to-green/5 text-brown shadow-sm p-10 mb-12">
            <h3 className="text-center text-3xl text-black font-bold mb-8">
                주제 선정 이유
            </h3>
            <div className="space-y-4">
                <p className="text-brown text-center text-[18px]">
                    저는 동물에 관심이 늘 많았습니다. 1학년 때는 중앙동아리에 소속되어 있는 유기동물 봉사 동아리에서도 열심히 활동했었습니다. <br />
                    그래서 저는 자유 주제 텀프로젝트라는 말을 듣자마자 유기동물과 관련된 웹페이지를 만들어야겠다고 생각했습니다.
                </p>
                <p className="text-brown text-center text-[18px]">
                    Buddi3는 공공 데이터를 활용하여 유기동물 정보에 쉽게 접근할 수 있는 플랫폼을 제공합니다. <br />
                    사용자들이 지역별, 종별로 유기동물을 검색하고 상세 정보를 확인할 수 있도록 하여, <br />
                    더 많은 동물들이 새로운 가족을 만날 수 있도록 돕고자 합니다.
                </p>
                <p className="text-brown text-center text-[18px]">
                    또한 대시보드를 통해 유기동물 현황을 통계적으로 시각화하여, <br />
                    사회적 관심을 높이고 유기동물 문제에 대한 인식을 개선하는 데 기여하고자 합니다.
                </p>
            </div>
        </section>
    );
}