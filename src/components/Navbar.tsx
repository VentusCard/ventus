
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-50">
      <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center mr-4 gap-2">
          <span className="text-3xl font-bold">+</span>
        </div>
        <NavigationMenu className="mx-auto hidden md:flex">
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-white/20 hover:bg-white/30 text-white")} href="#home">
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-white/20 hover:bg-white/30 text-white")} href="#features">
                Our Story
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-white/20 hover:bg-white/30 text-white")} href="#benefits">
                FAQ
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-white/20 hover:bg-white/30 text-white cursor-pointer")} asChild>
                <Link to="/rewards">Policies</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto">
          <Button variant="ghost" size="icon" className="rounded-full text-white">
            <Phone className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
