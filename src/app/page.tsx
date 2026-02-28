import { Button } from "@/components/ui/button"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PostCard } from "@/components/post-card"
import { ArrowRight, Code, Terminal, Zap, Cpu } from "lucide-react"
import Link from "next/link"

const MOCK_POSTS = [
  {
    id: "1",
    title: "Let the Wind Carry It Away",
    description: "In Hue, Minh is lonely because of a broken love affair. Returning to Saigon, Minh tries to study and passes the university entrance exam. Her mother gets sick...",
    publishedAt: "3 months ago",
    author: "tumivn",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop",
    category: "Story",
  },
  {
    id: "2",
    title: "Is it too late to save?",
    description: "Self-questioning about never really saving for big goals. Recognizing over-optimism about income and procrastination. Comparing the current situation with...",
    publishedAt: "18 days ago",
    author: "tumivn",
    imageUrl: "https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?q=80&w=2096&auto=format&fit=crop",
    category: "Finance",
  },
  {
    id: "3",
    title: "When Anyone Can Make Software",
    description: "The barrier to software creation has collapsed, enabling non-professionals to build tools and web apps. This democratization changes the landscape for developers...",
    publishedAt: "18 days ago",
    author: "tumivn",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    category: "Tech",
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent dark:from-blue-900/20 dark:via-transparent dark:to-transparent opacity-70"></div>
          <div className="container relative mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/50 px-3 py-1 text-sm text-slate-600 backdrop-blur-sm dark:border-slate-800 dark:bg-white/5 dark:text-slate-400">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
                Exploring the future of tech
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                Crafting Digital <br className="hidden md:block" /> Experiences
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                A minimalist space for sharing thoughts on software engineering, design patterns, and the ever-evolving world of technology.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800 h-12 px-8 text-base dark:bg-white dark:text-black dark:hover:bg-slate-200 transition-all duration-300 hover:scale-105">
                  Start Reading <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                 <Link href="/about">
                  <Button variant="outline" className="rounded-full border-slate-200 hover:bg-slate-100 h-12 px-8 text-base dark:border-slate-800 dark:hover:bg-slate-900 transition-all duration-300">
                    About Me
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-4 md:left-20 -translate-y-1/2 opacity-10 dark:opacity-20 hidden lg:block">
            <Code className="h-24 w-24 text-blue-500" />
          </div>
          <div className="absolute top-1/3 right-4 md:right-20 -translate-y-1/2 opacity-10 dark:opacity-20 hidden lg:block">
            <Terminal className="h-16 w-16 text-purple-500" />
          </div>
          <div className="absolute bottom-20 left-1/3 opacity-5 dark:opacity-10 hidden md:block">
            <Cpu className="h-32 w-32 text-slate-500" />
          </div>
        </section>

        {/* Featured Content */}
        <section className="py-20 bg-slate-50/50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800/50">
          <div className="container mx-auto px-4">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                        <Code className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Modern Stack</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Exploring the latest frameworks and tools in web development.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="h-12 w-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                        <Zap className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Performance</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Optimizing applications for speed, accessibility and SEO.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 group">
                    <div className="h-12 w-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                        <Terminal className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">DevOps</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Streamlining deployment pipelines and infrastructure.</p>
                </div>
             </div>
          </div>
        </section>

        {/* Latest Posts Section */}
        <section className="container mx-auto px-4 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Latest Writings
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Thoughts, tutorials, and stories from the blog.
              </p>
            </div>
            <Button variant="ghost" className="group text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
              View all posts <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_POSTS.map((post) => (
              <PostCard 
                key={post.id} 
                post={{
                  id: post.id,
                  title: post.title,
                  slug: post.id, 
                  image_url: post.imageUrl,
                  abstract: post.description,
                  body: post.description,
                  published: true,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  author_username: post.author,
                  author_name: post.author,
                  like_count: 0,
                  user_has_liked: false,
                  locale: post.category
                }} 
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
