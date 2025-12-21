import { Heart, Star, Quote, MapPin, Calendar } from "lucide-react"
import { Review } from "@/mock-data/reviews"

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all border-2 hover:border-orange/40 h-[380px] flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 relative overflow-hidden h-48 md:h-auto shrink-0">
        <img
          src={review.image}
          alt={review.petName}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-bold text-2xl text-foreground">
            {review.petName}
          </span>
          <span className="text-lg text-muted-foreground">· {review.breed}</span>
        </div>

        <div className="relative flex item-center">
          <Quote className="absolute -top-3 -left-3 h-10 w-10 text-orange/40" />
          <p className="text-lg text-muted-foreground pl-8 line-clamp-6 relative z-10 leading-relaxed">
            {review.content}
          </p>
          <Quote className="absolute -bottom-7 -right-3 h-10 w-10 text-orange/40" />
        </div>

        <div className="border-t pt-6 mt-auto">
          <div className="flex flex-col gap-3 text-base">
            <span className="font-medium text-lg text-foreground self-end">
              {review.name || "익명"}
            </span>
            <div className="flex items-center justify-between text-muted-foreground w-full">
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {review.location}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                {new Date(review.adoptionDate).toLocaleDateString("ko-KR")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
