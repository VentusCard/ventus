
import { useState, useEffect, useRef } from "react"
import { Smartphone, Target, Zap } from "lucide-react"

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

                {/* Visual placeholder */}
                <div className={`${feature.reverse ? 'lg:col-start-1' : ''}`}>
                  <div className="relative">
                    {/* Main visual container */}
                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8 lg:p-10 border border-gray-100">
                      <div className="flex items-center justify-center h-40 md:h-48 lg:h-56">
                        <div className="relative">
                          {/* Icon background */}
                          <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                            <feature.icon className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 text-gray-600" />
                          </div>
                          
                          {/* Decorative elements */}
                          <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-100 animate-float"></div>
                          <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-5 h-5 md:w-6 md:h-6 rounded-full bg-purple-100 animate-bounce" style={{animationDelay: '1s'}}></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Subtle shadow */}
                    <div className="absolute inset-0 bg-gray-200/20 rounded-2xl blur-xl -z-10 opacity-30"></div>
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
