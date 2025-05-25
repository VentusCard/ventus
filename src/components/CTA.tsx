
import { Button } from "@/components/ui/button"

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Ready to Experience Ventus Card?</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
          Apply today and elevate your financial experience with premium benefits and rewards designed for your lifestyle.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-white text-blue-900 hover:bg-white/90">
            Join Waitlist
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CTA
