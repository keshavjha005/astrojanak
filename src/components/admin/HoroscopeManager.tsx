
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileEdit, Eye, Trash2, Plus, Save, ArrowUpDown, Calendar, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const zodiacSigns = [
  { id: 1, name: "Aries", symbol: "♈", element: "Fire", date: "Mar 21 - Apr 19" },
  { id: 2, name: "Taurus", symbol: "♉", element: "Earth", date: "Apr 20 - May 20" },
  { id: 3, name: "Gemini", symbol: "♊", element: "Air", date: "May 21 - Jun 20" },
  { id: 4, name: "Cancer", symbol: "♋", element: "Water", date: "Jun 21 - Jul 22" },
  { id: 5, name: "Leo", symbol: "♌", element: "Fire", date: "Jul 23 - Aug 22" },
  { id: 6, name: "Virgo", symbol: "♍", element: "Earth", date: "Aug 23 - Sep 22" },
  { id: 7, name: "Libra", symbol: "♎", element: "Air", date: "Sep 23 - Oct 22" },
  { id: 8, name: "Scorpio", symbol: "♏", element: "Water", date: "Oct 23 - Nov 21" },
  { id: 9, name: "Sagittarius", symbol: "♐", element: "Fire", date: "Nov 22 - Dec 21" },
  { id: 10, name: "Capricorn", symbol: "♑", element: "Earth", date: "Dec 22 - Jan 19" },
  { id: 11, name: "Aquarius", symbol: "♒", element: "Air", date: "Jan 20 - Feb 18" },
  { id: 12, name: "Pisces", symbol: "♓", element: "Water", date: "Feb 19 - Mar 20" },
];

const sampleHoroscopes = [
  { id: 1, sign: "Aries", period: "Daily", date: "2025-04-21", content: "Today is a great day for new beginnings. Your energy is high and you'll find success in starting new projects." },
  { id: 2, sign: "Taurus", period: "Daily", date: "2025-04-21", content: "Focus on financial stability today. A surprising opportunity may arise that could boost your income." },
  { id: 3, sign: "Gemini", period: "Weekly", date: "2025-04-21", content: "Communication is your strong suit this week. Use your gift of gab to solve any misunderstandings." },
];

