export const initialVideosData = [
  {
    id: "anomaly-scan",
    title: "5 Questions to Ask During Your Anomaly Scan",
    shortDescription: "Going for your 20–22 week anomaly scan? Here are some important questions you can discuss with your doctor about your baby's growth and the scan.",
    category: "PREGNANCY",
    topic: "Anomaly Scan",
    instagramUrl: "https://www.instagram.com/reel/Da8L92zTbaO/",
    videoUrl: "/reels/reel 2.mp4",
    thumbnailUrl: "/images/Anomaly Scan.png",
    duration: "00:45",
    views: 12000,
    likes: 850,
    comments: 42,
    shares: 110,
    featured: true,
    published: true,
    displayOrder: 1,
    doctorReviewed: true,
    publishedDate: "2026-08-10"
  },
  {
    id: "baby-flutters",
    title: "Those First Baby Flutters: What Do They Feel Like?",
    shortDescription: "Those first little movements can feel like tiny flutters or butterflies. Learn more about what early fetal movement may feel like.",
    category: "PREGNANCY",
    topic: "Baby Movements",
    instagramUrl: "https://www.instagram.com/reel/DaxzJVgzDkV/",
    videoUrl: "/reels/reel 3.mp4",
    thumbnailUrl: "/images/First Baby Flutters.png",
    duration: "00:52",
    views: 9500,
    likes: 620,
    comments: 28,
    shares: 75,
    featured: false,
    published: true,
    displayOrder: 2,
    doctorReviewed: true,
    publishedDate: "2026-08-11"
  },
  {
    id: "pregnancy-breakfast",
    title: "What Should You Eat for Breakfast During Pregnancy?",
    shortDescription: "A balanced pregnancy breakfast can include protein, fibre, healthy fats and fruits or vegetables. Explore practical nutrition guidance from Dr. Aditi Jain.",
    category: "PREGNANCY NUTRITION",
    topic: "Pregnancy Diet",
    instagramUrl: "https://www.instagram.com/reel/DZmIW_9T53j/",
    videoUrl: "/reels/reel 4.mp4",
    thumbnailUrl: "/images/eat.png",
    duration: "00:40",
    views: 1100000, // 1.1M views
    likes: 45000,
    comments: 1800,
    shares: 12000,
    featured: true,
    published: true,
    displayOrder: 3,
    doctorReviewed: true,
    publishedDate: "2026-08-12"
  },
  {
    id: "dangerous-items",
    title: "Everyday items dangerous in pregnancy",
    shortDescription: "Some everyday household items and products can pose safety concerns during pregnancy. Find out what items to avoid or handle with caution.",
    category: "PREGNANCY SAFETY",
    topic: "Pregnancy Safety",
    instagramUrl: "https://www.instagram.com/reel/DYEe2GsTiYg/",
    videoUrl: "/reels/reel 5.mp4",
    thumbnailUrl: "/images/Everyday items dangerous in pregnancy.png",
    duration: "01:00",
    views: 18500,
    likes: 1250,
    comments: 94,
    shares: 320,
    featured: false,
    published: true,
    displayOrder: 4,
    doctorReviewed: true,
    publishedDate: "2026-08-13"
  },
  {
    id: "partner-support",
    title: "Should Your Husband Be in the Delivery Room?",
    shortDescription: "Can having your husband or partner with you during labour affect your experience? This video discusses research and considerations around partner support during labour.",
    category: "LABOUR & DELIVERY",
    topic: "Partner Support During Labour",
    instagramUrl: "https://www.instagram.com/reel/DXn9LvHk9Fb/",
    videoUrl: "/reels/reel 1.mp4",
    thumbnailUrl: "/images/Should Your Husband Be in the Delivery Room.png",
    duration: "00:55",
    views: 15400,
    likes: 1100,
    comments: 87,
    shares: 410,
    featured: true,
    published: true,
    displayOrder: 5,
    doctorReviewed: true,
    publishedDate: "2026-08-14"
  }
];

export const formatStat = (num) => {
  if (!num) return null;
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 10000) return (num / 1000).toFixed(1) + 'K';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};
