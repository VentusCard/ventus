import { Apple, PlayIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const AppDownload = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="p-8 md:p-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Download Ventus
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Get the Ventus app on your mobile device and start maximizing your rewards today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg"
              onClick={() => {
                // TODO: Replace with actual App Store link
                window.open("#", "_blank");
              }}
            >
              <Apple className="w-6 h-6 mr-3" />
              Download on the App Store
            </Button>
            
            <Button 
              size="lg" 
              className="h-14 px-8 text-lg"
              onClick={() => {
                // TODO: Replace with actual Play Store link
                window.open("#", "_blank");
              }}
            >
              <PlayIcon className="w-6 h-6 mr-3" />
              Get it on Google Play
            </Button>
          </div>
          
          <p className="text-sm text-slate-500">
            Coming soon to iOS and Android
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppDownload;
