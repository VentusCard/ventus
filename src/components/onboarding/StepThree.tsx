
import { OnboardingData } from "@/pages/HowItWorks";
import BenefitsCard from "./step-three/BenefitsCard";
import MerchantDealsSection from "./step-three/MerchantDealsSection";
import PersonalizedExperienceSection from "./step-three/PersonalizedExperienceSection";

interface StepThreeProps {
  onboardingData: OnboardingData;
}

const StepThree = ({ onboardingData }: StepThreeProps) => {
  return (
    <div>
      {/* Benefits section moved to very top and restructured */}
      <div className="mb-12 -mt-4">
        <BenefitsCard />
      </div>
      
      {/* Example merchant deals section */}
      <MerchantDealsSection onboardingData={onboardingData} />
      
      {/* Personalized experience section */}
      <PersonalizedExperienceSection onboardingData={onboardingData} />
    </div>
  );
};

export default StepThree;
