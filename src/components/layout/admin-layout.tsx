
import { useEffect, useState } from "react";
import { SidebarNav } from "./sidebar-nav";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { CurrencySelector } from "@/components/ui-custom/currency-selector";

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("adminAuth");
    
    if (!auth && location.pathname !== "/admin/login") {
      toast({
        title: "Authentication required",
        description: "Please log in to access the admin dashboard",
        variant: "destructive",
      });
      navigate("/admin/login");
    }
    
    setIsLoading(false);
  }, [navigate, location.pathname, toast]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-admin-background">
        <div className="animate-pulse-soft">Loading...</div>
      </div>
    );
  }

  // Special case for login page - don't show sidebar
  if (location.pathname === "/admin/login") {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen bg-admin-background overflow-hidden">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-admin-sidebar flex items-center justify-end px-6 bg-white/50 backdrop-blur-sm">
          <CurrencySelector />
        </header>
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-y-auto p-6 lg:p-8"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
