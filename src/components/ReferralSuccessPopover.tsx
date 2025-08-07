import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Share2, Copy, Twitter, MessageCircle, Mail, Users, Gift } from "lucide-react";

interface ReferralSuccessPopoverProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ReferralSuccessPopover = ({ isOpen, onOpenChange }: ReferralSuccessPopoverProps) => {
  const { toast } = useToast();
  const [showIncentive, setShowIncentive] = useState(true);

  const shareUrl = window.location.origin + "/join-waitlist";
  const shareText = "Join me on the Ventus Card waitlist - the future of personalized rewards is here!";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Share link has been copied to your clipboard."
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive"
      });
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=350');
  };

  const handleEmailShare = () => {
    const emailSubject = "Check out Ventus Card!";
    const emailBody = `${shareText}\n\n${shareUrl}`;
    const emailUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    window.open(emailUrl);
  };

  const handleSMSShare = () => {
    const smsText = `${shareText} ${shareUrl}`;
    const smsUrl = `sms:?body=${encodeURIComponent(smsText)}`;
    window.open(smsUrl);
  };

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <div style={{ display: 'none' }} />
      </PopoverTrigger>
      <PopoverContent className="w-80 p-6 bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50/50 border-blue-200 shadow-xl">
        <div className="space-y-4">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mb-3">
              <Users className="text-white" size={24} />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 mb-2">
              Welcome to Ventus!
            </h3>
            <p className="text-slate-600 text-sm">
              Share Ventus with friends and unlock exclusive benefits
            </p>
          </div>

          {/* Incentive Section */}
          {showIncentive && (
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex-shrink-0">
                  <Gift className="text-white" size={16} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 text-sm mb-1">
                    Early Access Rewards
                  </h4>
                  <p className="text-slate-700 text-xs leading-relaxed">
                    Share with friends to move up the waitlist and unlock exclusive launch benefits
                  </p>
                </div>
                <button
                  onClick={() => setShowIncentive(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs p-1"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Sharing Options */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-900 text-sm flex items-center gap-2">
              <Share2 size={16} />
              Share Ventus
            </h4>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="flex items-center gap-2 text-xs bg-white hover:bg-blue-50 border-blue-200"
              >
                <Copy size={14} />
                Copy Link
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleTwitterShare}
                className="flex items-center gap-2 text-xs bg-white hover:bg-blue-50 border-blue-200"
              >
                <Twitter size={14} />
                Twitter
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleEmailShare}
                className="flex items-center gap-2 text-xs bg-white hover:bg-blue-50 border-blue-200"
              >
                <Mail size={14} />
                Email
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleSMSShare}
                className="flex items-center gap-2 text-xs bg-white hover:bg-blue-50 border-blue-200"
              >
                <MessageCircle size={14} />
                SMS
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-blue-200">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="w-full text-xs text-slate-600 hover:text-slate-900"
            >
              Continue Exploring
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ReferralSuccessPopover;