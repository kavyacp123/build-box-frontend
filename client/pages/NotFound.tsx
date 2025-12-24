import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            404
          </h1>
        </div>

        <h2 className="text-3xl font-bold mb-4">Page not found</h2>
        <p className="text-foreground/60 text-lg mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/90">
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
          </Link>
        </div>

        <p className="text-sm text-foreground/50 mt-12">
          Error code: {location.pathname}
        </p>
      </div>
    </div>
  );
};

export default NotFound;
