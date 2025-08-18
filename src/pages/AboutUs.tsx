import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Award, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const AboutUs = () => {
  const values = [{
    icon: Target,
    title: "Our Mission",
    description: "To revolutionize personal finance by creating personalized rewards that align with your values and lifestyle goals."
  }, {
    icon: Heart,
    title: "Our Values",
    description: "We believe in transparency, sustainability, and empowering individuals to make choices that reflect their personal values."
  }, {
    icon: Award,
    title: "Our Promise",
    description: "To deliver a premium experience that rewards you for living authentically while making a positive impact."
  }, {
    icon: Users,
    title: "Our Community",
    description: "Building a community of conscious consumers who want their spending to reflect their values and aspirations."
  }];
  return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Atmospheric Blue Overlays */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <div className="pt-[80px] pb-8 px-4 md:px-8">
          <div className="max-w-6xl mx-auto text-center">
            
            
          </div>
        </div>

        {/* Our Story Section */}
        <div className="px-4 md:px-8 pb-8">
          <div className="max-w-6xl mx-auto">
            <Card className="premium-card mb-8">
              <CardHeader className="pb-4">
                <CardTitle className="text-3xl font-bold card-title text-center">Our Story</CardTitle>
              </CardHeader>
              <CardContent className="card-description space-y-3 text-lg leading-relaxed pt-0">
                <p>
                  Ventus was born out of a simple frustration: juggling multiple credit cards just to optimize rewards—and still missing out. As avid spenders across sports, wellness, travel, and daily essentials, our co-founders, both longtime friends and wallet nerds, kept asking the same question: Why isn't there a single card that adapts to how we actually live?
                </p>
                <p>
                  Meanwhile, merchants were running endless one-size-fits-all promotions, with little visibility into who they were really reaching or how those offers performed.
                </p>
                <p>Ventus is our answer. We built a card that aligns directly with your lifestyle goals—whether that's golf, wellness, gaming, or pet care—powered by an AI assistant that tracks your interests and finds the best rewards and deals, automatically. For merchants, we offer targeting tools that connect them to the exact audiences they want—based on real behavior, not assumptions.</p>
                <p>
                  Ventus bridges the gap between everyday spenders and the merchants who want to reach them—intelligently, transparently, and rewardingly.
                </p>
              </CardContent>
            </Card>

            {/* Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {values.map((value, index) => <Card key={index} className="premium-card hover:border-white/20 transition-all duration-300">
                  <CardHeader className="pb-3 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl card-title">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="card-description text-center leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>)}
            </div>

            {/* Team Section */}
            <Card className="premium-card">
              
              
            </Card>

            {/* CTA Section */}
            <div className="mt-12 text-center">
              <div className="max-w-2xl mx-auto mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Ready to Experience Ventus?
                </h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  Discover how Ventus Card can transform your spending into personalized rewards that align with your lifestyle.
                </p>
              </div>
              <Link to="/smartrewards">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  Learn How Ventus Smart Rewards Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>;
};
export default AboutUs;