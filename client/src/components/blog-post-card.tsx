import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Post } from "@shared/schema";

interface BlogPostCardProps {
  post: Post;
  index?: number;
  compact?: boolean;
}

export function BlogPostCard({ post, index = 0, compact = false }: BlogPostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const formattedDate = post.createdAt 
    ? new Date(post.createdAt).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    : '';

  const defaultPlaceholder = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=800&fit=crop";
  const rawImages = post.imageUrls || (post.imageUrl ? [post.imageUrl] : []);
  const images = rawImages.length > 0 ? rawImages.slice(0, 3) : [defaultPlaceholder];
  const hasMultipleImages = images.length > 1;

  const minSwipeDistance = 50;

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (idx: number) => {
    setCurrentImageIndex(idx);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && hasMultipleImages) {
      nextImage();
    }
    if (isRightSwipe && hasMultipleImages) {
      prevImage();
    }
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <Card className="overflow-hidden hover-elevate" data-testid={`card-post-compact-${post.id}`}>
          <div className="flex gap-4 p-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={images[0]}
                alt={post.title}
                className="w-full h-full object-cover"
                data-testid={`img-post-compact-${post.id}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm line-clamp-2 mb-1" data-testid={`text-post-title-compact-${post.id}`}>
                {post.title}
              </h4>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formattedDate}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden" data-testid={`card-post-${post.id}`}>
        <div 
          ref={containerRef}
          className="relative aspect-square overflow-hidden touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`${post.title} ${currentImageIndex + 1}`}
              className="w-full h-full object-cover absolute inset-0"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              draggable={false}
              data-testid={`img-post-${post.id}-${currentImageIndex}`}
            />
          </AnimatePresence>

          {hasMultipleImages && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
                data-testid={`button-prev-${post.id}`}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
                data-testid={`button-next-${post.id}`}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); goToImage(idx); }}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      idx === currentImageIndex 
                        ? "bg-white w-4" 
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    data-testid={`dot-${post.id}-${idx}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
          </div>
          
          <h3 className="font-semibold text-lg mb-2 line-clamp-2" data-testid={`text-post-title-${post.id}`}>
            {post.title}
          </h3>
          
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-muted-foreground text-sm mb-3 whitespace-pre-wrap" data-testid={`text-post-content-${post.id}`}>
                  {post.content}
                </p>
              </motion.div>
            ) : (
              <motion.p
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-muted-foreground text-sm mb-3 line-clamp-2"
                data-testid={`text-post-content-preview-${post.id}`}
              >
                {post.content}
              </motion.p>
            )}
          </AnimatePresence>
          
          {post.hashtags && post.hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {post.hashtags.slice(0, 4).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs"
                  data-testid={`badge-hashtag-${tag}`}
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => setIsExpanded(!isExpanded)}
            data-testid={`button-expand-${post.id}`}
          >
            {isExpanded ? (
              <>
                Show Less
                <ChevronUp className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                Read More
                <ChevronDown className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
