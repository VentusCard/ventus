
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, CreditCard, Zap, Target } from "lucide-react";

export type LifestyleGoal = 
  | "sports" 
  | "wellness" 
  | "pets" 
  | "gamers" 
  | "creatives" 
  | "homeowners";

interface LifestyleOption {
  id: LifestyleGoal;
  title: string;
  description: string;
  year: string;
  icon: string;
  subcategories: string[];
  merchants: string[];
}

const lifestyleOptions: LifestyleOption[] = [
  {
    id: "sports",
    title: "Sports",
    description: "Golf, Tennis, Running, Skiing & Team Sports",
    year: "Available Now",
    icon: "⚽",
    subcategories: ["Golf", "Tennis", "Running", "Skiing", "Team Sports"],
    merchants: ["Nike", "Adidas", "Dick's Sporting Goods", "REI"]
  },
  {
    id: "wellness",
    title: "Wellness",
    description: "Fitness, Mental Health, Nutrition & Spa",
    year: "Year One",
    icon: "🧘‍♀️",
    subcategories: ["Fitness", "Mental Health", "Nutrition", "Spa", "Meditation"],
    merchants: ["Peloton", "Calm", "Whole Foods", "SoulCycle"]
  },
  {
    id: "pets",
    title: "Pet Owners",
    description: "Dog & Cat Care, Grooming, Food & Services",
    year: "Year One",
    icon: "🐕",
    subcategories: ["Dog Essentials", "Grooming", "Food", "Vet Services"],
    merchants: ["Petco", "Chewy", "VCA Animal Hospitals", "Rover"]
  },
  {
    id: "gamers",
    title: "Gamers",
    description: "PC, Console, Mobile & Esports",
    year: "Year Two",
    icon: "🎮",
    subcategories: ["PC", "Console", "Mobile", "Esports", "Accessories"],
    merchants: ["Steam", "PlayStation", "Best Buy", "Razer"]
  },
  {
    id: "creatives",
    title: "Creatives",
    description: "Photography, Music, Art & Writing",
    year: "Year Two",
    icon: "🎨",
    subcategories: ["Photography", "Music Production", "Art Supplies"],
    merchants: ["Adobe", "B&H Photo", "Guitar Center", "Blick Art"]
  },
  {
    id: "homeowners",
    title: "Homeowners",
    description: "Smart Tech, Improvement & Furniture",
    year: "Year Two",
    icon: "🏠",
    subcategories: ["Smart Tech", "Home Improvement", "Furniture", "Services"],
    merchants: ["Home Depot", "Lowe's", "Wayfair", "Best Buy"]
  }
];

const cardTypes = [
  { name: "Shopping Cashback Card", color: "bg-blue-500" },
  { name: "General Cashback Card", color: "bg-gray-500" },
  { name: "Dining Card", color: "bg-red-500" },
  { name: "Grocery Card", color: "bg-green-500" }
];

