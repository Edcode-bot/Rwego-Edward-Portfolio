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
        longDescription: "IntelliTutor AI revolutionizes online education by leveraging cutting-edge artificial intelligence to create truly personalized learning paths. The platform analyzes student performance in real-time, adapting content difficulty and teaching methods to optimize knowledge retention. Features include intelligent tutoring, automated assessments, progress tracking, and AI-generated study materials.",
        techStack: ["React", "TypeScript", "Python", "TensorFlow", "OpenAI API", "PostgreSQL", "FastAPI"],
        category: "AI",
        imageUrl: null,
        liveUrl: "https://intellitutor.example.com",
        githubUrl: "https://github.com/edcode/intellitutor-ai",
        featured: true,
        order: 1,
      },
      {
        id: "glidepay",
        title: "GlidePay",
        description: "A seamless cross-border payment solution built on blockchain technology with near-instant settlements and minimal fees.",
        longDescription: "GlidePay transforms international payments by utilizing blockchain technology to enable instant, low-cost transfers across borders. The platform supports multiple cryptocurrencies and stablecoins, offering users a seamless experience with enterprise-grade security. Features include multi-signature wallets, automated compliance checks, and real-time exchange rates.",
        techStack: ["React", "Solidity", "Ethers.js", "Node.js", "Hardhat", "IPFS", "The Graph"],
        category: "Web3",
        imageUrl: null,
        liveUrl: "https://glidepay.example.com",
        githubUrl: "https://github.com/edcode/glidepay",
        featured: true,
        order: 2,
      },
      {
        id: "borderless-yield",
        title: "Borderless Yield",
        description: "A DeFi yield aggregator that automatically optimizes returns across multiple protocols and chains.",
        longDescription: "Borderless Yield is a sophisticated DeFi platform that maximizes user returns by automatically allocating assets across the highest-yielding opportunities in the ecosystem. The protocol features cross-chain compatibility, gas optimization, risk assessment tools, and transparent fee structures. Users can stake, farm, and compound their rewards with a single click.",
        techStack: ["Solidity", "React", "Web3.js", "Chainlink", "Uniswap SDK", "Hardhat", "TypeScript"],
        category: "Web3",
        imageUrl: null,
        liveUrl: "https://borderlessyield.example.com",
        githubUrl: "https://github.com/edcode/borderless-yield",
        featured: true,
        order: 3,
      },
      {
        id: "devops-dashboard",
        title: "DevOps Command Center",
        description: "A comprehensive monitoring and deployment dashboard for managing microservices infrastructure at scale.",
        longDescription: "DevOps Command Center provides teams with complete visibility into their infrastructure. Features real-time metrics, log aggregation, automated alerting, one-click deployments, and rollback capabilities. Integrates with popular CI/CD tools and cloud providers.",
        techStack: ["React", "Node.js", "Kubernetes", "Docker", "Prometheus", "Grafana", "PostgreSQL"],
        category: "Full-Stack",
        imageUrl: null,
        liveUrl: null,
        githubUrl: "https://github.com/edcode/devops-dashboard",
        featured: false,
        order: 4,
      },
      {
        id: "nlp-sentiment-engine",
        title: "Sentiment Analysis Engine",
        description: "Real-time sentiment analysis API for social media monitoring and brand reputation management.",
        longDescription: "A powerful NLP-based sentiment analysis engine that processes millions of social media posts, reviews, and comments in real-time. Provides actionable insights for marketing teams and brand managers with detailed emotion classification and trend detection.",
        techStack: ["Python", "PyTorch", "FastAPI", "Redis", "Elasticsearch", "Docker", "AWS"],
        category: "AI",
        imageUrl: null,
        liveUrl: null,
        githubUrl: "https://github.com/edcode/sentiment-engine",
        featured: false,
        order: 5,
      },
      {
        id: "nft-marketplace",
        title: "ArtVault NFT Marketplace",
        description: "A curated NFT marketplace focused on digital art with gasless minting and creator royalties.",
        longDescription: "ArtVault is a premium NFT marketplace designed for digital artists and collectors. Features gasless minting using meta-transactions, lazy minting, creator royalty enforcement, auction mechanics, and social features for community building.",
        techStack: ["Next.js", "Solidity", "IPFS", "The Graph", "Polygon", "Tailwind CSS"],
        category: "Web3",
        imageUrl: null,
        liveUrl: null,
        githubUrl: "https://github.com/edcode/artvault",
        featured: false,
        order: 6,
      },
    ];

    const postsData: Post[] = [
      {
        id: "post-1",
        title: "Building AI-Powered Applications in 2024",
        content: "Just wrapped up an incredible project integrating GPT-4 with real-time data pipelines. The future of AI in production apps is here, and it's more accessible than ever. Here's what I learned about prompt engineering, rate limiting, and cost optimization...",
        imageUrl: null,
        hashtags: ["AI", "OpenAI", "Development", "Tech"],
        createdAt: new Date("2024-12-10"),
        likes: 42,
      },
      {
        id: "post-2",
        title: "Web3 Security Best Practices",
        content: "After auditing several DeFi protocols, I've compiled my top security considerations for smart contract development. From reentrancy guards to access control patterns, security should never be an afterthought...",
        imageUrl: null,
        hashtags: ["Web3", "Security", "Solidity", "DeFi"],
        createdAt: new Date("2024-12-08"),
        likes: 38,
      },
      {
        id: "post-3",
        title: "The Evolution of Frontend Architecture",
        content: "Reflecting on how frontend development has evolved. From jQuery spaghetti to modern React with server components. The developer experience improvements are remarkable, but complexity management remains key...",
        imageUrl: null,
        hashtags: ["React", "Frontend", "Architecture", "TypeScript"],
        createdAt: new Date("2024-12-05"),
        likes: 55,
      },
      {
        id: "post-4",
        title: "Cross-Chain Development Insights",
        content: "Working on cross-chain protocols has taught me the importance of standardization and bridge security. Here's my take on the current state of blockchain interoperability and what's coming next...",
        imageUrl: null,
        hashtags: ["Blockchain", "CrossChain", "Web3", "Development"],
        createdAt: new Date("2024-12-01"),
        likes: 29,
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
      ...message,
      id,
      createdAt: new Date(),
    };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
}

export const storage = new MemStorage();
