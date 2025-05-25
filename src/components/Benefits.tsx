
import { Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const benefitTiers = [
  {
    name: "Standard",
    description: "Smart rewards, zero cost",
    price: "$0",
    period: "/month",
    features: [
      "Earn 2x Ventus Points on essential purchases — up to $500 in spend/month",
      "All other purchases earn 1x",
      "No annual or monthly fee",
      "Mobile wallet + virtual card support",
      "Basic travel & purchase protection"
    ],
    highlighted: false
  },
  {
    name: "Premium",
    description: "Built for motivated spenders",
    price: "$9.99",
    period: "/month",
    features: [
      "Earn 4x Ventus Points on your top spending category — up to $500/month",
      "Earn 2x Ventus Points on all other purchases — up to $1,500/month",
      "Personalized quarterly goal tracking & reward boosts",
      "2 airport lounge visits/year",
      "Enhanced travel & purchase insurance",
      "Priority customer support"
    ],
    highlighted: true
  },
  {
    name: "Elite",
    description: "Engineered for high-impact living",
    price: "$29.99",
    period: "/month",
    features: [
      "Earn 5x Ventus Points on goal-aligned purchases — up to $1,000/month",
      "Earn 3x Ventus Points on all other purchases — up to $2,500/month",
      "Unlimited airport lounge access",
      "Personalized merchant offers & stackable bonuses",
      "Smart travel perks (trip delay, elite status fast-track)",
      "24/7 concierge & private event invitations"
    ],
    highlighted: false
  }
]

const Benefits = () => {
  return (
    <section id="benefits" className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Card Benefits</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the tier that fits your lifestyle and financial goals
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefitTiers.map((tier, index) => (
            <Card 
              key={index} 
              className={`border ${tier.highlighted ? 'relative border-primary/50 shadow-lg shadow-primary/10' : ''}`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground text-sm font-medium py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className={`pb-6 ${tier.highlighted ? 'pt-8' : 'pt-6'}`}>
                <CardTitle className="font-display text-xl">{tier.name}</CardTitle>
                <p className="text-muted-foreground mt-2">{tier.description}</p>
                <div className="mt-4">
                  <span className="font-display text-3xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <ul className="space-y-3 mb-4">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 border-t border-muted">
                  <p className="text-xs text-muted-foreground italic">
                    All spend beyond reward limits earns 1x Ventus Point per dollar.
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits
