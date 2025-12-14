import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Mail } from "lucide-react";
import { SiX, SiLinkedin, SiInstagram, SiDiscord } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = {
  x: "https://x.com/Edcode_9",
  github: "https://github.com/Edcode-bot",
  email: "mailto:rwegoedward123@gmail.com",
  instagram: "https://www.instagram.com/rwego_9",
  linkedin: "https://www.linkedin.com/in/rwego-edward-440052325",
};

function TypewriterText() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "Rwego Edward";
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping) {
      if (displayText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(fullText.slice(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 3000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(true);
        }, 500);
        return () => clearTimeout(timeout);
      }
    }
  }, [displayText, isTyping]);

  return (
    <span className="font-mono text-sm text-muted-foreground hidden lg:inline-block">
      {displayText}
      <span className="animate-pulse">_</span>
    </span>
  );
}

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass py-3 shadow-lg"
            : "bg-transparent py-5"
        }`}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link href="/">
              <motion.div
                className="flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                data-testid="link-logo"
              >
                <span className="font-mono font-bold text-2xl text-primary" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
                  R&gt;
                </span>
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <motion.span
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer relative ${
                      location === link.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                    {location === link.href && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <TypewriterText />
              <ThemeToggle />

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            data-testid="mobile-menu"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-16 right-0 bottom-0 w-72 bg-card border-l border-border p-6"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={link.href}>
                      <span
                        className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors cursor-pointer ${
                          location === link.href
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        }`}
                        data-testid={`link-mobile-nav-${link.label.toLowerCase()}`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" data-testid="link-github-mobile">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={socialLinks.x} target="_blank" rel="noopener noreferrer" data-testid="link-x-mobile">
                      <SiX className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" data-testid="link-linkedin-mobile">
                      <SiLinkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" data-testid="link-instagram-mobile">
                      <SiInstagram className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <a href={socialLinks.email} data-testid="link-email-mobile">
                      <Mail className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
