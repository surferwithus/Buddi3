export default function ContactSection() {
    return (
        <section className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6 text-black">문의</h2>
            <p className="text-lg text-brown mb-4">
                정보컴퓨터공학부 202355525 김윤영
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-brown">
                <span>📧 dbsdud3272@pusan.ac.kr</span>
                <span className="hidden sm:inline">|</span>
                <span>📞 010-1234-5678</span>
            </div>
        </section>
    )
}