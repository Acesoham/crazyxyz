import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface CarouselProps {
  images: { url: string; alt: string }[]
  autoScroll?: boolean
  interval?: number
  className?: string
}

export function Carousel({
  images,
  autoScroll = true,
  interval = 5000,
  className,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    if (!autoScroll) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoScroll, interval, images.length])

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const previous = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800", className)}>
      <div
        className="flex transition-transform duration-500 ease-out h-[400px] md:h-[500px]"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-contain md:object-cover"
                style={{
                  maxHeight: '100%',
                  maxWidth: '100%'
                }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl md:text-2xl font-semibold">{image.alt}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/70 hover:bg-white/90 border-0"
          onClick={previous}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/70 hover:bg-white/90 border-0"
          onClick={next}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-10">
        <div className="flex items-center justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                currentIndex === index
                  ? "bg-white scale-110"
                  : "bg-white/50 hover:bg-white/75"
              )}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
