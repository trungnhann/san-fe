import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-8">
         <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
         </Link>
         <div className="flex justify-center mb-6">
            <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SB</span>
            </div>
         </div>
         <h1 className="text-center text-2xl font-bold text-slate-900">
            Welcome to San Blog
         </h1>
      </div>
      {children}
    </div>
  )
}
