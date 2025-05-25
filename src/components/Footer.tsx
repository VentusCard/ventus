
import { CreditCard } from "lucide-react"

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <CreditCard className="h-6 w-6 text-blue-400" />
          <span className="font-display font-bold text-xl text-white">Ventus Card</span>
        </div>
        <p className="text-sm text-slate-300">© 2025 Ventus Card. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
