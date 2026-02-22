import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Search, Calendar, Package, MoreHorizontal, FileEdit, Printer } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample orders data
const sampleOrders = [
  { 
    id: "ORD-1234", 
    customer: "John Doe", 
    email: "john@example.com", 
    date: "2025-04-20", 
    status: "delivered", 
    total: 129.99,
    items: [
      { id: 1, name: "Astrology Book", price: 49.99, quantity: 1 },
      { id: 2, name: "Crystal Set", price: 79.99, quantity: 1 }
    ],
    address: "123 Main St, Anytown, USA",
    payment: "Credit Card"
  },
  { 
    id: "ORD-2345", 
    customer: "Jane Smith", 
    email: "jane@example.com", 
    date: "2025-04-19", 
    status: "processing", 
    total: 59.99,
    items: [
      { id: 3, name: "Tarot Deck", price: 29.99, quantity: 2 }
    ],
    address: "456 Oak Ave, Somewhere, USA",
    payment: "PayPal"
  },
  { 
    id: "ORD-3456", 
    customer: "Mike Johnson", 
    email: "mike@example.com", 
    date: "2025-04-18", 
    status: "pending", 
    total: 149.99,
    items: [
      { id: 4, name: "Astrological Chart Reading", price: 149.99, quantity: 1 }
    ],
    address: "789 Pine Rd, Elsewhere, USA",
    payment: "Credit Card"
  },
  { 
    id: "ORD-4567", 
    customer: "Sarah Wilson", 
    email: "sarah@example.com", 
    date: "2025-04-17", 
    status: "cancelled", 
    total: 89.99,
    items: [
      { id: 5, name: "Zodiac Pendant", price: 89.99, quantity: 1 }
    ],
    address: "101 Elm St, Nowhere, USA",
    payment: "Debit Card"
  }
];

