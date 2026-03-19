export default function Card({ children, className = "", hover = true }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 ${
        hover ? "hover:shadow-md hover:-translate-y-0.5 transition-all duration-300" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
