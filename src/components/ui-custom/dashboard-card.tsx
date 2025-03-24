
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DashboardCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function DashboardCard({
  title,
  description,
  icon,
  className,
  children,
  onClick,
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "admin-glassmorphism admin-hover-card p-6 rounded-xl overflow-hidden",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-admin-muted-foreground">{description}</p>
          )}
        </div>
        {icon && (
          <div className="text-admin-accent p-2 bg-admin-accent/10 rounded-lg">
            {icon}
          </div>
        )}
      </div>
      <div className="mt-4">{children}</div>
    </motion.div>
  );
}
