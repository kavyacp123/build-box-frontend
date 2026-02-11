import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Github, Mail, Zap } from "lucide-react";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = async () => {
    setLoading(true);
    const demoCreds = {
      email: "demo@buildbox.app",
      password: "demouser123"
    };

    try {
      // 1. Try to login
      let response;
      try {
        response = await axios.post("http://localhost:9000/auth/login", demoCreds);
      } catch (e) {
        // 2. If login fails (assume user doesn't exist), try to signup
        if (axios.isAxiosError(e) && (e.response?.status === 404 || e.response?.status === 401)) {
          await axios.post("http://localhost:9000/auth/signup", {
            name: "Demo User",
            ...demoCreds,
            confirmPassword: demoCreds.password
          });
          // 3. Login after signup
          response = await axios.post("http://localhost:9000/auth/login", demoCreds);
        } else {
          throw e;
        }
      }

      if (response && response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("email", demoCreds.email);
        navigate("/dashboard");
      }
    } catch (e) {
      console.error("Demo login failed", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth delay
    if (email === "" || password === "") {
      return;
    }
    try {
      const response = await axios.post("http://localhost:9000/auth/login", { email, password });
      if (response.status === 200) {
        const { token, name } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        navigate("/dashboard");
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="w-full max-w-md">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to home</span>
        </Link>

        {/* Login card */}
        <Card className="bg-card/50 backdrop-blur-xl border border-border/50 p-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-bold">BuildBox</span>
            </div>
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-foreground/60 text-sm mt-2">
              Sign in to your account to continue deploying
            </p>
          </div>

          {/* OAuth buttons */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full border-border/50 hover:border-primary/50 hover:bg-primary/5"
            >
              <Github className="w-4 h-4 mr-2" />
              <a href="http://localhost:9000/oauth2/authorization/github">
                Login with GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full border-border/50 hover:border-primary/50 hover:bg-primary/5"
            // onClick={handleLoginWithGoogle}
            >
              <Mail className="w-4 h-4 mr-2" />
              <a href="http://localhost:9000/oauth2/authorization/google">
                Login with Google
              </a>
              <a href="http://localhost:9000/oauth2/authorization/google">
                Login with Google
              </a>
            </Button>
            <Button
              variant="outline"
              className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary font-bold"
              onClick={handleDemoLogin}
              disabled={loading}
              type="button"
            >
              <Zap className="w-4 h-4 mr-2" />
              Try Demo Account
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border/50"></div>
            <span className="text-xs text-foreground/50">OR</span>
            <div className="flex-1 h-px bg-border/50"></div>
          </div>

          {/* Email/Password form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="bg-input/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="bg-input/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span>Remember me</span>
              </label>
              <a
                href="#forgot"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 mt-6"
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-foreground/60 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
            >
              Sign up
            </Link>
          </p>
        </Card>

        {/* Footer text */}
        <div className="text-center text-xs text-foreground/50 mt-8">
          <p>
            By signing in, you agree to our{" "}
            <a
              href="#terms"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#privacy"
              className="text-foreground/70 hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
