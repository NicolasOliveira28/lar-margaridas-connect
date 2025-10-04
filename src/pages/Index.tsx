import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heart, Users, GraduationCap, HandHeart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import volunteersImage from "@/assets/volunteers.jpg";
import coursesImage from "@/assets/courses.jpg";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { data: announcements } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    }
  });

  const { data: projects } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    }
  });

  const { data: courses } = useQuery({
    queryKey: ['featured-courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false })
        .limit(3);
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/50" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
            Transformando Vidas
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 max-w-2xl mx-auto">
            Educação, solidariedade e esperança para quem mais precisa
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/voluntarios">
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-elegant">
                Seja Voluntário
                <Heart className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/projetos">
              <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary/10">
                Conheça os Projetos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "500+", label: "Pessoas Atendidas" },
              { icon: GraduationCap, value: "50+", label: "Cursos Oferecidos" },
              { icon: HandHeart, value: "100+", label: "Voluntários Ativos" },
              { icon: Heart, value: "20+", label: "Projetos Sociais" }
            ].map((stat, index) => (
              <Card key={index} className="text-center border-none shadow-soft hover:shadow-elegant transition-shadow">
                <CardHeader>
                  <stat.icon className="h-12 w-12 mx-auto text-primary mb-2" />
                  <CardTitle className="text-4xl font-bold text-primary">{stat.value}</CardTitle>
                  <CardDescription className="text-base">{stat.label}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      {announcements && announcements.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Anúncios e Novidades</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="hover:shadow-elegant transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{announcement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Projects */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nossos Projetos Sociais</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conheça as iniciativas que estão transformando vidas em nossa comunidade
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1">
                  {project.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.category}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">{project.description}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-muted-foreground">
                Novos projetos em breve!
              </div>
            )}
          </div>

          <div className="text-center">
            <Link to="/projetos">
              <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary/10">
                Ver Todos os Projetos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Cursos Disponíveis</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Capacitação gratuita para o desenvolvimento pessoal e profissional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <Card key={course.id} className="hover:shadow-elegant transition-all hover:-translate-y-1">
                  {course.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    {course.instructor && (
                      <CardDescription>Instrutor: {course.instructor}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-muted-foreground line-clamp-2">{course.description}</p>
                    {course.duration && (
                      <p className="text-sm text-muted-foreground">Duração: {course.duration}</p>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-muted-foreground">
                Novos cursos em breve!
              </div>
            )}
          </div>

          <div className="text-center">
            <Link to="/cursos">
              <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary/10">
                Ver Todos os Cursos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Volunteers CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Seja um Voluntário</h2>
              <p className="text-lg text-muted-foreground">
                Temos oportunidades em diversas áreas: Informática, Advocacia, Psicologia, Enfermagem e muito mais. 
                Doe seu tempo e conhecimento para transformar vidas!
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-primary" />
                  <span>Faça a diferença na sua comunidade</span>
                </li>
                <li className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Conecte-se com pessoas incríveis</span>
                </li>
                <li className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <span>Desenvolva novas habilidades</span>
                </li>
              </ul>
              <Link to="/voluntarios">
                <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-elegant">
                  Quero Ser Voluntário
                  <HandHeart className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden shadow-elegant">
              <img src={volunteersImage} alt="Voluntários" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
