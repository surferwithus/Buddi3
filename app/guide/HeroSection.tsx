export default function HeroSection() {
    return (
        <section className="py-20 bg-gradient-to-br from-orange/20 via-stone/20 to-green/20">
            <div className="container mx-auto px-4 text-center text-primary-foreground">
                <div className="inline-block rounded-full mb-8 text-lg font-semibold px-6 py-2 bg-background border-2">
                    새로운 가족을 찾는 과정
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                    입양 안내
                </h1>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto mt-8 font-light opacity-95">
                    유기동물 입양을 고려해주셔서 감사합니다. <br />
                    책임감 있는 입양을 위한 모든 정보를 안내해드립니다.
                </p>
            </div>
        </section>
    )
}