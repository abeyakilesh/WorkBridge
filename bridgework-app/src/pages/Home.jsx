import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
  const steps = [
    { num: "01", title: "Trust", desc: "Verified workers with background checks." },
    { num: "02", title: "Speed", desc: "Find help near you within minutes." },
    { num: "03", title: "Quality", desc: "Rated and reviewed by local clients." },
  ];

  return (
    <div className="flex flex-col flex-1 w-full bg-bg-light">
      {/* Hero Section */}
      <section className="flex-1 min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-primary-light via-white to-blue-50 py-20 px-6 lg:px-12 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-primary font-semibold text-sm mb-6 animate-fade-in-up">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            Now live across 50+ cities in India
          </div>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-text-dark tracking-tight leading-tight mb-6 animate-fade-in-up stagger-1 max-w-4xl">
            Empowering Skilled Hands, Connecting <span className="text-primary relative whitespace-nowrap">
              <span className="relative z-10">Communities</span>
              <svg className="absolute -bottom-2 w-full h-3 text-blue-200 left-0 -z-0" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q50 20 100 10" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-text-muted mb-10 max-w-2xl animate-fade-in-up stagger-2 leading-relaxed">
            The easiest way to find trusted electricians, plumbers, carpenters, and painters right in your neighborhood.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3 w-full sm:w-auto px-4 sm:px-0">
            <Link to="/match" className="w-full sm:w-auto">
              <Button variant="primary" className="h-14 w-full sm:w-auto text-lg px-8 rounded-xl shadow-lg shadow-blue-500/30">
                Find a Worker
                <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </Link>
            <Link to="/register" className="w-full sm:w-auto">
              <Button variant="secondary" className="h-14 w-full sm:w-auto text-lg px-8 rounded-xl">
                Register as Worker
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 lg:px-12 bg-white relative z-20 w-full border-t border-gray-100 shadow-[0_-20px_30px_-20px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-extrabold text-text-dark mb-4">Why choose BridgeWork?</h2>
            <p className="text-text-muted text-xl max-w-2xl mx-auto">We bridge the gap between unorganized skilled labor and everyday household needs seamlessly.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, index) => (
              <div 
                key={step.num} 
                className={`bg-bg-light p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in-up hover:-translate-y-2 stagger-${index + 1}`}
              >
                <div className="text-6xl font-black text-blue-100/50 mb-6 font-mono tracking-tighter">{step.num}</div>
                <h3 className="text-2xl font-bold text-text-dark mb-4">{step.title}</h3>
                <p className="text-text-muted text-lg bg-white p-6 rounded-2xl shadow-sm border border-gray-50 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
