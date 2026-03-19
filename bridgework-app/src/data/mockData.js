export const workers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    trade: "Electrician",
    rating: 4.8,
    reviews: 127,
    distance: "1.2 km away",
    location: "Koramangala, Bangalore",
    experience: 8,
    verified: true,
    avatar: null,
    hourlyRate: 500,
  },
  {
    id: 2,
    name: "Suresh Yadav",
    trade: "Plumber",
    rating: 4.5,
    reviews: 89,
    distance: "2.3 km away",
    location: "Indiranagar, Bangalore",
    experience: 5,
    verified: true,
    avatar: null,
    hourlyRate: 450,
  },
  {
    id: 3,
    name: "Mohan Singh",
    trade: "Carpenter",
    rating: 4.9,
    reviews: 203,
    distance: "3.1 km away",
    location: "HSR Layout, Bangalore",
    experience: 12,
    verified: true,
    avatar: null,
    hourlyRate: 600,
  },
];

export const jobRequests = [
  {
    id: 1,
    title: "Fix Kitchen Wiring",
    location: "Whitefield, Bangalore",
    budget: 2500,
    trade: "Electrician",
    description: "Need to rewire the kitchen area. Old wiring is causing issues.",
    status: "pending",
    postedAt: "2 hours ago",
  },
  {
    id: 2,
    title: "Bathroom Pipe Repair",
    location: "Marathahalli, Bangalore",
    budget: 1800,
    trade: "Plumber",
    description: "Leaking pipe in the master bathroom. Urgent fix needed.",
    status: "pending",
    postedAt: "5 hours ago",
  },
  {
    id: 3,
    title: "Build Wooden Shelf Unit",
    location: "Koramangala, Bangalore",
    budget: 5000,
    trade: "Carpenter",
    description: "Custom wooden shelf unit for living room. 6ft x 4ft approx.",
    status: "active",
    postedAt: "1 day ago",
  },
];

export const trades = ["Electrician", "Plumber", "Carpenter", "Painter"];

export const dashboardData = {
  profileCompletion: 78,
  earningsThisMonth: 24500,
  totalJobs: 15,
  rating: 4.8,
  reviews: 127,
};
