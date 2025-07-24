import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Brain, Target, TrendingUp, Zap, Shield, MessageCircle, ArrowRight, Bot, User, Sparkles } from "lucide-react";

const VentusAI = () => {
  const features = [
    {
      icon: Brain,
      title: "Intelligent Analysis",
      description: "AI analyzes your spending patterns and lifestyle preferences to identify the best reward opportunities"
    },
    {
      icon: Target,
      title: "Personalized Recommendations",
      description: "Get tailored suggestions for maximizing rewards based on your unique spending habits"
    },
    {
      icon: TrendingUp,
      title: "Real-time Optimization",
      description: "Continuous learning and adaptation to ensure you're always earning maximum rewards"
    },
    {
      icon: Zap,
      title: "Instant Insights",
      description: "Quick answers to your reward questions and immediate optimization suggestions"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your financial data is protected with enterprise-grade security and privacy measures"
    },
    {
      icon: Sparkles,
      title: "Smart Predictions",
      description: "Anticipate future reward opportunities and optimize your spending strategy"
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Connect Your Data",
      description: "Securely link your financial accounts to give Ventus AI insight into your spending patterns"
    },
    {
      step: "2", 
      title: "AI Analysis",
      description: "Our AI analyzes your transactions, categories, and preferences to understand your lifestyle"
    },
    {
      step: "3",
      title: "Personalized Strategy",
      description: "Receive a customized reward optimization strategy tailored specifically to your spending habits"
    },
    {
      step: "4",
      title: "Continuous Optimization",
      description: "Ventus AI continuously learns and adapts, ensuring you're always maximizing your rewards"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Bot className="h-12 w-12 text-blue-400 mr-4" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              Ventus AI
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your intelligent assistant for maximizing credit card rewards. Get personalized insights, optimization strategies, and instant answers to all your reward questions.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            Start Chatting with Ventus AI
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* What Ventus AI Does Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Ventus AI Does for You
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Harness the power of artificial intelligence to unlock maximum value from your credit card rewards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="premium-card border-white/10 hover:border-white/20 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-center leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How Ventus AI Works
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Four simple steps to transform how you earn and maximize credit card rewards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="premium-card border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                    {step.step}
                  </div>
                  <CardTitle className="text-white text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-center text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-white/30" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Chatbot Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Chat with Ventus AI
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Get instant answers to your reward questions and personalized optimization advice
          </p>
        </div>

        <Card className="premium-card border-white/10 max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="bg-slate-800/50 rounded-xl p-6 mb-6 min-h-[400px] border border-white/10">
              <div className="flex items-center mb-4">
                <Bot className="h-6 w-6 text-blue-400 mr-2" />
                <span className="text-white font-medium">Ventus AI</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Bot className="h-8 w-8 text-blue-400 mt-1" />
                  <div className="bg-blue-600/20 rounded-lg p-4 text-white/90">
                    Hello! I'm Ventus AI, your personal credit card rewards assistant. I can help you optimize your spending, find the best cards for your lifestyle, and answer any questions about maximizing your rewards. What would you like to know?
                  </div>
                </div>
                <div className="flex items-start space-x-3 justify-end">
                  <div className="bg-white/10 rounded-lg p-4 text-white/90 max-w-xs">
                    What's the best credit card for dining rewards?
                  </div>
                  <User className="h-8 w-8 text-white/60 mt-1" />
                </div>
                <div className="flex items-start space-x-3">
                  <Bot className="h-8 w-8 text-blue-400 mt-1" />
                  <div className="bg-blue-600/20 rounded-lg p-4 text-white/90">
                    Great question! Based on current market analysis, the best dining cards offer 3-4x points per dollar. However, the "best" card depends on your specific spending patterns. Would you like me to analyze your dining habits and recommend the optimal card for your lifestyle?
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Ask Ventus AI anything about credit card rewards..."
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
            
            <p className="text-white/50 text-sm text-center mt-4">
              Ventus AI is currently in development. Join our waitlist to be the first to experience intelligent reward optimization.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <Card className="premium-card border-white/10 max-w-4xl mx-auto">
          <CardContent className="p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Maximize Your Rewards?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already earning more with intelligent reward optimization. Be among the first to experience Ventus AI.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Join the Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default VentusAI;