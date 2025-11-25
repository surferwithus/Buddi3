export default function ContactSection() {
    return (
        <section className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6 text-black">문의하기</h2>
            <p className="text-lg text-brown mb-4">
                입양 절차나 자원봉사에 대해 궁금한 점이 있으시면 언제든 연락주세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-brown">
                <span>📧 dbsdud3272@pusan.ac.kr</span>
                <span className="hidden sm:inline">|</span>
                <span>📞 02-1234-5678</span>
            </div>
        </section>
    )
}