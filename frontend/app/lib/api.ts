export interface DashboardStats {
  totalReviews: number;
  averageRating: number;
  lastReviewDate: string;
  trendData: { month: string; reviews: number }[];
  recentReviews: {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  replyText?: string;
  platform?: string;        // <-- for Google, Yelp, etc.
  replyStatus?: "pending" | "replied";  // <-- for UI badges
}

export interface Business {
  id: string;
  name: string;
  googleBusinessId?: string | null;
  totalReviews: number;
  averageRating: number;
  createdAt: string;
}

// Fetch all businesses — matches backend route /business/all
export async function getBusinesses(): Promise<Business[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
  const res = await fetch(`${API_URL}/business/all`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch businesses");
  return res.json();
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getBusinessOverview() {
  const res = await fetch(`${API_URL}/business/overview`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch overview");
  return res.json();
}

export async function getReviews() {
  const res = await fetch(`${API_URL}/reviews`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

export async function postReply(reviewId: string, replyText: string) {
  const res = await fetch(`${API_URL}/reviews/${reviewId}/reply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ replyText }),
  });
  if (!res.ok) throw new Error("Failed to post reply");
  return res.json();
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(`${API_URL}/business/overview`, { cache: "no-store" });
  console.log("🔍 Fetching:", `${API_URL}/business/overview`, res.status);
  if (!res.ok) throw new Error("Failed to fetch overview data");

  const data = await res.json();

  // Normalize backend response to DashboardStats shape
  return {
    totalReviews: data.totalReviews,
    averageRating: data.averageRating,
    lastReviewDate: data.latestReviews?.[0]?.date ?? null,
    trendData: [], // placeholder (you can fill in later)
    recentReviews: data.latestReviews ?? [],
  };
}