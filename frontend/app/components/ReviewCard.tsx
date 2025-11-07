"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Review } from "@/lib/api";

interface ReviewCardProps {
  review?: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  if (!review) {
    return (
      <Card>
        <CardContent className="pt-6 text-sm text-muted-foreground text-center">
          No review data available.
        </CardContent>
      </Card>
    );
  }

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="font-medium">{review.author ?? "Anonymous"}</p>
            {renderStars(review.rating ?? 0)}
          </div>
          <span className="text-xs text-muted-foreground">
            {review.date
              ? new Date(review.date).toLocaleDateString()
              : "Unknown date"}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {review.comment ?? "No comment provided."}
        </p>
      </CardContent>
    </Card>
  );
}
