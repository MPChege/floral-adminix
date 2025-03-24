
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/page-header";
import {
  ShoppingBag,
  Search,
  Filter,
  ArrowUpDown,
  X,
  ChevronDown,
  Eye,
  Printer,
  CheckCircle,
  XCircle,
  Truck,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

// Sample data
const sampleOrders = [
  {
    id: "ORD-7891",
    customer: "Emily Johnson",
    email: "emily.j@example.com",
    date: "2023-08-15T10:32:00",
    status: "Delivered",
    total: 89.99,
    items: [
      {
        id: "PRD-001",
        name: "Red Roses Bouquet",
        quantity: 1,
        price: 29.99,
        image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "PRD-003",
        name: "Orchid Arrangement",
        quantity: 1,
        price: 39.99,
        image: "https://images.unsplash.com/photo-1567748157439-651aca2ff064?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "PRD-005",
        name: "Gift Wrapping",
        quantity: 1,
        price: 5.99,
        image: "",
      },
    ],
    shippingAddress: {
      line1: "123 Flower St",
      line2: "Apt 4B",
      city: "Portland",
      state: "OR",
      zipCode: "97201",
      country: "United States",
    },
    paymentMethod: "Credit Card",
    notes: "Please leave at door",
  },
  {
    id: "ORD-7892",
    customer: "Michael Smith",
    email: "m.smith@example.com",
    date: "2023-08-15T08:15:00",
    status: "Processing",
    total: 54.5,
    items: [
      {
        id: "PRD-002",
        name: "Tulip Collection",
        quantity: 2,
        price: 24.99,
        image: "https://images.unsplash.com/photo-1586968793473-d7c0049865f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "PRD-008",
        name: "Greeting Card",
        quantity: 1,
        price: 4.52,
        image: "",
      },
    ],
    shippingAddress: {
      line1: "456 Garden Ave",
      line2: "",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "United States",
    },
    paymentMethod: "PayPal",
    notes: "",
  },
  {
    id: "ORD-7893",
    customer: "Sarah Williams",
    email: "sarahw@example.com",
    date: "2023-08-14T14:23:00",
    status: "Shipped",
    total: 132.75,
    items: [
      {
        id: "PRD-006",
        name: "Mixed Seasonal Flowers",
        quantity: 3,
        price: 34.99,
        image: "https://images.unsplash.com/photo-1587052755556-57605357fc41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "PRD-010",
        name: "Chocolate Box",
        quantity: 1,
        price: 27.78,
        image: "",
      },
    ],
    shippingAddress: {
      line1: "789 Blossom Lane",
      line2: "",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "United States",
    },
    paymentMethod: "Credit Card",
    notes: "Birthday gift for mom",
  },
  {
    id: "ORD-7894",
    customer: "David Brown",
    email: "davidb@example.com",
    date: "2023-08-14T11:05:00",
    status: "Processing",
    total: 45.25,
    items: [
      {
        id: "PRD-004",
        name: "Sunflower Bouquet",
        quantity: 1,
        price: 22.99,
        image: "https://images.unsplash.com/photo-1543159821-9548b11973eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "PRD-009",
        name: "Plant Food",
        quantity: 2,
        price: 11.13,
        image: "",
      },
    ],
    shippingAddress: {
      line1: "321 Oak St",
      line2: "Suite 500",
      city: "Denver",
      state: "CO",
      zipCode: "80201",
      country: "United States",
    },
    paymentMethod: "Credit Card",
    notes: "",
  },
  {
    id: "ORD-7895",
    customer: "Jennifer Lee",
    email: "jlee@example.com",
    date: "2023-08-13T16:48:00",
    status: "Canceled",
    total: 67.88,
    items: [
      {
        id: "PRD-001",
        name: "Red Roses Bouquet",
        quantity: 2,
        price: 29.99,
        image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      },
      {
        id: "PRD-008",
        name: "Greeting Card",
        quantity: 1,
        price: 4.52,
        image: "",
      },
      {
        id: "PRD-005",
        name: "Gift Wrapping",
        quantity: 1,
        price: 3.38,
        image: "",
      },
    ],
    shippingAddress: {
      line1: "567 Pine Road",
      line2: "",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "United States",
    },
    paymentMethod: "PayPal",
    notes: "Customer canceled due to delivery timing",
  },
];

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface ShippingAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Order {
  id: string;
  customer: string;
  email: string;
  date: string;
  status: string;
  total: number;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  notes: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [viewOrderDialogOpen, setViewOrderDialogOpen] = useState(false);
  const [updateStatusDialogOpen, setUpdateStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>("");
  const { toast } = useToast();

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setViewOrderDialogOpen(true);
  };

  const handleUpdateStatus = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setUpdateStatusDialogOpen(true);
  };

  const saveStatusUpdate = () => {
    if (selectedOrder && newStatus) {
      const updatedOrders = orders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      toast({
        title: "Order Status Updated",
        description: `Order ${selectedOrder.id} status changed to ${newStatus}`,
      });
      setUpdateStatusDialogOpen(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Delivered
          </Badge>
        );
      case "shipped":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Truck className="h-3 w-3 mr-1" />
            Shipped
          </Badge>
        );
      case "processing":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            Processing
          </Badge>
        );
      case "canceled":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Canceled
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">{status}</Badge>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Orders"
        description="View and manage customer orders for your flower shop."
      />

      <Card className="admin-glassmorphism">
        <CardHeader className="pb-3">
          <CardTitle>Order Management</CardTitle>
          <CardDescription>
            Track order status, update customer information, and process orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-admin-muted-foreground" />
              <Input
                placeholder="Search orders..."
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
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  Sort
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Newest First</DropdownMenuItem>
                <DropdownMenuItem>Oldest First</DropdownMenuItem>
                <DropdownMenuItem>Highest Value</DropdownMenuItem>
                <DropdownMenuItem>Customer Name (A-Z)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id} className="group">
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div>{order.customer}</div>
                        <div className="text-sm text-admin-muted-foreground">
                          {order.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(order.date)}
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell className="text-right">
                        ${order.total.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleViewOrder(order)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleUpdateStatus(order)}
                          >
                            <ChevronDown className="h-4 w-4" />
                            <span className="sr-only">Update Status</span>
                          </Button>
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
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        </CardFooter>
      </Card>

      {/* View Order Dialog */}
      <Dialog open={viewOrderDialogOpen} onOpenChange={setViewOrderDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Complete information about order {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Customer</h3>
                  <p>{selectedOrder.customer}</p>
                  <p className="text-sm text-admin-muted-foreground">
                    {selectedOrder.email}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Order Information</h3>
                  <div className="flex items-center gap-2">
                    <p>Status: </p>
                    {getStatusBadge(selectedOrder.status)}
                  </div>
                  <p className="text-sm">
                    Date: {formatDate(selectedOrder.date)}
                  </p>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="items" className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <span className="font-semibold">Order Items</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item) => (
                        <div
                          key={`${selectedOrder.id}-${item.id}`}
                          className="flex items-center gap-3 border-b border-border pb-3"
                        >
                          <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Package className="h-6 w-6 text-admin-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-admin-muted-foreground">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="font-medium">
                            ${(item.quantity * item.price).toFixed(2)}
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between pt-3 font-semibold">
                        <span>Total</span>
                        <span>${selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="shipping" className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <span className="font-semibold">Shipping Address</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-1">
                      <p>{selectedOrder.shippingAddress.line1}</p>
                      {selectedOrder.shippingAddress.line2 && (
                        <p>{selectedOrder.shippingAddress.line2}</p>
                      )}
                      <p>
                        {selectedOrder.shippingAddress.city},{" "}
                        {selectedOrder.shippingAddress.state}{" "}
                        {selectedOrder.shippingAddress.zipCode}
                      </p>
                      <p>{selectedOrder.shippingAddress.country}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="payment" className="border-b-0">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <span className="font-semibold">Payment Information</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>Method: {selectedOrder.paymentMethod}</p>
                    <p>Total: ${selectedOrder.total.toFixed(2)}</p>
                  </AccordionContent>
                </AccordionItem>

                {selectedOrder.notes && (
                  <AccordionItem value="notes" className="border-b-0">
                    <AccordionTrigger className="py-2 hover:no-underline">
                      <span className="font-semibold">Customer Notes</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>{selectedOrder.notes}</p>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setViewOrderDialogOpen(false)}
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button
              className="bg-admin-accent hover:bg-admin-accent/90 text-white gap-2"
              onClick={() => {
                setViewOrderDialogOpen(false);
                if (selectedOrder) {
                  handleUpdateStatus(selectedOrder);
                }
              }}
            >
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={updateStatusDialogOpen} onOpenChange={setUpdateStatusDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change the status for order {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Select
                value={newStatus}
                onValueChange={setNewStatus}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUpdateStatusDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-admin-accent hover:bg-admin-accent/90 text-white"
              onClick={saveStatusUpdate}
            >
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersPage;
