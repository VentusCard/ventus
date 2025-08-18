import { Check, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const benefitTiers = [{
  name: "Standard",
  description: "Smart rewards. Zero cost.",
  price: "$0",
  period: "/year",
  features: ["3x points on in-goal purchases in one main category, up to $500 per month", "Access to a virtual card with full analytics dashboard", "Select a main category goal every year", "Receive deals from up to 1 selected subcategories", "Various point redemption methods"],
  highlighted: false
}, {
  name: "Premium",
  description: "Tailored rewards for everyday achievers.",
  price: "$99",
  period: "/year",
  features: ["Includes everything in Standard, plus:", "5x points on in-goal purchases in one main category", "Enjoy personalized cross rewards with aligned merchant offers", "Receive deals from up to 3 selected subcategories", "Update your main category goal every 6 months"],
  highlighted: true
}, {
  name: "Elite",
  description: "Comprehensive reward for high-impact living.",
  price: "$199",
  period: "/year",
  features: ["Includes everything in Premium, plus:", "5x points on unlimited in-goal purchases in up to 3 main goals (e.g. Sports, Wellness and Pets)", "Access to exclusive events, stackable offers, and VIP perks", "All merchant offers will be automatically applied", "Receive deals from up to 5 selected subcategories", "Personalized concierge support and AI powered shopping experience"],
  highlighted: false
}];
const Benefits = () => {
  return <section id="benefits" className="py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ventus Card Membership Benefits</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            One card, three tiers—designed to grow with your lifestyle
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {benefitTiers.map((tier, index) => <Card key={index} className={`border ${tier.highlighted ? 'relative border-primary/50 shadow-lg shadow-primary/10' : ''}`}>
              {tier.highlighted && <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground text-sm font-medium py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>}
              <CardHeader className={`pb-4 ${tier.highlighted ? 'pt-8' : 'pt-6'}`}>
                <CardTitle className="font-display text-xl">{tier.name}</CardTitle>
                <p className="text-muted-foreground mt-2">{tier.description}</p>
                <div className="mt-3">
                  <span className="font-display text-3xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <ul className="space-y-2 mb-4">
                  {tier.features.map((feature, i) => <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </li>)}
                </ul>
              </CardContent>
            </Card>)}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground italic max-w-2xl mx-auto">All other eligible spend earns 1x point per dollar. Terms and conditions apply.</p>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center">
          
        </div>
      </div>
    </section>;
};
export default Benefits;