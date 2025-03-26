
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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
            <img 
              src="/lovable-uploads/bb4bbdd7-1fe9-424c-a1f1-d60a1bf12caf.jpeg" 
              alt="Credible Blooms Logo" 
              className="h-32 md:h-40"
            />
          </div>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Welcome to your premium flower farm management system
          </p>
          
          <div className="flex justify-center">
            <Button
              onClick={() => navigate("/admin/login")}
              className="px-6 py-6 text-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg transition-all flex items-center gap-2"
            >
              Admin Dashboard <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Credible Blooms Flower Farm. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
