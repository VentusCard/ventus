
const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-10 w-32 h-32 bg-blue-400 rounded-full filter blur-3xl"></div>
        <div className="absolute right-20 bottom-20 w-48 h-48 bg-indigo-400 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Ventus Rewards
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto text-blue-100 mb-8">
            One card. 5x rewards. All your lifestyle spending.
          </p>
          <p className="text-lg max-w-3xl mx-auto text-blue-200">
            Discover how Ventus simplifies and amplifies rewards across all your spending — 
            eliminating the need to juggle multiple cards.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
