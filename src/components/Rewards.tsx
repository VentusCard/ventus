
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const rewardCategories = [
  {
    name: "Travel",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05",
    description: "Earn 5x points on flights, hotels, car rentals and all travel expenses",
  },
  {
    name: "Dining",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
    description: "3x points at restaurants, cafes, and food delivery services worldwide",
  },
  {
    name: "Entertainment",
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37",
    description: "2x points on streaming services, movie theaters, and event tickets",
  },
  {
    name: "Shopping",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    description: "Exclusive discounts and bonus points at selected retail partners",
  },
  {
    name: "Wellness",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
    description: "Special rewards for gym memberships and wellness services",
  }
]

const Rewards = () => {
  return (
    <section id="rewards" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Exceptional Rewards</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Earn points in categories that match your lifestyle
          </p>
        </div>
        
        <Carousel className="max-w-5xl mx-auto">
          <CarouselContent>
            {rewardCategories.map((category, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="border-none shadow-md overflow-hidden h-[340px]">
                  <div className="relative h-40">
                    <div className="absolute inset-0 bg-black/50"></div>
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="font-display text-white text-2xl font-bold">{category.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious className="-left-12" />
            <CarouselNext className="-right-12" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}

export default Rewards
