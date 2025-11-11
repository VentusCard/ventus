import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TranscriptUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAnalysisComplete: (insights: TranscriptInsights) => void;
}

export interface TranscriptInsights {
  opportunities: Array<{
    category: string;
    description: string;
    confidence: number;
    quote: string;
    recommended_action: string;
  }>;
  psychological_insights: Array<{
    aspect: string;
    assessment: string;
    evidence: string;
    confidence: number;
  }>;
  action_items: string[];
  life_events: Array<{
    event: string;
    confidence: number;
    evidence: string;
  }>;
  clientName?: string;
  meetingDate?: string;
}

const TRANSCRIPT_ANALYSIS_PROMPT = `You are an expert wealth management psychoanalyst and opportunity detector.

Analyze this meeting transcript to extract:

1. OPPORTUNITIES (Business Development):
   - Upsell/cross-sell opportunities
   - Product recommendations
   - Risk mitigation needs
   - Investment opportunities
   - Life insurance or estate planning triggers

2. PSYCHOLOGICAL INSIGHTS:
   - Client emotional state (confident, anxious, uncertain, optimistic)
   - Risk tolerance indicators
   - Decision-making style
   - Trust level with advisor
   - Financial sophistication level

3. ACTION ITEMS:
   - Commitments made by advisor
   - Client requests
   - Follow-up items with deadlines

4. LIFE EVENT SIGNALS:
   - Job changes, retirement, marriage, divorce
   - Home purchase/sale
   - Children education planning
   - Health concerns
   - Business ownership changes

Provide a comprehensive analysis with specific quotes and recommendations.`;

export function TranscriptUploadDialog({ open, onOpenChange, onAnalysisComplete }: TranscriptUploadDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientName, setClientName] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [transcriptText, setTranscriptText] = useState('');
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!transcriptText.trim()) {
      toast({
        title: "Error",
        description: "Please enter transcript text",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      const analysisMessage = `${TRANSCRIPT_ANALYSIS_PROMPT}

CLIENT: ${clientName || 'Unknown'}
DATE: ${meetingDate || 'Not specified'}

TRANSCRIPT:
${transcriptText}

Please provide structured analysis with opportunities, psychological insights, action items, and life events.`;

      const { data, error } = await supabase.functions.invoke("advisor-chat", {
        body: {
          message: analysisMessage,
          conversationHistory: [],
          context: null
        },
      });

      if (error) throw error;

      // Parse the AI response into structured insights
      const insights = parseAIResponseToInsights(data.message, clientName, meetingDate);
      
      toast({
        title: "✓ Transcript Analyzed",
        description: "Analysis complete - review insights below"
      });
      
      onAnalysisComplete(insights);
      onOpenChange(false);
      
      // Reset form
      setClientName('');
      setMeetingDate('');
      setTranscriptText('');
      
    } catch (error) {
      console.error('Error analyzing transcript:', error);
      toast({
        title: "Error",
        description: "Failed to analyze transcript",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Upload Meeting Transcript
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Client Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Client Name (Optional)</Label>
              <Input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="John Smith"
              />
            </div>
            <div>
              <Label>Meeting Date (Optional)</Label>
              <Input
                type="date"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
              />
            </div>
          </div>
          
          {/* Transcript Input */}
          <div>
            <Label>Transcript Text</Label>
            <Textarea
              value={transcriptText}
              onChange={(e) => setTranscriptText(e.target.value)}
              placeholder="Paste meeting transcript here...

Example:
Advisor: How have you been feeling about your retirement plans?
Client: I'm a bit anxious about whether I've saved enough..."
              rows={12}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              {transcriptText.split(/\s+/).length} words
            </p>
          </div>
          
          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={isProcessing || !transcriptText.trim()}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Transcript...
              </>
            ) : (
              'Analyze Transcript'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper function to parse AI response into structured format
function parseAIResponseToInsights(aiResponse: string, clientName: string, meetingDate: string): TranscriptInsights {
  // Simple parsing - extract sections from AI response
  const insights: TranscriptInsights = {
    opportunities: [],
    psychological_insights: [],
    action_items: [],
    life_events: [],
    clientName,
    meetingDate
  };

  // Extract opportunities (look for bullet points or numbered items mentioning opportunity, upsell, product, etc.)
  const oppMatch = aiResponse.match(/(?:opportunities|upsell|cross-sell|product)[\s\S]*?(?=\n\n|psychological|action|life event|$)/gi);
  if (oppMatch) {
    const lines = oppMatch[0].split('\n').filter(l => l.trim().match(/^[-•*\d]/));
    insights.opportunities = lines.slice(0, 5).map(line => ({
      category: 'General',
      description: line.replace(/^[-•*\d.)\s]+/, ''),
      confidence: 0.8,
      quote: '',
      recommended_action: 'Follow up with client'
    }));
  }

  // Extract psychological insights
  const psychMatch = aiResponse.match(/(?:psychological|emotional|sentiment|risk tolerance)[\s\S]*?(?=\n\n|action|life event|opportunity|$)/gi);
  if (psychMatch) {
    const lines = psychMatch[0].split('\n').filter(l => l.trim().match(/^[-•*\d]/));
    insights.psychological_insights = lines.slice(0, 5).map(line => ({
      aspect: 'Client Psychology',
      assessment: line.replace(/^[-•*\d.)\s]+/, ''),
      evidence: '',
      confidence: 0.75
    }));
  }

  // Extract action items
  const actionMatch = aiResponse.match(/(?:action items|follow[- ]up|commitments|to[- ]do)[\s\S]*?(?=\n\n|psychological|life event|opportunity|$)/gi);
  if (actionMatch) {
    const lines = actionMatch[0].split('\n').filter(l => l.trim().match(/^[-•*\d]/));
    insights.action_items = lines.slice(0, 5).map(line => line.replace(/^[-•*\d.)\s]+/, ''));
  }

  // Extract life events
  const lifeMatch = aiResponse.match(/(?:life events|mentioned|retirement|job|marriage|health)[\s\S]*?(?=\n\n|psychological|action|opportunity|$)/gi);
  if (lifeMatch) {
    const lines = lifeMatch[0].split('\n').filter(l => l.trim().match(/^[-•*\d]/));
    insights.life_events = lines.slice(0, 5).map(line => ({
      event: line.replace(/^[-•*\d.)\s]+/, ''),
      confidence: 0.7,
      evidence: ''
    }));
  }

  return insights;
}
