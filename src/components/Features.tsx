
import { useState, useEffect, useRef } from "react"
import { Smartphone, Target, Zap, CreditCard, TrendingUp, Gift } from "lucide-react"

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

// Phone mockup component for Feature 1 - Adaptive Rewards
const AdaptiveRewardsPhone = () => {
  const [currentReward, setCurrentReward] = useState(0)
  const rewards = [
    { category: "Coffee", multiplier: "3x", amount: "+15 pts" },
    { category: "Gas", multiplier: "2x", amount: "+8 pts" },
    { category: "Groceries", multiplier: "4x", amount: "+20 pts" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReward((prev) => (prev + 1) % rewards.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

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
        
        {/* App content */}
        <div className="p-4 h-full">
          <div className="text-center mb-6">
            <h4 className="font-bold text-lg">Ventus Rewards</h4>
            <p className="text-sm text-gray-600">Live Tracking</p>
          </div>
          
          {/* Animated reward cards */}
          <div className="space-y-3">
            {rewards.map((reward, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl border-2 transition-all duration-500 ${
                  currentReward === index 
                    ? 'bg-blue-50 border-blue-200 scale-105 shadow-lg' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-sm">{reward.category}</div>
                    <div className="text-xs text-gray-600">{reward.multiplier} points</div>
                  </div>
                  <div className={`font-bold ${currentReward === index ? 'text-blue-600' : 'text-gray-400'}`}>
                    {reward.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Progress indicator */}
          <div className="mt-6 text-center">
            <div className="text-xs text-gray-500 mb-2">Adapting to your habits...</div>
            <div className="flex justify-center space-x-1">
              {rewards.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    currentReward === index ? 'bg-blue-500' : 'bg-gray-300'
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

// Phone mockup component for Feature 2 - Merchant Offers
const MerchantOffersPhone = () => {
  const [showOffer, setShowOffer] = useState(false)
  const [offerIndex, setOfferIndex] = useState(0)
  const offers = [
    { merchant: "Starbucks", discount: "15% off", expires: "2 hrs" },
    { merchant: "Shell", discount: "10¢/gal", expires: "4 hrs" },
    { merchant: "Target", discount: "$5 off $50", expires: "1 day" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setShowOffer(true)
      setTimeout(() => {
        setShowOffer(false)
        setOfferIndex((prev) => (prev + 1) % offers.length)
      }, 1500)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

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
        
        {/* Transaction view */}
        <div className="p-4">
          <h4 className="font-bold text-lg mb-4">Recent Transaction</h4>
          <div className="bg-gray-50 p-4 rounded-xl mb-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">{offers[offerIndex].merchant}</div>
                <div className="text-sm text-gray-600">Coffee & Food</div>
              </div>
              <div className="text-right">
                <div className="font-bold">$4.85</div>
                <div className="text-xs text-green-600">+2x points</div>
              </div>
            </div>
          </div>
          
          {/* Offer popup */}
          <div className={`transition-all duration-500 transform ${
            showOffer ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
          }`}>
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-xl text-white">
              <div className="flex items-center mb-2">
                <Gift className="w-5 h-5 mr-2" />
                <span className="font-semibold">Personalized Offer!</span>
              </div>
              <div className="text-lg font-bold">{offers[offerIndex].discount}</div>
              <div className="text-sm opacity-90">at {offers[offerIndex].merchant}</div>
              <div className="text-xs mt-2 opacity-75">Expires in {offers[offerIndex].expires}</div>
            </div>
          </div>
        </div>
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
