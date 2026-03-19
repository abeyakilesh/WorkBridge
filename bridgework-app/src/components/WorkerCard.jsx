import Button from "./Button";

export default function WorkerCard({ worker, onHire }) {
  const getTradeIcon = (trade) => {
    switch (trade) {
      case "Electrician":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case "Plumber":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case "Carpenter":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
          </svg>
        );
      case "Painter":
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        );
      default:
        return null;
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-4 h-4 text-star fill-star" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }
    if (hasHalf) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-star" viewBox="0 0 24 24">
          <defs>
            <linearGradient id={`half-${worker.id}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path fill={`url(#half-${worker.id})`} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    }

    return stars;
  };

  const getInitials = (name) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

  const avatarColors = [
    "from-blue-500 to-indigo-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-red-500",
    "from-violet-500 to-purple-600",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.15)] ring-1 ring-gray-100 hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full bg-gradient-to-b from-white to-gray-50/30">
      {/* Card Header */}
      <div className="relative p-6 border-b border-gray-50">
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${avatarColors[worker.id % 4]} flex items-center justify-center text-white font-black text-xl shrink-0 shadow-md ring-4 ring-white`}>
            {getInitials(worker.name)}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-text-dark truncate">{worker.name}</h3>
              {worker.verified && (
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-primary-light text-primary text-xs font-semibold rounded-full shrink-0">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Verified
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 mt-1 text-text-muted text-sm">
              {getTradeIcon(worker.trade)}
              <span>{worker.trade}</span>
              <span className="text-gray-300 mx-1">•</span>
              <span>{worker.experience} yrs exp</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-5 flex-grow">
        <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-inner">
          <div className="flex items-center gap-1.5">
            {renderStars(worker.rating)}
            <span className="text-[15px] font-bold text-text-dark ml-1">{worker.rating}</span>
            <span className="text-xs font-semibold text-text-muted">({worker.reviews})</span>
          </div>
          <div className="flex items-center gap-1.5 text-text-muted text-sm font-medium">
            <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {worker.distance}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 pt-2 mt-auto">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-primary">₹{worker.hourlyRate}</span>
            <span className="text-xs font-semibold text-text-muted ml-0.5">/hour</span>
          </div>
          <Button
            onClick={() => onHire && onHire(worker)}
            variant="primary"
            className="px-6 py-2.5 text-[15px]"
          >
            Hire Now
          </Button>
        </div>
      </div>
    </div>
  );
}
