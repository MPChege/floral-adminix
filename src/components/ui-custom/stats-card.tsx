
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
  className?: string;
  icon?: React.ReactNode;
}

export function StatsCard({
  title,
  value,
  change,
  className,
  icon,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "admin-glassmorphism overflow-hidden p-6 rounded-xl",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-admin-muted-foreground">
            {title}
          </p>
        </div>
        {icon && (
          <div className="text-admin-accent p-2 bg-admin-accent/10 rounded-lg">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3">
        <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
      </div>

      {change && (
        <div className="mt-2 flex items-center">
          <div
            className={cn(
              "text-xs font-medium mr-2 flex items-center",
              change.trend === "up"
                ? "text-green-600"
                : change.trend === "down"
                ? "text-red-600"
                : "text-gray-500"
            )}
          >
            {change.trend === "up" ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : change.trend === "down" ? (
              <ArrowDown className="h-3 w-3 mr-1" />
            ) : null}
            {Math.abs(change.value)}%
          </div>
          <p className="text-xs text-admin-muted-foreground">vs. last month</p>
        </div>
      )}
    </motion.div>
  );
}
