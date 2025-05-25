
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
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={el => featureRefs.current[index] = el}
            className={`relative overflow-hidden transition-all duration-1000 ease-out ${
              visibleFeatures[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            } ${index > 0 ? 'mt-32' : ''}`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            {/* Background with gradient */}
            <div className={`rounded-3xl p-12 md:p-16 lg:p-20 ${
              index % 2 === 0 
                ? 'bg-gradient-to-br from-black via-slate-900 to-slate-800' 
                : 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800'
            }`}>
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                feature.reverse ? 'lg:grid-flow-col-dense' : ''
              }`}>
                
                {/* Content */}
                <div className={`space-y-6 ${feature.reverse ? 'lg:col-start-2' : ''}`}>
                  <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-lg">
                    {feature.description}
                  </p>
                </div>

                {/* Visual placeholder */}
                <div className={`${feature.reverse ? 'lg:col-start-1' : ''}`}>
                  <div className="relative">
                    {/* Main visual container */}
                    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
                      <div className="flex items-center justify-center h-48 md:h-64">
                        <div className="relative">
                          {/* Icon background */}
                          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                            <feature.icon className="w-12 h-12 md:w-16 md:h-16 text-white" />
                          </div>
                          
                          {/* Decorative elements */}
                          <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400/40 to-purple-400/40 animate-float"></div>
                          <div className="absolute -bottom-6 -left-6 w-6 h-6 rounded-full bg-gradient-to-br from-purple-400/40 to-pink-400/40 animate-bounce" style={{animationDelay: '1s'}}></div>
                        </div>
                      </div>
                      
                      {/* Subtle pattern overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-2xl"></div>
                    </div>
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl -z-10 opacity-50"></div>
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