const HoroscopeManager = () => {
  const { toast } = useToast();
  const [horoscopes, setHoroscopes] = useState(sampleHoroscopes);
  const [selectedZodiac, setSelectedZodiac] = useState(null);
  const [selectedHoroscope, setSelectedHoroscope] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [sortColumn, setSortColumn] = useState("sign");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterPeriod, setFilterPeriod] = useState("all");
  
  const [editForm, setEditForm] = useState({
    sign: "",
    period: "Daily",
    date: "",
    content: ""
  });

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedHoroscopes = [...horoscopes]
    .filter(h => filterPeriod === "all" || h.period === filterPeriod)
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    });

  const handleZodiacSelect = (zodiac) => {
    setSelectedZodiac(zodiac);
    setEditForm({
      sign: zodiac.name,
      period: "Daily",
      date: new Date().toISOString().slice(0, 10),
      content: ""
    });
    setIsEditing(true);
  };

  const handleEditHoroscope = (horoscope) => {
    setSelectedHoroscope(horoscope);
    setEditForm({
      sign: horoscope.sign,
      period: horoscope.period,
      date: horoscope.date,
      content: horoscope.content
    });
    setIsEditing(true);
  };

  const handleDeleteHoroscope = (id) => {
    setHoroscopes(horoscopes.filter(h => h.id !== id));
    toast({
      title: "Horoscope Deleted",
      description: "The horoscope has been removed",
      variant: "destructive"
    });
  };

  const handleViewHoroscope = (horoscope) => {
    setSelectedHoroscope(horoscope);
    setIsEditing(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveHoroscope = () => {
    if (!editForm.sign || !editForm.period || !editForm.date || !editForm.content) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    if (selectedHoroscope) {
      // Update existing horoscope
      const updatedHoroscopes = horoscopes.map(h => 
        h.id === selectedHoroscope.id ? { ...h, ...editForm } : h
      );
      setHoroscopes(updatedHoroscopes);
      toast({
        title: "Horoscope Updated",
        description: `The ${editForm.period.toLowerCase()} horoscope for ${editForm.sign} has been updated.`
      });
    } else {
      // Create new horoscope
      const newHoroscope = {
        id: horoscopes.length + 1,
        ...editForm
      };
      setHoroscopes([...horoscopes, newHoroscope]);
      toast({
        title: "Horoscope Created",
        description: `A new ${editForm.period.toLowerCase()} horoscope for ${editForm.sign} has been created.`
      });
    }

    setSelectedHoroscope(null);
    setSelectedZodiac(null);
    setIsEditing(false);
  };
  
  return (
    <div className="container mx-auto px-4 py-6 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-cosmic-light">Horoscope Manager</h1>
        <Button 
          className="bg-cosmic-accent text-cosmic-light hover:bg-cosmic-accent/80"
          onClick={() => {
            setSelectedHoroscope(null);
            setEditForm({
              sign: "",
              period: "Daily",
              date: new Date().toISOString().slice(0, 10),
              content: ""
            });
            setIsEditing(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create New Horoscope
        </Button>
      </div>

      <Tabs defaultValue="manage" className="space-y-4">
        <div className="cosmic-glass p-1.5 rounded-lg inline-block">
          <TabsList className="bg-cosmic-dark/30">
            <TabsTrigger value="manage" className="data-[state=active]:bg-cosmic-accent/20">
              <Star className="mr-2 h-4 w-4" />
              Manage Horoscopes
            </TabsTrigger>
            <TabsTrigger value="zodiac" className="data-[state=active]:bg-cosmic-accent/20">
              <Calendar className="mr-2 h-4 w-4" />
              Zodiac Signs
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="manage" className="space-y-4">
          <Card className="cosmic-glass">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-cosmic-light">Horoscope List</CardTitle>
                <div className="flex items-center gap-2">
                  <select 
                    className="bg-cosmic-dark/30 border-cosmic-light/20 text-cosmic-light rounded-md p-1 text-xs"
                    value={filterPeriod}
                    onChange={(e) => setFilterPeriod(e.target.value)}
                  >
                    <option value="all">All Periods</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                  <Input 
                    placeholder="Search horoscopes..." 
                    className="w-64 h-8 bg-cosmic-dark/30 border-cosmic-light/20 text-cosmic-light text-xs"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-cosmic-dark/20 border-cosmic-light/10">
                    <TableHead 
                      className="text-cosmic-light/70 cursor-pointer"
                      onClick={() => handleSort("sign")}
                    >
                      <div className="flex items-center">
                        Sign
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-cosmic-light/70 cursor-pointer"
                      onClick={() => handleSort("period")}
                    >
                      <div className="flex items-center">
                        Period
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead 
                      className="text-cosmic-light/70 cursor-pointer"
                      onClick={() => handleSort("date")}
                    >
                      <div className="flex items-center">
                        Date
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead className="text-cosmic-light/70">Content Preview</TableHead>
                    <TableHead className="text-cosmic-light/70">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedHoroscopes.map((horoscope) => (
                    <TableRow key={horoscope.id} className="hover:bg-cosmic-dark/20 border-cosmic-light/10 group">
                      <TableCell className="text-cosmic-light">
                        <div className="flex items-center space-x-2">
                          <span>{zodiacSigns.find(z => z.name === horoscope.sign)?.symbol || ""}</span>
                          <span>{horoscope.sign}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-cosmic-light">{horoscope.period}</TableCell>
                      <TableCell className="text-cosmic-light">{horoscope.date}</TableCell>
                      <TableCell className="text-cosmic-light max-w-[300px] truncate">
                        {horoscope.content}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-cosmic-light hover:text-cosmic-accent" onClick={() => handleViewHoroscope(horoscope)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-cosmic-light hover:text-cosmic-accent" onClick={() => handleEditHoroscope(horoscope)}>
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-cosmic-light hover:text-destructive" onClick={() => handleDeleteHoroscope(horoscope.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {sortedHoroscopes.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-cosmic-light/70">
                        No horoscopes found. Create a new one to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zodiac" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {zodiacSigns.map((zodiac) => (
              <Card 
                key={zodiac.id}
                className="cosmic-glass hover:shadow-cosmic transition-all duration-300 cursor-pointer group"
                onClick={() => handleZodiacSelect(zodiac)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-cosmic-light flex items-center">
                    <span className="text-2xl mr-2 text-cosmic-accent">{zodiac.symbol}</span>
                    {zodiac.name}
                  </CardTitle>
                  <CardDescription className="text-cosmic-light/70">
                    {zodiac.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-cosmic-light/90">
                    <div><span className="font-semibold">Element:</span> {zodiac.element}</div>
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-cosmic-accent text-sm">Click to create horoscope</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Horoscope Edit/View Dialog */}
      <Dialog open={selectedHoroscope !== null || (selectedZodiac !== null && isEditing)} onOpenChange={(open) => {
        if (!open) {
          setSelectedHoroscope(null);
          setSelectedZodiac(null);
          setIsEditing(false);
        }
      }}>
        <DialogContent className="cosmic-glass text-cosmic-light">
          <DialogHeader>
            <DialogTitle className="text-cosmic-accent">
              {isEditing ? (selectedHoroscope ? "Edit Horoscope" : "Create New Horoscope") : "View Horoscope"}
            </DialogTitle>
            <DialogDescription className="text-cosmic-light/70">
              {isEditing ? "Fill in the details below to save this horoscope" : `Viewing ${selectedHoroscope?.sign} ${selectedHoroscope?.period.toLowerCase()} horoscope`}
            </DialogDescription>
          </DialogHeader>
          
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sign" className="text-cosmic-light">Zodiac Sign</Label>
                  {selectedZodiac ? (
                    <Input 
                      id="sign"
                      name="sign"
                      className="bg-cosmic-dark/30 border-cosmic-light/20 text-cosmic-light"
                      value={editForm.sign}
                      disabled
                    />
                  ) : (
                    <select 
                      id="sign"
                      name="sign"
                      className="w-full h-10 rounded-md border border-cosmic-light/20 bg-cosmic-dark/30 px-3 py-2 text-cosmic-light"
                      value={editForm.sign}
                      onChange={handleFormChange}
                    >
                      <option value="">Select a sign</option>
                      {zodiacSigns.map(z => (
                        <option key={z.id} value={z.name}>{z.name}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period" className="text-cosmic-light">Period</Label>
                  <select 
                    id="period"
                    name="period"
                    className="w-full h-10 rounded-md border border-cosmic-light/20 bg-cosmic-dark/30 px-3 py-2 text-cosmic-light"
                    value={editForm.period}
                    onChange={handleFormChange}
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-cosmic-light">Date</Label>
                  <Input 
                    id="date"
                    name="date"
                    type="date"
                    className="bg-cosmic-dark/30 border-cosmic-light/20 text-cosmic-light"
                    value={editForm.date}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content" className="text-cosmic-light">Horoscope Content</Label>
                <Textarea 
                  id="content"
                  name="content"
                  className="min-h-[150px] bg-cosmic-dark/30 border-cosmic-light/20 text-cosmic-light"
                  placeholder="Enter the horoscope prediction here..."
                  value={editForm.content}
                  onChange={handleFormChange}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <span className="text-cosmic-light/70">Zodiac Sign:</span>
                  <div className="text-cosmic-light flex items-center mt-1">
                    <span className="text-xl mr-2 text-cosmic-accent">
                      {zodiacSigns.find(z => z.name === selectedHoroscope?.sign)?.symbol || ""}
                    </span>
                    <span className="font-medium">{selectedHoroscope?.sign}</span>
                  </div>
                </div>
                <div>
                  <span className="text-cosmic-light/70">Period:</span>
                  <div className="text-cosmic-light mt-1">{selectedHoroscope?.period}</div>
                </div>
                <div>
                  <span className="text-cosmic-light/70">Date:</span>
                  <div className="text-cosmic-light mt-1">{selectedHoroscope?.date}</div>
                </div>
                <div>
                  <span className="text-cosmic-light/70">Content:</span>
                  <div className="text-cosmic-light mt-1 p-4 bg-cosmic-dark/20 rounded-md">
                    {selectedHoroscope?.content}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            {isEditing ? (
              <Button 
                className="bg-cosmic-accent text-cosmic-light hover:bg-cosmic-accent/80"
                onClick={handleSaveHoroscope}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Horoscope
              </Button>
            ) : (
              <Button 
                className="bg-cosmic-accent text-cosmic-light hover:bg-cosmic-accent/80"
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

export default HoroscopeManager;
