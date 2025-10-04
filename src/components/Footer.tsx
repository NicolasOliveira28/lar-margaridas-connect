import { Flower2, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Flower2 className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Lar de Margaridas</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transformando vidas através da educação e solidariedade.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/projetos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Projetos Sociais
                </Link>
              </li>
              <li>
                <Link to="/cursos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cursos
                </Link>
              </li>
              <li>
                <Link to="/voluntarios" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Seja Voluntário
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Áreas de Atuação</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Informática</li>
              <li>Advocacia</li>
              <li>Psicologia</li>
              <li>Enfermagem</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                contato@lardemargaridas.org
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                (11) 1234-5678
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                São Paulo, SP
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Lar de Margaridas. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
