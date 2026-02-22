
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare, Mail, Download, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const sampleKundlis = [
  { 
    id: 1, 
    name: "Raj Sharma", 
    email: "raj.sharma@example.com",
    phone: "+91 98765 43210",
    city: "Mumbai",
    paymentStatus: "paid",
    status: "completed", 
    date: "2025-04-01" 
  },
  { 
    id: 2, 
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 87654 32109",
    city: "Delhi",
    paymentStatus: "pending",
    status: "completed", 
    date: "2025-03-28" 
  },
  { 
    id: 3, 
    name: "Amit Kumar",
    email: "amit.kumar@example.com",
    phone: "+91 76543 21098",
    city: "Bangalore",
    paymentStatus: "paid",
    status: "pending", 
    date: "2025-04-05" 
  },
  { 
    id: 4, 
    name: "Maya Singh",
    email: "maya.singh@example.com",
    phone: "+91 65432 10987",
    city: "Kolkata",
    paymentStatus: "failed",
    status: "in-progress", 
    date: "2025-04-07" 
  },
  { 
    id: 5, 
    name: "Vikram Joshi",
    email: "vikram.joshi@example.com",
    phone: "+91 54321 09876",
    city: "Chennai",
    paymentStatus: "paid",
    status: "completed", 
    date: "2025-03-20" 
  },
];

const KundliManager = () => {
  const { toast } = useToast();
  const [viewKundli, setViewKundli] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewKundli = (kundli) => {
    setViewKundli(kundli);
    setIsDialogOpen(true);
  };

  const handleShare = (type, kundli) => {
    switch (type) {
      case 'whatsapp':
        const whatsappText = `Kundli details for ${kundli.name}:\nEmail: ${kundli.email}\nPhone: ${kundli.phone}\nLocation: ${kundli.location}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(whatsappText)}`, '_blank');
        break;
      case 'mail':
        const mailSubject = `Kundli Report for ${kundli.name}`;
        const mailBody = `Kundli details:\n\nName: ${kundli.name}\nEmail: ${kundli.email}\nPhone: ${kundli.phone}\nLocation: ${kundli.location}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
        break;
      case 'download':
        toast({
          title: "Download Started",
          description: `Downloading Kundli for ${kundli.name}`,
        });
        break;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="cosmic-glass dashboard-content">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-cosmic-light">Kundli Manager</CardTitle>
          <CardDescription className="text-cosmic-light/80">
            Manage and share kundli readings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-cosmic-light/10 hover:bg-cosmic-dark/20">
                <TableHead className="text-cosmic-light/80">Name</TableHead>
                <TableHead className="text-cosmic-light/80">Email</TableHead>
                <TableHead className="text-cosmic-light/80">Phone</TableHead>
                <TableHead className="text-cosmic-light/80">City</TableHead>
                <TableHead className="text-cosmic-light/80">Payment</TableHead>
                <TableHead className="text-cosmic-light/80">Status</TableHead>
                <TableHead className="text-cosmic-light/80">Date</TableHead>
                <TableHead className="text-cosmic-light/80">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleKundlis.map((kundli) => (
                <TableRow key={kundli.id} className="border-cosmic-light/10 hover:bg-cosmic-dark/20">
                  <TableCell className="font-medium text-cosmic-light">{kundli.name}</TableCell>
                  <TableCell className="text-cosmic-light">{kundli.email}</TableCell>
                  <TableCell className="text-cosmic-light">{kundli.phone}</TableCell>
                  <TableCell className="text-cosmic-light">{kundli.city}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      kundli.paymentStatus === "paid" ? "bg-green-500/20 text-green-300" : 
                      kundli.paymentStatus === "pending" ? "bg-amber-500/20 text-amber-300" :
                      "bg-red-500/20 text-red-300"
                    }`}>
                      {kundli.paymentStatus.charAt(0).toUpperCase() + kundli.paymentStatus.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      kundli.status === "completed" ? "bg-green-500/20 text-green-300" : 
                      kundli.status === "in-progress" ? "bg-blue-500/20 text-blue-300" :
                      "bg-amber-500/20 text-amber-300"
                    }`}>
                      {kundli.status.charAt(0).toUpperCase() + kundli.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-cosmic-light">{kundli.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 text-cosmic-light hover:text-cosmic-accent"
                        onClick={() => handleViewKundli(kundli)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 text-cosmic-light hover:text-cosmic-accent"
                        onClick={() => handleShare('whatsapp', kundli)}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 text-cosmic-light hover:text-cosmic-accent"
                        onClick={() => handleShare('mail', kundli)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-8 w-8 p-0 text-cosmic-light hover:text-cosmic-accent"
                        onClick={() => handleShare('download', kundli)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {viewKundli && (
          <DialogContent className="cosmic-glass bg-cosmic-dark/40 max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-cosmic-light">Kundli Details</DialogTitle>
              <DialogDescription className="text-cosmic-light/80">
                Viewing kundli information for {viewKundli.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-cosmic-light/70">Name</h3>
                  <p className="text-cosmic-light">{viewKundli.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-cosmic-light/70">Email</h3>
                  <p className="text-cosmic-light">{viewKundli.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-cosmic-light/70">Phone</h3>
                  <p className="text-cosmic-light">{viewKundli.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-cosmic-light/70">City</h3>
                  <p className="text-cosmic-light">{viewKundli.city}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-cosmic-light/70">Payment Status</h3>
                  <p className="text-cosmic-light">{viewKundli.paymentStatus}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="w-48 h-48 relative">
                  <div className="absolute inset-0 border-2 border-cosmic-light/30 rotate-45"></div>
                  <div className="absolute inset-0 border-2 border-cosmic-light/30"></div>
                  <div className="absolute top-1/2 left-0 w-full border-t border-cosmic-light/30"></div>
                  <div className="absolute top-0 left-1/2 h-full border-l border-cosmic-light/30"></div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <Star className="h-12 w-12 text-cosmic-accent/60" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium text-cosmic-light/70 mb-2">Chart Interpretation</h3>
              <p className="text-cosmic-light/90">
                The planetary positions at the time of birth indicate strong influences from Jupiter and Venus, 
                suggesting prosperity and harmony in relationships. The ascendant in {viewKundli.name.split(' ')[0]}'s chart 
                points to natural leadership abilities and creative talents.
              </p>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default KundliManager;
