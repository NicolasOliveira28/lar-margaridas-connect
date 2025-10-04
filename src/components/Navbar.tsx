import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Flower2, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Flower2 className="h-8 w-8 text-primary transition-transform group-hover:rotate-12" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Lar de Margaridas
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Início
            </Link>
            <Link to="/projetos" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Projetos
            </Link>
            <Link to="/cursos" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Cursos
            </Link>
            <Link to="/voluntarios" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Seja Voluntário
            </Link>
            <Link to="/auth">
              <Button className="bg-primary hover:bg-primary/90">
                Entrar
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3 animate-fade-in">
            <Link 
              to="/" 
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Início
            </Link>
            <Link 
              to="/projetos" 
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Projetos
            </Link>
            <Link 
              to="/cursos" 
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Cursos
            </Link>
            <Link 
              to="/voluntarios" 
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Seja Voluntário
            </Link>
            <Link to="/auth" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Entrar
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
