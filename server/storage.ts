import { 
  type User, type InsertUser,
  type Project, type InsertProject,
  type Post, type InsertPost,
  type ContactMessage, type InsertContactMessage
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  getFeaturedProjects(): Promise<Project[]>;

  getPosts(): Promise<Post[]>;
  getPost(id: string): Promise<Post | undefined>;

  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private projects: Map<string, Project>;
  private posts: Map<string, Post>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.posts = new Map();
    this.contactMessages = new Map();
    this.seedData();
  }

  private seedData() {
    const projectsData: Project[] = [
      {
        id: "intellitutor-ai",
        title: "IntelliTutor AI",
        description: "An AI-powered educational platform that provides personalized learning experiences using advanced NLP and adaptive algorithms.",
        longDescription:
          "IntelliTutor AI revolutionizes online education by leveraging cutting-edge artificial intelligence to create truly personalized learning paths. The platform analyzes student performance in real-time, adapting content difficulty and teaching methods to optimize knowledge retention. Features include intelligent tutoring, automated assessments, progress tracking, and AI-generated study materials.",
        techStack: ["React", "TypeScript", "Python", "TensorFlow", "OpenAI API", "PostgreSQL", "FastAPI"],
        category: "AI",
        imageUrl: "https://i.postimg.cc/4yQBP057/Intellitutor_AI.png",
        githubUrl: "https://github.com/intellitutorai/IntelliTutorAI",
        liveUrl: "https://intellitutor-ai.onrender.com/",
        featured: true,
        order: 1,
      },
      {
        id: "glidepay",
        title: "GlidePay",
        description: "A seamless cross-border payment solution enabling instant money transfers across Africa, secure rent payments, and integrated user chat.",
        longDescription:
          "GlidePay is a modern financial platform focused on simplifying payments in Africa. It allows users to send money instantly across borders, pay rent securely with flexible options, and communicate via a built-in secure chat system. Built with blockchain elements for transparency and speed, it aims to make financial transactions accessible, fast, and reliable for everyday users.",
        techStack: ["React", "Solidity", "Ethers.js", "Node.js", "Hardhat", "IPFS", "The Graph"],
        category: "Web3 / FinTech",
        imageUrl: "https://i.postimg.cc/sgvv4hj8/Glidepay.png",
        githubUrl: "https://github.com/Edcode-bot/Glide-Pay",
        liveUrl: "https://glide-pay.onrender.com",
        featured: true,
        order: 2,
      },
      {
        id: "rockchain-duel-arena",
        title: "Rockchain Duel Arena",
        description:
          "A fast-paced on-chain duel game where players battle, wager, and win using Celo MiniPay.",
        longDescription:
          "Rock Chain Duel is a Web3 arcade-style duel game built on Celo that blends classic competitive gameplay with real on-chain incentives. Players enter head-to-head duels, place small wagers via MiniPay, and battle it out in a provably fair environment powered by smart contracts. The game is optimized for mobile, beginner-friendly for Web2 users, and showcases seamless MiniPay integration, making blockchain gaming feel instant, fun, and accessible.",
        techStack: [
          "Solidity",
          "Celo Blockchain",
          "MiniPay SDK",
          "React",
          "JavaScript",
          "HTML & CSS"
        ],
        category: "Web3 / Blockchain Gaming / Full-Stack",
        imageUrl: "https://i.postimg.cc/tgdy3q6q/Rocakchain_duel.png",
        githubUrl: "https://github.com/Edcode-bot/RockchainDeulArena",
        liveUrl: "https://rockchain-deul-arena.vercel.app/",
        featured: true,
        order: 3,
      },
    ];

    const postsData: Post[] = [
      {
        id: "post-1",
        title: "Competing at ISCC Uganda",
        content:
          "I wrapped up a focused and productive day at the ISCC Uganda competition — a national challenge that pushed me to solve real problems with Python under real pressure. Being around sharp student minds elevated how I think, build, and execute.The environment demanded clarity, creativity, and resilience. Competing at that level reminded me why I enjoy building and improving every day.",
        imageUrl: "https://i.postimg.cc/q7qV3Jjy/ISCC_Uganda.jpg",
        imageUrls: [
          "https://i.postimg.cc/vHbKn8m8/ISCC_ug.jpg",
          "https://i.postimg.cc/Z5fznzbd/profile.jpg",
          "https://i.postimg.cc/q7qV3Jjy/ISCC_Uganda.jpg"
        ],
        hashtags: ["AI", "OpenAI", "Development", "Tech"],
        createdAt: new Date("2025-12-10"),
        likes: 42,
      },
      {
        id: "post-2",
        title: "Showcasing IntelliTutor AI at the National Science Fair",
        content:
          "I had the opportunity to represent St. Mary’s College Rushoroza at the National Science Fair in Kololo, presenting my AI project — IntelliTutor AI. The tool helps students revise, take quizzes, write essays, and access learning videos through an intelligent assistant built from the ground up.Taking a project that started in a small code editor in Kabale to a national stage was a powerful reminder of what young innovators can build with focus and curiosity. Grateful for everyone who supported the journey and excited to keep creating tools that empower learners.",
        imageUrl: "https://i.postimg.cc/85zJ26p9/SESEMAT_Nationals.jpg",
        imageUrls: [
          "https://i.postimg.cc/85zJ26p9/SESEMAT_Nationals.jpg",
          "https://i.postimg.cc/Mp1QVw3t/SESEMAT_Nationals.jpg"
        ],
        hashtags: ["Web3", "Security", "Solidity", "DeFi"],
        createdAt: new Date("2025-07-08"),
        likes: 38,
      },
      {
        id: "post-3",
        title: "Presenting IntelliTutor AI at the UPSTU National Innovation Competition",
        content:
          "I presented IntelliTutor AI at the UPSTU National Science Innovation Competition 2025 at MUBS Nakawa. Sharing this project on a national stage was a powerful reminder of how AI can support learning across Uganda. Grateful for the experience and the innovators who continue pushing education forward.",
        imageUrl: "https://i.postimg.cc/XqZTDQtz/UPSTU_nationals.jpg",
        imageUrls: [
          "https://i.postimg.cc/bdcFV8xr/UPSTU_nationals.jpg"
        ],
        hashtags: ["React", "Frontend", "Architecture", "TypeScript"],
        createdAt: new Date("2025-08-05"),
        likes: 55,
      },
    ];

    projectsData.forEach(p => this.projects.set(p.id, p));
    postsData.forEach(p => this.posts.set(p.id, p));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(p => p.featured)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  async getPosts(): Promise<Post[]> {
    return Array.from(this.posts.values()).sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }

  async getPost(id: string): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const contactMessage: ContactMessage = {
      id,
      name: message.name,
      email: message.email,
      subject: message.subject ?? null,
      message: message.message,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
}

export const storage = new MemStorage();