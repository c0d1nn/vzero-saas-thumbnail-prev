'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Tv2, PlaySquare, Clock, ThumbsUp, Film, Youtube } from "lucide-react"

export default function YouTubeThumbnailPreviewer() {
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [videoTitle, setVideoTitle] = useState('Your Video Title')
  const [channelName, setChannelName] = useState('Your Channel Name')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setThumbnail(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const mockThumbnails = [
    { title: "10 Amazing Facts About Space", channel: "Space Explorers", views: "1.2M views", time: "2 days ago" },
    { title: "Easy 30-Minute Recipes", channel: "Quick Meals", views: "500K views", time: "1 week ago" },
    { title: "Learn React in 1 Hour", channel: "Code Masters", views: "2M views", time: "3 months ago" },
    { title: "Top 5 Travel Destinations 2023", channel: "Wanderlust", views: "800K views", time: "5 days ago" },
    { title: "The History of Ancient Egypt", channel: "History Buff", views: "1.5M views", time: "2 weeks ago" },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 hidden md:block">
        <div className="flex items-center mb-6">
          <Youtube className="w-8 h-8 text-red-600 mr-2" />
          <span className="text-xl font-bold">YouTube</span>
        </div>
        <nav>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Home className="mr-2 h-4 w-4" /> Home
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Tv2 className="mr-2 h-4 w-4" /> Subscriptions
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <PlaySquare className="mr-2 h-4 w-4" /> Library
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Clock className="mr-2 h-4 w-4" /> History
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <ThumbsUp className="mr-2 h-4 w-4" /> Liked videos
          </Button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">YouTube Thumbnail Previewer</h2>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="thumbnail">Upload Thumbnail</Label>
              <Input id="thumbnail" type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
            <div>
              <Label htmlFor="videoTitle">Video Title</Label>
              <Input
                id="videoTitle"
                placeholder="Enter video title"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="channelName">Channel Name</Label>
              <Input
                id="channelName"
                placeholder="Enter channel name"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
              />
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* User's uploaded thumbnail */}
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <div className="aspect-video relative">
                {thumbnail ? (
                  <img src={thumbnail} alt="Uploaded thumbnail" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Film className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">{videoTitle}</h3>
                <p className="text-sm text-gray-600">{channelName}</p>
                <p className="text-sm text-gray-500">0 views • Just now</p>
              </div>
            </div>

            {/* Mock thumbnails */}
            {mockThumbnails.map((item, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow">
                <div className="aspect-video relative">
                  <img
                    src={`/placeholder.svg?height=200&width=360&text=Thumbnail+${index + 1}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.channel}</p>
                  <p className="text-sm text-gray-500">{item.views} • {item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}