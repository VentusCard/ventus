
import { OnboardingData } from "@/pages/HowItWorks";
import ProfileCard from "./ProfileCard";
import RewardsCard from "./RewardsCard";
import WaitlistForm from "./WaitlistForm";

interface PersonalizedExperienceSectionProps {
  onboardingData: OnboardingData;
}

const PersonalizedExperienceSection = ({ onboardingData }: PersonalizedExperienceSectionProps) => {
  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Your Personalized Ventus Experience</h2>
      <p className="text-lg text-slate-600 mb-8">
        Based on your selections, here's a summary of your personalized Ventus Card experience.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="space-y-6">
          <ProfileCard onboardingData={onboardingData} />
          <RewardsCard onboardingData={onboardingData} />
        </div>
        
        <div>
          {/* Empty div to maintain grid layout */}
        </div>
      </div>
      
      <WaitlistForm />
    </div>
  );
};

export default PersonalizedExperienceSection;
