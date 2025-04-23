"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight, RefreshCw, Search } from "lucide-react"

interface InAppBrowserProps {
  initialUrl?: string
}

export default function InAppBrowser({ initialUrl = "" }: InAppBrowserProps) {
  const [url, setUrl] = useState(initialUrl)
  const [isLoading, setIsLoading] = useState(false)
  const [iframeKey, setIframeKey] = useState(0)
  const [canGoBack, setCanGoBack] = useState(false)
  const [canGoForward, setCanGoForward] = useState(false)

  // Handle iframe load events
  const handleLoad = () => {
    setIsLoading(false)
    const iframe = document.getElementById("browser-iframe") as HTMLIFrameElement
    if (iframe?.contentWindow) {
      const historyLength = iframe.contentWindow.history.length ?? 0
      setCanGoBack(historyLength > 1)
      setCanGoForward(historyLength > 0)
    } else {
      setCanGoBack(false)
      setCanGoForward(false)
    }
  }

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let targetUrl = url.trim()
    
    // If it's not a URL, treat it as a search query
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      if (!targetUrl.includes('.')) {
        targetUrl = `https://www.google.com/search?q=${encodeURIComponent(targetUrl)}`
      } else {
        targetUrl = `https://${targetUrl}`
      }
    }
    
    setUrl(targetUrl)
    setIframeKey(prev => prev + 1)
    setIsLoading(true)
  }

  // Handle back navigation
  const handleBack = () => {
    const iframe = document.getElementById("browser-iframe") as HTMLIFrameElement
    if (iframe?.contentWindow) {
      iframe.contentWindow.history.back()
    }
  }

  // Handle forward navigation
  const handleForward = () => {
    const iframe = document.getElementById("browser-iframe") as HTMLIFrameElement
    if (iframe?.contentWindow) {
      iframe.contentWindow.history.forward()
    }
  }

  // Handle refresh
  const handleRefresh = () => {
    setIframeKey(prev => prev + 1)
    setIsLoading(true)
  }

  return (
    <div className="flex flex-col h-full w-full bg-background">
      {/* Browser Title */}
      <div className="flex items-center justify-center p-2 border-b">
        <h1 className="text-lg font-bold text-center">
          Your NALI Portal🚀
        </h1>
      </div>

      {/* Browser Controls */}
      <div className="flex items-center gap-1 p-2 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          disabled={!canGoBack}
          className="h-7 w-7"
        >
          <ArrowLeft className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleForward}
          disabled={!canGoForward}
          className="h-7 w-7"
        >
          <ArrowRight className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          className="h-7 w-7"
        >
          <RefreshCw className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`} />
        </Button>

        {/* Combined Search/URL Form */}
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="relative">
            <Input
              type="text"
              value={url}
              onChange={handleInputChange}
              placeholder="Search or enter website address"
              className="h-7 pl-7 text-sm"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-500" />
          </div>
        </form>
      </div>

      {/* Browser Content */}
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
            <RefreshCw className="h-6 w-6 animate-spin" />
          </div>
        )}
        <iframe
          id="browser-iframe"
          key={iframeKey}
          src={url}
          className="w-full h-full border-0"
          onLoad={handleLoad}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  )
} 