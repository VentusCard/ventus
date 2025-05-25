
import { Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const benefitTiers = [
  {
    name: "Standard",
    description: "Smart rewards. Zero cost.",
    price: "$0",
    period: "/month",
    features: [
      "2x points on goal-related purchases",
      "Mobile wallet + virtual card access",
      "Core travel protection"
    ],
    highlighted: false
  },
  {
    name: "Premium",
    description: "Built for motivated spenders.",
    price: "$9.99",
    period: "/month",
    features: [
      "4x points on top category, 2x on others (monthly caps apply)",
      "Quarterly goal rewards + merchant boosts",
      "2 lounge visits + enhanced protection"
    ],
    highlighted: true
  },
  {
    name: "Elite",
    description: "Engineered for high-impact living.",
    price: "$29.99",
    period: "/month",
    features: [
      "5x points on goal-aligned spend, 3x on all else (monthly caps apply)",
      "Unlimited lounge access + smart travel perks",
      "Concierge, VIP invites & stackable offers"
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
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto">
            All spend beyond limits earns 1x Ventus Point per dollar. Points redeem at $0.01/point value.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Benefits
