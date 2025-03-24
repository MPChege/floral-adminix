
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/page-header";
import {
  FileText,
  Search,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Tag,
  Eye,
  ChevronDown,
  X,
  Image,
  Save,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

// Sample data with proper typing for status
const sampleBlogPosts = [
  {
    id: "BLOG-001",
    title: "10 Most Popular Flowers for Wedding Bouquets",
    excerpt:
      "Discover the top flower choices that make wedding bouquets truly special and meaningful.",
    content:
      "When it comes to wedding bouquets, certain flowers have stood the test of time for their beauty, symbolism, and versatility. Roses, with their timeless elegance, remain a popular choice for brides seeking a classic look. Peonies, known for their lush, full blooms, add a touch of romance and luxury to any bouquet. Lilies, symbolizing purity and refined beauty, make a striking statement in wedding arrangements.\n\nFor brides looking for something delicate, baby's breath has made a significant comeback, offering a soft, ethereal quality to bouquets either as a standalone or complementary element. Tulips provide a clean, sophisticated look and come in various colors to match any wedding palette.\n\nOrchids bring an exotic touch and are perfect for modern, chic weddings. Their unique shapes and varieties offer endless possibilities for customization. Hydrangeas, with their full-bodied blooms, create volume and texture, making them ideal for larger bouquets.\n\nDahlias have gained popularity for their intricate petals and vibrant colors, perfect for fall weddings. Ranunculus, with their paper-thin petals and rose-like appearance, offer elegance without the typical rose price tag. Finally, anemones, with their striking black centers and white petals, create a dramatic contrast that's perfect for contemporary wedding themes.\n\nChoosing the right flowers for your wedding bouquet should reflect your personal style, the season, and the overall wedding theme. Each flower brings its own meaning and beauty to your special day, creating memories that will last a lifetime.",
    author: "Emma Thompson",
    date: "2023-07-25T09:30:00",
    tags: ["Wedding", "Bouquets", "Flower Guide"],
    image:
      "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    status: "Published" as const,
  },
  {
    id: "BLOG-002",
    title: "How to Care for Fresh Cut Flowers",
    excerpt:
      "Learn essential tips to keep your flower arrangements fresh and vibrant for longer periods.",
    content:
      "Fresh cut flowers bring beauty and fragrance to your home, but without proper care, they can wilt prematurely. Follow these professional tips to extend the life of your floral arrangements.\n\nStart with clean equipment. Before arranging your flowers, wash your vase thoroughly with soap and warm water to remove any bacteria that could harm your blooms. Use flower food – those small packets that come with your bouquet aren't just for show. They contain essential nutrients and antibacterial agents that nourish your flowers and prevent bacterial growth.\n\nWater temperature matters. Most flowers prefer room temperature water, but there are exceptions. Bulb flowers like tulips and hyacinths prefer cold water, while woody-stemmed flowers like roses benefit from warm water to help them absorb moisture better.\n\nPrepare the stems properly. Always cut stems at a 45-degree angle with sharp scissors or a knife before placing them in water. This increases the surface area for water absorption. Remove any foliage that would sit below the waterline to prevent bacterial growth.\n\nLocation is key. Keep your arrangement away from direct sunlight, heating or cooling vents, and ripening fruit (which releases ethylene gas that speeds up the aging process of flowers). Change the water every two to three days, and re-cut the stems each time you do.\n\nSome flowers, like roses, benefit from a quick refresh by submerging the entire flower head in cool water for about 30 seconds when they start to droop. For arrangements containing various flower types, remember that some varieties naturally last longer than others, so don't be afraid to remove spent blooms while keeping the rest of the arrangement intact.\n\nWith these simple care techniques, you can enjoy your fresh cut flowers for days or even weeks longer, making the most of their natural beauty in your home.",
    author: "Michael Chen",
    date: "2023-07-18T11:15:00",
    tags: ["Care Tips", "Fresh Flowers", "Home Decor"],
    image:
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    status: "Published" as const,
  },
  {
    id: "BLOG-003",
    title: "Seasonal Blooms: What Flowers to Expect Each Month",
    excerpt:
      "A comprehensive guide to seasonal flowers throughout the year to help you plan your garden or events.",
    content:
      "Understanding which flowers bloom in each season helps gardeners plan their landscapes and allows event planners to choose in-season blooms that are both more affordable and environmentally friendly.\n\nSpring (March-May) brings a vibrant array of blooms after winter's dormancy. Early spring features crocuses, daffodils, and tulips pushing through the last of the winter frost. Mid-spring welcomes cherry blossoms, hyacinths, and early peonies. Late spring showcases lilacs, ranunculus, and the first roses of the year.\n\nSummer (June-August) is the season of abundance. Early summer features peonies in their full glory, along with lavender and sunflowers beginning their show. Midsummer highlights include dahlias, zinnias, and hydrangeas creating lush displays. Late summer continues with sunflowers reaching their peak, joined by black-eyed Susans and garden roses in rich hues.\n\nAutumn (September-November) brings its own unique palette. Early fall features late dahlias, chrysanthemums, and Japanese anemones adding structure to gardens. Mid-fall showcases asters, celosia, and marigolds in harvest colors. Late fall continues with certain chrysanthemum varieties, ornamental kale, and the last of the season's dahlias.\n\nWinter (December-February) offers subtle beauty in select regions. Early winter features hellebores, certain camellias, and paperwhites in milder climates. Mid-winter continues with witch hazel, winter jasmine, and forced bulbs for indoor enjoyment. Late winter begins to transition with early crocuses, snowdrops, and winter aconite hinting at spring's approach.\n\nUnderstanding these seasonal patterns helps you work with nature's rhythm rather than against it. For special events, choosing in-season flowers not only reduces costs but also ensures you're getting the freshest, most vibrant blooms available. For home gardeners, planning with these seasons in mind creates a landscape with year-round interest and continuous blooming cycles.",
    author: "Linda Garcia",
    date: "2023-07-10T14:45:00",
    tags: ["Seasonal Flowers", "Gardening", "Planning Guide"],
    image:
      "https://images.unsplash.com/photo-1520496938502-6b28f52c4638?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    status: "Draft" as const,
  },
];

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  image: string;
  status: "Published" | "Draft";
}

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(sampleBlogPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const { toast } = useToast();

  // Form state for adding/editing blog post
  const [formData, setFormData] = useState<Omit<BlogPost, "id" | "date">>({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    tags: [],
    image: "",
    status: "Draft",
  });

  const [tagInput, setTagInput] = useState("");

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
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

  const handleAddTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const handleStatusChange = (status: "Published" | "Draft") => {
    setFormData({
      ...formData,
      status,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      tags: [],
      image: "",
      status: "Draft",
    });
    setTagInput("");
    setEditingPost(null);
  };

  const openEditor = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        tags: [...post.tags],
        image: post.image,
        status: post.status,
      });
    } else {
      resetForm();
    }
    setIsEditorOpen(true);
  };

  const openDeleteDialog = (id: string) => {
    setPostToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleSavePost = () => {
    if (!formData.title || !formData.content) {
      toast({
        title: "Validation Error",
        description: "Title and content are required fields.",
        variant: "destructive",
      });
      return;
    }

    const currentDate = new Date().toISOString();

    if (editingPost) {
      // Update existing post
      const updatedPosts = blogPosts.map((post) =>
        post.id === editingPost.id
          ? { ...formData, id: editingPost.id, date: editingPost.date }
          : post
      );
      setBlogPosts(updatedPosts);
      toast({
        title: "Blog Post Updated",
        description: `"${formData.title}" has been updated successfully.`,
      });
    } else {
      // Add new post
      const newPost = {
        ...formData,
        id: `BLOG-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
        date: currentDate,
      };
      setBlogPosts([newPost, ...blogPosts]);
      toast({
        title: "Blog Post Created",
        description: `"${formData.title}" has been created successfully.`,
      });
    }

    setIsEditorOpen(false);
    resetForm();
  };

  const handleDeletePost = () => {
    if (postToDelete) {
      const updatedPosts = blogPosts.filter(
        (post) => post.id !== postToDelete
      );
      setBlogPosts(updatedPosts);
      toast({
        title: "Blog Post Deleted",
        description: "The blog post has been removed successfully.",
      });
      setIsDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Blog Management"
        description="Create and manage blog posts for your flower shop website."
      >
        <Button
          onClick={() => openEditor()}
          className="bg-admin-accent hover:bg-admin-accent/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </PageHeader>

      <Card className="admin-glassmorphism">
        <CardHeader className="pb-3">
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>
            Manage your blog content, create new posts, and update existing ones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-admin-muted-foreground" />
            <Input
              placeholder="Search blog posts by title, author, or tags..."
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

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Author</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No blog posts found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="font-medium">{post.title}</div>
                        <div className="text-sm text-admin-muted-foreground line-clamp-1">
                          {post.excerpt}
                        </div>
                        <div className="mt-1 md:hidden">
                          <span className="text-xs text-admin-muted-foreground">
                            By {post.author} • {formatDate(post.date)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {post.tags.map((tag) => (
                            <Badge
                              key={`${post.id}-${tag}`}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {post.author}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {formatDate(post.date)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            post.status === "Published"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                          }
                        >
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEditor(post)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => openDeleteDialog(post.id)}
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
      </Card>

      {/* Blog Post Editor Dialog */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="sm:max-w-[1000px] h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>
              {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
            </DialogTitle>
            <DialogDescription>
              {editingPost
                ? "Update your blog post content and settings."
                : "Create a new blog post for your flower shop website."}
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="content" className="flex-1 overflow-hidden flex flex-col">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <div className="flex-1 overflow-hidden flex flex-col">
              <TabsContent
                value="content"
                className="flex-1 overflow-y-auto py-4 space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter blog post title"
                    className="text-lg"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Brief summary of your post (appears in previews)"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Write your blog post content here..."
                    className="min-h-[300px]"
                    required
                  />
                </div>
              </TabsContent>
              <TabsContent
                value="settings"
                className="flex-1 overflow-y-auto py-4 space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Your name or pen name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image">Featured Image URL</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.image && (
                    <div className="mt-2 rounded-md overflow-hidden aspect-video bg-admin-muted">
                      <img
                        src={formData.image}
                        alt="Featured"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "";
                          target.alt = "Failed to load image";
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddTag}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1 px-3 py-1.5"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 text-admin-muted-foreground hover:text-admin-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {formData.tags.length === 0 && (
                      <span className="text-sm text-admin-muted-foreground">
                        No tags added yet
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={
                        formData.status === "Draft" ? "default" : "outline"
                      }
                      className={
                        formData.status === "Draft"
                          ? "bg-admin-accent text-white"
                          : ""
                      }
                      onClick={() => handleStatusChange("Draft")}
                    >
                      Draft
                    </Button>
                    <Button
                      type="button"
                      variant={
                        formData.status === "Published" ? "default" : "outline"
                      }
                      className={
                        formData.status === "Published"
                          ? "bg-admin-accent text-white"
                          : ""
                      }
                      onClick={() => handleStatusChange("Published")}
                    >
                      Published
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
          <DialogFooter className="mt-4 gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditorOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSavePost}
              className="bg-admin-accent hover:bg-admin-accent/90 text-white gap-2"
            >
              <Save className="h-4 w-4" />
              {formData.status === "Published" ? "Publish" : "Save Draft"}
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
              Are you sure you want to delete this blog post? This action cannot be
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
              onClick={handleDeletePost}
            >
              Delete Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogPage;
