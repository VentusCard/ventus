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
  features: ["Includes everything in Standard, plus:", "5x points on in-goal purchases in one main category, up to $1000 per month", "Enjoy personalized cross rewards with aligned merchant offers", "Receive deals from up to 3 selected subcategories", "Update your main category goal every 6 months"],
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
  return;
};
export default Benefits;