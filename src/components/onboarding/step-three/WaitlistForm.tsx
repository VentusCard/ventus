
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
    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-blue-50 to-sky-50">
      <div className="h-1.5 bg-gradient-to-r from-blue-400 to-sky-300"></div>
      <CardContent className="p-6">
        <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
          <Shield className="text-blue-500" size={20} />
          <span>Join the Waitlist</span>
        </h3>
        <p className="text-slate-600 mb-6">
          Be among the first to experience the personalized Ventus Card. We'll notify you when applications open. Ventus is only available in the USA for eligible customers.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <Input placeholder="First Name" className="bg-white border-slate-200 focus:border-blue-300 transition-all duration-200" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <Input placeholder="Last Name" className="bg-white border-slate-200 focus:border-blue-300 transition-all duration-200" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Main Category</label>
            <Select>
              <SelectTrigger className="bg-white border-slate-200 focus:border-blue-300 transition-all duration-200">
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
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <Input placeholder="Email Address" className="bg-white border-slate-200 focus:border-blue-300 transition-all duration-200" />
          </div>
        </div>
        
        <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md transition-all duration-200">
          Join the Waitlist
        </Button>
      </CardContent>
    </Card>
  );
};

export default WaitlistForm;
