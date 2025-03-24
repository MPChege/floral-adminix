
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  Search,
  X,
  Filter,
  ArrowUpDown,
  ChevronDown,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  ShoppingBag,
  User,
} from "lucide-react";
import { motion } from "framer-motion";

// Sample data for customers
const sampleCustomers = [
  {
    id: "CUST-001",
    name: "Emily Johnson",
    email: "emily.j@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Flower St, Portland, OR 97201",
    totalSpent: 389.97,
    orderCount: 7,
    lastPurchase: "2023-08-15",
    loyaltyPoints: 245,
    preferredFlowers: ["Roses", "Lilies", "Orchids"],
    tags: ["VIP", "Wedding Customer"],
    notes: "Prefers same-day delivery when possible. Allergic to daisies.",
    registeredDate: "2022-05-12",
  },
  {
    id: "CUST-002",
    name: "Michael Smith",
    email: "m.smith@example.com",
    phone: "+1 (555) 234-5678",
    address: "456 Garden Ave, Seattle, WA 98101",
    totalSpent: 211.50,
    orderCount: 3,
    lastPurchase: "2023-08-12",
    loyaltyPoints: 105,
    preferredFlowers: ["Tulips", "Daffodils"],
    tags: ["Corporate Account"],
    notes: "Orders monthly for office reception.",
    registeredDate: "2022-11-23",
  },
  {
    id: "CUST-003",
    name: "Sarah Williams",
    email: "sarahw@example.com",
    phone: "+1 (555) 345-6789",
    address: "789 Blossom Lane, San Francisco, CA 94105",
    totalSpent: 755.25,
    orderCount: 12,
    lastPurchase: "2023-08-14",
    loyaltyPoints: 378,
    preferredFlowers: ["Hydrangeas", "Peonies", "Sunflowers"],
    tags: ["VIP", "Subscription"],
    notes: "Monthly flower subscription. Prefers pastel colors.",
    registeredDate: "2022-02-05",
  },
  {
    id: "CUST-004",
    name: "David Brown",
    email: "davidb@example.com",
    phone: "+1 (555) 456-7890",
    address: "321 Oak St, Denver, CO 80201",
    totalSpent: 187.97,
    orderCount: 4,
    lastPurchase: "2023-08-08",
    loyaltyPoints: 95,
    preferredFlowers: ["Sunflowers", "Daisies"],
    tags: ["New Customer"],
    notes: "Usually orders for special occasions.",
    registeredDate: "2023-01-14",
  },
  {
    id: "CUST-005",
    name: "Jennifer Lee",
    email: "jlee@example.com",
    phone: "+1 (555) 567-8901",
    address: "567 Pine Road, Chicago, IL 60601",
    totalSpent: 422.64,
    orderCount: 8,
    lastPurchase: "2023-08-02",
    loyaltyPoints: 210,
    preferredFlowers: ["Roses", "Carnations"],
    tags: ["Gift Sender"],
    notes: "Primarily sends gifts to others. Prefers gift wrapping.",
    registeredDate: "2022-09-30",
  },
  {
    id: "CUST-006",
    name: "Robert Garcia",
    email: "rgarcia@example.com",
    phone: "+1 (555) 678-9012",
    address: "890 Maple Dr, Miami, FL 33101",
    totalSpent: 1205.75,
    orderCount: 15,
    lastPurchase: "2023-08-11",
    loyaltyPoints: 605,
    preferredFlowers: ["Exotic Varieties", "Orchids"],
    tags: ["VIP", "Corporate Account", "Wedding Customer"],
    notes: "Wedding planner who orders for events. Needs detailed invoices.",
    registeredDate: "2021-11-05",
  },
  {
    id: "CUST-007",
    name: "Jessica Kim",
    email: "jkim@example.com",
    phone: "+1 (555) 789-0123",
    address: "432 Cherry St, Los Angeles, CA 90001",
    totalSpent: 321.50,
    orderCount: 6,
    lastPurchase: "2023-08-10",
    loyaltyPoints: 160,
    preferredFlowers: ["Lilies", "Tulips"],
    tags: ["Subscription"],
    notes: "Bi-weekly subscription for home flowers. Prefers minimalist arrangements.",
    registeredDate: "2022-07-19",
  },
];

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalSpent: number;
  orderCount: number;
  lastPurchase: string;
  loyaltyPoints: number;
  preferredFlowers: string[];
  tags: string[];
  notes: string;
  registeredDate: string;
}

