import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const TePilot = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("tepilot_auth");
    if (auth === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "2025proto") {
      setIsAuthenticated(true);
      sessionStorage.setItem("tepilot_auth", "authenticated");
      toast.success("Access granted");
    } else {
      toast.error("Incorrect password");
      setPassword("");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Protected Page</CardTitle>
            <CardDescription>Enter password to access TE Pilot</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <Button type="submit" className="w-full">
                Access
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">TE Pilot</h1>
          <Button
            variant="outline"
            onClick={() => {
              sessionStorage.removeItem("tepilot_auth");
              setIsAuthenticated(false);
            }}
          >
            Lock Page
          </Button>
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to TE Pilot</CardTitle>
              <CardDescription>This is a password-protected prototype page</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Add your content here. This page is protected with password: 2025proto
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TePilot;
