import { useState, useEffect, useRef } from "react"
import { Smartphone, Target, Zap, CreditCard, TrendingUp, Gift, Check, Clock, Activity } from "lucide-react"

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

// Phone mockup component for Feature 1 - Tennis Purchase Rewards Demo
const AdaptiveRewardsPhone = ({ isVisible }: { isVisible: boolean }) => {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [hasCompleted, setHasCompleted] = useState(false)
  
  useEffect(() => {
    if (!isVisible) return
    
    // Reset animation when becoming visible
    setCurrentPhase(0)
    setHasCompleted(false)
    
    const interval = setInterval(() => {
      setCurrentPhase((prev) => {
        if (prev === 1) {
          setHasCompleted(true)
          return 1 // Stay on final phase
        }
        return prev + 1
      })
    }, 2500) // Switch every 2.5 seconds for 5 second total loop
    
    return () => clearInterval(interval)
  }, [isVisible])

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
        
        {/* Phase 1: Checkout Moment */}
        {currentPhase === 0 && (
          <div className="p-4 flex-1 transition-all duration-500 flex flex-col min-h-0">
            {/* Header */}
            <div className="text-center mb-4 flex-shrink-0">
              <h4 className="font-bold text-base mb-1">Tennis Warehouse</h4>
              <p className="text-sm text-gray-600">Checkout</p>
            </div>
            
            {/* Product */}
            <div className="bg-gray-50 p-3 rounded-xl mb-4 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🎾</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">Wilson Pro Staff</div>
                  <div className="text-xs text-gray-600">Tennis Racquet</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-sm">$189.99</div>
                </div>
              </div>
            </div>
            
            {/* 5x Rewards Banner */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-xl text-white mb-4 animate-pulse flex-shrink-0">
              <div className="flex items-center justify-center mb-2">
                <Check className="w-4 h-4 mr-2" />
                <span className="font-bold text-base">5x Rewards</span>
              </div>
              <div className="text-center text-xs opacity-90 leading-relaxed">
                Becoming more athletic in sports
              </div>
            </div>
            
            {/* Pay Button */}
            <div className="mt-auto flex-shrink-0">
              <button className="w-full bg-black text-white py-3 rounded-xl font-semibold text-sm">
                Pay with Ventus Card
              </button>
            </div>
          </div>
        )}
        
        {/* Phase 2: Transaction Recap */}
        {currentPhase === 1 && (
          <div className="p-4 flex-1 transition-all duration-500 flex flex-col min-h-0">
            {/* Header */}
            <div className="text-center mb-4 flex-shrink-0">
              <h4 className="font-bold text-base mb-1">Recent Transactions</h4>
              <p className="text-sm text-gray-600">This Week</p>
            </div>
            
            {/* Tennis Purchase with 5x */}
            <div className="bg-green-50 border-2 border-green-200 p-3 rounded-xl mb-3 flex-shrink-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <span className="text-lg flex-shrink-0">🎾</span>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm">Tennis Warehouse</div>
                    <div className="text-xs text-gray-600">Sports Equipment</div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-green-600 text-sm">+950 pts</div>
                  <div className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded mt-1">5x</div>
                </div>
              </div>
            </div>
            
            {/* Other purchases */}
            <div className="space-y-2 mb-4 flex-shrink-0">
              <div className="bg-gray-50 p-3 rounded-xl">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <span className="text-base flex-shrink-0">☕</span>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm">Starbucks</div>
                      <div className="text-xs text-gray-600">Coffee</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-gray-600 text-sm">+5 pts</div>
                    <div className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded mt-1">1x</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-xl">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <span className="text-base flex-shrink-0">🛒</span>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm">Whole Foods</div>
                      <div className="text-xs text-gray-600">Groceries</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-gray-600 text-sm">+12 pts</div>
                    <div className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded mt-1">1x</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Goal Progress */}
            <div className="mt-auto text-center flex-shrink-0">
              <div className="text-xs text-blue-600 font-medium mb-2">Athletic Goal Progress</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full w-3/4 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Updated Phone mockup component for Feature 2 - Merchant Offers (reusing same transaction)
const MerchantOffersPhone = ({ isVisible }: { isVisible: boolean }) => {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [hasCompleted, setHasCompleted] = useState(false)
  
  useEffect(() => {
    if (!isVisible) return
    
    // Reset animation when becoming visible
    setCurrentPhase(0)
    setHasCompleted(false)
    
    const interval = setInterval(() => {
      setCurrentPhase((prev) => {
        if (prev === 1) {
          setHasCompleted(true)
          return 1 // Stay on final phase
        }
        return prev + 1
      })
    }, 2500) // Switch every 2.5 seconds for 5 second total loop
    
    return () => clearInterval(interval)
  }, [isVisible])

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
        
        {/* Phase 1: Recent Transactions (same as first feature) */}
        {currentPhase === 0 && (
          <div className="p-4 flex-1 transition-all duration-500 flex flex-col min-h-0">
            {/* Header */}
            <div className="text-center mb-4 flex-shrink-0">
              <h4 className="font-bold text-base mb-1">Recent Transactions</h4>
              <p className="text-sm text-gray-600">This Week</p>
            </div>
            
            {/* Tennis Purchase with 5x - clickable indicator */}
            <div className="bg-green-50 border-2 border-green-200 p-3 rounded-xl mb-3 flex-shrink-0 cursor-pointer hover:bg-green-100 transition-colors">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <span className="text-lg flex-shrink-0">🎾</span>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm">Tennis Warehouse</div>
                    <div className="text-xs text-gray-600">Sports Equipment</div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-green-600 text-sm">+950 pts</div>
                  <div className="text-xs bg-green-200 text-green-800 px-2 py-0.5 rounded mt-1">5x</div>
                </div>
              </div>
            </div>
            
            {/* Other purchases */}
            <div className="space-y-2 mb-4 flex-shrink-0">
              <div className="bg-gray-50 p-3 rounded-xl">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <span className="text-base flex-shrink-0">☕</span>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm">Starbucks</div>
                      <div className="text-xs text-gray-600">Coffee</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-gray-600 text-sm">+5 pts</div>
                    <div className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded mt-1">1x</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-xl">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <span className="text-base flex-shrink-0">🛒</span>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm">Whole Foods</div>
                      <div className="text-xs text-gray-600">Groceries</div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-gray-600 text-sm">+12 pts</div>
                    <div className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded mt-1">1x</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Updated CTA */}
            <div className="mt-auto text-center flex-shrink-0">
              <div className="text-xs text-blue-600 font-medium animate-pulse">
                Tap for personalized offers →
              </div>
            </div>
          </div>
        )}
        
        {/* Phase 2: Exclusive Wilson Offer - Fixed layout */}
        {currentPhase === 1 && (
          <div className="p-4 flex-1 transition-all duration-500 flex flex-col min-h-0">
            {/* Header */}
            <div className="text-center mb-3 flex-shrink-0">
              <h4 className="font-bold text-base mb-1">Exclusive Offer</h4>
              <p className="text-sm text-gray-600">Based on your purchase</p>
            </div>
            
            {/* Condensed Transaction Reference */}
            <div className="bg-gray-50 p-2 rounded-xl mb-3 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <span className="text-base flex-shrink-0">🎾</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs">Tennis Warehouse</div>
                  <div className="text-xs text-gray-600">+950 pts earned</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-xs">$189.99</div>
                </div>
              </div>
            </div>
            
            {/* Offer Card - Properly sized */}
            <div className="flex-1 flex flex-col justify-center min-h-0">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl text-white shadow-lg animate-[slideUp_0.5s_ease-out]">
                <div className="flex items-center mb-2">
                  <Gift className="w-3 h-3 mr-2" />
                  <span className="font-semibold text-xs">Exclusive Offer</span>
                </div>
                
                <div className="mb-2">
                  <div className="text-sm font-bold mb-1">$20 off your next Wilson order</div>
                  <div className="text-xs opacity-90 flex items-center">
                    <Clock className="w-2 h-2 mr-1" />
                    Expires in 4 hours
                  </div>
                </div>
                
                {/* Offer details */}
                <div className="space-y-1 mb-2 text-xs opacity-90">
                  <div className="flex items-center">
                    <Check className="w-2 h-2 mr-1 flex-shrink-0" />
                    <span className="text-xs">Triggered by your Tennis Warehouse purchase</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-2 h-2 mr-1 flex-shrink-0" />
                    <span className="text-xs">Limited-time offer</span>
                  </div>
                </div>
                
                {/* CTA Button */}
                <button className="w-full bg-white text-indigo-600 py-1.5 rounded-lg font-semibold text-xs hover:bg-gray-50 transition-colors">
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
const GoalsProgressPhone = ({ isVisible }: { isVisible: boolean }) => {
  const [progress, setProgress] = useState(0)
  const [hasCompleted, setHasCompleted] = useState(false)
  
  // Single goal only
  const goal = { title: "Becoming more athletic in sports", target: 2500, current: 0 }

  useEffect(() => {
    if (!isVisible) return
    
    // Reset animation when becoming visible
    setProgress(0)
    setHasCompleted(false)
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setHasCompleted(true)
          return 100 // Stay at 100%
        }
        return prev + 10
      })
    }, 200)
    
    return () => clearInterval(interval)
  }, [isVisible])

  const currentAmount = Math.floor((goal.target * progress) / 100)

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
          <h4 className="font-bold text-lg mb-6">Reward Summary</h4>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl">
            <div className="flex items-center mb-3">
              <Activity className="w-5 h-5 text-blue-600 mr-2" />
              <span className="font-semibold">{goal.title}</span>
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
              <div className="text-sm text-gray-600">of ${goal.target.toLocaleString()}</div>
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
        return <AdaptiveRewardsPhone isVisible={visibleFeatures[index]} />
      case 1:
        return <MerchantOffersPhone isVisible={visibleFeatures[index]} />
      case 2:
        return <GoalsProgressPhone isVisible={visibleFeatures[index]} />
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
