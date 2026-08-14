export const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Agarwal+Clinic/@26.8903959,75.8215774,17z/data=!3m1!4b1!4m6!3m5!1s0x396db702ebddd23b:0x7cf8af608254534b!8m2!3d26.8903959!4d75.8215774!16s%2Fg%2F11vb0y2qw8!18m1!1e1";

export const initialReviewsData = [
  {
    id: "review-001",
    author: "Priya S.",
    rating: 5,
    text: "Very supportive and patient throughout the consultation. Dr. Aditi explained everything clearly.",
    date: "2026-08-10",
    source: "Google",
    sourceUrl: GOOGLE_MAPS_URL,
    published: true
  },
  {
    id: "review-002",
    author: "Neha Sharma",
    rating: 5,
    text: "Excellent experience. The clinic is very clean and the staff is extremely professional.",
    date: "2026-08-05",
    source: "Google",
    sourceUrl: GOOGLE_MAPS_URL,
    published: true
  },
  {
    id: "review-003",
    author: "Kavita R.",
    rating: 5,
    text: "Dr. Aditi is a wonderful doctor. She takes the time to listen and provides great medical advice. Highly recommend her for maternity care.",
    date: "2026-07-28",
    source: "Google",
    sourceUrl: GOOGLE_MAPS_URL,
    published: true
  },
  {
    id: "review-004",
    author: "Meera Gupta",
    rating: 5,
    text: "The best gynaecologist in the area. Very knowledgeable and makes you feel comfortable instantly.",
    date: "2026-07-15",
    source: "Google",
    sourceUrl: GOOGLE_MAPS_URL,
    published: true
  },
  {
    id: "review-005",
    author: "Anjali V.",
    rating: 5,
    text: "I visited for PCOS consultation. Dr. Aditi explained the lifestyle changes and treatment plan very thoroughly. I am already seeing improvements.",
    date: "2026-07-10",
    source: "Google",
    sourceUrl: GOOGLE_MAPS_URL,
    published: true
  },
  {
    id: "review-006",
    author: "Sangeeta D.",
    rating: 5,
    text: "Very hygienic clinic and prompt appointments. No unnecessary waiting.",
    date: "2026-06-25",
    source: "Google",
    sourceUrl: GOOGLE_MAPS_URL,
    published: true
  },
  {
    id: "review-007",
    author: "Renu J.",
    rating: 5,
    text: "Dr. Aditi guided me throughout my pregnancy journey. Her calm demeanor helped me stay positive. Thank you doctor!",
    date: "2026-06-12",
    source: "Google",
    sourceUrl: GOOGLE_MAPS_URL,
    published: true
  },
  {
    id: "review-008",
    author: "Divya M.",
    rating: 5,
    text: "Highly professional and empathetic. Addressed all my queries with patience.",
    date: "2026-05-30",
    source: "Google",
    sourceUrl: GOOGLE_MAPS_URL,
    published: true
  },
  {
    id: "review-009",
    author: "Anita Singh",
    rating: 5,
    text: "State-of-the-art facility and very helpful support staff. Dr. Jain is highly experienced.",
    date: "2026-05-18",
    source: "Google",
    sourceUrl: GOOGLE_MAPS_URL,
    published: true
  },
  {
    id: "review-010",
    author: "Sunita K.",
    rating: 5,
    text: "The online consultation was very smooth and helpful. Saved me a lot of travel time.",
    date: "2026-05-02",
    source: "Google",
    sourceUrl: GOOGLE_MAPS_URL,
    published: true
  },
  {
    id: "review-011",
    author: "Kirti S.",
    rating: 5,
    text: "One of the most compassionate doctors I have met. Truly cares for her patients.",
    date: "2026-04-20",
    source: "Google",
    sourceUrl: GOOGLE_MAPS_URL,
    published: true
  },
  {
    id: "review-012",
    author: "Pooja A.",
    rating: 5,
    text: "Thank you for the excellent care during my surgery. Recovery has been smooth thanks to your guidance.",
    date: "2026-04-05",
    source: "Google",
    sourceUrl: GOOGLE_MAPS_URL,
    published: true
  }
];

// Helper to duplicate reviews for infinite marquee loop if needed
export const getMarqueeReviews = () => {
  // We need enough reviews to fill a long row, so duplicate if dataset is small
  const extended = [...initialReviewsData, ...initialReviewsData, ...initialReviewsData];
  return extended;
};
