
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Menu,
  X,
  Home,
  ShoppingBag,
  Package,
  FileText,
  Settings,
  Users,
  Tag,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface SidebarLink {
  icon: React.ElementType;
  href: string;
  label: string;
}

const links: SidebarLink[] = [
  {
    icon: Home,
    href: "/admin/dashboard",
    label: "Dashboard",
  },
  {
    icon: Package,
    href: "/admin/products",
    label: "Products",
  },
  {
    icon: ShoppingBag,
    href: "/admin/orders",
    label: "Orders",
  },
  {
    icon: FileText,
    href: "/admin/blog",
    label: "Blog",
  },
  {
    icon: Tag,
    href: "/admin/promotions",
    label: "Promotions",
  },
  {
    icon: Users,
    href: "/admin/customers",
    label: "Customers",
  },
  {
    icon: Settings,
    href: "/admin/settings",
    label: "Settings",
  },
];

export function SidebarNav() {
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin/login");
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileMenuOpen(!mobileMenuOpen);
    } else {
      setExpanded(!expanded);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-admin-sidebar text-admin-sidebar-foreground hover:bg-admin-accent"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Full sidebar for larger screens */}
      <motion.div
        layout
        className={cn(
          "h-screen hidden lg:flex flex-col py-8 bg-admin-sidebar text-admin-sidebar-foreground border-r border-admin-sidebar shadow-elegant overflow-hidden z-30",
          expanded ? "w-64" : "w-20"
        )}
        animate={{ width: expanded ? "16rem" : "5rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between px-4 mb-8">
          {expanded ? (
            <h2 className="text-xl font-bold">FlowerShop</h2>
          ) : (
            <span className="w-8 h-8 flex items-center justify-center rounded-full bg-admin-accent text-admin-accent-foreground">
              F
            </span>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-md hover:bg-white/10"
          >
            {expanded ? <Menu size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="flex-1 px-3 py-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center px-3 py-3 my-1 rounded-lg transition-colors",
                location.pathname === link.href
                  ? "bg-admin-accent text-admin-accent-foreground"
                  : "hover:bg-white/10",
                !expanded && "justify-center"
              )}
            >
              <link.icon size={20} />
              {expanded && <span className="ml-3">{link.label}</span>}
            </Link>
          ))}
        </div>

        <div className="mt-auto px-3">
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center w-full px-3 py-3 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors",
              !expanded && "justify-center"
            )}
          >
            <LogOut size={20} />
            {expanded && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </motion.div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 w-64 bg-admin-sidebar text-admin-sidebar-foreground py-4 px-2 flex flex-col z-50 lg:hidden shadow-elegant-lg"
          >
            <div className="flex items-center justify-between px-4 mb-6">
              <h2 className="text-xl font-bold">FlowerShop</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-md hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 px-2 py-4 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-3 my-1 rounded-lg transition-colors",
                    location.pathname === link.href
                      ? "bg-admin-accent text-admin-accent-foreground"
                      : "hover:bg-white/10"
                  )}
                >
                  <link.icon size={20} />
                  <span className="ml-3">{link.label}</span>
                </Link>
              ))}
            </div>

            <div className="mt-auto px-2">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-3 py-3 rounded-lg text-red-400 hover:bg-red-500/20 transition-colors"
              >
                <LogOut size={20} />
                <span className="ml-3">Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
