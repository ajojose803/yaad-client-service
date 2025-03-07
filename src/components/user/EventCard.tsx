"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomSlider from "../commons/CustomSlider";

interface Event {
  id: string;
  title: string;
  imageUrl: string;
}

export default function EventsPage() {
  const inProgressEvents: Event[] = [
    {
      id: "1",
      title: "My wedding",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      title: "My Reception",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      title: "My wedding",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "4",
      title: "My Reception",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
  ];

  const pastEvents: Event[] = [
    {
      id: "3",
      title: "House warming",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "4",
      title: "Dad's birthday",
      imageUrl: "/placeholder.svg?height=200&width=300",
    },
  ];

  return (
    <div className="container mx-auto px-8 py-4 space-y-8">
      <div className="flex justify-center mb-8">
        <Link href="/events/new">
          <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 shadow-xl transform hover:scale-105 transition-transform duration-300 text-lg py-6 px-8 rounded-xl">
            ✨ Host Your Next Event! ✨
          </Button>
        </Link>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Events in progress</h2>
        {inProgressEvents.length > 0 ? (
          <CustomSlider>
            {inProgressEvents.map((event) => (
              <div key={event.id} className="px-2">
                <Card className="overflow-hidden shadow-md">
                  <CardContent className="p-0">
                    <img
                      src={event.imageUrl || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-medium text-base truncate">{event.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </CustomSlider>
        ) : (
          <p className="text-center text-gray-500 py-8">No events in progress.</p>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Events you hosted previously</h2>
        {pastEvents.length > 0 ? (
          <CustomSlider>
            {pastEvents.map((event) => (
              <div key={event.id} className="px-2">
                <Card className="overflow-hidden shadow-md">
                  <CardContent className="p-0">
                    <img
                      src={event.imageUrl || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <h3 className="font-medium text-base truncate">{event.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </CustomSlider>
        ) : (
          <p className="text-center text-gray-500 py-8">No past events.</p>
        )}
      </section>
    </div>
  );
}

