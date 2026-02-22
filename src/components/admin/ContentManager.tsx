
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileEdit, Plus, Trash2, Eye, Image, FileText, PenTool, Save, Star } from 'lucide-react';

// Sample content
const samplePages = [
  { id: 1, title: "Home", slug: "home", status: "published", modified: "2025-04-15", author: "Admin" },
  { id: 2, title: "About Us", slug: "about", status: "published", modified: "2025-04-10", author: "Admin" },
  { id: 3, title: "Services", slug: "services", status: "published", modified: "2025-04-08", author: "Admin" },
  { id: 4, title: "Contact", slug: "contact", status: "draft", modified: "2025-04-20", author: "Admin" }
];

const sampleBlogPosts = [
  { id: 1, title: "2025 Astrological Predictions", slug: "2025-astrological-predictions", status: "published", modified: "2025-04-19", author: "Jane Doe" },
  { id: 2, title: "The Meaning of Your Birth Chart", slug: "birth-chart-meaning", status: "published", modified: "2025-04-17", author: "John Smith" },
  { id: 3, title: "How Planets Affect Your Love Life", slug: "planets-love-life", status: "draft", modified: "2025-04-21", author: "Admin" }
];

const ContentManager = () => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState("pages");
  const [pages, setPages] = useState(samplePages);
  const [blogPosts, setBlogPosts] = useState(sampleBlogPosts);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form state
  const [editForm, setEditForm] = useState({
    title: "",
    slug: "",
    content: "",
    status: "draft"
  });

  const handleEditContent = (content) => {
    setSelectedContent(content);
    setEditForm({
      title: content.title,
      slug: content.slug,
      content: content.content || "Enter your content here...",
      status: content.status
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleViewContent = (content) => {
    setSelectedContent(content);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleDeleteContent = (id) => {
    if (currentTab === "pages") {
      setPages(pages.filter(page => page.id !== id));
    } else {
      setBlogPosts(blogPosts.filter(post => post.id !== id));
    }
    
    toast({
      title: "Content Deleted",
      description: `The ${currentTab === "pages" ? "page" : "blog post"} has been deleted.`,
      variant: "destructive"
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSlugChange = (e) => {
    // Automatically generate slug from title if the user is typing in the title field
    if (e.target.name === "title") {
      const slugified = e.target.value.toLowerCase()
        .replace(/[^\w\s-]/g, '')  // Remove special characters
        .replace(/\s+/g, '-')      // Replace spaces with hyphens
        .replace(/--+/g, '-')      // Replace multiple hyphens with a single hyphen
        .trim();                   // Trim leading/trailing hyphens/spaces

      setEditForm(prev => ({
        ...prev,
        title: e.target.value,
        slug: slugified
      }));
    } else {
      handleFormChange(e);
    }
  };

  const handleSaveContent = () => {
    if (!editForm.title || !editForm.slug || !editForm.content) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    const newContent = {
      ...selectedContent,
      title: editForm.title,
      slug: editForm.slug,
      content: editForm.content,
      status: editForm.status,
      modified: new Date().toISOString().slice(0, 10),
      author: "Admin" // In a real app, this would be the current user
    };

    if (selectedContent) {
      // Update existing content
      if (currentTab === "pages") {
        setPages(pages.map(page => 
          page.id === selectedContent.id ? newContent : page
        ));
      } else {
        setBlogPosts(blogPosts.map(post => 
          post.id === selectedContent.id ? newContent : post
        ));
      }
      
      toast({
        title: "Content Updated",
        description: `The ${currentTab === "pages" ? "page" : "blog post"} has been updated.`
      });
    } else {
      // Create new content
      const contentWithId = {
        ...newContent,
        id: currentTab === "pages" ? pages.length + 1 : blogPosts.length + 1
      };
      
      if (currentTab === "pages") {
        setPages([...pages, contentWithId]);
      } else {
        setBlogPosts([...blogPosts, contentWithId]);
      }
      
      toast({
        title: "Content Created",
        description: `A new ${currentTab === "pages" ? "page" : "blog post"} has been created.`
      });
    }

    setIsDialogOpen(false);
    setSelectedContent(null);
  };

  const handleCreateContent = () => {
    setSelectedContent(null);
    setEditForm({
      title: "",
      slug: "",
      content: "",
      status: "draft"
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const contentList = currentTab === "pages" ? pages : blogPosts;

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-cosmic-light">Content Management</h1>
        <Button 
          className="bg-cosmic-light text-cosmic-dark hover:bg-cosmic-light/90 font-medium animate-button-pulse"
          onClick={handleCreateContent}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create {currentTab === "pages" ? "Page" : "Blog Post"}
        </Button>
      </div>
      
      <Tabs defaultValue="pages" className="space-y-4" onValueChange={setCurrentTab}>
        <div className="cosmic-glass p-1.5 rounded-lg inline-block">
          <TabsList className="bg-cosmic-dark/30">
            <TabsTrigger value="pages" className="data-[state=active]:bg-cosmic-accent/40 data-[state=active]:text-cosmic-light text-cosmic-accent">
              <FileText className="mr-2 h-4 w-4" />
              Pages
            </TabsTrigger>
            <TabsTrigger value="blog" className="data-[state=active]:bg-cosmic-accent/40 data-[state=active]:text-cosmic-light text-cosmic-accent">
              <PenTool className="mr-2 h-4 w-4" />
              Blog Posts
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={currentTab}>
          <Card className="cosmic-glass">
            <CardHeader>
              <CardTitle className="text-cosmic-light">{currentTab === "pages" ? "Pages" : "Blog Posts"}</CardTitle>
              <CardDescription className="text-cosmic-accent">
                Manage your {currentTab === "pages" ? "website pages" : "blog content"} here
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-cosmic-dark/20 border-cosmic-light/20">
                    <TableHead className="text-cosmic-light">Title</TableHead>
                    <TableHead className="text-cosmic-light">Slug</TableHead>
                    <TableHead className="text-cosmic-light">Status</TableHead>
                    <TableHead className="text-cosmic-light">Last Modified</TableHead>
                    <TableHead className="text-cosmic-light">Author</TableHead>
                    <TableHead className="text-cosmic-light">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentList.map((content) => (
                    <TableRow key={content.id} className="hover:bg-cosmic-dark/20 border-cosmic-light/20 group">
                      <TableCell className="text-cosmic-light font-medium">{content.title}</TableCell>
                      <TableCell className="text-cosmic-accent">{content.slug}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          content.status === "published" ? "bg-green-500/30 text-green-300" : 
                          "bg-amber-500/30 text-amber-300"
                        }`}>
                          {content.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-cosmic-accent">{content.modified}</TableCell>
                      <TableCell className="text-cosmic-accent">{content.author}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-cosmic-light hover:text-cosmic-light hover:bg-cosmic-light/20" onClick={() => handleViewContent(content)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-cosmic-light hover:text-cosmic-light hover:bg-cosmic-light/20" onClick={() => handleEditContent(content)}>
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-cosmic-light hover:text-destructive hover:bg-destructive/20" onClick={() => handleDeleteContent(content.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {contentList.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-cosmic-accent">
                        No {currentTab === "pages" ? "pages" : "blog posts"} found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Content Edit/View Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="cosmic-glass text-cosmic-light max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-cosmic-light text-xl">
              {isEditing ? (
                selectedContent ? 
                `Edit ${currentTab === "pages" ? "Page" : "Blog Post"}` : 
                `Create New ${currentTab === "pages" ? "Page" : "Blog Post"}`
              ) : `View ${currentTab === "pages" ? "Page" : "Blog Post"}`}
            </DialogTitle>
            <DialogDescription className="text-cosmic-accent">
              {isEditing ? 
                "Fill in the details below to save your content" : 
                selectedContent ? `Viewing: ${selectedContent.title}` : ""}
            </DialogDescription>
          </DialogHeader>
          
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-cosmic-light">Title</Label>
                  <Input 
                    id="title"
                    name="title"
                    className="bg-cosmic-dark/50 border-cosmic-light/30 text-cosmic-light"
                    value={editForm.title}
                    onChange={handleSlugChange}
                    placeholder="Page title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug" className="text-cosmic-light">Slug</Label>
                  <Input 
                    id="slug"
                    name="slug"
                    className="bg-cosmic-dark/50 border-cosmic-light/30 text-cosmic-light"
                    value={editForm.slug}
                    onChange={handleFormChange}
                    placeholder="page-slug"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status" className="text-cosmic-light">Status</Label>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant={editForm.status === "draft" ? "default" : "outline"}
                    className={editForm.status === "draft" ? "bg-cosmic-light text-cosmic-dark" : "border-cosmic-light/30 text-cosmic-light"}
                    onClick={() => setEditForm(prev => ({ ...prev, status: "draft" }))}
                  >
                    Draft
                  </Button>
                  <Button
                    type="button"
                    variant={editForm.status === "published" ? "default" : "outline"}
                    className={editForm.status === "published" ? "bg-cosmic-light text-cosmic-dark" : "border-cosmic-light/30 text-cosmic-light"}
                    onClick={() => setEditForm(prev => ({ ...prev, status: "published" }))}
                  >
                    Published
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content" className="text-cosmic-light">Content</Label>
                <Textarea 
                  id="content"
                  name="content"
                  rows={15}
                  className="bg-cosmic-dark/50 border-cosmic-light/30 text-cosmic-light font-mono"
                  value={editForm.content}
                  onChange={handleFormChange}
                  placeholder="Enter your content here..."
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  className="border-cosmic-light/30 text-cosmic-light hover:bg-cosmic-light/20"
                  onClick={() => {
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = 'image/*';
                    fileInput.onchange = (e) => {
                      toast({
                        title: "Image Upload",
                        description: "Image upload functionality would be implemented here"
                      });
                    };
                    fileInput.click();
                  }}
                >
                  <Image className="mr-2 h-4 w-4" />
                  Add Image
                </Button>
              </div>
            </div>
          ) : selectedContent && (
            <div className="space-y-4">
              <div className="bg-cosmic-dark/50 p-4 rounded-lg border border-cosmic-light/20">
                <div className="flex justify-between">
                  <div>
                    <span className="text-cosmic-accent">Slug:</span>
                    <span className="text-cosmic-light ml-2">{selectedContent.slug}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedContent.status === "published" ? "bg-green-500/30 text-green-300" : 
                    "bg-amber-500/30 text-amber-300"
                  }`}>
                    {selectedContent.status}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-cosmic-accent">Last Modified:</span>
                  <span className="text-cosmic-light ml-2">{selectedContent.modified} by {selectedContent.author}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-cosmic-light">{selectedContent.title}</h2>
                <div className="bg-cosmic-dark/50 p-4 rounded-lg border border-cosmic-light/20 min-h-[300px] whitespace-pre-line text-cosmic-light">
                  {selectedContent.content || "No content yet"}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            {isEditing ? (
              <Button 
                className="bg-cosmic-light text-cosmic-dark hover:bg-cosmic-light/90 font-medium animate-button-pulse"
                onClick={handleSaveContent}
              >
                <Save className="mr-2 h-4 w-4" />
                {selectedContent ? "Update" : "Create"}
              </Button>
            ) : (
              <Button 
                className="bg-cosmic-light text-cosmic-dark hover:bg-cosmic-light/90 font-medium"
                onClick={() => setIsEditing(true)}
              >
                <FileEdit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentManager;
