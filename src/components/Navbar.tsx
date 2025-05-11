
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { CreditCard } from "lucide-react"

const Navbar = () => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center mr-4 gap-2">
          <CreditCard className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Ventus Card</span>
        </div>
        <NavigationMenu className="mx-4 md:mx-6 hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#features">
                Features
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#benefits">
                Benefits
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#rewards">
                Rewards
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex gap-3">
          <Button variant="outline">Log In</Button>
          <Button>Apply Now</Button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
