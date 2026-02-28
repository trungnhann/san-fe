import Link from "next/link"
import { Github, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Sắn Blog</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Sharing knowledge, insights, and stories about technology and development.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Documentation</Link></li>
              <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Guides</Link></li>
              <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4 uppercase tracking-wider">Social</h3>
            <div className="flex space-x-4">
              <Link href="https://github.com/trungnhann" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://www.instagram.com/nqtnh._/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-pink-600 dark:text-slate-400 dark:hover:text-pink-400 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} San Blog. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
