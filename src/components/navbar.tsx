"use client"

import Link from "next/link"
import { Bell, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black">
      <div className="container flex h-14 items-center">
        <Link href="/" className="ml-2 mr-6 flex items-center space-x-2">
          <span className="text-lg font-bold text-white">Yaad</span>
        </Link>
        <nav className="hidden flex-1 items-center space-x-6 md:flex">
          <Link href="/home" className="text-sm font-medium text-white/90 transition-colors hover:text-white">
            Home
          </Link>
          <Link href="/events" className="text-sm font-medium text-white/90 transition-colors hover:text-white">
            Events
          </Link>
          <Link href="/rsvp" className="text-sm font-medium text-white/90 transition-colors hover:text-white">
            RSVP
          </Link>
          <Link href="/vendors" className="text-sm font-medium text-white/90 transition-colors hover:text-white">
            Vendors
          </Link>
        </nav>
        <div className="flex flex-1 items-center mr-6 justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white/90 hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-white/90 hover:text-white">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
            <Button className="hidden bg-pink-600 text-white hover:bg-pink-700 md:inline-flex">Sign in</Button>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white/90 hover:text-white">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                <Link href="/home" className="text-sm font-medium">
                  Home
                </Link>
                <Link href="/events" className="text-sm font-medium">
                  Events
                </Link>
                <Link href="/rsvp" className="text-sm font-medium">
                  RSVP
                </Link>
                <Link href="/vendors" className="text-sm font-medium">
                  Vendors
                </Link>
                <Button className="w-full bg-pink-600 text-white hover:bg-pink-700">Sign Up</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

