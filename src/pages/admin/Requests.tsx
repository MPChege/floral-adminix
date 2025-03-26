
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  ArrowUpDown,
  X,
  Mail,
  CheckCircle,
  Calendar,
  Package,
  User,
  Flower,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Sample request data
const sampleRequests = [
  {
    id: "REQ-001",
    customerName: "Emily Johnson",
    email: "emily@example.com",
    flower: "Red Roses",
    quantity: 50,
    deliveryDate: "2023-10-15",
    status: "Pending",
    specialRequests: "Need these for a wedding. Looking for deep red color.",
    createdAt: "2023-09-28",
  },
  {
    id: "REQ-002",
    customerName: "Michael Brown",
    email: "michael@example.com",
    flower: "White Lilies",
    quantity: 25,
    deliveryDate: "2023-10-10",
    status: "Processed",
    specialRequests: "For a corporate event. Must be fresh and high quality.",
    createdAt: "2023-09-27",
  },
  {
    id: "REQ-003",
    customerName: "Sarah Williams",
    email: "sarah@example.com",
    flower: "Tulip Collection",
    quantity: 100,
    deliveryDate: "2023-10-20",
    status: "Pending",
    specialRequests: "Mix of colors preferred.",
    createdAt: "2023-09-26",
  },
  {
    id: "REQ-004",
    customerName: "David Miller",
    email: "david@example.com",
    flower: "Sunflowers",
    quantity: 40,
    deliveryDate: "2023-10-12",
    status: "Processed",
    specialRequests: "Need large blooms for photography.",
    createdAt: "2023-09-25",
  },
  {
    id: "REQ-005",
    customerName: "Jennifer Lee",
    email: "jennifer@example.com",
    flower: "Orchids",
    quantity: 30,
    deliveryDate: "2023-10-18",
    status: "Pending",
    specialRequests: "Prefer purple and white varieties.",
    createdAt: "2023-09-24",
  }
];

type RequestStatus = "Pending" | "Processed";

interface FlowerRequest {
  id: string;
  customerName: string;
  email: string;
  flower: string;
  quantity: number;
  deliveryDate: string;
  status: RequestStatus;
  specialRequests: string;
  createdAt: string;
}

