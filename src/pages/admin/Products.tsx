
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/page-header";
import {
  Package,
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  ArrowUpDown,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

// Sample data
const sampleProducts = [
  {
    id: "PRD-001",
    name: "Red Roses Bouquet",
    category: "Premium",
    featured: true,
    image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "PRD-002",
    name: "Tulip Collection",
    category: "Extra Premium",
    featured: false,
    image: "https://images.unsplash.com/photo-1586968793473-d7c0049865f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "PRD-003",
    name: "Orchid Arrangement",
    category: "Extra Premium",
    featured: true,
    image: "https://images.unsplash.com/photo-1567748157439-651aca2ff064?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "PRD-004",
    name: "Sunflower Bouquet",
    category: "Premium",
    featured: false,
    image: "https://images.unsplash.com/photo-1543159821-9548b11973eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "PRD-005",
    name: "White Lily Bouquet",
    category: "Spray Roses",
    featured: false,
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "PRD-006",
    name: "Mixed Seasonal Flowers",
    category: "Premium",
    featured: true,
    image: "https://images.unsplash.com/photo-1587052755556-57605357fc41?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
  },
];

const categories = ["Extra Premium", "Premium", "Spray Roses", "Collections", "Seasonal"];

interface Product {
  id: string;
  name: string;
  category: string;
  featured: boolean;
  image: string;
  description?: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  // Form state for adding/editing product
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    category: "Premium",
    featured: false,
    image: "",
    description: "",
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "Premium",
      featured: false,
      image: "",
      description: "",
    });
    setEditingProduct(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      featured: product.featured,
      image: product.image,
      description: product.description || "",
    });
    setIsAddDialogOpen(true);
  };

  const openDeleteDialog = (id: string) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveProduct = () => {
    if (!formData.name) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map((product) =>
        product.id === editingProduct.id
          ? { ...formData, id: editingProduct.id }
          : product
      );
      setProducts(updatedProducts);
      toast({
        title: "Flower Updated",
        description: `${formData.name} has been updated successfully.`,
      });
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: `PRD-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
      };
      setProducts([...products, newProduct]);
      toast({
        title: "Flower Added",
        description: `${formData.name} has been added successfully.`,
      });
    }

    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleDeleteProduct = () => {
    if (productToDelete) {
      const updatedProducts = products.filter(
        (product) => product.id !== productToDelete
      );
      setProducts(updatedProducts);
      toast({
        title: "Flower Deleted",
        description: "The flower has been removed from your catalogue.",
      });
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Flower Catalogue"
        description="Manage your flower farm catalogue."
      >
        <Button
          onClick={openAddDialog}
          className="bg-admin-accent hover:bg-admin-accent/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Flower
        </Button>
      </PageHeader>

      <Card className="admin-glassmorphism">
        <CardHeader className="pb-3">
          <CardTitle>Flower Inventory</CardTitle>
          <CardDescription>
            Manage your flower catalogue and categorize them
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-admin-muted-foreground" />
              <Input
                placeholder="Search flowers..."
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
                <DropdownMenuItem>Featured Flowers</DropdownMenuItem>
                <DropdownMenuItem>Premium Flowers</DropdownMenuItem>
                <DropdownMenuItem>Newly Added</DropdownMenuItem>
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
                <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                <DropdownMenuItem>Category</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No flowers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="h-12 w-12 rounded-md overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div>
                          {product.name}
                          {product.featured && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-admin-muted-foreground md:hidden">
                          {product.category}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.category}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEditDialog(product)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => openDeleteDialog(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
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
            Showing {filteredProducts.length} of {products.length} flowers
          </div>
        </CardFooter>
      </Card>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Flower" : "Add New Flower"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct
                ? "Update flower details and information."
                : "Add a new flower to your farm catalogue."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Flower Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Red Roses"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
              />
              {formData.image && (
                <div className="mt-2 h-20 w-20 rounded-md overflow-hidden">
                  <img
                    src={formData.image}
                    alt="Flower preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="A beautiful arrangement of fresh flowers..."
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-admin-accent focus:ring-admin-accent"
              />
              <Label htmlFor="featured">Featured Flower</Label>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveProduct}
              className="bg-admin-accent hover:bg-admin-accent/90 text-white"
            >
              {editingProduct ? "Update Flower" : "Add Flower"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this flower? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProduct}
            >
              Delete Flower
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsPage;
