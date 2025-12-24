import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-bold text-lg group-hover:text-primary transition-colors">
              BuildBox
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
              Home
            </Link>
            <a href="#features" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
              Features
            </a>
            <a href="#pricing" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
              Pricing
            </a>
            <a href="#docs" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
              Docs
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">
            <Link to="/" className="block text-foreground/70 hover:text-foreground transition-colors text-sm py-2">
              Home
            </Link>
            <a href="#features" className="block text-foreground/70 hover:text-foreground transition-colors text-sm py-2">
              Features
            </a>
            <a href="#pricing" className="block text-foreground/70 hover:text-foreground transition-colors text-sm py-2">
              Pricing
            </a>
            <a href="#docs" className="block text-foreground/70 hover:text-foreground transition-colors text-sm py-2">
              Docs
            </a>
            <div className="flex gap-2 pt-2">
              <Link to="/login" className="flex-1">
                <Button variant="ghost" className="w-full">Sign in</Button>
              </Link>
              <Link to="/signup" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
