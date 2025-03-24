
import { AuthForm } from "@/components/ui-custom/auth-form";
import { motion } from "framer-motion";

const AdminLogin = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-admin-background">
      <div className="mx-auto w-full max-w-md p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="admin-glassmorphism p-8 rounded-2xl shadow-elegant-lg"
        >
          <div className="flex flex-col space-y-2 text-center mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-sm text-admin-muted-foreground">
              Enter your credentials to access the admin panel
            </p>
          </div>
          <AuthForm />
          <div className="mt-6 text-center text-sm text-admin-muted-foreground">
            <p>Demo login: admin@admin.com / password123</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
