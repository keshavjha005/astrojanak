
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Phone, MapPin } from 'lucide-react';

// Sample contact data
const contactList = [
  { 
    id: 1, 
    name: "Customer Support", 
    email: "support@astralinsights.com", 
    phone: "+1 (555) 123-4567",
    department: "Support",
    location: "San Francisco, CA"
  },
  { 
    id: 2, 
    name: "Astrological Readings", 
    email: "readings@astralinsights.com", 
    phone: "+1 (555) 234-5678",
    department: "Services",
    location: "New York, NY"
  },
  { 
    id: 3, 
    name: "Horoscope Inquiries", 
    email: "horoscopes@astralinsights.com", 
    phone: "+1 (555) 345-6789",
    department: "Content",
    location: "Los Angeles, CA"
  },
  { 
    id: 4, 
    name: "Technical Support", 
    email: "tech@astralinsights.com", 
    phone: "+1 (555) 456-7890",
    department: "IT",
    location: "Austin, TX"
  },
  { 
    id: 5, 
    name: "Business Relations", 
    email: "business@astralinsights.com", 
    phone: "+1 (555) 567-8901",
    department: "Partnership",
    location: "Chicago, IL"
  },
];

const ContactPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="cosmic-glass bg-cosmic-dark/40 border-cosmic-light/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-cosmic-light">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-cosmic-light/10 hover:bg-cosmic-dark/30">
                <TableHead className="text-cosmic-light/80">Name</TableHead>
                <TableHead className="text-cosmic-light/80">Department</TableHead>
                <TableHead className="text-cosmic-light/80">Email</TableHead>
                <TableHead className="text-cosmic-light/80">Phone</TableHead>
                <TableHead className="text-cosmic-light/80">Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contactList.map((contact) => (
                <TableRow key={contact.id} className="border-cosmic-light/10 hover:bg-cosmic-dark/30">
                  <TableCell className="font-medium text-cosmic-light">{contact.name}</TableCell>
                  <TableCell className="text-cosmic-light">{contact.department}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-cosmic-light">
                      <Mail className="h-4 w-4 mr-2 text-cosmic-accent" />
                      {contact.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-cosmic-light">
                      <Phone className="h-4 w-4 mr-2 text-cosmic-accent" />
                      {contact.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-cosmic-light">
                      <MapPin className="h-4 w-4 mr-2 text-cosmic-accent" />
                      {contact.location}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card className="cosmic-glass bg-cosmic-dark/40 border-cosmic-light/10">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-cosmic-light">Main Office</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center text-cosmic-light">
            <MapPin className="h-5 w-5 mr-3 text-cosmic-accent" />
            <p>1234 Starlight Avenue, San Francisco, CA 94103, USA</p>
          </div>
          <div className="flex items-center text-cosmic-light">
            <Phone className="h-5 w-5 mr-3 text-cosmic-accent" />
            <p>+1 (555) 789-0123</p>
          </div>
          <div className="flex items-center text-cosmic-light">
            <Mail className="h-5 w-5 mr-3 text-cosmic-accent" />
            <p>info@astralinsights.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;
