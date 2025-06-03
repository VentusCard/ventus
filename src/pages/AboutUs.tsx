
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Award, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutUs = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To revolutionize personal finance by creating personalized rewards that align with your values and lifestyle goals."
    },
    {
      icon: Heart,
      title: "Our Values",
      description: "We believe in transparency, sustainability, and empowering individuals to make choices that reflect their personal values."
    },
    {
      icon: Award,
      title: "Our Promise",
      description: "To deliver a premium experience that rewards you for living authentically while making a positive impact."
    },
    {
      icon: Users,
      title: "Our Community",
      description: "Building a community of conscious consumers who want their spending to reflect their values and aspirations."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      bio: "Former fintech executive with 15+ years experience building consumer financial products."
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Product",
      bio: "Product leader passionate about creating user-centered experiences that drive meaningful engagement."
    },
    {
      name: "Dr. Emily Watson",
      role: "Chief Data Scientist",
      bio: "AI researcher specializing in personalization algorithms and behavioral analytics."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-[100px] pb-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            About Ventus Card
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            We're reimagining credit cards for the modern consumer. Ventus Card delivers personalized rewards that align with your lifestyle, values, and aspirations—making every purchase meaningful.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="px-4 md:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm mb-16">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-slate-900 text-center">Our Story</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-600 space-y-4 text-lg leading-relaxed">
              <p>
                Ventus Card was born from a simple observation: traditional credit cards offer generic rewards that don't reflect who you are or what you care about. Whether you're passionate about sustainability, fitness, travel, or supporting local businesses, your spending should be rewarded in ways that matter to you.
              </p>
              <p>
                Founded in 2024, we set out to create the first truly personalized credit card experience. Using advanced AI and behavioral analytics, we learn from your preferences and lifestyle to deliver rewards that feel tailored just for you.
              </p>
              <p>
                Today, we're building a community of conscious consumers who want their financial choices to reflect their values while earning meaningful rewards along the way.
              </p>
            </CardContent>
          </Card>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-900">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Team Section */}
          <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-slate-900 text-center mb-8">Meet Our Team</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {team.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-xl">{member.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
