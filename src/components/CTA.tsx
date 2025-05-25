
import { Button } from "@/components/ui/button"
import { CreditCard } from "lucide-react"

const CTA = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Experience Ventus Card?</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
          Apply today and elevate your financial experience with premium benefits and rewards designed for your lifestyle.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Button size="lg" className="bg-white text-blue-900 hover:bg-white/90">
            Join Waitlist
          </Button>
        </div>
        
        {/* Footer content integrated */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <CreditCard className="h-6 w-6 text-blue-400" />
              <span className="font-display font-bold text-xl text-white">Ventus Card</span>
            </div>
            <p className="text-sm text-slate-300">© 2025 Ventus Card. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
