'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Tablet, Monitor, Shuffle } from "lucide-react"

interface Thumbnail {
  title: string;
  channel: string;
  views: string;
  time: string;
  isUserThumbnail?: boolean;
  thumbnailUrl?: string;
}

export default function YouTubeThumbnailPreviewer({ userChannelName }: { userChannelName: string }) {
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [videoTitle, setVideoTitle] = useState('Your Video Title')
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([])

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

  const mockThumbnails: Thumbnail[] = [
    { title: "James May finally drives the Tesla Cybertruck", channel: "James May", views: "1.2M views", time: "2 days ago", thumbnailUrl: "https://utfs.io/f/777c7197-7f0b-4398-93de-1ee17cfe22d1-1sajio.jpg" },
    { title: "Sidemen World´s Hardest Cooking Challenge", channel: "Sidemen", views: "500K views", time: "1 week ago", thumbnailUrl: "https://utfs.io/f/ed93080e-3d07-4f6b-acf9-d57d49cee484-3lppma.jpg" },
    { title: "Sidemen Survive 24 Hours in Uks Most Haunted House", channel: "Sidemen", views: "2M views", time: "3 months ago", thumbnailUrl: "https://utfs.io/f/08a443c0-ae28-4f75-b5c1-2b72c5f9dbc4-3lppmb.jpg" },
    { title: "Demolition Derby with WhistlinDiesel ", channel: "Mike Majlak Vlogs", views: "800K views", time: "5 days ago", thumbnailUrl: "https://utfs.io/f/c1ea0b88-47ee-4c8d-9b83-fecfdaffd43d-dra94h.jpg" },
    { title: "WhistlinDiesel Cybertruck Durability Test", channel: "Whistlin Diesel", views: "1.5M views", time: "2 weeks ago", thumbnailUrl: "https://utfs.io/f/e354e1b0-3fd1-44f0-903f-2f8fb0f02582-c71327.jpg" },
    { title: "Cybertruck Frames are Snapping in Half", channel: "Whistlin Diesel", views: "300K views", time: "1 month ago", thumbnailUrl: "https://utfs.io/f/e59e69cd-e4bc-4fca-8d0b-373dc4cf4d97-c71328.jpg" },
    { title: "Build and Deploy 4 Modern React Apps", channel: "JavaScript Mastery", views: "800K views", time: "5 days ago", thumbnailUrl: "https://utfs.io/f/38d144e1-b2df-46c3-b058-daeaef52a4b7-1y4j1.jpg" },
    { title: "Build & Deploy an Amazing 3D Portfolio with React.js", channel: "JavaScript Mastery", views: "1.5M views", time: "2 weeks ago", thumbnailUrl: "https://utfs.io/f/9adf0739-3945-42e0-8273-23f4df8077ca-1y4j2.jpg" },
    { title: "Build a Full Stack React Native App with Payments", channel: "JavaScript Mastery", views: "300K views", time: "1 month ago", thumbnailUrl: "https://utfs.io/f/d68aa754-85e9-4ee0-ac15-2f03029d531c-1y4j3.jpg" },
    { title: "Sidemen Most Expensive Car Challenge", channel: "Sidemen", views: "300K views", time: "1 month ago", thumbnailUrl: "https://utfs.io/f/8e7e9ace-99a8-4cb0-9b09-cfabe0f264b6-3lppmc.jpg" },
 
  ]

  useEffect(() => {
    const updatedThumbnails: Thumbnail[] = [
      {
        title: videoTitle,
        channel: userChannelName,
        views: "0 views",
        time: "Just now",
        isUserThumbnail: true
      },
      ...mockThumbnails
    ]
    setThumbnails(updatedThumbnails)
  }, [videoTitle, userChannelName])

  const randomizeThumbnails = () => {
    setThumbnails(prevThumbnails => {
      const shuffled = [...prevThumbnails];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  }

  const getContainerClass = () => {
    switch (viewMode) {
      case 'desktop':
        return 'max-w-[1400px]' // Fits 4 cards of 340px width with some gap
      case 'tablet':
        return 'max-w-[720px]' // Fits 2 cards of 340px width with some gap
      case 'mobile':
        return 'max-w-[360px]' // Fits 1 card of 340px width with some padding
    }
  }

  const getGridClass = () => {
    switch (viewMode) {
      case 'desktop':
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      case 'tablet':
        return 'grid-cols-1 sm:grid-cols-2'
      case 'mobile':
        return 'grid-cols-1'
    }
  }

  return (
    <div className="bg-background text-foreground w-full">
      <div className="mx-auto px-4 space-y-6">
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">YouTube Thumbnail Previewer</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Upload Thumbnail</Label>
                <Input id="thumbnail" type="file" accept="image/*" onChange={handleImageUpload} className="border-input" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="videoTitle">Video Title</Label>
                <Input
                  id="videoTitle"
                  placeholder="Enter video title"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="border-input"
                />
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Button onClick={randomizeThumbnails} variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Shuffle className="mr-2 h-4 w-4" /> Randomize Order
              </Button>
              <Tabs value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
                <TabsList className="bg-muted">
                  <TabsTrigger value="desktop" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Monitor className="mr-2 h-4 w-4" /> Desktop
                  </TabsTrigger>
                  <TabsTrigger value="tablet" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Tablet className="mr-2 h-4 w-4" /> Tablet
                  </TabsTrigger>
                  <TabsTrigger value="mobile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Smartphone className="mr-2 h-4 w-4" /> Mobile
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        <div className={`${getContainerClass()} mx-auto transition-all duration-300`}>
          <div className={`grid ${getGridClass()} gap-6 justify-items-center`}>
            {thumbnails.map((item, index) => (
              <Card key={index} className="w-[340px] border-primary/20 hover:border-primary/40 transition-colors duration-300">
                <CardContent className="p-0">
                  <div className="relative w-[340px] h-[190px]">
                    {item.isUserThumbnail && thumbnail ? (
                      <img 
                        src={thumbnail} 
                        alt="User thumbnail" 
                        className="w-full h-full object-contain bg-muted"
                      />
                    ) : (
                      <img
                        src={item.thumbnailUrl || `https://picsum.photos/340/190?random=${index}`}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-contain bg-muted"
                      />
                    )}
                    <div className="absolute bottom-1 right-1 bg-primary text-primary-foreground text-xs px-1 rounded">
                      4:15
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-9 h-9 rounded-full bg-primary/20"></div>
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-sm mb-1 line-clamp-2">{item.title}</h3>
                        <p className="text-xs text-muted-foreground">{item.channel}</p>
                        <p className="text-xs text-muted-foreground">{item.views} • {item.time}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}