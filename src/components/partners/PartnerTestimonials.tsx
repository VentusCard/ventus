import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
interface Testimonial {
  id: number;
  quote: string;
  author: string;
  company: string;
  role: string;
}

// Placeholder testimonials - you can replace these with real data
const testimonials: Testimonial[] = [{
  id: 1,
  quote: "Working with Ventus has transformed how we connect with our customers. The AI-powered targeting is incredibly accurate.",
  author: "Sarah Johnson",
  company: "Premium Golf Resort",
  role: "Marketing Director"
}, {
  id: 2,
  quote: "The conversion rates we've seen since partnering with Ventus are unprecedented. It's a game-changer for our business.",
  author: "Michael Chen",
  company: "Elite Country Club",
  role: "General Manager"
}, {
  id: 3,
  quote: "Ventus Card's technology helped us reach exactly the right customers at the perfect time. ROI has never been better.",
  author: "Amanda Davis",
  company: "Luxury Spa & Resort",
  role: "Chief Marketing Officer"
}];
const PartnerTestimonials = () => {
  return <section className="py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 bg-clip-text text-transparent">
            What Our Partners Say
          </h2>
          
        </div>

        <Carousel opts={{
        align: "start",
        loop: true
      }} className="w-full max-w-5xl mx-auto">
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map(testimonial => <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <Quote className="h-8 w-8 text-blue-600 mb-4 flex-shrink-0" />
                    <blockquote className="text-slate-700 mb-6 flex-grow leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="mt-auto">
                      <cite className="not-italic">
                        <div className="font-semibold text-slate-900">{testimonial.author}</div>
                        <div className="text-sm text-slate-600">{testimonial.role}</div>
                        <div className="text-sm font-medium text-blue-600">{testimonial.company}</div>
                      </cite>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>)}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>

        <div className="flex justify-center mt-8 md:hidden">
          <p className="text-sm text-slate-500">Swipe to see more testimonials</p>
        </div>
      </div>
    </section>;
};
export default PartnerTestimonials;