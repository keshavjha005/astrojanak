
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const sampleBlogs = [
  {
    id: 1,
    title: "Understanding Your Moon Sign: The Key to Inner Self",
    excerpt: "While your sun sign represents your core identity, your moon sign reveals your emotional nature and instinctive reactions...",
    publishDate: "2025-04-10",
    author: "Luna Starlight",
    category: "Astrology Basics",
    content: "While your sun sign represents your core identity, your moon sign reveals your emotional nature and instinctive reactions. The moon governs our subconscious, our habits, and our intuitive responses to the world around us. Understanding your moon sign can provide profound insights into your emotional needs and patterns. \n\nIf your moon is in a fire sign (Aries, Leo, Sagittarius), you may process emotions quickly and expressively. Water moon signs (Cancer, Scorpio, Pisces) tend to feel deeply and may be more sensitive to the emotional undercurrents around them. Air moon signs (Gemini, Libra, Aquarius) might intellectualize their feelings, while earth moon signs (Taurus, Virgo, Capricorn) often seek practical stability in their emotional lives. \n\nThe house placement of your moon further specifies which area of life these emotional patterns most strongly manifest. By honoring the needs of your moon sign, you can create greater emotional balance and fulfillment in your life."
  },
  {
    id: 2,
    title: "Mercury Retrograde: Navigating the Cosmic Storm",
    excerpt: "As Mercury appears to move backward in its orbit, communication, technology, and travel often encounter unexpected challenges...",
    publishDate: "2025-04-05",
    author: "Orion Celestial",
    category: "Planetary Movements",
    content: "As Mercury appears to move backward in its orbit, communication, technology, and travel often encounter unexpected challenges. This astronomical phenomenon, occurring 3-4 times per year, is known as Mercury Retrograde. While this period has gained a reputation for causing chaos, understanding its energy can help you navigate it more smoothly.\n\nMercury retrograde is actually an excellent time for activities that begin with 're-': review, reconsider, revise, reconnect. It's not ideal for signing new contracts or making major purchases, but it's perfect for reflecting and tying up loose ends from the past.\n\nPractical tips for Mercury retrograde include backing up your digital files, double-checking travel arrangements, clarifying communications, and building extra time into your schedule for unexpected delays. Remember that this transit affects everyone differently based on your natal chart – those with prominent Mercury placements may feel the effects more strongly."
  },
  {
    id: 3,
    title: "The North Node: Your Soul's Purpose in This Lifetime",
    excerpt: "In Vedic astrology, the lunar nodes (Rahu and Ketu) hold special significance in understanding your karmic journey...",
    publishDate: "2025-03-22",
    author: "Maya Cosmic",
    category: "Vedic Astrology",
    content: "In Vedic astrology, the lunar nodes (Rahu and Ketu) hold special significance in understanding your karmic journey. The North Node, or Rahu, represents the direction your soul is moving toward in this lifetime – qualities and experiences you're meant to develop to fulfill your spiritual purpose.\n\nOften, the area of life indicated by your North Node feels uncomfortable at first, as it represents unfamiliar territory your soul is being called to explore. In contrast, the South Node (Ketu) represents qualities and patterns from past lives that come naturally but may not serve your growth in this incarnation.\n\nThe sign and house placement of your North Node offers profound insight into your life's purpose. For example, a North Node in Cancer suggests developing nurturing qualities and emotional intelligence, while a 10th house placement points toward building a meaningful career and public contribution.\n\nBy consciously leaning into the lessons of your North Node, you align with your soul's evolutionary journey and often discover a profound sense of purpose and fulfillment."
  },
  {
    id: 4,
    title: "Creating Your Personal Ritual for the New Moon",
    excerpt: "The new moon represents beginnings, potential, and the planting of seeds. This monthly cosmic reset is the perfect time to...",
    publishDate: "2025-03-15",
    author: "Selene Moonbeam",
    category: "Lunar Practices",
    content: "The new moon represents beginnings, potential, and the planting of seeds. This monthly cosmic reset is the perfect time to set intentions and connect with your inner wisdom. Creating a personal new moon ritual can help you harness this powerful energy and bring more intentionality to your life's journey.\n\nBegin by preparing a sacred space – this could be as simple as clearing a table, lighting a candle, or arranging meaningful objects that represent your goals. Many practitioners find that cleansing your space with sage, palo santo, or incense helps shift the energy.\n\nSpend time in reflection, perhaps journaling about what you wish to release from the previous cycle and what you hope to call in. Writing down specific intentions or creating a vision board can be powerful practices. Consider the astrological sign the new moon falls in, as this adds specific qualities to the energy available.\n\nSome practitioners enjoy incorporating elements like crystals (clear quartz for amplification, moonstone for new beginnings), oracle or tarot cards for guidance, or meditation to connect with their intuition. Remember, the most potent rituals are those that feel authentic and meaningful to you personally."
  }
];

