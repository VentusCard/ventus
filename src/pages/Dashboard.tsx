import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import Navbar from "@/components/Navbar";
import { ChatPanel } from "@/components/dashboard/ChatPanel";
import { DealsPanel } from "@/components/dashboard/DealsPanel";
import { UserProfileBar } from "@/components/dashboard/UserProfileBar";
import { useDealSearch } from "@/hooks/useDealSearch";

interface Profile {
  full_name: string | null;
  lifestyle_goal: string | null;
  selected_categories: string[] | null;
  estimated_annual_spend: number | null;
  estimated_rewards: number | null;
  onboarding_completed: boolean;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { messages, deals, isLoading, searchDeals } = useDealSearch();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (!session) {
          navigate("/login");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/login");
      } else {
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("full_name, lifestyle_goal, selected_categories, estimated_annual_spend, estimated_rewards, onboarding_completed")
      .eq("id", userId)
      .single();

    if (data) {
      if (!data.onboarding_completed) {
        navigate("/smartrewards");
      } else {
        setProfile(data);
      }
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex flex-col pt-16">
        {profile && <UserProfileBar profile={profile} />}
        <div className="grid grid-cols-1 lg:grid-cols-5 flex-1 overflow-hidden">
          <div className="lg:col-span-2 h-full">
            <ChatPanel
              messages={messages}
              isLoading={isLoading}
              onSendMessage={searchDeals}
              profile={profile}
            />
          </div>
          <div className="lg:col-span-3 h-full">
            <DealsPanel deals={deals} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
