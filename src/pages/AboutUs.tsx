
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Award, Heart } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-[80px] pb-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          
        </div>
      </div>

      {/* Our Story Section */}
      <div className="px-4 md:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm mb-8">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-bold text-slate-900 text-center">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 space-y-3 text-lg leading-relaxed pt-0">
              <p>
                Ventus was born out of a simple frustration: juggling multiple credit cards just to optimize rewards—and still missing out. As avid spenders across sports, wellness, travel, and daily essentials, our co-founders, both longtime friends and wallet nerds, kept asking the same question: Why isn't there a single card that adapts to how we actually live?
              </p>
              <p>
                Meanwhile, merchants were running endless one-size-fits-all promotions, with little visibility into who they were really reaching or how those offers performed.
              </p>
              <p>
                Ventus is our answer. We built a card that aligns directly with your lifestyle goals—whether that's golf, mental wellness, or pet care—powered by an AI assistant that tracks your interests and finds the best rewards and deals, automatically. For merchants, we offer targeting tools that connect them to the exact audiences they want—based on real behavior, not assumptions.
              </p>
              <p>
                Ventus bridges the gap between everyday spenders and the merchants who want to reach them—intelligently, transparently, and rewardingly.
              </p>
            </CardContent>
          </Card>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-900">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Team Section */}
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
            
            
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
