'use client'

import { useState, useEffect } from 'react'
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const { user } = useKindeAuth()
  const [channelName, setChannelName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('/api/user')
      const data = await response.json()
      setChannelName(data.user.channelName || '')
    }
    fetchUserData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('/api/update-channel-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ channelName }),
      })
      if (!response.ok) {
        throw new Error('Failed to update channel name')
      }
      alert('Channel name updated successfully!')
    } catch (error) {
      console.error('Error updating channel name:', error)
      alert('Failed to update channel name. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="channelName">Channel Name</Label>
          <Input
            id="channelName"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Enter your channel name"
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  )
}