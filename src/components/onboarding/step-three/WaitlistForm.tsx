
import { Card, CardContent } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from "@/components/ui/select";
import { LifestyleGoal } from "@/pages/HowItWorks";

const lifestyleCategories: {label: string, value: LifestyleGoal}[] = [
  { label: "Sports", value: "sports" },
  { label: "Wellness", value: "wellness" },
  { label: "Pets", value: "pets" },
  { label: "Gamers", value: "gamers" },
  { label: "Creatives", value: "creatives" },
  { label: "Homeowners", value: "homeowners" }
];

const WaitlistForm = () => {
  return (
    <Card className="overflow-hidden border-0 shadow-premium bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50/50">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
      <CardContent className="p-8">
        <h3 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
            <Shield className="text-white" size={24} />
          </div>
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Join the Waitlist
          </span>
        </h3>
        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
          Be among the first to experience the personalized Ventus Card. We'll notify you when applications open. Ventus is only available in the USA for eligible customers.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 uppercase tracking-wide">First Name</label>
            <Input 
              placeholder="First Name" 
              className="bg-white border-slate-200 focus:border-blue-400 transition-all duration-200 h-12 text-base" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 uppercase tracking-wide">Last Name</label>
            <Input 
              placeholder="Last Name" 
              className="bg-white border-slate-200 focus:border-blue-400 transition-all duration-200 h-12 text-base" 
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700 uppercase tracking-wide">Main Category</label>
            <Select>
              <SelectTrigger className="bg-white border-slate-200 focus:border-blue-400 transition-all duration-200 h-12 text-base">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {lifestyleCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-3">
            <label className="block text-sm font-semibold mb-2 text-slate-700 uppercase tracking-wide">Email Address</label>
            <Input 
              placeholder="Email Address" 
              type="email"
              className="bg-white border-slate-200 focus:border-blue-400 transition-all duration-200 h-12 text-base" 
            />
          </div>
        </div>
        
        <Button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg transition-all duration-200 h-12 px-8 text-base font-semibold hover:scale-105 active:scale-95">
          Join the Waitlist
        </Button>
      </CardContent>
    </Card>
  );
};

export default WaitlistForm;
