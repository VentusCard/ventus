import { useState, useRef, useEffect } from 'react';
import { Loader2, Search, Send } from 'lucide-react';
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
  'Basketball shoes under $100',
  'Best golf clubs on sale',
  'Running gear for beginners',
  'Home gym equipment deals',
];

export default function VentusSearch() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

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
    sendMessage(example);
  };

  return (
    <VentusSidebar>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm flex-shrink-0">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <h1 className="text-lg font-semibold text-foreground">Deal Search</h1>
            <p className="text-xs text-muted-foreground">Find the best deals for you</p>
          </div>
        </header>

        {/* Chat area */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full" ref={scrollRef}>
            <div className="max-w-3xl mx-auto px-6 py-6">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Search className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h2 className="text-base font-medium text-foreground mb-1">
                    Find Your Perfect Deal
                  </h2>
                  <p className="text-muted-foreground text-sm text-center mb-6 max-w-sm">
                    Search for any sports gear, equipment, or deals
                  </p>

                  <div className="grid grid-cols-2 gap-2 w-full max-w-md">
                    {EXAMPLE_SEARCHES.map((example) => (
                      <button
                        key={example}
                        onClick={() => handleExampleClick(example)}
                        className="text-left px-3 py-2.5 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors text-xs"
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
                      
                      {message.products && message.products.length > 0 && (
                        <div className="mt-3 space-y-2">
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
                      <span className="text-xs">Searching...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Input area - always visible */}
        <div className="border-t border-border bg-card/50 backdrop-blur-sm flex-shrink-0">
          <div className="max-w-3xl mx-auto px-6 py-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  ref={inputRef}
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
