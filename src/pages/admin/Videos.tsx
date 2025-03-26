
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/page-header";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Plus, Play, Trash2, Upload, Video, Youtube, Edit } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface FarmVideo {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "youtube" | "upload";
  thumbnail: string;
  date: string;
}

// Sample data for videos
const sampleVideos = [
  {
    id: "VID-001",
    title: "Our Beautiful Rose Garden",
    description: "Take a tour of our main rose garden where we grow over 20 different varieties.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    type: "youtube" as const,
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    date: "2023-09-15",
  },
  {
    id: "VID-002",
    title: "Harvesting Season Time-lapse",
    description: "Watch as our team harvests thousands of blooms during peak season.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    type: "youtube" as const,
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    date: "2023-08-20",
  },
  {
    id: "VID-003",
    title: "Growing Premium Orchids",
    description: "Learn about our special techniques for growing award-winning orchids.",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    type: "youtube" as const,
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    date: "2023-07-12",
  }
];

const VideosPage = () => {
  const [videos, setVideos] = useState<FarmVideo[]>(sampleVideos);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPlayDialogOpen, setIsPlayDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<FarmVideo | null>(null);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  // Form state for adding a video
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    type: "youtube",
    thumbnail: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Auto-generate thumbnail for YouTube videos
    if (name === "url" && formData.type === "youtube") {
      const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = value.match(youtubeRegex);
      if (match && match[1]) {
        setFormData({
          ...formData,
          url: value,
          thumbnail: `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`,
        });
      }
    }
  };

  const handleTypeChange = (type: string) => {
    setFormData({
      ...formData,
      type: type,
      // Clear URL if switching types
      ...(formData.type !== type && { url: "", thumbnail: "" }),
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      url: "",
      type: "youtube",
      thumbnail: "",
    });
  };

  const handleAddVideo = () => {
    if (!formData.title || !formData.url) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newVideo: FarmVideo = {
      id: `VID-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
      title: formData.title,
      description: formData.description,
      url: formData.url,
      type: formData.type as "youtube" | "upload",
      thumbnail: formData.thumbnail || "https://via.placeholder.com/480x360?text=Video+Thumbnail",
      date: new Date().toISOString().split("T")[0],
    };

    setVideos([...videos, newVideo]);
    toast({
      title: "Video Added",
      description: "The video has been added to your collection.",
    });
    setIsAddDialogOpen(false);
    resetForm();
  };

  const openDeleteDialog = (id: string) => {
    setVideoToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteVideo = () => {
    if (videoToDelete) {
      const updatedVideos = videos.filter((video) => video.id !== videoToDelete);
      setVideos(updatedVideos);
      toast({
        title: "Video Deleted",
        description: "The video has been removed from your collection.",
      });
      setIsDeleteDialogOpen(false);
      setVideoToDelete(null);
    }
  };

  const openPlayDialog = (video: FarmVideo) => {
    setSelectedVideo(video);
    setIsPlayDialogOpen(true);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Farm Videos"
        description="Manage videos showcasing your flower farm."
      >
        <Button
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-admin-accent hover:bg-admin-accent/90 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Video
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="h-full flex flex-col admin-glassmorphism overflow-hidden">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
                  onClick={() => openPlayDialog(video)}
                >
                  <div className="bg-white rounded-full p-3">
                    <Play className="h-6 w-6 text-black" />
                  </div>
                </button>
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.type === "youtube" ? "YouTube" : "Upload"}
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{video.title}</CardTitle>
                <CardDescription className="text-sm">
                  Added on {video.date}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-admin-muted-foreground line-clamp-3">
                  {video.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openPlayDialog(video)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Play
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => openDeleteDialog(video.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Add Video Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Video</DialogTitle>
            <DialogDescription>
              Add a video to showcase your flower farm.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Video Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Our Beautiful Rose Garden"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="A short description of what this video shows..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Video Type</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={formData.type === "youtube" ? "default" : "outline"}
                  className={
                    formData.type === "youtube"
                      ? "bg-admin-accent hover:bg-admin-accent/90 text-white"
                      : ""
                  }
                  onClick={() => handleTypeChange("youtube")}
                >
                  <Youtube className="h-4 w-4 mr-2" />
                  YouTube Video
                </Button>
                <Button
                  type="button"
                  variant={formData.type === "upload" ? "default" : "outline"}
                  className={
                    formData.type === "upload"
                      ? "bg-admin-accent hover:bg-admin-accent/90 text-white"
                      : ""
                  }
                  onClick={() => handleTypeChange("upload")}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Video
                </Button>
              </div>
            </div>
            {formData.type === "youtube" ? (
              <div className="space-y-2">
                <Label htmlFor="url">YouTube URL</Label>
                <Input
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
                <p className="text-xs text-admin-muted-foreground">
                  Paste the full YouTube video URL
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="upload">Upload Video</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Video className="h-10 w-10 mx-auto mb-2 text-admin-muted-foreground" />
                  <div className="text-sm text-admin-muted-foreground mb-2">
                    Drag and drop your video here, or click to browse
                  </div>
                  <Input
                    id="upload"
                    type="file"
                    accept="video/*"
                    className="hidden"
                  />
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="h-4 w-4 mr-2" />
                    Browse Files
                  </Button>
                </div>
                <p className="text-xs text-admin-muted-foreground">
                  Supported formats: MP4, WebM, Ogg (Max size: 100MB)
                </p>
              </div>
            )}
            {formData.thumbnail && (
              <div className="space-y-2">
                <Label>Preview Thumbnail</Label>
                <div className="aspect-video rounded-md overflow-hidden">
                  <img
                    src={formData.thumbnail}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
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
              onClick={handleAddVideo}
              className="bg-admin-accent hover:bg-admin-accent/90 text-white"
            >
              Add Video
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
              Are you sure you want to delete this video? This action cannot be
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
            <Button variant="destructive" onClick={handleDeleteVideo}>
              Delete Video
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Play Dialog */}
      <Dialog
        open={isPlayDialogOpen}
        onOpenChange={setIsPlayDialogOpen}
      >
        <DialogContent className="sm:max-w-[800px] p-1">
          <div className="aspect-video w-full">
            {selectedVideo?.type === "youtube" ? (
              <iframe
                width="100%"
                height="100%"
                src={selectedVideo.url}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                src={selectedVideo?.url}
                controls
                className="w-full h-full"
              ></video>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VideosPage;
