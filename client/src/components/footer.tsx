import { Link } from "wouter";
import { Github, Mail, MapPin } from "lucide-react";
import { SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";

const footerLinks = {
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer mb-4" data-testid="link-footer-logo">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="font-bold text-xl">Edcode</span>
              </div>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              Self-taught developer from Uganda, focused on building practical AI and Web3 products. 
              I learn by shipping, competing, and solving real problems.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4" />
              <span>Kampala, Uganda</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer" data-testid="link-footer-github">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer" data-testid="link-footer-x">
                  <SiX className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="#" data-testid="link-footer-email">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer" data-testid={`link-footer-${link.label.toLowerCase()}`}>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-center">
          <p className="text-sm text-muted-foreground">
            {currentYear} Rwego Edward (Edcode). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
