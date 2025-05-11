
import { Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const benefitTiers = [
  {
    name: "Standard",
    description: "Perfect for everyday spending",
    price: "$0",
    period: "/month",
    features: [
      "2% cashback on essential purchases",
      "No annual fee",
      "Virtual card access",
      "Basic travel insurance"
    ],
    highlighted: false
  },
  {
    name: "Premium",
    description: "Enhanced benefits for active users",
    price: "$9.99",
    period: "/month",
    features: [
      "4% cashback on essentials",
      "2% on all other purchases",
      "Airport lounge access (2 visits/year)",
      "Enhanced travel and purchase insurance",
      "Priority customer support"
    ],
    highlighted: true
  },
  {
    name: "Elite",
    description: "Unparalleled privileges",
    price: "$29.99",
    period: "/month",
    features: [
      "5% cashback on essentials",
      "3% on all other purchases",
      "Unlimited airport lounge access",
      "Comprehensive travel and purchase protection",
      "24/7 concierge service",
      "Exclusive event invitations"
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
              <CardHeader className={`pb-8 ${tier.highlighted ? 'pt-8' : 'pt-6'}`}>
                <CardTitle className="font-display text-xl">{tier.name}</CardTitle>
                <p className="text-muted-foreground mt-2">{tier.description}</p>
                <div className="mt-4">
                  <span className="font-display text-3xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits
