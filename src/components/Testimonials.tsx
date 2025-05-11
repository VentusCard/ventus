
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    quote: "The Ventus Card has completely changed how I manage my finances. The rewards are fantastic and the app is intuitive.",
    author: "Sarah J.",
    title: "Marketing Director",
    avatar: "SJ"
  },
  {
    quote: "I travel frequently for work, and the travel benefits alone have saved me thousands of dollars this year.",
    author: "Michael T.",
    title: "Software Engineer",
    avatar: "MT"
  },
  {
    quote: "Customer service is outstanding. They've helped me resolve issues immediately, even when traveling abroad.",
    author: "Priya K.",
    title: "Entrepreneur",
    avatar: "PK"
  }
]

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">What Our Cardholders Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied Ventus Card members
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="h-32 flex items-center mb-6">
                  <p className="italic text-lg">&ldquo;{item.quote}&rdquo;</p>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {item.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{item.author}</p>
                    <p className="text-sm text-muted-foreground">{item.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
