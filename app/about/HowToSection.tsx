export default function HowToSection() {
    return (
        <section className="mx-20 rounded-xl border bg-white/50 text-brown shadow-sm p-10">
            <h3 className="text-center text-3xl text-black font-bold mb-5">
                함께 도울 수 있는 방법
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-5xl mb-4">🏠</div>
                  <h3 className="text-xl font-bold mb-2 text-black">입양하기</h3>
                  <p className="text-muted-foreground">
                    검색 페이지에서 마음에 드는 동물을 찾아 <br/>
                    가족으로 맞이해주세요
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-5xl mb-4">🤝</div>
                  <h3 className="text-xl font-bold mb-2 text-black">자원봉사</h3>
                  <p className="text-muted-foreground">
                    보호소에서 동물들을 돌보는 자원봉사에 참여해주세요
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-5xl mb-4">💝</div>
                  <h3 className="text-xl font-bold mb-2 text-black">후원하기</h3>
                  <p className="text-muted-foreground">
                    보호소 운영과 동물 치료를 위한 후원을 부탁드립니다
                  </p>
                </div>
              </div>
        </section>
    );
}