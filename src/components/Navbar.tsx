
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center mr-4 gap-2">
          <span className="text-3xl font-bold text-white">+</span>
        </div>
        <NavigationMenu className="mx-auto hidden md:flex">
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-white/10 hover:bg-white/20 text-white border border-white/10")} href="#home">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-white/10 hover:bg-white/20 text-white border border-white/10")} href="#features">
                Our Story
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-white/10 hover:bg-white/20 text-white border border-white/10")} href="#benefits">
                FAQ
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-white/10 hover:bg-white/20 text-white border border-white/10 cursor-pointer")} asChild>
                <Link to="/rewards">Policies</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto">
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
            <Phone className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
