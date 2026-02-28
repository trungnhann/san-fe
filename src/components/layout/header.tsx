"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe, User as UserIcon, LogOut } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-950/95 dark:supports-[backdrop-filter]:bg-slate-950/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center">
            <span className="hidden font-bold sm:inline-block text-blue-600 text-xl dark:text-blue-500">
              SAN
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Articles</Link>
            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Photos</Link>
            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Albums</Link>
            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Authors</Link>
            <Link href="#" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Forum</Link>
            <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors">About</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-slate-500 dark:text-slate-400">
            <Globe className="h-5 w-5" />
          </Button>
           
          <ModeToggle />
          
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.image} alt={user.username} />
                    <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.username}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <Link href="/profile" className="w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600 dark:text-red-500 dark:focus:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
