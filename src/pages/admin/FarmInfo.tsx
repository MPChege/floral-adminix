
import { useState } from "react";
import { PageHeader } from "@/components/ui-custom/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Flower, Upload, Trash2, Plus, Image, Save, Leaf } from "lucide-react";

interface FarmImage {
  id: string;
  url: string;
  caption: string;
}

interface FarmSection {
  title: string;
  description: string;
  images: FarmImage[];
}

interface FarmInfo {
  cb1: FarmSection;
  cb2: FarmSection;
}

// Sample data
const initialFarmInfo: FarmInfo = {
  cb1: {
    title: "CB1: Flower Farm",
    description: "Our main flower farm spread across 20 acres featuring over 50 varieties of premium flowers. Located in Naivasha, this farm specializes in roses, tulips, and other exotic varieties that thrive in the rich volcanic soil.",
    images: [
      {
        id: "img-001",
        url: "https://images.unsplash.com/photo-1471189641895-16c58a695bcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
        caption: "Aerial view of our main flower farm"
      },
      {
        id: "img-002",
        url: "https://images.unsplash.com/photo-1493166208825-9d064d124b8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
        caption: "Rose greenhouse section"
      }
    ]
  },
  cb2: {
    title: "CB2: Crop & Seedlings Farm",
    description: "Our specialized crop and seedlings farm focused on developing new flower varieties and sustainable farming techniques. This 5-acre research facility helps us maintain our reputation for quality and innovation in the flower industry.",
    images: [
      {
        id: "img-003",
        url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
        caption: "Seedling nursery"
      }
    ]
  }
};

