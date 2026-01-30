import { Target, Brain, Gift } from "lucide-react";

const steps = [
  {
    icon: Target,
    title: "Choose Your Goal",
    description: "Pick what matters to you: sports, wellness, pets, gaming, and more.",
  },
  {
    icon: Brain,
    title: "AI Does The Work",
    description: "Ventus AI recognizes ALL related purchases across 1000s of merchants.",
  },
  {
    icon: Gift,
    title: "Earn More",
    description: "Get 5x on purchases other cards would miss.",
  },
];

const HowItWorksQuickView = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-8 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-10">
          How Ventus Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-card border border-border/50"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksQuickView;
