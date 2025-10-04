import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Clock, Users, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Cursos = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Login necessário",
        description: "Você precisa estar logado para se inscrever em um curso",
      });
      return;
    }

    const { error } = await supabase
      .from('course_enrollments')
      .insert({
        course_id: courseId,
        user_id: user.id,
        status: 'pending'
      });

    if (error) {
      if (error.code === '23505') {
        toast({
          variant: "destructive",
          title: "Já inscrito",
          description: "Você já está inscrito neste curso",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao inscrever",
          description: error.message,
        });
      }
      return;
    }

    toast({
      title: "Inscrição realizada!",
      description: "Você foi inscrito no curso com sucesso",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-accent text-accent-foreground';
      case 'full':
        return 'bg-primary/20 text-primary';
      case 'closed':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open':
        return 'Aberto';
      case 'full':
        return 'Lotado';
      case 'closed':
        return 'Encerrado';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Cursos Disponíveis
              </h1>
              <p className="text-lg text-muted-foreground">
                Capacitação gratuita para o desenvolvimento pessoal e profissional
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : courses && courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1 animate-fade-in flex flex-col">
                    {course.image_url && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={course.image_url} 
                          alt={course.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105" 
                        />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <CardTitle className="text-xl">{course.title}</CardTitle>
                        <Badge className={getStatusColor(course.status)}>
                          {getStatusLabel(course.status)}
                        </Badge>
                      </div>
                      {course.instructor && (
                        <CardDescription className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {course.instructor}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-muted-foreground mb-4">{course.description}</p>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        {course.duration && (
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{course.duration}</span>
                          </div>
                        )}
                        {course.max_participants && (
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span>{course.current_participants || 0} / {course.max_participants} participantes</span>
                          </div>
                        )}
                        {course.schedule && (
                          <p className="text-sm">Horário: {course.schedule}</p>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={course.status !== 'open'}
                        onClick={() => handleEnroll(course.id)}
                      >
                        {course.status === 'open' ? 'Inscrever-se' : 'Indisponível'}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  Ainda não temos cursos cadastrados. Em breve teremos novidades!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cursos;