const FarmInfoPage = () => {
  const [farmInfo, setFarmInfo] = useState<FarmInfo>(initialFarmInfo);
  const [currentTab, setCurrentTab] = useState<"cb1" | "cb2">("cb1");
  const [isEditing, setIsEditing] = useState(false);
  const [tempInfo, setTempInfo] = useState<FarmInfo>(farmInfo);
  const { toast } = useToast();

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setFarmInfo(tempInfo);
      toast({
        title: "Changes Saved",
        description: "Your farm information has been updated successfully.",
      });
    } else {
      // Start editing - create a copy for editing
      setTempInfo({ ...farmInfo });
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setTempInfo({ ...farmInfo });
    setIsEditing(false);
  };

  const handleInputChange = (
    farm: "cb1" | "cb2",
    field: "title" | "description",
    value: string
  ) => {
    setTempInfo({
      ...tempInfo,
      [farm]: {
        ...tempInfo[farm],
        [field]: value,
      },
    });
  };

  const handleImageCaptionChange = (
    farm: "cb1" | "cb2",
    imageId: string,
    caption: string
  ) => {
    const updatedImages = tempInfo[farm].images.map((img) =>
      img.id === imageId ? { ...img, caption } : img
    );

    setTempInfo({
      ...tempInfo,
      [farm]: {
        ...tempInfo[farm],
        images: updatedImages,
      },
    });
  };

  const handleAddImage = (farm: "cb1" | "cb2") => {
    // Simulate adding a placeholder image
    const newImage: FarmImage = {
      id: `img-${Math.random().toString(36).substr(2, 9)}`,
      url: "https://via.placeholder.com/800x600?text=New+Farm+Image",
      caption: "New farm image",
    };

    setTempInfo({
      ...tempInfo,
      [farm]: {
        ...tempInfo[farm],
        images: [...tempInfo[farm].images, newImage],
      },
    });
  };

  const handleRemoveImage = (farm: "cb1" | "cb2", imageId: string) => {
    const updatedImages = tempInfo[farm].images.filter(
      (img) => img.id !== imageId
    );

    setTempInfo({
      ...tempInfo,
      [farm]: {
        ...tempInfo[farm],
        images: updatedImages,
      },
    });
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Farm Information"
        description="Manage details about your flower farms."
      >
        {isEditing ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditToggle}
              className="bg-admin-accent hover:bg-admin-accent/90 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleEditToggle}
            className="bg-admin-accent hover:bg-admin-accent/90 text-white"
          >
            Edit Information
          </Button>
        )}
      </PageHeader>

      <Tabs defaultValue="cb1" onValueChange={(v) => setCurrentTab(v as "cb1" | "cb2")}>
        <TabsList className="mb-6">
          <TabsTrigger value="cb1" className="flex items-center gap-2">
            <Flower className="h-4 w-4" />
            <span>CB1: Flower Farm</span>
          </TabsTrigger>
          <TabsTrigger value="cb2" className="flex items-center gap-2">
            <Leaf className="h-4 w-4" />
            <span>CB2: Crop & Seedlings</span>
          </TabsTrigger>
        </TabsList>

        {["cb1", "cb2"].map((farmKey) => (
          <TabsContent key={farmKey} value={farmKey}>
            <Card className="admin-glassmorphism">
              <CardHeader>
                <CardTitle>
                  {isEditing ? (
                    <Input
                      value={tempInfo[farmKey as keyof FarmInfo].title}
                      onChange={(e) =>
                        handleInputChange(
                          farmKey as "cb1" | "cb2",
                          "title",
                          e.target.value
                        )
                      }
                      className="text-xl font-bold"
                    />
                  ) : (
                    farmInfo[farmKey as keyof FarmInfo].title
                  )}
                </CardTitle>
                <CardDescription>
                  {farmKey === "cb1"
                    ? "Main flower production farm"
                    : "Research and development farm"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Farm Description</Label>
                  {isEditing ? (
                    <Textarea
                      value={tempInfo[farmKey as keyof FarmInfo].description}
                      onChange={(e) =>
                        handleInputChange(
                          farmKey as "cb1" | "cb2",
                          "description",
                          e.target.value
                        )
                      }
                      rows={5}
                      className="w-full"
                    />
                  ) : (
                    <p className="text-admin-muted-foreground">
                      {farmInfo[farmKey as keyof FarmInfo].description}
                    </p>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Farm Images</Label>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAddImage(farmKey as "cb1" | "cb2")}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Image
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(isEditing
                      ? tempInfo[farmKey as keyof FarmInfo].images
                      : farmInfo[farmKey as keyof FarmInfo].images
                    ).map((image) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative group"
                      >
                        <div className="aspect-[4/3] rounded-md overflow-hidden border">
                          <img
                            src={image.url}
                            alt={image.caption}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mt-2">
                          {isEditing ? (
                            <div className="space-y-2">
                              <Input
                                value={image.caption}
                                onChange={(e) =>
                                  handleImageCaptionChange(
                                    farmKey as "cb1" | "cb2",
                                    image.id,
                                    e.target.value
                                  )
                                }
                                placeholder="Image caption"
                                className="text-sm"
                              />
                              <div className="flex justify-between">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs"
                                >
                                  <Upload className="h-3 w-3 mr-1" />
                                  Replace
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50 text-xs"
                                  onClick={() =>
                                    handleRemoveImage(
                                      farmKey as "cb1" | "cb2",
                                      image.id
                                    )
                                  }
                                >
                                  <Trash2 className="h-3 w-3 mr-1" />
                                  Remove
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-admin-muted-foreground">
                              {image.caption}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {isEditing && 
                      tempInfo[farmKey as keyof FarmInfo].images.length === 0 && (
                        <div className="border-2 border-dashed rounded-lg p-6 text-center aspect-[4/3] flex flex-col items-center justify-center">
                          <Image className="h-10 w-10 mb-2 text-admin-muted-foreground" />
                          <div className="text-sm text-admin-muted-foreground mb-2">
                            No images added yet
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAddImage(farmKey as "cb1" | "cb2")}
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Image
                          </Button>
                        </div>
                      )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FarmInfoPage;
