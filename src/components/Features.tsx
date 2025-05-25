
import { CreditCard, Shield, Zap, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Shield,
    title: "Enhanced Security",
    description: "Advanced fraud protection with real-time notifications and instant card freeze capability."
  },
  {
    icon: Smartphone,
    title: "Digital First",
    description: "Manage everything from our award-winning mobile app with intuitive controls and insights."
  },
  {
    icon: Zap,
    title: "Instant Rewards",
    description: "Points and cashback are applied instantly after every eligible purchase, no waiting periods."
  },
  {
    icon: CreditCard,
    title: "Global Acceptance",
    description: "Use your Ventus Card anywhere in the world with no foreign transaction fees."
  }
]

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow bg-slate-50/50">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-slate-700" />
                </div>
                <CardTitle className="font-display">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