const BlogPage = () => {
  const { toast } = useToast();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogs, setBlogs] = useState(sampleBlogs);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: ''
  });

  const handleDelete = (blogId) => {
    setBlogs(blogs.filter(blog => blog.id !== blogId));
    toast({
      title: "Blog Deleted",
      description: "The blog post has been successfully deleted."
    });
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setEditForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      author: blog.author
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedBlog) {
      setBlogs(blogs.map(blog => 
        blog.id === selectedBlog.id 
          ? { ...blog, ...editForm, publishDate: new Date().toISOString().slice(0, 10) }
          : blog
      ));
    } else {
      const newBlog = {
        id: blogs.length + 1,
        ...editForm,
        publishDate: new Date().toISOString().slice(0, 10)
      };
      setBlogs([...blogs, newBlog]);
    }

    setIsEditing(false);
    setSelectedBlog(null);
    setEditForm({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      author: ''
    });

    toast({
      title: selectedBlog ? "Blog Updated" : "Blog Created",
      description: selectedBlog 
        ? "The blog post has been successfully updated."
        : "A new blog post has been created."
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {isEditing ? (
        <Card className="cosmic-glass bg-white/90 border-cosmic/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-cosmic">
              {selectedBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-cosmic-dark mb-2 font-medium">Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                  className="w-full p-2 rounded bg-white/90 border border-cosmic/20 text-cosmic-dark"
                />
              </div>
              <div>
                <label className="block text-cosmic-dark mb-2 font-medium">Category</label>
                <input
                  type="text"
                  value={editForm.category}
                  onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                  className="w-full p-2 rounded bg-white/90 border border-cosmic/20 text-cosmic-dark"
                />
              </div>
              <div>
                <label className="block text-cosmic-dark mb-2 font-medium">Excerpt</label>
                <textarea
                  value={editForm.excerpt}
                  onChange={(e) => setEditForm({...editForm, excerpt: e.target.value})}
                  className="w-full p-2 rounded bg-white/90 border border-cosmic/20 text-cosmic-dark"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-cosmic-dark mb-2 font-medium">Content</label>
                <textarea
                  value={editForm.content}
                  onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                  className="w-full p-2 rounded bg-white/90 border border-cosmic/20 text-cosmic-dark"
                  rows={10}
                />
              </div>
              <div>
                <label className="block text-cosmic-dark mb-2 font-medium">Author</label>
                <input
                  type="text"
                  value={editForm.author}
                  onChange={(e) => setEditForm({...editForm, author: e.target.value})}
                  className="w-full p-2 rounded bg-white/90 border border-cosmic/20 text-cosmic-dark"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditing(false);
                setSelectedBlog(null);
              }}
              className="border-cosmic/30 text-cosmic hover:bg-cosmic/10"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-cosmic text-white hover:bg-cosmic-accent"
            >
              {selectedBlog ? 'Update' : 'Create'}
            </Button>
          </CardFooter>
        </Card>
      ) : selectedBlog ? (
        <Card className="cosmic-glass bg-white/90 border-cosmic/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-cosmic-accent font-medium text-sm mb-1">{selectedBlog.category}</div>
                <CardTitle className="text-2xl font-bold text-cosmic">{selectedBlog.title}</CardTitle>
                <div className="text-cosmic-dark/80 text-sm mt-2">By {selectedBlog.author} • {selectedBlog.publishDate}</div>
              </div>
              <Button variant="ghost" onClick={() => setSelectedBlog(null)} className="text-cosmic hover:bg-cosmic/10">
                Back to Blog List
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-cosmic-dark space-y-4 whitespace-pre-line font-medium">
              {selectedBlog.content}
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-cosmic">Cosmic Blog</h2>
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-cosmic text-white hover:bg-cosmic-accent"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Blog Post
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <Card key={blog.id} className="cosmic-glass bg-white/90 border-cosmic/20 hover:bg-white/95 transition-colors">
                <CardHeader>
                  <div className="text-cosmic-accent font-medium text-sm">{blog.category}</div>
                  <CardTitle className="text-xl font-bold text-cosmic">{blog.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-cosmic-dark font-medium">{blog.excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-cosmic-dark/70 text-sm">By {blog.author} • {blog.publishDate}</div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-cosmic hover:bg-cosmic/10 hover:text-cosmic-accent"
                      onClick={() => setSelectedBlog(blog)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-cosmic hover:bg-cosmic/10 hover:text-cosmic-accent"
                      onClick={() => handleEdit(blog)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDelete(blog.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogPage;
