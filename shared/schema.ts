import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Projects schema
export const projects = pgTable("projects", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  techStack: text("tech_stack").array().notNull(),
  category: text("category").notNull(), // AI, Web3, Full-Stack
  imageUrl: text("image_url"),
  liveUrl: text("live_url"),
  githubUrl: text("github_url"),
  featured: boolean("featured").default(false),
  order: integer("order").default(0),
});

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Blog/Social posts schema
export const posts = pgTable("posts", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  imageUrls: text("image_urls").array(),
  hashtags: text("hashtags").array(),
  createdAt: timestamp("created_at").defaultNow(),
  likes: integer("likes").default(0),
});

export const insertPostSchema = createInsertSchema(posts).omit({ id: true, createdAt: true, likes: true });
export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof posts.$inferSelect;

// Contact messages schema
export const contactMessages = pgTable("contact_messages", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Skills schema for about page
export interface Skill {
  name: string;
  level: number; // 0-100
  category: "frontend" | "backend" | "blockchain" | "ai" | "tools";
}

// Achievement/Timeline item
export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "award" | "project" | "education" | "work";
  icon?: string;
  certificateUrl?: string;
  certificateImage?: string;
}

// Users (keep existing)
export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
