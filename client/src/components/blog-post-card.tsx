import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
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
  
  const formattedDate = post.createdAt 
    ? new Date(post.createdAt).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    : '';

  const defaultPlaceholder = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=800&fit=crop";
  const rawImages = post.imageUrls || (post.imageUrl ? [post.imageUrl] : []);
  const images = rawImages.length > 0 ? rawImages : [defaultPlaceholder];
  const imageCount = Math.min(images.length, 3);

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

  const renderImageGrid = () => {
    if (imageCount === 0) return null;

    if (imageCount === 1) {
      return (
        <div className="aspect-square overflow-hidden">
          <img
            src={images[0]}
            alt={post.title}
            className="w-full h-full object-cover"
            data-testid={`img-post-${post.id}-0`}
          />
        </div>
      );
    }

    if (imageCount === 2) {
      return (
        <div className="aspect-square grid grid-cols-2 gap-0.5 overflow-hidden">
          {images.slice(0, 2).map((img, idx) => (
            <div key={idx} className="overflow-hidden">
              <img
                src={img}
                alt={`${post.title} ${idx + 1}`}
                className="w-full h-full object-cover"
                data-testid={`img-post-${post.id}-${idx}`}
              />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="aspect-square grid grid-cols-2 gap-0.5 overflow-hidden">
        <div className="row-span-2 overflow-hidden">
          <img
            src={images[0]}
            alt={`${post.title} 1`}
            className="w-full h-full object-cover"
            data-testid={`img-post-${post.id}-0`}
          />
        </div>
        <div className="overflow-hidden">
          <img
            src={images[1]}
            alt={`${post.title} 2`}
            className="w-full h-full object-cover"
            data-testid={`img-post-${post.id}-1`}
          />
        </div>
        <div className="overflow-hidden">
          <img
            src={images[2]}
            alt={`${post.title} 3`}
            className="w-full h-full object-cover"
            data-testid={`img-post-${post.id}-2`}
          />
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden" data-testid={`card-post-${post.id}`}>
        {renderImageGrid()}
        
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
                <p className="text-muted-foreground text-sm mb-3" data-testid={`text-post-content-${post.id}`}>
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
