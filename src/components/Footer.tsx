
import { CreditCard } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="h-6 w-6 text-blue-400" />
              <span className="font-bold text-xl text-white">Ventus Card</span>
            </div>
            <p className="text-sm">
              Redefining premium credit card experiences with unmatched benefits and rewards.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Standard Card</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Premium Card</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Elite Card</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Business Solutions</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cardholder Agreement</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 2025 Ventus Card. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
