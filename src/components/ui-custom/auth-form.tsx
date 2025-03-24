
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AuthFormProps {
  onSubmit?: (email: string, password: string) => void;
}

export function AuthForm({ onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real application, this would verify credentials against a database
      // For demo purposes, we'll accept any login with an @admin.com email
      if (email.endsWith("@admin.com") && password.length >= 6) {
        toast({
          title: "Login successful",
          description: "Welcome to your flower shop admin dashboard!",
        });
        
        // Store authentication token in local storage
        localStorage.setItem("adminAuth", JSON.stringify({ email, isAdmin: true }));
        
        // Execute custom onSubmit if provided
        if (onSubmit) {
          onSubmit(email, password);
        }
        
        // Redirect to admin dashboard
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col space-y-4 animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            placeholder="admin@admin.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            className="admin-form-input"
            required
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <button
              type="button"
              onClick={() => toast({ title: "Contact admin", description: "Please contact your administrator to reset your password." })}
              className="text-sm font-medium text-admin-accent hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Input
              id="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              autoCapitalize="none"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="admin-form-input pr-10"
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-admin-accent hover:bg-admin-accent/90 text-white flex items-center justify-center gap-2 transition-all"
        >
          {isLoading ? "Signing in..." : "Sign In"}
          {!isLoading && <LogIn size={18} />}
        </Button>
      </form>
    </div>
  );
}
