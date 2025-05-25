
import { CreditCard } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-black text-slate-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-lg tracking-[0.15em] font-sans font-light text-white/95 relative">
              <span className="relative inline-block">
                VENTUS CARD
                {/* Subtle metallic sheen effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40 blur-[1px]"></div>
                {/* Fine underline accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              </span>
            </h1>
          </div>
          <p className="text-sm">© 2025 Ventus Card. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
