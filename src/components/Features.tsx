import { useState, useEffect, useRef } from "react"
import { Smartphone, Target, Zap, CreditCard, TrendingUp, Gift, Check, Clock } from "lucide-react"

const features = [
  {
    icon: Smartphone,
    title: "Rewards That Move With You",
    description: "Earn rewards shaped by your spending behavior, fueling progress toward your personal ambitions.",
    reverse: false
  },
  {
    icon: Zap,
    title: "Unlock Smarter Spending Moments",
    description: "Access personalized merchant offers layered on top of your core rewards, automatically and effortlessly.",
    reverse: true
  },
  {
    icon: Target,
    title: "Goals That Actually Go Somewhere",
    description: "Set a new goal every quarter and see real-world impact as your card adapts to help you achieve it.",
    reverse: false
  }
]

// Updated Phone mockup component for Feature 1 - Now shows transaction then offer
const AdaptiveRewardsPhone = () => {
  const [currentPhase, setCurrentPhase] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % 2) // 0 = transaction summary, 1 = bonus offer
    }, currentPhase === 0 ? 2000 : 3000) // 2s for transaction, 3s for offer
    return () => clearInterval(interval)
  }, [currentPhase])

  return (
    <div className="relative mx-auto w-64 h-[500px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
      <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden flex flex-col">
        {/* Status bar */}
        <div className="h-8 bg-gray-50 flex items-center justify-between px-6 text-xs font-medium flex-shrink-0">
          <span>9:41</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        
        {/* Phase 1: Transaction Summary with 5x Rewards */}
        {currentPhase === 0 && (
          <div className="p-4 flex-1 transition-all duration-500 flex flex-col min-h-0">
            {/* Header */}
            <div className="text-center mb-6 flex-shrink-0">
              <h4 className="font-bold text-lg mb-1">Recent Transaction</h4>
              <p className="text-sm text-gray-600">Just now</p>
            </div>
            
            {/* Transaction Card with 5x Rewards */}
            <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl mb-6 flex-shrink-0">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🎾</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-base">Tennis Warehouse</div>
                  <div className="text-sm text-gray-600">Wilson Pro Staff Racquet</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-lg">$189.99</div>
                </div>
              </div>
              
              {/* 5x Rewards highlight */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-lg text-white text-center mb-3">
                <div className="flex items-center justify-center mb-1">
                  <Check className="w-4 h-4 mr-2" />
                  <span className="font-bold text-sm">5x Rewards Applied</span>
                </div>
                <div className="text-xs opacity-90">
                  Athletic goal category
                </div>
              </div>
              
              {/* Points earned */}
              <div className="text-center pt-2 border-t border-green-200">
                <div className="text-green-600 font-semibold text-base">
                  You earned 950 points back
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Phase 2: Bonus Offer Reveal */}
        {currentPhase === 1 && (
          <div className="p-4 flex-1 transition-all duration-500 flex flex-col min-h-0">
            {/* Header */}
            <div className="text-center mb-4 flex-shrink-0">
              <h4 className="font-bold text-lg mb-1">Recent Transaction</h4>
              <p className="text-sm text-gray-600">Just now</p>
            </div>
            
            {/* Condensed Transaction */}
            <div className="bg-gray-50 p-3 rounded-xl mb-4 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <span className="text-lg flex-shrink-0">🎾</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">Tennis Warehouse</div>
                  <div className="text-xs text-gray-600">Wilson Pro Staff Racquet</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-sm">$189.99</div>
                  <div className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded mt-1">+950 pts</div>
                </div>
              </div>
            </div>
            
            {/* Bonus Offer Label */}
            <div className="text-center mb-3 flex-shrink-0">
              <p className="text-sm font-medium text-gray-700">
                Bonus Offer Unlocked From Your Purchase
              </p>
            </div>
            
            {/* Offer Card with slide-up animation */}
            <div className="animate-[slideUp_0.5s_ease-out] flex-shrink-0">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-xl text-white shadow-lg">
                <div className="flex items-center mb-3">
                  <Gift className="w-5 h-5 mr-2" />
                  <span className="font-semibold text-base">Exclusive Offer</span>
                </div>
                
                <div className="mb-4">
                  <div className="text-xl font-bold mb-1">$20 off your next Wilson order</div>
                  <div className="text-sm opacity-90 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Expires in 4 hours
                  </div>
                </div>
                
                {/* Offer details */}
                <div className="space-y-2 mb-4 text-xs opacity-90">
                  <div className="flex items-center">
                    <Check className="w-3 h-3 mr-2 flex-shrink-0" />
                    <span>Triggered by your Tennis Warehouse purchase</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-2 flex-shrink-0" />
                    <span>Limited-time offer</span>
                  </div>
                </div>
                
                {/* CTA Button */}
                <button className="w-full bg-white text-indigo-600 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
                  Add Offer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Phone mockup component for Feature 2 - Merchant Offers
const MerchantOffersPhone = () => {
  const [currentPhase, setCurrentPhase] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % 2) // 0 = transaction summary, 1 = bonus offer
    }, currentPhase === 0 ? 2000 : 3000) // 2s for transaction, 3s for offer
    return () => clearInterval(interval)
  }, [currentPhase])

  return (
    <div className="relative mx-auto w-64 h-[500px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
      <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden flex flex-col">
        {/* Status bar */}
        <div className="h-8 bg-gray-50 flex items-center justify-between px-6 text-xs font-medium flex-shrink-0">
          <span>9:41</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        
        {/* Phase 1: Transaction Summary */}
        {currentPhase === 0 && (
          <div className="p-4 flex-1 transition-all duration-500 flex flex-col min-h-0">
            {/* Header */}
            <div className="text-center mb-6 flex-shrink-0">
              <h4 className="font-bold text-lg mb-1">Recent Transaction</h4>
              <p className="text-sm text-gray-600">Just now</p>
            </div>
            
            {/* Transaction Card */}
            <div className="bg-gray-50 p-4 rounded-xl mb-6 flex-shrink-0">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🎾</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-base">Tennis Warehouse</div>
                  <div className="text-sm text-gray-600">Wilson Pro Staff Racquet</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-lg">$189.99</div>
                </div>
              </div>
              
              {/* Points earned */}
              <div className="text-center pt-2 border-t border-gray-200">
                <div className="text-green-600 font-semibold text-base">
                  You earned 950 points back
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Phase 2: Bonus Offer Reveal */}
        {currentPhase === 1 && (
          <div className="p-4 flex-1 transition-all duration-500 flex flex-col min-h-0">
            {/* Header */}
            <div className="text-center mb-4 flex-shrink-0">
              <h4 className="font-bold text-lg mb-1">Recent Transaction</h4>
              <p className="text-sm text-gray-600">Just now</p>
            </div>
            
            {/* Condensed Transaction */}
            <div className="bg-gray-50 p-3 rounded-xl mb-4 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <span className="text-lg flex-shrink-0">🎾</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">Tennis Warehouse</div>
                  <div className="text-xs text-gray-600">Wilson Pro Staff Racquet</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-sm">$189.99</div>
                  <div className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded mt-1">+950 pts</div>
                </div>
              </div>
            </div>
            
            {/* Bonus Offer Label */}
            <div className="text-center mb-3 flex-shrink-0">
              <p className="text-sm font-medium text-gray-700">
                Bonus Offer Unlocked From Your Purchase
              </p>
            </div>
            
            {/* Offer Card with slide-up animation */}
            <div className="animate-[slideUp_0.5s_ease-out] flex-shrink-0">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-xl text-white shadow-lg">
                <div className="flex items-center mb-3">
                  <Gift className="w-5 h-5 mr-2" />
                  <span className="font-semibold text-base">Exclusive Offer</span>
                </div>
                
                <div className="mb-4">
                  <div className="text-xl font-bold mb-1">$20 off your next Wilson order</div>
                  <div className="text-sm opacity-90 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Expires in 4 hours
                  </div>
                </div>
                
                {/* Offer details */}
                <div className="space-y-2 mb-4 text-xs opacity-90">
                  <div className="flex items-center">
                    <Check className="w-3 h-3 mr-2 flex-shrink-0" />
                    <span>Triggered by your Tennis Warehouse purchase</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-2 flex-shrink-0" />
                    <span>Limited-time offer</span>
                  </div>
                </div>
                
                {/* CTA Button */}
                <button className="w-full bg-white text-indigo-600 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors">
                  Add Offer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Phone mockup component for Feature 3 - Goals Progress
const GoalsProgressPhone = () => {
  const [progress, setProgress] = useState(0)
  const [goalIndex, setGoalIndex] = useState(0)
  const goals = [
    { title: "Europe Trip", target: 2500, current: 0 },
    { title: "New Laptop", target: 1200, current: 0 },
    { title: "Emergency Fund", target: 5000, current: 0 }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setTimeout(() => {
            setGoalIndex((prevIndex) => (prevIndex + 1) % goals.length)
            setProgress(0)
          }, 500)
          return 100
        }
        return prev + 10
      })
    }, 200)
    return () => clearInterval(interval)
  }, [goalIndex])

  const currentGoal = goals[goalIndex]
  const currentAmount = Math.floor((currentGoal.target * progress) / 100)

  return (
    <div className="relative mx-auto w-64 h-[500px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
      <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden">
        {/* Status bar */}
        <div className="h-8 bg-gray-50 flex items-center justify-between px-6 text-xs font-medium">
          <span>9:41</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-black rounded-full"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        
        {/* Goals content */}
        <div className="p-4">
          <h4 className="font-bold text-lg mb-6">Your Goals</h4>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl">
            <div className="flex items-center mb-3">
              <Target className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-semibold">{currentGoal.title}</span>
            </div>
            
            {/* Progress circle */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                  className="transition-all duration-200"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{Math.round(progress)}%</div>
                </div>
              </div>
            </div>
            
            {/* Amount display */}
            <div className="text-center">
              <div className="text-2xl font-bold">${currentAmount.toLocaleString()}</div>
              <div className="text-sm text-gray-600">of ${currentGoal.target.toLocaleString()}</div>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-4 flex justify-center space-x-1">
              {goals.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    goalIndex === index ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Features = () => {
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>([false, false, false])
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.7

      featureRefs.current.forEach((ref, index) => {
        if (ref && scrollPosition > ref.offsetTop) {
          setVisibleFeatures(prev => {
            const newState = [...prev]
            newState[index] = true
            return newState
          })
        }
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const renderPhoneMockup = (index: number) => {
    switch (index) {
      case 0:
        return <AdaptiveRewardsPhone />
      case 1:
        return <MerchantOffersPhone />
      case 2:
        return <GoalsProgressPhone />
      default:
        return null
    }
  }

  return (
    <section id="features" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={el => featureRefs.current[index] = el}
            className={`relative overflow-hidden transition-all duration-1000 ease-out ${
              visibleFeatures[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } ${index > 0 ? 'mt-16 md:mt-20 lg:mt-24' : ''}`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            {/* Content container with reduced padding */}
            <div className="py-8 md:py-12 lg:py-16 px-6 md:px-8 lg:px-12">
              <div className={`grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center ${
                feature.reverse ? 'lg:grid-flow-col-dense' : ''
              }`}>
                
                {/* Content */}
                <div className={`space-y-4 md:space-y-6 ${feature.reverse ? 'lg:col-start-2' : ''}`}>
                  <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                    {feature.description}
                  </p>
                </div>

                {/* Phone mockup visual */}
                <div className={`${feature.reverse ? 'lg:col-start-1' : ''}`}>
                  <div className="flex justify-center">
                    {renderPhoneMockup(index)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
