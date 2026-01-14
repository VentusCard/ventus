import { useState, useRef, useEffect } from 'react';
import { Loader2, Search, Send, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { VentusSidebar } from '@/components/ventus-app/VentusSidebar';
import { ChatBubble } from '@/components/ventus-app/ChatBubble';
import { ProductCard } from '@/components/ventus-app/ProductCard';
import { chatbotApi, VentusProduct } from '@/lib/ventusApi';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  products?: VentusProduct[];
}

const EXAMPLE_SEARCHES = [
  '🏀 Basketball shoes under $100',
  '⛳ Best golf clubs on sale',
  '🏃 Running gear for beginners',
  '💪 Home gym equipment',
];

export default function VentusSearch() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (query: string) => {
    if (!query.trim()) return;

    const userMessage: Message = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history (last 6 messages)
      const history = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await chatbotApi.search(query, history);

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.message,
        products: response.type === 'search' ? response.products : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('Search failed. Please try again.');
      // Remove the user message on error
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleExampleClick = (example: string) => {
    // Remove emoji from the start
    const query = example.replace(/^[^\w]+/, '').trim();
    sendMessage(query);
  };

  return (
    <VentusSidebar>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-30">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">AI Deal Search</h1>
                <p className="text-xs text-muted-foreground">Ask me to find deals for you</p>
              </div>
            </div>
          </div>
        </header>

        {/* Chat area */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(100vh-180px)] px-6" ref={scrollRef}>
            <div className="max-w-3xl mx-auto py-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground mb-1">
                    Find Your Perfect Deal
                  </h2>
                  <p className="text-muted-foreground text-sm text-center mb-8 max-w-sm">
                    Ask me anything about sports gear, equipment, or deals
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg">
                    {EXAMPLE_SEARCHES.map((example) => (
                      <button
                        key={example}
                        onClick={() => handleExampleClick(example)}
                        className="text-left px-4 py-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors text-sm"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index}>
                      <ChatBubble role={message.role} content={message.content} />
                      
                      {/* Show products if available */}
                      {message.products && message.products.length > 0 && (
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {message.products.map((product, pIndex) => (
                            <ProductCard key={pIndex} product={product} />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Searching for deals...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Input area */}
        <div className="border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Search for deals..."
                  disabled={isLoading}
                  className="pl-9 h-10 text-sm"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()}
                size="sm"
                className="h-10 px-4"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </VentusSidebar>
  );
}
