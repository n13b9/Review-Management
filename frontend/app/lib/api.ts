// Mock API for dashboard data

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  platform: 'Google' | 'TripAdvisor' | 'Yelp';
  replyStatus: 'pending' | 'replied';
  businessId: string;
}

export interface Business {
  id: string;
  name: string;
  totalReviews: number;
  averageRating: number;
  createdDate: string;
}

export interface DashboardStats {
  totalReviews: number;
  averageRating: number;
  lastReviewDate: string;
  recentReviews: Review[];
  trendData: Array<{ month: string; reviews: number }>;
}

// Mock data
const mockReviews: Review[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    rating: 5,
    comment: 'Excellent service! The team was professional and responsive. Highly recommend.',
    date: '2024-03-15',
    platform: 'Google',
    replyStatus: 'replied',
    businessId: '1',
  },
  {
    id: '2',
    author: 'Michael Chen',
    rating: 4,
    comment: 'Great experience overall. Fast delivery and quality product.',
    date: '2024-03-14',
    platform: 'Google',
    replyStatus: 'pending',
    businessId: '1',
  },
  {
    id: '3',
    author: 'Emily Rodriguez',
    rating: 5,
    comment: 'Outstanding customer support! They went above and beyond.',
    date: '2024-03-13',
    platform: 'TripAdvisor',
    replyStatus: 'replied',
    businessId: '1',
  },
  {
    id: '4',
    author: 'David Kim',
    rating: 3,
    comment: 'Good service but could be faster. Overall satisfied.',
    date: '2024-03-12',
    platform: 'Yelp',
    replyStatus: 'pending',
    businessId: '1',
  },
  {
    id: '5',
    author: 'Lisa Anderson',
    rating: 5,
    comment: 'Perfect! Everything was exactly as described. Will use again.',
    date: '2024-03-11',
    platform: 'Google',
    replyStatus: 'replied',
    businessId: '1',
  },
];

const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Downtown Coffee Shop',
    totalReviews: 156,
    averageRating: 4.7,
    createdDate: '2023-01-15',
  },
  {
    id: '2',
    name: 'Urban Fitness Center',
    totalReviews: 243,
    averageRating: 4.8,
    createdDate: '2023-02-20',
  },
  {
    id: '3',
    name: 'Bella Italia Restaurant',
    totalReviews: 189,
    averageRating: 4.6,
    createdDate: '2023-03-10',
  },
];

export const getDashboardStats = async (): Promise<DashboardStats> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    totalReviews: 156,
    averageRating: 4.7,
    lastReviewDate: '2024-03-15',
    recentReviews: mockReviews.slice(0, 5),
    trendData: [
      { month: 'Oct', reviews: 28 },
      { month: 'Nov', reviews: 35 },
      { month: 'Dec', reviews: 42 },
      { month: 'Jan', reviews: 38 },
      { month: 'Feb', reviews: 45 },
      { month: 'Mar', reviews: 51 },
    ],
  };
};

export const getReviews = async (): Promise<Review[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockReviews;
};

export const getBusinesses = async (): Promise<Business[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockBusinesses;
};

export const sendReply = async (reviewId: string, reply: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(`Reply sent for review ${reviewId}:`, reply);
};
