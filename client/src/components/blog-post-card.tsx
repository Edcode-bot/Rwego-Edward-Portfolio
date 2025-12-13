import { motion } from "framer-motion";
import { Heart, MessageCircle, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@shared/schema";

interface BlogPostCardProps {
  post: Post;
  index?: number;
  compact?: boolean;
}

export function BlogPostCard({ post, index = 0, compact = false }: BlogPostCardProps) {
  const formattedDate = post.createdAt 
    ? new Date(post.createdAt).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    : '';

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
            {post.imageUrl && (
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  data-testid={`img-post-compact-${post.id}`}
                />
              </div>
            )}
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
      <Card className="group overflow-hidden hover-elevate active-elevate-2" data-testid={`card-post-${post.id}`}>
        <div className="relative aspect-square overflow-hidden">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              data-testid={`img-post-${post.id}`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary/30">{post.title[0]}</span>
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2" data-testid={`text-post-title-${post.id}`}>
              {post.title}
            </h3>
            <p className="text-sm text-white/80 line-clamp-2 mb-3" data-testid={`text-post-content-${post.id}`}>
              {post.content}
            </p>
            
            {post.hashtags && post.hashtags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {post.hashtags.slice(0, 3).map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="bg-white/20 text-white border-white/20 text-xs"
                    data-testid={`badge-hashtag-${tag}`}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between text-sm text-white/70">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  {post.likes || 0}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  0
                </span>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
