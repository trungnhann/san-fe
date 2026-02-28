import { Post } from "@/services/post.service"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden flex flex-col h-full border-slate-100 shadow-sm hover:shadow-md transition-shadow dark:border-slate-800 dark:bg-slate-900">
      <div className="p-6 pb-3">
        <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-xl leading-tight line-clamp-2 hover:text-blue-600 cursor-pointer dark:text-slate-100 dark:hover:text-blue-400">
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </h3>
             <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full flex items-center gap-1 dark:bg-slate-800 dark:text-slate-300">
                {post.locale || "English"}
            </span>
        </div>
        
        <div className="relative aspect-video w-full overflow-hidden rounded-md bg-slate-100 mb-4 dark:bg-slate-800">
            {post.image_url ? (
                <Image 
                    src={post.image_url} 
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-400">
                    No Image
                </div>
            )}
        </div>
      </div>

      <CardContent className="flex-1 pb-2">
         <div className="flex items-center text-xs text-slate-500 mb-2 gap-2 dark:text-slate-400">
            <span>Published {new Date(post.created_at).toLocaleDateString()}</span>
            <span>•</span>
            <span className="text-blue-600 font-medium dark:text-blue-400">@{post.author_username}</span>
         </div>
         <p className="text-slate-600 text-sm line-clamp-3 dark:text-slate-300">
            {post.abstract || post.body.substring(0, 150) + "..."}
         </p>
      </CardContent>
    </Card>
  )
}