const OrderManager = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentTab, setCurrentTab] = useState("all");
  const [editStatus, setEditStatus] = useState("");
  
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setEditStatus(order.status);
    setIsDialogOpen(true);
  };

  const handleStatusChange = (value) => {
    setEditStatus(value);
  };

  const handleUpdateOrderStatus = () => {
    if (selectedOrder) {
      const updatedOrders = orders.map(o => 
        o.id === selectedOrder.id ? { ...o, status: editStatus } : o
      );
      setOrders(updatedOrders);
      toast({
        title: "Order Status Updated",
        description: `Order ${selectedOrder.id} status changed to ${editStatus}`
      });
      setIsDialogOpen(false);
    }
  };

  const handlePrintInvoice = (orderId) => {
    toast({
      title: "Printing Invoice",
      description: `Invoice for order ${orderId} sent to printer`
    });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "delivered": return "bg-green-500/20 text-green-300";
      case "processing": return "bg-blue-500/20 text-blue-300";
      case "pending": return "bg-amber-500/20 text-amber-300";
      case "cancelled": return "bg-red-500/20 text-red-300";
      default: return "bg-gray-500/20 text-gray-300";
    }
  };

  const filteredOrders = orders.filter(order => {
    // Filter by search term
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by status
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    
    // Filter by tab
    const matchesTab = currentTab === "all" || 
                      (currentTab === "recent" && new Date(order.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
                      (currentTab === "processing" && order.status === "processing");
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-cosmic-light">Order Management</h1>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4" onValueChange={setCurrentTab}>
        <div className="cosmic-glass p-1.5 rounded-lg inline-block">
          <TabsList className="bg-cosmic-dark/30">
            <TabsTrigger 
              value="all" 
              className="text-cosmic-light data-[state=active]:bg-cosmic-accent/20 data-[state=active]:text-cosmic-light"
            >
              All Orders
            </TabsTrigger>
            <TabsTrigger 
              value="recent" 
              className="text-cosmic-light data-[state=active]:bg-cosmic-accent/20 data-[state=active]:text-cosmic-light"
            >
              Recent Orders
            </TabsTrigger>
            <TabsTrigger 
              value="processing" 
              className="text-cosmic-light data-[state=active]:bg-cosmic-accent/20 data-[state=active]:text-cosmic-light"
            >
              Processing
            </TabsTrigger>
          </TabsList>
        </div>
      
        <TabsContent value={currentTab}>
          <Card className="cosmic-glass dashboard-content">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-cosmic-light">Orders</CardTitle>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="bg-cosmic-dark/30 border-cosmic-light/20 text-cosmic-light w-32 h-8">
                      <SelectValue placeholder="Filter status" className="text-cosmic-light" />
                    </SelectTrigger>
                    <SelectContent className="bg-cosmic-dark/80 border-cosmic-light/20">
                      <SelectItem value="all" className="text-cosmic-light">All Status</SelectItem>
                      <SelectItem value="pending" className="text-cosmic-light">Pending</SelectItem>
                      <SelectItem value="processing" className="text-cosmic-light">Processing</SelectItem>
                      <SelectItem value="delivered" className="text-cosmic-light">Delivered</SelectItem>
                      <SelectItem value="cancelled" className="text-cosmic-light">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1.5 h-4 w-4 text-cosmic-light/70" />
                    <Input 
                      placeholder="Search orders..." 
                      className="pl-9 w-full h-8 bg-cosmic-dark/30 border-cosmic-light/20 text-cosmic-light"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-cosmic-dark/20 border-cosmic-light/10">
                    <TableHead className="text-cosmic-light/70">Order ID</TableHead>
                    <TableHead className="text-cosmic-light/70">Customer</TableHead>
                    <TableHead className="text-cosmic-light/70">Date</TableHead>
                    <TableHead className="text-cosmic-light/70">Status</TableHead>
                    <TableHead className="text-cosmic-light/70 text-right">Total</TableHead>
                    <TableHead className="text-cosmic-light/70">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <TableRow key={order.id} className="hover:bg-cosmic-dark/20 border-cosmic-light/10 group">
                        <TableCell className="text-cosmic-light font-medium">{order.id}</TableCell>
                        <TableCell className="text-cosmic-light">
                          <div>
                            <div>{order.customer}</div>
                            <div className="text-cosmic-light/70 text-xs">{order.email}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-cosmic-light">{order.date}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-cosmic-light text-right">${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-cosmic-light hover:text-cosmic-accent" onClick={() => handleViewOrder(order)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-cosmic-light hover:text-cosmic-accent" onClick={() => handlePrintInvoice(order.id)}>
                              <Printer className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-cosmic-light/70">
                        No orders found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Order View/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="cosmic-glass text-cosmic-light max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-cosmic-accent">
              Order Details
            </DialogTitle>
            <DialogDescription className="text-cosmic-light/70">
              Order {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-cosmic-light font-semibold mb-2 flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      Order Information
                    </h3>
                    <div className="bg-cosmic-dark/30 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-cosmic-light/70">ID:</span>
                        <span className="text-cosmic-light font-medium">{selectedOrder.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cosmic-light/70">Date:</span>
                        <span className="text-cosmic-light">{selectedOrder.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cosmic-light/70">Payment Method:</span>
                        <span className="text-cosmic-light">{selectedOrder.payment}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-cosmic-light/70">Status:</span>
                        <div>
                          <Select value={editStatus} onValueChange={handleStatusChange}>
                            <SelectTrigger className="bg-cosmic-dark/50 border-cosmic-light/20 text-cosmic-light w-32 h-8">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-cosmic-light font-semibold mb-2 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Customer Information
                    </h3>
                    <div className="bg-cosmic-dark/30 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-cosmic-light/70">Name:</span>
                        <span className="text-cosmic-light">{selectedOrder.customer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cosmic-light/70">Email:</span>
                        <span className="text-cosmic-light">{selectedOrder.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-cosmic-light/70">Shipping Address:</span>
                        <span className="text-cosmic-light text-right max-w-[200px]">{selectedOrder.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-cosmic-light font-semibold mb-2">Order Items</h3>
                  <div className="bg-cosmic-dark/30 rounded-lg p-4">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-cosmic-dark/20 border-cosmic-light/10">
                          <TableHead className="text-cosmic-light/70">Item</TableHead>
                          <TableHead className="text-cosmic-light/70 text-right">Price</TableHead>
                          <TableHead className="text-cosmic-light/70 text-center">Qty</TableHead>
                          <TableHead className="text-cosmic-light/70 text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.items.map((item) => (
                          <TableRow key={item.id} className="hover:bg-cosmic-dark/20 border-cosmic-light/10">
                            <TableCell className="text-cosmic-light">{item.name}</TableCell>
                            <TableCell className="text-cosmic-light text-right">${item.price.toFixed(2)}</TableCell>
                            <TableCell className="text-cosmic-light text-center">{item.quantity}</TableCell>
                            <TableCell className="text-cosmic-light text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                          </TableRow>
                        ))}
                        <TableRow className="bg-cosmic-dark/50 font-medium">
                          <TableCell colSpan={3} className="text-cosmic-light text-right">Total:</TableCell>
                          <TableCell className="text-cosmic-light text-right">${selectedOrder.total.toFixed(2)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline"
                  className="border-cosmic-light/20 text-cosmic-light hover:bg-cosmic-accent/20"
                  onClick={() => handlePrintInvoice(selectedOrder.id)}
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Print Invoice
                </Button>
                
                <Button 
                  className="bg-cosmic-accent text-cosmic-light hover:bg-cosmic-accent/80"
                  onClick={handleUpdateOrderStatus}
                  disabled={editStatus === selectedOrder.status}
                >
                  Update Status
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderManager;
