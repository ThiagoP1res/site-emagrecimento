"use client";

import { useState, useEffect } from "react";
import {
  Flame,
  Target,
  TrendingDown,
  Clock,
  Star,
  CheckCircle2,
  Play,
  Heart,
  Zap,
  Award,
  Users,
  Calendar,
  CreditCard,
  ArrowRight,
  Sparkles,
  Trophy,
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  id: number;
  name: string;
  age: number;
  weight_lost: string;
  image: string;
  text: string;
  rating: number;
}

interface Tip {
  id: number;
  title: string;
  description: string;
  icon: string;
  category: string;
}

interface Plan {
  id: number;
  name: string;
  price: number;
  installments: number;
  features: string[];
  popular: boolean;
  discount: number;
  caloriesPerMeal?: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  type?: "single" | "input";
}

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 23,
    minutes: 59,
    seconds: 59,
  });
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [ageInput, setAgeInput] = useState("");

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  // Quiz questions
  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "Qual é o seu sexo?",
      options: ["Masculino", "Feminino", "Prefiro não informar"],
    },
    {
      id: 2,
      question: "Quantos anos você tem?",
      options: [],
      type: "input",
    },
    {
      id: 3,
      question: "Qual é o seu principal objetivo?",
      options: [
        "Perder peso rapidamente",
        "Ganhar massa muscular",
        "Melhorar saúde geral",
        "Ter mais energia no dia a dia",
      ],
    },
    {
      id: 4,
      question: "Qual é o seu maior desafio atualmente?",
      options: [
        "Falta de motivação",
        "Não sei por onde começar",
        "Dificuldade em manter a dieta",
        "Falta de tempo para exercícios",
      ],
    },
    {
      id: 5,
      question: "Quanto peso você deseja perder?",
      options: [
        "Até 5kg",
        "Entre 5kg e 10kg",
        "Entre 10kg e 20kg",
        "Mais de 20kg",
      ],
    },
    {
      id: 6,
      question: "Você já tentou emagrecer antes?",
      options: [
        "Sim, mas não consegui manter",
        "Sim, e tive resultados temporários",
        "Não, é minha primeira vez",
        "Sim, mas não vi resultados",
      ],
    },
    {
      id: 7,
      question: "Qual é o seu nível de atividade física atual?",
      options: [
        "Sedentário (nenhuma atividade)",
        "Leve (1-2 vezes por semana)",
        "Moderado (3-4 vezes por semana)",
        "Intenso (5+ vezes por semana)",
      ],
    },
  ];

  // Handle plan selection - open quiz
  const handlePlanClick = (planId: number) => {
    setSelectedPlan(planId);
    setShowQuiz(true);
    setCurrentQuestion(0);
    setQuizAnswers({});
    setQuizCompleted(false);
    setAgeInput("");
  };

  // Handle quiz answer
  const handleQuizAnswer = (answer: string) => {
    setQuizAnswers({ ...quizAnswers, [currentQuestion]: answer });
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  // Handle age input submission
  const handleAgeSubmit = () => {
    if (ageInput && parseInt(ageInput) > 0 && parseInt(ageInput) < 120) {
      handleQuizAnswer(ageInput);
    }
  };

  // Close quiz
  const closeQuiz = () => {
    setShowQuiz(false);
    setCurrentQuestion(0);
    setQuizAnswers({});
    setQuizCompleted(false);
    setAgeInput("");
  };

  // Complete purchase
  const completePurchase = () => {
    alert(`Parabéns! Você está prestes a iniciar sua transformação com o ${plans.find(p => p.id === selectedPlan)?.name}!`);
    closeQuiz();
  };

  const testimonials: Testimonial[] = [
    {
      id: 4,
      name: "Juliana Oliveira",
      age: 29,
      weight_lost: "17kg",
      image: "https://images.pexels.com/photos/3768593/pexels-photo-3768593.jpeg?auto=compress&cs=tinysrgb&w=600",
      text: "Perdi 17kg em 4 meses! Minha autoestima voltou e me sinto incrível. O método é simples e funciona de verdade!",
      rating: 5,
    },
    {
      id: 5,
      name: "Carlos Mendes",
      age: 35,
      weight_lost: "24kg",
      image: "https://images.pexels.com/photos/1547248/pexels-photo-1547248.jpeg?auto=compress&cs=tinysrgb&w=600",
      text: "Eliminei 24kg e ganhei massa muscular! Hoje tenho energia para brincar com meus filhos. Mudou minha vida completamente!",
      rating: 5,
    },
    {
      id: 6,
      name: "Fernanda Almeida",
      age: 31,
      weight_lost: "19kg",
      image: "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/db5d3e00-1fd8-4321-83e9-55f7d49b94c9.jpg",
      text: "🔥 19kg eliminados em 5 meses! Meu corpo mudou, minha mente mudou, MINHA VIDA MUDOU! Nunca imaginei que seria tão fácil seguir o método. Hoje uso roupas que nem sonhava caber!",
      rating: 5,
    },
    {
      id: 7,
      name: "Bruno Martins",
      age: 33,
      weight_lost: "26kg",
      image: "https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/a26c2c54-61c1-4ffd-8799-06dd7fe14ca3.jpg",
      text: "💪 26kg ELIMINADOS! Passei de sedentário a atleta em 6 meses. Minha pressão normalizou, meu colesterol caiu e hoje me sinto 10 anos mais jovem. Esse método salvou minha vida!",
      rating: 5,
    },
  ];

  const tips: Tip[] = [
    {
      id: 1,
      title: "Hidratação é Fundamental",
      description: "Beba pelo menos 2 litros de água por dia para acelerar o metabolismo e eliminar toxinas.",
      icon: "💧",
      category: "Nutrição",
    },
    {
      id: 2,
      title: "Exercícios Diários",
      description: "30 minutos de atividade física por dia fazem toda a diferença nos resultados.",
      icon: "🏃",
      category: "Exercícios",
    },
    {
      id: 3,
      title: "Alimentação Balanceada",
      description: "Priorize proteínas magras, vegetais e frutas. Evite alimentos processados.",
      icon: "🥗",
      category: "Nutrição",
    },
    {
      id: 4,
      title: "Sono de Qualidade",
      description: "Durma 7-8 horas por noite. O sono adequado regula hormônios da fome.",
      icon: "😴",
      category: "Bem-estar",
    },
    {
      id: 5,
      title: "Controle de Porções",
      description: "Use pratos menores e mastigue devagar. Isso ajuda a comer menos e se sentir satisfeito.",
      icon: "🍽️",
      category: "Nutrição",
    },
    {
      id: 6,
      title: "Mindfulness",
      description: "Pratique meditação e controle o estresse. Ansiedade pode levar à compulsão alimentar.",
      icon: "🧘",
      category: "Bem-estar",
    },
  ];

  const plans: Plan[] = [
    {
      id: 1,
      name: "Plano Básico",
      price: 67,
      installments: 12,
      features: [
        "Acesso a todas as dicas",
        "Plano alimentar básico",
        "Suporte por email",
        "Grupo de apoio",
      ],
      popular: false,
      discount: 0,
    },
    {
      id: 2,
      name: "Plano Premium",
      price: 117,
      installments: 12,
      features: [
        "Tudo do Plano Básico",
        "Treinos personalizados",
        "Acompanhamento semanal",
        "Receitas exclusivas",
        "App mobile premium",
        "Consultoria nutricional",
        "🔥 Cardápio com gasto calórico detalhado",
      ],
      popular: true,
      discount: 30,
      caloriesPerMeal: "350-450 kcal",
    },
    {
      id: 3,
      name: "Plano VIP",
      price: 187,
      installments: 12,
      features: [
        "Tudo do Plano Premium",
        "Acompanhamento diário",
        "Personal trainer online",
        "Nutricionista dedicado",
        "Suplementação inclusa",
        "Acesso vitalício",
        "🔥 Cardápio premium com gasto calórico por refeição",
      ],
      popular: false,
      discount: 40,
      caloriesPerMeal: "300-400 kcal",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={closeQuiz}
              className="absolute top-4 right-4 z-10"
            >
              <X className="w-6 h-6" />
            </Button>
            
            <CardContent className="p-8">
              {!quizCompleted ? (
                <>
                  <div className="mb-6">
                    <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white mb-4">
                      Pergunta {currentQuestion + 1} de {quizQuestions.length}
                    </Badge>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                    {quizQuestions[currentQuestion].question}
                  </h3>

                  {quizQuestions[currentQuestion].type === "input" ? (
                    <div className="space-y-4">
                      <input
                        type="number"
                        value={ageInput}
                        onChange={(e) => setAgeInput(e.target.value)}
                        placeholder="Digite sua idade"
                        className="w-full p-6 text-lg border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition-all"
                        min="1"
                        max="120"
                      />
                      <Button
                        onClick={handleAgeSubmit}
                        disabled={!ageInput || parseInt(ageInput) <= 0}
                        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-lg py-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continuar
                        <ChevronRight className="w-6 h-6 ml-2" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuizAnswer(option)}
                          className="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all duration-200 group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-medium text-gray-800 group-hover:text-pink-600">
                              {option}
                            </span>
                            <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    Perfeito! Entendemos suas necessidades
                  </h3>
                  <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                    Com base nas suas respostas, o <span className="font-bold text-pink-600">{plans.find(p => p.id === selectedPlan)?.name}</span> é ideal para você alcançar seus objetivos!
                  </p>

                  <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-6 mb-8">
                    <h4 className="font-bold text-xl text-gray-900 mb-4">Seu plano personalizado inclui:</h4>
                    <ul className="space-y-3 text-left">
                      {plans.find(p => p.id === selectedPlan)?.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-2">
                      R$ {Math.round((plans.find(p => p.id === selectedPlan)?.price || 0) * (1 - (plans.find(p => p.id === selectedPlan)?.discount || 0) / 100))}
                    </div>
                    <div className="text-gray-600">
                      ou {plans.find(p => p.id === selectedPlan)?.installments}x de R$ {Math.round((plans.find(p => p.id === selectedPlan)?.price || 0) * (1 - (plans.find(p => p.id === selectedPlan)?.discount || 0) / 100) / (plans.find(p => p.id === selectedPlan)?.installments || 1))}
                    </div>
                  </div>

                  <Button
                    onClick={completePurchase}
                    className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-lg py-7 rounded-full shadow-xl"
                  >
                    <Zap className="w-6 h-6 mr-2" />
                    Começar Minha Transformação Agora
                  </Button>

                  <p className="text-sm text-gray-500 mt-4 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Garantia de 30 dias ou seu dinheiro de volta
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-yellow-400 text-yellow-900 hover:bg-yellow-300 text-sm md:text-base px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Transforme seu Corpo para o Verão
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Conquiste o Corpo dos Seus Sonhos
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Método comprovado que já ajudou mais de 10.000 pessoas a emagrecerem de forma saudável e sustentável
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-pink-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all"
              >
                <Zap className="w-5 h-5 mr-2" />
                Começar Agora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full"
              >
                <Play className="w-5 h-5 mr-2" />
                Ver Resultados
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-orange-50 to-transparent"></div>
      </section>

      {/* Countdown Offer Section */}
      <section className="py-8 bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Flame className="w-8 h-8 animate-pulse" />
              OFERTA RELÂMPAGO - 50% OFF
              <Flame className="w-8 h-8 animate-pulse" />
            </h3>
            <p className="text-lg mb-6">Aproveite o desconto especial antes que acabe!</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl md:text-4xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm">Horas</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl md:text-4xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm">Minutos</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                <div className="text-3xl md:text-4xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm">Segundos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">10k+</div>
              <div className="text-gray-600 flex items-center justify-center gap-2">
                <Users className="w-4 h-4" />
                Pessoas Transformadas
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600 flex items-center justify-center gap-2">
                <Trophy className="w-4 h-4" />
                Taxa de Sucesso
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">-18kg</div>
              <div className="text-gray-600 flex items-center justify-center gap-2">
                <TrendingDown className="w-4 h-4" />
                Média de Perda
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">4.9★</div>
              <div className="text-gray-600 flex items-center justify-center gap-2">
                <Star className="w-4 h-4" />
                Avaliação Média
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-500 text-white hover:bg-blue-600">
              <Target className="w-4 h-4 mr-2 inline" />
              Dicas Exclusivas
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Dicas para Acelerar Seus Resultados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Estratégias comprovadas para potencializar seu emagrecimento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tips.map((tip) => (
              <Card
                key={tip.id}
                className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-400 bg-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{tip.icon}</div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleFavorite(tip.id)}
                      className="hover:bg-pink-100"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          favorites.includes(tip.id)
                            ? "fill-pink-500 text-pink-500"
                            : "text-gray-400"
                        }`}
                      />
                    </Button>
                  </div>
                  <Badge className="mb-3 bg-blue-100 text-blue-700 hover:bg-blue-200">
                    {tip.category}
                  </Badge>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600">
              <Award className="w-4 h-4 mr-2 inline" />
              Planos Especiais
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Escolha Seu Plano Ideal
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Parcele em até 12x sem juros e comece sua transformação hoje
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative overflow-hidden transition-all duration-300 ${
                  plan.popular
                    ? "border-4 border-pink-500 shadow-2xl scale-105 md:scale-110"
                    : "border-2 hover:border-orange-400 hover:shadow-xl"
                } ${selectedPlan === plan.id ? "ring-4 ring-green-400" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 text-sm font-bold transform rotate-0 translate-x-0 translate-y-0">
                    <Star className="w-4 h-4 inline mr-1" />
                    MAIS POPULAR
                  </div>
                )}
                {plan.discount > 0 && (
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white text-lg px-3 py-1">
                    -{plan.discount}%
                  </Badge>
                )}
                <CardContent className="p-8 pt-16">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    {plan.discount > 0 && (
                      <div className="text-2xl text-gray-400 line-through mb-2">
                        R$ {plan.price}
                      </div>
                    )}
                    <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 mb-2">
                      R$ {Math.round(plan.price * (1 - plan.discount / 100))}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <CreditCard className="w-4 h-4" />
                      <span>ou {plan.installments}x de R$ {Math.round((plan.price * (1 - plan.discount / 100)) / plan.installments)}</span>
                    </div>
                  </div>

                  {/* Destaque de Calorias */}
                  {plan.caloriesPerMeal && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl border-2 border-orange-300">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Flame className="w-6 h-6 text-orange-600 animate-pulse" />
                        <span className="font-bold text-orange-900 text-lg">GASTO CALÓRICO</span>
                        <Flame className="w-6 h-6 text-orange-600 animate-pulse" />
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600">
                          {plan.caloriesPerMeal}
                        </div>
                        <div className="text-sm text-gray-700 font-semibold mt-1">
                          por refeição
                        </div>
                      </div>
                      <div className="mt-3 text-center text-xs text-gray-600 font-medium">
                        ✨ Cardápio detalhado com calorias exatas
                      </div>
                    </div>
                  )}

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handlePlanClick(plan.id)}
                    className={`w-full text-lg py-6 rounded-full transition-all ${
                      plan.popular
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-lg"
                        : "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                    }`}
                  >
                    Começar Agora
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-500 text-white hover:bg-green-600">
              <Trophy className="w-4 h-4 mr-2 inline" />
              Transformações Reais
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Resultados Reais de Pessoas Reais
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Veja como nosso método transformou a vida de milhares de pessoas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-green-400 bg-white overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Imagem grande no topo */}
                  <div className="relative w-full h-80 overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-base px-4 py-2 shadow-lg">
                        <TrendingDown className="w-4 h-4 mr-2 inline" />
                        {testimonial.weight_lost}
                      </Badge>
                    </div>
                  </div>

                  {/* Conteúdo embaixo */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.age} anos</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <p className="text-gray-700 italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Pronto para Transformar Seu Corpo?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Junte-se a milhares de pessoas que já alcançaram seus objetivos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-pink-600 hover:bg-gray-100 text-lg px-10 py-7 rounded-full shadow-2xl transform hover:scale-105 transition-all"
              >
                <Zap className="w-6 h-6 mr-2" />
                Começar Minha Transformação
              </Button>
            </div>
            <p className="mt-6 text-white/80 flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5" />
              Garantia de 30 dias ou seu dinheiro de volta
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Transformação Verão. Todos os direitos reservados.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Resultados podem variar de pessoa para pessoa. Consulte um profissional de saúde.
          </p>
        </div>
      </footer>
    </div>
  );
}
