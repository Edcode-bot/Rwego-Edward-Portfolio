import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile, mkdir, copyFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildClient() {
  console.log("Building client...");
  await viteBuild();
  console.log("Client build complete!");
}

async function buildServer() {
  console.log("Building server for Render...");
  const pkg = JSON.parse(await readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "esm",
    outfile: "dist/server.js",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
    banner: {
      js: `
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
      `.trim(),
    },
  });
  console.log("Server build complete!");
}

async function buildVercelApi() {
  console.log("Building Vercel API...");
  
  if (!existsSync("api")) {
    await mkdir("api", { recursive: true });
  }

  await esbuild({
    entryPoints: ["api/index.ts"],
    platform: "node",
    bundle: true,
    format: "esm",
    outfile: "dist/api/index.js",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: ["@vercel/node"],
    logLevel: "info",
  });
  console.log("Vercel API build complete!");
}

async function buildAll() {
  await rm("dist", { recursive: true, force: true });

  await buildClient();
  await buildServer();

  console.log("\nBuild complete! Output structure:");
  console.log("  dist/");
  console.log("  ├── public/          # Frontend assets (Vite output)");
  console.log("  └── server.js        # Server bundle (Render)");
  console.log("\nFor Vercel: api/index.ts is used directly");
}

const args = process.argv.slice(2);

if (args.includes("--client")) {
  buildClient().catch(err => {
    console.error(err);
    process.exit(1);
  });
} else if (args.includes("--server")) {
  buildServer().catch(err => {
    console.error(err);
    process.exit(1);
  });
} else if (args.includes("--vercel-api")) {
  buildVercelApi().catch(err => {
    console.error(err);
    process.exit(1);
  });
} else {
  buildAll().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
