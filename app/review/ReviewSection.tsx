import ReviewCard from "@/components/ui/ReviewCard"
import { reviewsData } from "@/mock-data/reviews"

export default function ReviewSection() {
    return (
        <section className="bg-[#f9f8F6] py-16 px-4 md:px-8 text-black">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 gap-6 md:gap-8">
                    {reviewsData.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            </div>
        </section>
    )
}