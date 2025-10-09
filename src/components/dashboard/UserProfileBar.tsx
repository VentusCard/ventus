import { User, Dumbbell, Heart, Dog, Gamepad2, Palette, Home, Snowflake, Flag, Circle, Zap, Bike, Waves } from "lucide-react";
import { LucideIcon } from "lucide-react";

type LifestyleGoal = "sports" | "wellness" | "pets" | "gamers" | "creatives" | "homeowners";

interface Profile {
  full_name: string | null;
  lifestyle_goal: string | null;
  selected_categories: string[] | null;
}

interface UserProfileBarProps {
  profile: Profile;
}

const goalIcons: Record<string, LucideIcon> = {
  sports: Dumbbell,
  wellness: Heart,
  pets: Dog,
  gamers: Gamepad2,
  creatives: Palette,
  homeowners: Home,
};

const goalColors: Record<string, string> = {
  sports: "from-blue-500 to-cyan-500",
  wellness: "from-emerald-500 to-teal-500",
  pets: "from-orange-500 to-amber-500",
  gamers: "from-purple-500 to-pink-500",
  creatives: "from-fuchsia-500 to-purple-500",
  homeowners: "from-slate-500 to-zinc-500",
};

const goalTitles: Record<string, string> = {
  sports: "Sports Enthusiast",
  wellness: "Wellness Focused",
  pets: "Pet Owner",
  gamers: "Gamer",
  creatives: "Creative",
  homeowners: "Homeowner",
};

const categoryIcons: Record<string, LucideIcon> = {
  "Snow Sports": Snowflake,
  "Golf": Flag,
  "Tennis/Racquet Sports": Circle,
  "Running/Track": Zap,
  "Basketball": Circle,
  "Football": Circle,
  "Soccer": Circle,
  "Cycling/Biking": Bike,
  "Water Sports": Waves,
  "Fitness/Gym": Dumbbell,
  "Yoga/Pilates": Heart,
};

const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const UserProfileBar = ({ profile }: UserProfileBarProps) => {
  const goal = profile.lifestyle_goal || "sports";
  const GoalIcon = goalIcons[goal] || Dumbbell;
  const goalGradient = goalColors[goal] || goalColors.sports;
  const goalTitle = goalTitles[goal] || goal;
  const categories = profile.selected_categories || [];

  return (
    <div className="w-full bg-background/95 backdrop-blur-lg border-b border-border shadow-sm animate-slideDown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          {/* User Section */}
          <div className="flex items-center gap-3 min-w-fit">
            <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${goalGradient} flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-white`}>
              {profile.full_name ? getInitials(profile.full_name) : <User className="h-5 w-5" />}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {profile.full_name || "Guest User"}
              </p>
              <p className="text-xs text-muted-foreground">Member</p>
            </div>
          </div>

          {/* Goal Section */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${goalGradient} bg-opacity-10 border border-primary/20 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105`}>
            <GoalIcon className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-foreground whitespace-nowrap">
              {goalTitle}
            </span>
          </div>

          {/* Categories Section */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto scrollbar-hide">
            {categories.slice(0, 5).map((cat, idx) => {
              const CategoryIcon = categoryIcons[cat] || Circle;
              return (
                <div
                  key={cat}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-card rounded-md border-l-4 border-l-primary shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 animate-slideInLeft"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <CategoryIcon className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-xs font-medium text-foreground whitespace-nowrap">
                    {cat}
                  </span>
                </div>
              );
            })}
            {categories.length > 5 && (
              <div className="flex items-center justify-center px-3 py-1.5 bg-muted rounded-md text-xs font-medium text-muted-foreground">
                +{categories.length - 5} more
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
