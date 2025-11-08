"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Star } from "lucide-react";
import { Review, postReply } from "@/lib/api";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [replyMode, setReplyMode] = useState(false);
  const [replyText, setReplyText] = useState(review.replyText || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleReply = async () => {
    if (!replyText.trim()) return;
    try {
      setLoading(true);
      await postReply(review.id, replyText);
      setSuccess(true);
      setReplyMode(false);
    } catch (err) {
      console.error("❌ Failed to post reply:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-3">
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

        <p className="text-sm text-muted-foreground">{review.comment}</p>

        {/* Reply section */}
        {review.replyText ? (
          <div className="bg-muted/30 p-3 rounded-md border text-sm">
            <p className="font-medium mb-1 text-primary">Your reply:</p>
            <p className="text-muted-foreground">{review.replyText}</p>
          </div>
        ) : replyMode ? (
          <div className="space-y-2">
            <Textarea
              placeholder="Write your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              disabled={loading}
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleReply} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : "Send"}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setReplyMode(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setReplyMode(true)}
            >
              Reply
            </Button>
          </div>
        )}

        {success && (
          <p className="text-xs text-green-600 font-medium">
            ✅ Reply added successfully!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
