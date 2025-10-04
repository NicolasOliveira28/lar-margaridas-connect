import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Heart, Code, Scale, Brain, Activity, Loader2 } from "lucide-react";
import volunteersImage from "@/assets/volunteers.jpg";
import { z } from "zod";

const volunteerSchema = z.object({
  specialty: z.string().min(1, "Selecione uma área de atuação"),
  availability: z.string().min(10, "Descreva sua disponibilidade com mais detalhes"),
  experience: z.string().min(20, "Conte-nos mais sobre sua experiência"),
});

const Voluntarios = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    specialty: "",
    availability: "",
    experience: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        variant: "destructive",
        title: "Login necessário",
        description: "Você precisa estar logado para se candidatar como voluntário",
      });
      return;
    }

    try {
      volunteerSchema.parse(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          variant: "destructive",
          title: "Erro de validação",
          description: error.errors[0].message,
        });
        return;
      }
    }

    setLoading(true);

    const { error } = await supabase
      .from('volunteers')
      .insert({
        user_id: user.id,
        specialty: formData.specialty,
        availability: formData.availability,
        experience: formData.experience,
        approved: false,
      });

    setLoading(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar candidatura",
        description: error.message,
      });
      return;
    }

    toast({
      title: "Candidatura enviada!",
      description: "Sua candidatura está em análise. Entraremos em contato em breve.",
    });

    setFormData({
      specialty: "",
      availability: "",
      experience: "",
    });
  };

  const specialties = [
    { value: "informatica", label: "Informática", icon: Code },
    { value: "advocacia", label: "Advocacia", icon: Scale },
    { value: "psicologia", label: "Psicologia", icon: Brain },
    { value: "enfermagem", label: "Enfermagem", icon: Activity },
    { value: "outros", label: "Outros", icon: Heart },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Seja um Voluntário
              </h1>
              <p className="text-lg text-muted-foreground">
                Doe seu tempo e conhecimento para transformar vidas
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Por que ser voluntário?</h2>
                <p className="text-muted-foreground text-lg">
                  No Lar de Margaridas, acreditamos que cada pessoa tem algo valioso para oferecer. 
                  Como voluntário, você pode fazer a diferença na vida de pessoas que precisam de apoio.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Heart className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Impacto Real</h3>
                      <p className="text-muted-foreground">Veja o resultado direto do seu trabalho na comunidade</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Brain className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Desenvolvimento Pessoal</h3>
                      <p className="text-muted-foreground">Desenvolva novas habilidades e expanda sua rede</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Activity className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Flexibilidade</h3>
                      <p className="text-muted-foreground">Escolha como e quando deseja contribuir</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg overflow-hidden shadow-elegant">
                <img src={volunteersImage} alt="Voluntários" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Áreas de Atuação</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
                {specialties.map((specialty) => (
                  <Card key={specialty.value} className="text-center hover:shadow-elegant transition-shadow">
                    <CardHeader>
                      <specialty.icon className="h-12 w-12 mx-auto text-primary mb-2" />
                      <CardTitle className="text-lg">{specialty.label}</CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <Card className="shadow-elegant">
                <CardHeader>
                  <CardTitle className="text-2xl">Formulário de Candidatura</CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo para se candidatar como voluntário
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!user ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        Você precisa estar logado para se candidatar como voluntário
                      </p>
                      <Button 
                        onClick={() => window.location.href = '/auth'}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Fazer Login
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="specialty">Área de Atuação *</Label>
                        <Select
                          value={formData.specialty}
                          onValueChange={(value) => setFormData({ ...formData, specialty: value })}
                        >
                          <SelectTrigger id="specialty">
                            <SelectValue placeholder="Selecione sua área" />
                          </SelectTrigger>
                          <SelectContent>
                            {specialties.map((specialty) => (
                              <SelectItem key={specialty.value} value={specialty.value}>
                                {specialty.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="availability">Disponibilidade *</Label>
                        <Textarea
                          id="availability"
                          placeholder="Descreva sua disponibilidade de horários e dias da semana"
                          value={formData.availability}
                          onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                          rows={3}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Experiência *</Label>
                        <Textarea
                          id="experience"
                          placeholder="Conte-nos sobre sua experiência na área e por que deseja ser voluntário"
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                          rows={5}
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            Enviar Candidatura
                            <Heart className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Voluntarios;
