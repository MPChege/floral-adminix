
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Flower } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-white rounded-full shadow-elegant">
              <Flower className="w-12 h-12 text-pink-500" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Bloom & Flourish
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Welcome to your premium flower shop management system
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/admin/login")}
              className="px-6 py-6 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg transition-all flex items-center gap-2"
            >
              Admin Dashboard <ArrowRight className="w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              className="px-6 py-6 text-lg border-pink-300 text-gray-700 hover:bg-pink-50 shadow-sm flex items-center gap-2"
              onClick={() => window.open("https://docs.lovable.dev/integrations/supabase/", "_blank")}
            >
              Connect Supabase
            </Button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Bloom & Flourish Flower Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
