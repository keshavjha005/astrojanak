
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Star, Trash, Mail, Send, Archive, Flag, Clock, Tag, Edit } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';

// Sample emails data
const sampleEmails = [
  {
    id: 1,
    sender: "Raj Sharma",
    email: "raj.sharma@example.com",
    subject: "Regarding My Astrological Reading",
    message: "Dear Astral Insights,\n\nI recently had a reading with one of your astrologers and I'm extremely impressed with the accuracy of the predictions. I would like to schedule another session for next week if possible.\n\nBest regards,\nRaj Sharma",
    date: "2025-05-05",
    read: true,
    starred: false,
    label: "client"
  },
  {
    id: 2,
    sender: "Priya Patel",
    email: "priya.patel@example.com",
    subject: "Question About My Birth Chart",
    message: "Hello,\n\nI've been trying to understand my birth chart that I received from your service. Could you explain the significance of Jupiter in my 7th house? I'm especially curious about how this affects my relationships.\n\nThanks,\nPriya",
    date: "2025-05-04",
    read: false,
    starred: true,
    label: "inquiry"
  },
  {
    id: 3,
    sender: "Amar Kumar",
    email: "amar.kumar@example.com",
    subject: "Partnership Proposal",
    message: "Dear Astral Insights Team,\n\nI represent Celestial Gemstones, a company specializing in gemstones aligned with astrological benefits. I believe there could be a beneficial partnership opportunity between our organizations.\n\nWould you be interested in discussing a potential collaboration?\n\nRegards,\nAmar Kumar\nBusiness Development Manager\nCelestial Gemstones",
    date: "2025-05-03",
    read: false,
    starred: false,
    label: "business"
  },
  {
    id: 4,
    sender: "Divya Singh",
    email: "divya.singh@example.com",
    subject: "Thank You for the Accurate Prediction",
    message: "Hi there,\n\nI just wanted to say thank you for the very accurate prediction you made about my career change last month. Everything unfolded exactly as you described, and I'm now in a much better position.\n\nI've recommended your services to several of my friends.\n\nWarm regards,\nDivya Singh",
    date: "2025-05-02",
    read: true,
    starred: true,
    label: "client"
  },
  {
    id: 5,
    sender: "Vikram Joshi",
    email: "vikram.joshi@example.com",
    subject: "Issue with My Account",
    message: "Hello Support Team,\n\nI'm having trouble accessing my account on your website. Whenever I try to log in, it says my password is incorrect, but I'm sure I'm using the right one. I've tried resetting it multiple times without success.\n\nCan you please help me resolve this issue?\n\nThanks,\nVikram Joshi",
    date: "2025-05-01",
    read: true,
    starred: false,
    label: "support"
  }
];

interface EmailType {
  id: number;
  sender: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  starred: boolean;
  label: string;
}