const VentusRewards = () => {
  const [selectedGoal, setSelectedGoal] = useState<LifestyleGoal | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(1);

  const selectedOption = lifestyleOptions.find(option => option.id === selectedGoal);

  const handleGoalSelect = (goal: LifestyleGoal) => {
    setSelectedGoal(goal);
    setSelectedSubcategories([]);
    setCurrentStep(2);
    setTimeout(() => {
      document.getElementById('subcategories-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const handleSubcategoryToggle = (subcategory: string) => {
    setSelectedSubcategories(prev => 
      prev.includes(subcategory) 
        ? prev.filter(s => s !== subcategory)
        : [...prev, subcategory]
    );
  };

  const proceedToComparison = () => {
    setCurrentStep(3);
    setTimeout(() => {
      document.getElementById('comparison-section')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
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

      {/* Step 1: Choose Your Main Lifestyle Goal */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Target className="h-4 w-4" />
              Step 1
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Choose Your Main Lifestyle Goal
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the primary lifestyle area where you want to earn rewards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lifestyleOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleGoalSelect(option.id)}
                className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedGoal === option.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{option.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-3">{option.description}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    option.year === "Available Now" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-orange-100 text-orange-700"
                  }`}>
                    {option.year}
                  </span>
                </div>
                
                {selectedGoal === option.id && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}

                {selectedGoal === option.id && (
                  <div className="mt-6 pt-6 border-t border-blue-200">
                    <p className="text-sm font-medium text-blue-700 mb-2">Sample Merchants:</p>
                    <div className="flex flex-wrap gap-2">
                      {option.merchants.map((merchant) => (
                        <span
                          key={merchant}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md"
                        >
                          {merchant}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 1.5: Choose Subcategories */}
      {selectedGoal && (
        <section id="subcategories-section" className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Zap className="h-4 w-4" />
                Step 1.5
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Choose Your Subcategories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Customize your {selectedOption?.title} goal by selecting your interests
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {selectedOption?.subcategories.map((subcategory) => (
                <button
                  key={subcategory}
                  onClick={() => handleSubcategoryToggle(subcategory)}
                  className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                    selectedSubcategories.includes(subcategory)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                  }`}
                >
                  <div className="font-medium">{subcategory}</div>
                </button>
              ))}
            </div>

            {selectedSubcategories.length > 0 && (
              <div className="text-center">
                <Button
                  onClick={proceedToComparison}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto"
                >
                  See How Ventus Simplifies This <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Steps 2 & 3: Side by Side Comparison */}
      {currentStep >= 3 && (
        <section id="comparison-section" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                The Ventus Advantage
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                See what you'd previously need 3+ specialized cards to accomplish vs. what Ventus does in one
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Step 2: The Problem */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <CreditCard className="h-4 w-4" />
                    Step 2: The Problem
                  </div>
                  <h3 className="text-xl font-bold text-red-800">
                    Without Ventus: Card Juggling Required
                  </h3>
                </div>
                
                <div className="grid gap-6">
                  {selectedSubcategories.map((subcategory) => (
                    <div key={subcategory} className="bg-white rounded-lg p-6 border border-red-200">
                      <h4 className="font-bold text-lg text-gray-900 mb-4">{subcategory}</h4>
                      <div className="grid gap-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-700 text-sm">Equipment & Gear</span>
                          <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                            Shopping Card
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-700 text-sm">Services & Memberships</span>
                          <span className="px-2 py-1 bg-gray-500 text-white text-xs rounded-full">
                            General Card
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                          <span className="text-gray-700 text-sm">Food & Dining</span>
                          <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                            Dining Card
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-gray-700 text-sm">Nutrition & Supplements</span>
                          <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                            Grocery Card
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <div className="flex flex-wrap justify-center gap-2 mb-3">
                    {cardTypes.map((card) => (
                      <div key={card.name} className={`${card.color} text-white px-2 py-1 rounded text-xs`}>
                        {card.name}
                      </div>
                    ))}
                  </div>
                  <p className="text-red-600 font-medium">4+ Cards Required</p>
                </div>
              </div>

              {/* Step 3: The Solution */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-8">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <Zap className="h-4 w-4" />
                    Step 3: The Solution
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    With Ventus: One Card Does It All
                  </h3>
                  <div className="text-4xl font-bold text-green-600 mb-2">5x</div>
                  <p className="text-green-700">On All Your Lifestyle Spending</p>
                </div>
                
                <div className="grid gap-6">
                  {selectedSubcategories.map((subcategory) => (
                    <div key={subcategory} className="bg-white rounded-lg p-6 border border-green-200">
                      <h4 className="font-bold text-lg text-gray-900 mb-4">{subcategory}</h4>
                      <div className="grid gap-3">
                        <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg border border-green-200">
                          <span className="text-gray-700 text-sm">Equipment & Gear</span>
                          <span className="px-3 py-1 bg-green-600 text-white font-bold text-xs rounded-lg">
                            5x Points
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg border border-green-200">
                          <span className="text-gray-700 text-sm">Services & Memberships</span>
                          <span className="px-3 py-1 bg-green-600 text-white font-bold text-xs rounded-lg">
                            5x Points
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg border border-green-200">
                          <span className="text-gray-700 text-sm">Food & Dining</span>
                          <span className="px-3 py-1 bg-green-600 text-white font-bold text-xs rounded-lg">
                            5x Points
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2 px-3 bg-green-50 rounded-lg border border-green-200">
                          <span className="text-gray-700 text-sm">Nutrition & Supplements</span>
                          <span className="px-3 py-1 bg-green-600 text-white font-bold text-xs rounded-lg">
                            5x Points
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <div className="inline-block bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg text-sm font-bold mb-3">
                    One Ventus Card
                  </div>
                  <p className="text-green-600 font-bold">1 Card. All Categories. 5x Rewards.</p>
                </div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 mb-8">
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">One Card Replaces Multiple</h3>
                <p className="text-gray-600">No more juggling 3+ specialized cards</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">5x Points Automatically</h3>
                <p className="text-gray-600">No mental math or category tracking</p>
              </div>
              <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">AI-Powered Personalization</h3>
                <p className="text-gray-600">Your preferences drive offers and multipliers</p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                "Why choose between cards — when Ventus rewards everything you care about?"
              </h3>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Join the Waitlist
              </Button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default VentusRewards;