const RequestsPage = () => {
  const [requests, setRequests] = useState<FlowerRequest[]>(sampleRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<FlowerRequest | null>(null);
  const [emailContent, setEmailContent] = useState("");
  const { toast } = useToast();

  const filteredRequests = requests.filter(
    (request) =>
      request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.flower.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenEmailDialog = (request: FlowerRequest) => {
    setSelectedRequest(request);
    setEmailContent(
      `Dear ${request.customerName},\n\nThank you for your request for ${request.quantity} ${request.flower}.\n\nWe are pleased to inform you that we can fulfill your order for delivery on ${request.deliveryDate}.\n\nPlease let us know if you have any questions.\n\nBest regards,\nCredible Blooms Flower Farm`
    );
    setIsEmailDialogOpen(true);
  };

  const handleOpenDetailsDialog = (request: FlowerRequest) => {
    setSelectedRequest(request);
    setIsDetailsDialogOpen(true);
  };

  const handleSendEmail = () => {
    if (selectedRequest) {
      toast({
        title: "Email Sent",
        description: `Your response has been sent to ${selectedRequest.customerName}.`,
      });
      setIsEmailDialogOpen(false);
    }
  };

  const handleMarkAsProcessed = (id: string) => {
    const updatedRequests = requests.map((request) =>
      request.id === id
        ? { ...request, status: "Processed" as RequestStatus }
        : request
    );
    setRequests(updatedRequests);
    toast({
      title: "Request Updated",
      description: "The request has been marked as processed.",
    });
    if (isDetailsDialogOpen && selectedRequest?.id === id) {
      setSelectedRequest({ ...selectedRequest, status: "Processed" });
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Flower Requests"
        description="Manage customer requests for your flowers."
      />

      <Card className="admin-glassmorphism">
        <CardHeader className="pb-3">
          <CardTitle>Request Management</CardTitle>
          <CardDescription>
            View, process, and respond to customer flower requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-admin-muted-foreground" />
              <Input
                placeholder="Search requests..."
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
                <DropdownMenuItem>Pending Requests</DropdownMenuItem>
                <DropdownMenuItem>Processed Requests</DropdownMenuItem>
                <DropdownMenuItem>Today's Requests</DropdownMenuItem>
                <DropdownMenuItem>Upcoming Deliveries</DropdownMenuItem>
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
                <DropdownMenuItem>Latest First</DropdownMenuItem>
                <DropdownMenuItem>Oldest First</DropdownMenuItem>
                <DropdownMenuItem>Delivery Date (Ascending)</DropdownMenuItem>
                <DropdownMenuItem>Customer Name (A-Z)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Flower</TableHead>
                  <TableHead className="hidden md:table-cell">Quantity</TableHead>
                  <TableHead className="hidden md:table-cell">Delivery Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No requests found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>
                        <div>{request.customerName}</div>
                        <div className="text-sm text-admin-muted-foreground md:hidden">
                          {request.flower} - {request.quantity} units
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{request.flower}</TableCell>
                      <TableCell className="hidden md:table-cell">{request.quantity}</TableCell>
                      <TableCell className="hidden md:table-cell">{request.deliveryDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            request.status === "Processed"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          }
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenDetailsDialog(request)}
                          >
                            <span className="sr-only">View details</span>
                            <span className="hidden sm:inline">Details</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleOpenEmailDialog(request)}
                          >
                            <Mail className="h-4 w-4 sm:mr-2" />
                            <span className="sr-only sm:not-sr-only sm:inline">Email</span>
                          </Button>
                          {request.status === "Pending" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-green-500 hover:text-green-600 hover:bg-green-50"
                              onClick={() => handleMarkAsProcessed(request.id)}
                            >
                              <CheckCircle className="h-4 w-4 sm:mr-2" />
                              <span className="sr-only sm:not-sr-only sm:inline">Mark Processed</span>
                            </Button>
                          )}
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
            Showing {filteredRequests.length} of {requests.length} requests
          </div>
        </CardFooter>
      </Card>

      {/* Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Send Email Response</DialogTitle>
            <DialogDescription>
              Send a response to the customer regarding their flower request.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="font-medium">To:</div>
              <div className="col-span-3">{selectedRequest?.email}</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="font-medium">Subject:</div>
              <div className="col-span-3">
                Re: Flower Request {selectedRequest?.id}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <div className="font-medium">Message:</div>
              <Textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                rows={8}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendEmail} className="bg-admin-accent hover:bg-admin-accent/90 text-white">
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
            <DialogDescription>
              View complete information about this flower request.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex justify-between items-center">
              <span className="font-medium text-lg">{selectedRequest?.id}</span>
              <Badge
                variant="outline"
                className={
                  selectedRequest?.status === "Processed"
                    ? "bg-green-100 text-green-800"
                    : "bg-amber-100 text-amber-800"
                }
              >
                {selectedRequest?.status}
              </Badge>
            </div>
            <div className="grid gap-3">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-admin-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">Customer Information</div>
                  <div>{selectedRequest?.customerName}</div>
                  <div className="text-sm text-admin-muted-foreground">
                    {selectedRequest?.email}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Flower className="h-5 w-5 text-admin-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">Flower Request</div>
                  <div>
                    {selectedRequest?.flower} - {selectedRequest?.quantity} units
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-admin-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">Delivery Date</div>
                  <div>{selectedRequest?.deliveryDate}</div>
                  <div className="text-sm text-admin-muted-foreground">
                    Request submitted on {selectedRequest?.createdAt}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-admin-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">Special Requests</div>
                  <div className="text-sm">
                    {selectedRequest?.specialRequests || "No special requests"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            {selectedRequest?.status === "Pending" && (
              <Button
                onClick={() => {
                  handleMarkAsProcessed(selectedRequest.id);
                  setIsDetailsDialogOpen(false);
                }}
                className="sm:order-2 bg-admin-accent hover:bg-admin-accent/90 text-white"
              >
                Mark as Processed
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => {
                handleOpenEmailDialog(selectedRequest!);
                setIsDetailsDialogOpen(false);
              }}
              className="sm:order-1"
            >
              Email Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RequestsPage;
