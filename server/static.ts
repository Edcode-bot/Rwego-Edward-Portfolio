import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "..", "dist", "public");
  
  if (!fs.existsSync(distPath)) {
    console.warn(`Build directory not found at: ${distPath}, checking alternative path...`);
    const altPath = path.resolve(process.cwd(), "dist", "public");
    if (fs.existsSync(altPath)) {
      console.log(`Using alternative path: ${altPath}`);
      setupStaticServing(app, altPath);
      return;
    }
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  setupStaticServing(app, distPath);
}

function setupStaticServing(app: Express, distPath: string) {
  app.use(express.static(distPath, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      } else if (filePath.endsWith('.html')) {
        res.setHeader('Content-Type', 'text/html');
      }
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }));

  app.use("*", (_req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 'no-cache');
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
