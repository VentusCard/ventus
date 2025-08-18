import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Brain, Target, TrendingUp, Zap, Shield, MessageCircle, ArrowRight, Bot, User, Sparkles } from "lucide-react";
const VentusAI = () => {
  // Auto-scroll disabled per user request
  const scrollToChat = () => {
    // Scroll functionality disabled
  };
  const features = [{
    icon: Brain,
    title: "Intelligent Analysis",
    description: "AI analyzes your spending patterns and lifestyle preferences to identify the best reward opportunities"
  }, {
    icon: Target,
    title: "Personalized Recommendations",
    description: "Get tailored suggestions for maximizing rewards based on your unique spending habits"
  }, {
    icon: TrendingUp,
    title: "Real-time Optimization",
    description: "Continuous learning and adaptation to ensure you're always earning maximum rewards"
  }, {
    icon: Zap,
    title: "Instant Insights",
    description: "Quick answers to your reward questions and immediate optimization suggestions"
  }, {
    icon: Shield,
    title: "Secure & Private",
    description: "Your financial data is protected with enterprise-grade security and privacy measures"
  }, {
    icon: Sparkles,
    title: "AI Shopping",
    description: "Secures eligible deals and completes wishlist items purchases with your permission"
  }];
  const steps = [{
    step: "1",
    title: "Connect Your Data",
    description: "Securely link your financial accounts to give Ventus AI insight into your spending patterns"
  }, {
    step: "2",
    title: "AI Analysis",
    description: "Our AI analyzes your transactions, categories, and preferences to understand your lifestyle"
  }, {
    step: "3",
    title: "Personalized Strategy",
    description: "Receive a customized reward optimization strategy tailored specifically to your spending habits"
  }, {
    step: "4",
    title: "Continuous Optimization",
    description: "Ventus AI continuously learns and adapts, ensuring you're always maximizing your rewards"
  }];
  return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2 py-[12px]">
            <Bot className="h-12 w-12 text-blue-400 mr-4" />
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              Ventus AI
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-white/80 mb-3 max-w-6xl mx-auto leading-relaxed">Your intelligent assistant for maximizing rewards. Get personalized insights, deals, and instant answers to all your reward questions.</p>
          
        </div>
      </section>

      {/* What Ventus AI Does Section */}
      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">What Ventus AI Can Do For You</h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Harness the power of artificial intelligence to unlock maximum value from your credit card rewards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => <Card key={index} className="premium-card hover:border-white/20 transition-all duration-300">
              <CardHeader className="text-center pb-1">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="card-title text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-1">
                <p className="card-description text-center leading-snug text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>)}
        </div>
      </section>

      {/* How It Works Section */}
      

      {/* Chatbot Section */}
      

      {/* Live Chatbot Section */}
      <section id="live-chat-section" className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Try Ventus AI Live
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Experience our AI assistant in real-time. Get instant answers about credit card rewards and personalized optimization strategies.
          </p>
        </div>

        <Card className="premium-card max-w-6xl mx-auto">
          <CardContent className="p-3 md:p-4">
            <div className="w-full chat-container">
              <iframe src="https://udify.app/chatbot/JdL6WFvmKXjD3NaU" className="responsive-chat-iframe" frameBorder="0" allow="microphone" title="Ventus AI Live Chatbot" loading="lazy" />
            </div>
            
            <p className="text-white/50 text-sm text-center mt-2">Ventus AI is currently in development. Join our waitlist to be the first to experience Ventus Smart Rewards.</p>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto text-center">
        <Card className="premium-card max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold card-title mb-3">
              Ready to Maximize Your Rewards?
            </h2>
            <p className="text-xl card-description mb-4 max-w-2xl mx-auto">
              Join thousands of users who are already earning more with intelligent reward optimization. Be among the first to experience Ventus AI.
            </p>
            <Link to="/smartrewards">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
      
      <Footer />
    </div>;
};
export default VentusAI;