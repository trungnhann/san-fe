"use client"

import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Camera, Loader2, FileText, Settings, User as UserIcon, Mail, AtSign, Edit2, Check, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/auth-context"
import { userService } from "@/services/user.service"
import { Header } from "@/components/layout/header"
import { postService, Post } from "@/services/post.service"
import { PostCard } from "@/components/post-card"
import { Footer } from "@/components/layout/footer"

const profileSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoadingPosts, setIsLoadingPosts] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: user?.username || "",
      bio: user?.bio || "",
    },
  })

  useEffect(() => {
    if (user) {
      reset({
        username: user.username || "",
        bio: user.bio || "",
      })
    }
  }, [user?.username, user?.bio, reset])

  useEffect(() => {
    async function fetchPosts() {
      if (!user?.id) return
      try {
        const data = await postService.getUserPosts(user.id)
        setPosts(data)
      } catch (error) {
        console.error("Failed to fetch posts:", error)
      } finally {
        setIsLoadingPosts(false)
      }
    }
    
    fetchPosts()
  }, [user?.id])

  // Handle avatar upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return

    setIsUploading(true)
    setMessage(null)

    try {
      const updatedUser = await userService.uploadAvatar(user.id, file)
      
      // Update local storage and context
      updateUser(updatedUser)
      
      setMessage({ type: 'success', text: "Avatar updated successfully" })
    } catch (error: any) {
      console.error(error)
      setMessage({ type: 'error', text: error.message || "Failed to upload avatar" })
    } finally {
      setIsUploading(false)
    }
  }

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return

    setIsLoading(true)
    setMessage(null)

    try {
      const updatedUser = await userService.updateUser(user.id, data)
      updateUser(updatedUser)
      setMessage({ type: 'success', text: "Profile updated successfully" })
      setIsEditing(false)
    } catch (error: any) {
      console.error(error)
      setMessage({ type: 'error', text: error.message || "Failed to update profile" })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
        <Loader2 className="h-8 w-8 animate-spin text-slate-900 dark:text-white" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20">
        {/* Profile Header Banner */}
        <div className="relative h-48 md:h-64 bg-slate-100 dark:bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent dark:from-blue-900/20 dark:via-transparent dark:to-transparent opacity-70"></div>
        </div>
        
        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Profile Info Card */}
            <div className="flex flex-col md:flex-row items-end md:items-center gap-6 mb-12">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white dark:border-black shadow-xl rounded-full">
                  <AvatarImage src={user.image} className="object-cover" />
                  <AvatarFallback className="text-4xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Camera className="text-white h-8 w-8" />
                </div>
                {isUploading && (
                  <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center z-20">
                    <Loader2 className="text-white h-8 w-8 animate-spin" />
                  </div>
                )}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
              />
              
              <div className="flex-1 pb-4 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{user.username}</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-center md:justify-start gap-2">
                  <Mail className="h-4 w-4" /> {user.email}
                </p>
                {user.bio && (
                  <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed border-l-2 border-slate-200 dark:border-slate-800 pl-4 italic">
                    {user.bio}
                  </p>
                )}
              </div>
            </div>

            <Tabs defaultValue="posts" className="w-full">
              <div className="flex justify-center mb-12">
                <TabsList className="grid w-full max-w-[400px] grid-cols-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-full">
                  <TabsTrigger 
                    value="posts" 
                    className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>My Posts</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="settings" 
                    className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm transition-all duration-300"
                  >
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="posts" className="space-y-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                {isLoadingPosts ? (
                  <div className="flex justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-slate-900 dark:text-white" />
                  </div>
                ) : posts && posts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map(post => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                    <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-400">
                      <FileText className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">No posts yet</h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
                      Share your thoughts, ideas, and stories with the world. Your first post is waiting to be written.
                    </p>
                    <Button className="mt-8 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 px-8" onClick={() => { /* TODO: Navigate to create post */ }}>
                      Create your first post
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="settings" className="animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
                <div className="flex justify-center">
                  <Card className="w-full max-w-2xl border-none shadow-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm ring-1 ring-slate-200 dark:ring-slate-800">
                    <CardHeader className="border-b border-slate-100 dark:border-slate-800 pb-8 flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold">Profile Settings</CardTitle>
                        <CardDescription>
                          Manage your public profile and personal details.
                        </CardDescription>
                      </div>
                      {!isEditing ? (
                        <Button 
                          onClick={() => setIsEditing(true)} 
                          variant="outline" 
                          className="gap-2 rounded-full border-slate-200 dark:border-slate-700"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => {
                            setIsEditing(false)
                            reset({
                              username: user?.username || "",
                              bio: user?.bio || "",
                            })
                          }} 
                          variant="ghost" 
                          className="gap-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        >
                          <X className="h-4 w-4" />
                          <span>Cancel</span>
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent className="pt-8">
                      {message && (
                        <div className={`p-4 rounded-lg mb-8 text-sm font-medium flex items-center gap-2 ${
                          message.type === 'success' 
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30' 
                            : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-900/30'
                        }`}>
                          {message.text}
                        </div>
                      )}
                      
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-3">
                          <Label htmlFor="email" className="text-base">Email Address</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input 
                              id="email" 
                              value={user.email} 
                              disabled 
                              className="pl-10 bg-slate-50 dark:bg-slate-950/50 border-transparent dark:border-transparent text-slate-500 shadow-none focus-visible:ring-0"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="username" className="text-base">Username</Label>
                          <div className="relative">
                            <AtSign className={`absolute left-3 top-3 h-4 w-4 ${isEditing ? "text-slate-400" : "text-slate-500"}`} />
                            <Input 
                              id="username" 
                              placeholder="Your username"
                              {...register("username")}
                              disabled={!isEditing}
                              className={`pl-10 ${
                                isEditing 
                                  ? "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500/20" 
                                  : "bg-transparent border-transparent shadow-none focus-visible:ring-0 text-slate-900 dark:text-white font-medium"
                              }`}
                            />
                          </div>
                          {errors.username && (
                            <p className="text-sm text-red-500 pl-1">{errors.username.message}</p>
                          )}
                        </div>

                        <div className="space-y-3">
                          <Label htmlFor="bio" className="text-base">Bio</Label>
                          <Textarea 
                            id="bio" 
                            placeholder={isEditing ? "Tell us a little bit about yourself" : "No bio provided yet."}
                            className={`min-h-[120px] resize-none ${
                              isEditing 
                                ? "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-blue-500/20" 
                                : "bg-transparent border-transparent shadow-none focus-visible:ring-0 text-slate-900 dark:text-white"
                            }`}
                            {...register("bio")}
                            disabled={!isEditing}
                          />
                          {errors.bio && (
                            <p className="text-sm text-red-500 pl-1">{errors.bio.message}</p>
                          )}
                        </div>

                        {isEditing && (
                          <div className="flex justify-end pt-4 animate-in fade-in slide-in-from-bottom-2">
                            <Button type="submit" disabled={isLoading} className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300">
                              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                            </Button>
                          </div>
                        )}
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
