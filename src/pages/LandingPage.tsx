
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, PiggyBank, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/app/dashboard');
  };

  const features = [
    {
      icon: BarChart3,
      title: "Expense Tracking",
      description: "Track your daily expenses and categorize them efficiently"
    },
    {
      icon: TrendingUp,
      title: "Spending Analysis",
      description: "Visualize your spending patterns with interactive charts"
    },
    {
      icon: PiggyBank,
      title: "Savings Goals",
      description: "Set and monitor your savings goals with ease"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-expense-primary to-expense-light">
            Welcome to SpendWise
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Take control of your finances with our powerful expense tracking and management tools.
          </p>
          <Button
            size="lg"
            onClick={handleGetStarted}
            className="group text-lg bg-expense-primary hover:bg-expense-primary/90"
          >
            Get Started
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-expense-light mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            Ready to manage your expenses better?
          </h2>
          <Button
            size="lg"
            onClick={handleGetStarted}
            variant="outline"
            className="group"
          >
            Start Now
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
