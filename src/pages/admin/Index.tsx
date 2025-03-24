
import { PageHeader } from "@/components/ui-custom/page-header";
import { StatsCard } from "@/components/ui-custom/stats-card";
import { DashboardCard } from "@/components/ui-custom/dashboard-card";
import {
  BarChart3,
  ShoppingBag,
  Package,
  DollarSign,
  Users,
  TrendingUp,
  ShoppingCart,
  Calendar,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { motion } from "framer-motion";

// Sample data
const salesData = [
  { name: "Jan", value: 6500 },
  { name: "Feb", value: 5900 },
  { name: "Mar", value: 8100 },
  { name: "Apr", value: 8600 },
  { name: "May", value: 9200 },
  { name: "Jun", value: 8800 },
  { name: "Jul", value: 9800 },
];

const topSellingProducts = [
  { name: "Red Roses Bouquet", sold: 126, revenue: 3780 },
  { name: "Tulip Collection", sold: 98, revenue: 2450 },
  { name: "Lavender Arrangement", sold: 85, revenue: 2125 },
  { name: "Lily Bouquet", sold: 72, revenue: 2160 },
  { name: "Orchid Arrangement", sold: 64, revenue: 2560 },
];

const recentOrders = [
  {
    id: "ORD-7891",
    customer: "Emily Johnson",
    status: "Delivered",
    date: "2 hours ago",
    total: "$89.99",
  },
  {
    id: "ORD-7892",
    customer: "Michael Smith",
    status: "Processing",
    date: "5 hours ago",
    total: "$54.50",
  },
  {
    id: "ORD-7893",
    customer: "Sarah Williams",
    status: "Shipped",
    date: "Yesterday",
    total: "$132.75",
  },
  {
    id: "ORD-7894",
    customer: "David Brown",
    status: "Processing",
    date: "Yesterday",
    total: "$45.25",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Get current date for greeting
  const currentHour = new Date().getHours();
  let greeting = "Good Morning";
  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else if (currentHour >= 18) {
    greeting = "Good Evening";
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title={`${greeting}, Admin`}
        description="Here's what's happening with Credible Blooms today."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value="$42,530"
          change={{ value: 12.5, trend: "up" }}
          icon={<DollarSign size={20} />}
        />
        <StatsCard
          title="Orders"
          value="1,284"
          change={{ value: 8.2, trend: "up" }}
          icon={<ShoppingBag size={20} />}
        />
        <StatsCard
          title="Products"
          value="142"
          change={{ value: 1.1, trend: "up" }}
          icon={<Package size={20} />}
        />
        <StatsCard
          title="Customers"
          value="3,587"
          change={{ value: 5.4, trend: "up" }}
          icon={<Users size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 admin-glassmorphism">
          <CardHeader className="pb-2">
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#888" />
                <YAxis
                  tickFormatter={(value) => `$${value}`}
                  tick={{ fontSize: 12 }}
                  stroke="#888"
                />
                <Tooltip
                  formatter={(value) => [`$${value}`, "Revenue"]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--admin-accent))"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="admin-glassmorphism">
          <CardHeader className="pb-2">
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 bg-admin-accent text-admin-accent-foreground p-4 rounded-lg"
                onClick={() => navigate("/admin/products")}
              >
                <Package size={20} />
                <span className="font-medium">Manage Products</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 bg-admin-muted p-4 rounded-lg"
                onClick={() => navigate("/admin/orders")}
              >
                <ShoppingCart size={20} />
                <span className="font-medium">View Orders</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 bg-admin-muted p-4 rounded-lg"
                onClick={() => navigate("/admin/customers")}
              >
                <Users size={20} />
                <span className="font-medium">Manage Customers</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-3 bg-admin-muted p-4 rounded-lg"
                onClick={() => navigate("/admin/promotions")}
              >
                <TrendingUp size={20} />
                <span className="font-medium">Create Promotion</span>
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="admin-glassmorphism">
          <CardHeader className="pb-2">
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topSellingProducts}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#888" />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 12 }}
                  width={150}
                  stroke="#888"
                />
                <Tooltip
                  formatter={(value, name) => [
                    name === "sold" ? `${value} units` : `$${value}`,
                    name === "sold" ? "Sold" : "Revenue",
                  ]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Bar dataKey="sold" fill="hsl(var(--admin-accent))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="admin-glassmorphism">
          <CardHeader className="pb-2">
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-admin-muted/50 transition-colors"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{order.id}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <span className="text-sm text-admin-muted-foreground">
                      {order.customer}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">{order.total}</span>
                    <span className="text-xs text-admin-muted-foreground">
                      {order.date}
                    </span>
                  </div>
                </motion.div>
              ))}
              <button
                className="w-full text-sm text-admin-accent hover:underline mt-2"
                onClick={() => navigate("/admin/orders")}
              >
                View all orders →
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
