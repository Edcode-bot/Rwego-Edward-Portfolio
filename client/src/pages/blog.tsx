import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SectionHeader } from "@/components/section-header";
import { BlogPostCard } from "@/components/blog-post-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Post } from "@shared/schema";

const popularHashtags = [
  "hackathon", "web3", "ai", "celo", "buildinpublic", 
  "proofofship", "uganda", "developer", "startup"
];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts"],
  });

  const filteredPosts = posts?.filter(post => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.hashtags?.some(tag => tag.toLowerCase().includes(query))
    );
  }) || [];

  const recentPosts = posts?.slice(0, 5) || [];

  return (
    <div className="min-h-screen pt-24" data-testid="page-blog">
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Blog & Achievements"
            subtitle="Updates, milestones, and stories from my journey"
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mb-8"
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-posts"
                />
              </motion.div>

              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="aspect-square w-full rounded-lg" />
                  ))}
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post, index) => (
                    <BlogPostCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <p className="text-muted-foreground text-lg">
                    {searchQuery ? "No posts found matching your search." : "No posts yet."}
                  </p>
                </motion.div>
              )}
            </div>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Posts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {isLoading ? (
                      <>
                        {[1, 2, 3].map((i) => (
                          <Skeleton key={i} className="h-16 w-full" />
                        ))}
                      </>
                    ) : (
                      recentPosts.map((post, index) => (
                        <BlogPostCard key={post.id} post={post} index={index} compact />
                      ))
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Popular Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {popularHashtags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => setSearchQuery(tag)}
                          data-testid={`badge-tag-${tag}`}
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Building in Public</h3>
                    <p className="text-sm text-muted-foreground">
                      Follow along as I share my journey, learnings, and projects. 
                      Every achievement, every challenge – documented here.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