const CustomersPage = () => {
  const [customers, setCustomers] = useState<Customer[]>(sampleCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [viewCustomerDialogOpen, setViewCustomerDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setViewCustomerDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getTagBadge = (tag: string) => {
    switch (tag.toLowerCase()) {
      case "vip":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            VIP
          </Badge>
        );
      case "corporate account":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Corporate
          </Badge>
        );
      case "subscription":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Subscription
          </Badge>
        );
      case "wedding customer":
        return (
          <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200">
            Wedding
          </Badge>
        );
      case "gift sender":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            Gift Sender
          </Badge>
        );
      case "new customer":
        return (
          <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200">
            New
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">{tag}</Badge>
        );
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Customers"
        description="View and manage Credible Blooms customer information."
      />

      <Card className="admin-glassmorphism">
        <CardHeader className="pb-3">
          <CardTitle>Customer Management</CardTitle>
          <CardDescription>
            Track customer information, purchase history, and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-admin-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-admin-muted-foreground hover:text-admin-foreground" />
                </button>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>All Customers</DropdownMenuItem>
                <DropdownMenuItem>VIP Customers</DropdownMenuItem>
                <DropdownMenuItem>Corporate Accounts</DropdownMenuItem>
                <DropdownMenuItem>Subscription Customers</DropdownMenuItem>
                <DropdownMenuItem>New Customers</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Most Recent</DropdownMenuItem>
                <DropdownMenuItem>Oldest First</DropdownMenuItem>
                <DropdownMenuItem>Highest Spend</DropdownMenuItem>
                <DropdownMenuItem>Most Orders</DropdownMenuItem>
                <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-admin-accent hover:bg-admin-accent/90">
              <User className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Contact</TableHead>
                  <TableHead className="hidden lg:table-cell">Orders</TableHead>
                  <TableHead className="hidden lg:table-cell">Spend</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No customers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id} className="group">
                      <TableCell>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-admin-muted-foreground">
                          {customer.id}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-sm flex items-center">
                          <Mail className="h-3 w-3 mr-1" /> {customer.email}
                        </div>
                        <div className="text-sm text-admin-muted-foreground flex items-center">
                          <Phone className="h-3 w-3 mr-1" /> {customer.phone}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center">
                          <ShoppingBag className="h-3 w-3 mr-1" /> {customer.orderCount}
                        </div>
                        <div className="text-sm text-admin-muted-foreground">
                          Last: {formatDate(customer.lastPurchase)}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="font-medium">
                          ${customer.totalSpent.toFixed(2)}
                        </div>
                        <div className="text-sm text-admin-muted-foreground">
                          {customer.loyaltyPoints} points
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {customer.tags.slice(0, 2).map((tag, index) => (
                            <div key={`${customer.id}-tag-${index}`}>
                              {getTagBadge(tag)}
                            </div>
                          ))}
                          {customer.tags.length > 2 && (
                            <Badge variant="outline">+{customer.tags.length - 2}</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleViewCustomer(customer)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost">
                                <ChevronDown className="h-4 w-4" />
                                <span className="sr-only">More</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem>View Orders</DropdownMenuItem>
                              <DropdownMenuItem>Send Email</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Delete Customer
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-admin-muted-foreground">
            Showing {filteredCustomers.length} of {customers.length} customers
          </div>
        </CardFooter>
      </Card>

      {/* View Customer Dialog */}
      <Dialog open={viewCustomerDialogOpen} onOpenChange={setViewCustomerDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              Complete information about {selectedCustomer?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-admin-muted-foreground mb-1">Customer Information</h3>
                    <p className="font-semibold text-lg">{selectedCustomer.name}</p>
                    <div className="text-sm flex items-center mt-1">
                      <Mail className="h-3 w-3 mr-2" /> {selectedCustomer.email}
                    </div>
                    <div className="text-sm flex items-center mt-1">
                      <Phone className="h-3 w-3 mr-2" /> {selectedCustomer.phone}
                    </div>
                    <div className="text-sm flex items-start mt-1">
                      <MapPin className="h-3 w-3 mr-2 mt-1" /> {selectedCustomer.address}
                    </div>
                    <div className="text-sm flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-2" /> Registered: {formatDate(selectedCustomer.registeredDate)}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-admin-muted-foreground mb-1">Tags</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedCustomer.tags.map((tag, index) => (
                        <div key={`detail-tag-${index}`}>
                          {getTagBadge(tag)}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-admin-muted-foreground mb-1">Preferred Flowers</h3>
                    <div className="flex flex-wrap gap-1">
                      {selectedCustomer.preferredFlowers.map((flower, index) => (
                        <Badge key={`flower-${index}`} variant="outline">
                          {flower}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-admin-muted-foreground mb-1">Purchase Overview</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="border rounded-lg p-3">
                        <div className="text-sm text-admin-muted-foreground">Total Spent</div>
                        <div className="font-semibold text-lg flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {selectedCustomer.totalSpent.toFixed(2)}
                        </div>
                      </div>
                      <div className="border rounded-lg p-3">
                        <div className="text-sm text-admin-muted-foreground">Orders</div>
                        <div className="font-semibold text-lg flex items-center">
                          <ShoppingBag className="h-4 w-4 mr-1" />
                          {selectedCustomer.orderCount}
                        </div>
                      </div>
                      <div className="border rounded-lg p-3">
                        <div className="text-sm text-admin-muted-foreground">Last Purchase</div>
                        <div className="font-semibold">{formatDate(selectedCustomer.lastPurchase)}</div>
                      </div>
                      <div className="border rounded-lg p-3">
                        <div className="text-sm text-admin-muted-foreground">Loyalty Points</div>
                        <div className="font-semibold">{selectedCustomer.loyaltyPoints} points</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-admin-muted-foreground mb-1">Notes</h3>
                    <div className="border rounded-lg p-3 text-sm">
                      {selectedCustomer.notes || "No notes available."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewCustomerDialogOpen(false)}
            >
              Close
            </Button>
            <Button
              className="bg-admin-accent hover:bg-admin-accent/90 text-white"
            >
              View Orders
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomersPage;
