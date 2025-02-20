"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Store, ChevronRight } from "lucide-react"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/service/store/UserAuthStore";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"

export function DashboardPage() {
  const categories = ["Photographers", "DJs", "Beauty", "Planners", "Florists"];
  //const { accessToken } = useAuthStore(); // Get the access token from Zustand store
  const router = useRouter(); // Get the router object for redirection
  const loggedIn = useAuthStore((state) => state.loggedIn);

  useEffect(() => {
    if (!loggedIn) {
      router.push("/signin"); // Redirect to login page if user is not logged in
    }
  }, [loggedIn, router]);
 
  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <Alert variant="default" className="flex items-center space-x-4">
          <Spinner className="h-8 w-8" />
          <div>
            <AlertTitle>Redirecting...</AlertTitle>
            <AlertDescription>Please wait while we redirect you to the login page.</AlertDescription>
          </div>
        </Alert>
      </div>
    ); 
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">CONGRATS!</h1>
        <h2 className="text-6xl font-black mb-6">A & N</h2>
        <div className="flex items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>January 27, 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>300+ Guests</span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Events Section */}
        <Card className="p-6">
          <CardHeader className="px-0">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                Events
                <ChevronRight className="h-5 w-5" />
              </CardTitle>
              <Button className="bg-pink-500 hover:bg-pink-600">Explore events</Button>
            </div>
            <p className="text-muted-foreground">Find and manage your upcoming celebrations and events.</p>
          </CardHeader>
          <CardContent className="px-0">
            <div className="mt-8 flex items-center justify-center">
              <div className="text-center">
                <Store className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-sm text-muted-foreground">
                  No events added yet.
                  <br />
                  Try creating a new event.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vendors Section */}
        <Card className="p-6">
          <CardHeader className="px-0">
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                Vendors
                <ChevronRight className="h-5 w-5" />
              </CardTitle>
              <Button className="bg-pink-500 hover:bg-pink-600">See all photographers</Button>
            </div>
            <p className="text-muted-foreground">Get in touch with photographers, DJs, florists and more.</p>
          </CardHeader>
          <CardContent className="px-0">
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="rounded-full px-4 py-1 hover:bg-pink-500 hover:text-white cursor-pointer"
                >
                  {category}
                </Badge>
              ))}
              <Badge
                variant="outline"
                className="rounded-full px-4 py-1 hover:bg-pink-500 hover:text-white cursor-pointer"
              >
                More
              </Badge>
            </div>
            <div className="mt-8 flex items-center justify-center">
              <div className="text-center">
                <Store className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-sm text-muted-foreground">
                  No vendors added yet.
                  <br />
                  Try searching for vendors in your area.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