const EmailInbox = () => {
  const { toast } = useToast();
  const [emails, setEmails] = useState<EmailType[]>(sampleEmails);
  const [selectedEmail, setSelectedEmail] = useState<EmailType | null>(null);
  const [isReplyOpen, setIsReplyOpen] = useState<boolean>(false);
  const [replyContent, setReplyContent] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<string>("inbox");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredEmails = emails.filter(email => {
    // Filter by search term
    const matchesSearch = email.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          email.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by current tab
    const matchesTab = 
      (currentTab === "inbox") ||
      (currentTab === "starred" && email.starred) ||
      (currentTab === "sent") ||
      (currentTab === "drafts");
    
    return matchesSearch && matchesTab;
  });
  
  const handleEmailClick = (email: EmailType) => {
    setSelectedEmail(email);
    
    // Mark as read
    if (!email.read) {
      setEmails(emails.map(e => 
        e.id === email.id ? { ...e, read: true } : e
      ));
    }
  };
  
  const handleStarEmail = (id: number) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, starred: !email.starred } : email
    ));
  };
  
  const handleDeleteEmail = (id: number) => {
    setEmails(emails.filter(email => email.id !== id));
    setSelectedEmail(null);
    toast({
      title: "Email Deleted",
      description: "The email has been moved to trash"
    });
  };
  
  const handleReplyClick = () => {
    setIsReplyOpen(true);
  };
  
  const handleSendReply = () => {
    if (!replyContent.trim()) {
      toast({
        title: "Empty Reply",
        description: "Please enter a message before sending",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Reply Sent",
      description: `Your reply to ${selectedEmail?.sender} has been sent`
    });
    
    setIsReplyOpen(false);
    setReplyContent("");
  };
  
  const formatEmailDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const getLabelColor = (label: string) => {
    switch(label) {
      case "client": return "bg-blue-500/20 text-blue-300";
      case "inquiry": return "bg-amber-500/20 text-amber-300";
      case "business": return "bg-green-500/20 text-green-300";
      case "support": return "bg-red-500/20 text-red-300";
      default: return "bg-gray-500/20 text-gray-300";
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 animate-fade-in">
      <Card className="cosmic-glass dashboard-content">
        <CardHeader>
          <CardTitle className="text-cosmic-light text-2xl">Email Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-cosmic-light/70" />
                <Input 
                  placeholder="Search emails..." 
                  className="pl-9 bg-cosmic-dark/30 border-cosmic-light/20 text-cosmic-light"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <Button variant="outline" className="border-cosmic-light/20 text-cosmic-light">
                <Search className="mr-2 h-4 w-4" />
                Advanced Search
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-1">
                <div className="space-y-4">
                  <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
                    <TabsList className="bg-cosmic-dark/30 w-full grid grid-cols-2 md:flex md:flex-col">
                      <TabsTrigger
                        value="inbox"
                        className="data-[state=active]:bg-cosmic-accent/20 data-[state=active]:text-cosmic-light text-cosmic-light"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Inbox
                        <Badge className="ml-auto bg-cosmic-light text-cosmic-dark">5</Badge>
                      </TabsTrigger>
                      <TabsTrigger
                        value="starred"
                        className="data-[state=active]:bg-cosmic-accent/20 data-[state=active]:text-cosmic-light text-cosmic-light"
                      >
                        <Star className="mr-2 h-4 w-4" />
                        Starred
                        <Badge className="ml-auto bg-cosmic-light text-cosmic-dark">2</Badge>
                      </TabsTrigger>
                      <TabsTrigger
                        value="sent"
                        className="data-[state=active]:bg-cosmic-accent/20 data-[state=active]:text-cosmic-light text-cosmic-light"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Sent
                      </TabsTrigger>
                      <TabsTrigger
                        value="drafts"
                        className="data-[state=active]:bg-cosmic-accent/20 data-[state=active]:text-cosmic-light text-cosmic-light"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Drafts
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-cosmic-light">Labels</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30">
                        Client
                      </Badge>
                      <Badge className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30">
                        Inquiry
                      </Badge>
                      <Badge className="bg-green-500/20 text-green-300 hover:bg-green-500/30">
                        Business
                      </Badge>
                      <Badge className="bg-red-500/20 text-red-300 hover:bg-red-500/30">
                        Support
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-3 bg-cosmic-dark/40 border border-cosmic-light/10 rounded-lg overflow-hidden">
                {selectedEmail ? (
                  <div className="h-[600px] flex flex-col">
                    <div className="bg-cosmic-dark/60 border-b border-cosmic-light/10 px-4 py-3 flex justify-between items-center">
                      <h3 className="text-cosmic-light font-medium">{selectedEmail.subject}</h3>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-cosmic-light hover:text-cosmic-accent"
                          onClick={handleReplyClick}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-cosmic-light hover:text-cosmic-accent"
                          onClick={() => handleStarEmail(selectedEmail.id)}
                        >
                          <Star className={`h-4 w-4 ${selectedEmail.starred ? 'fill-cosmic-accent text-cosmic-accent' : ''}`} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-cosmic-light hover:text-destructive"
                          onClick={() => handleDeleteEmail(selectedEmail.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-4 flex items-start space-x-4">
                      <Avatar className="h-10 w-10 bg-cosmic-accent/20 border border-cosmic-light/30">
                        <AvatarFallback className="text-cosmic-light">
                          {selectedEmail.sender.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-cosmic-light">{selectedEmail.sender}</p>
                            <p className="text-sm text-cosmic-light/70">{selectedEmail.email}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-cosmic-light/70">
                              {formatEmailDate(selectedEmail.date)}
                            </span>
                            <Badge className={`${getLabelColor(selectedEmail.label)}`}>
                              {selectedEmail.label.charAt(0).toUpperCase() + selectedEmail.label.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="mt-4 text-cosmic-light whitespace-pre-wrap">
                          {selectedEmail.message}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-auto p-4 border-t border-cosmic-light/10">
                      <Button 
                        onClick={handleReplyClick}
                        className="bg-cosmic-accent text-cosmic-light hover:bg-cosmic-accent/80"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Reply
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="h-[600px] overflow-y-auto divide-y divide-cosmic-light/10">
                    {filteredEmails.length > 0 ? (
                      filteredEmails.map((email, index) => (
                        <div 
                          key={email.id} 
                          className={`p-4 hover:bg-cosmic-dark/60 cursor-pointer transition-colors duration-200 mail-item ${!email.read ? 'bg-cosmic-dark/40' : ''}`}
                          onClick={() => handleEmailClick(email)}
                        >
                          <div className="flex items-center space-x-3">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              className="h-8 w-8 text-cosmic-light hover:text-cosmic-accent"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStarEmail(email.id);
                              }}
                            >
                              <Star className={`h-4 w-4 ${email.starred ? 'fill-cosmic-accent text-cosmic-accent' : ''}`} />
                            </Button>
                            
                            <Avatar className="h-8 w-8 bg-cosmic-accent/20 border border-cosmic-light/30 animate-pulse">
                              <AvatarFallback className="text-cosmic-light">
                                {email.sender.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            
                            <div className="flex-grow">
                              <div className="flex justify-between">
                                <p className={`font-medium ${!email.read ? 'text-cosmic-light' : 'text-cosmic-light/80'}`}>
                                  {email.sender}
                                </p>
                                <p className="text-sm text-cosmic-light/70">
                                  {formatEmailDate(email.date)}
                                </p>
                              </div>
                              <p className={`text-sm truncate ${!email.read ? 'text-cosmic-light' : 'text-cosmic-light/80'}`}>
                                {email.subject}
                              </p>
                              <p className="text-xs truncate text-cosmic-light/60 mt-1">
                                {email.message.split('\n')[0]}
                              </p>
                            </div>
                            
                            <Badge className={`${getLabelColor(email.label)} ml-2`}>
                              {email.label.charAt(0).toUpperCase() + email.label.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-cosmic-light/70">No emails found</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
        <DialogContent className="cosmic-glass text-cosmic-light max-w-3xl">
          <DialogHeader>
            <DialogTitle>Reply to Email</DialogTitle>
            <DialogDescription className="text-cosmic-light/70">
              {selectedEmail && `Responding to ${selectedEmail.sender} (${selectedEmail.email})`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject" className="text-cosmic-light">Subject</Label>
              <Input 
                id="subject"
                value={selectedEmail ? `Re: ${selectedEmail.subject}` : ""}
                readOnly
                className="bg-cosmic-dark/30 border-cosmic-light/20 text-cosmic-light"
              />
            </div>
            
            <div>
              <Label htmlFor="message" className="text-cosmic-light">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[200px] bg-cosmic-dark/30 border-cosmic-light/20 text-cosmic-light"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsReplyOpen(false)}
              className="border-cosmic-light/20 text-cosmic-light"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSendReply}
              className="bg-cosmic-accent text-cosmic-light hover:bg-cosmic-accent/80"
            >
              <Send className="mr-2 h-4 w-4" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailInbox;
