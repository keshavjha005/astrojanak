
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CreditCard, Eye, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

// Sample payment methods
const paymentMethods = [
  { id: 1, name: "Credit/Debit Card", enabled: true, icon: "credit-card", processingFee: "2.9% + $0.30" },
  { id: 2, name: "PayPal", enabled: true, icon: "paypal", processingFee: "3.5% + $0.49" },
  { id: 3, name: "Bank Transfer", enabled: false, icon: "bank", processingFee: "$0.50 per transaction" },
  { id: 4, name: "Cryptocurrency", enabled: false, icon: "bitcoin", processingFee: "1%" },
];

// Sample transactions
const transactions = [
  { id: 1, customer: "Raj Sharma", amount: "$49.99", date: "2025-04-10", method: "Credit Card", status: "completed" },
  { id: 2, customer: "Priya Patel", amount: "$29.99", date: "2025-04-08", method: "PayPal", status: "completed" },
  { id: 3, customer: "Amit Kumar", amount: "$99.99", date: "2025-04-05", method: "Credit Card", status: "pending" },
  { id: 4, customer: "Maya Singh", amount: "$19.99", date: "2025-04-02", method: "Credit Card", status: "failed" },
  { id: 5, customer: "Vikram Joshi", amount: "$79.99", date: "2025-03-28", method: "PayPal", status: "completed" },
];

const PaymentManager = () => {
  const { toast } = useToast();
  const [isEditPaymentOpen, setIsEditPaymentOpen] = useState(false);
  const [currentMethod, setCurrentMethod] = useState(null);
  const [isTransactionDetailOpen, setIsTransactionDetailOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  const handleEnableToggle = (id) => {
    toast({
      title: "Payment Method Updated",
      description: `Payment method status has been updated.`,
    });
  };

  const handleEditPayment = (method) => {
    setCurrentMethod(method);
    setIsEditPaymentOpen(true);
  };

  const handleViewTransaction = (transaction) => {
    setCurrentTransaction(transaction);
    setIsTransactionDetailOpen(true);
  };

  const handleSavePaymentMethod = () => {
    toast({
      title: "Payment Method Saved",
      description: `${currentMethod.name} settings have been updated.`,
    });
    setIsEditPaymentOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="cosmic-glass bg-cosmic-dark/40 border-cosmic-light/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-cosmic-light">Payment Methods</CardTitle>
          <CardDescription className="text-cosmic-light/80">
            Configure your available payment options
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-cosmic-light/10 hover:bg-cosmic-dark/30">
                <TableHead className="text-cosmic-light/80">Payment Method</TableHead>
                <TableHead className="text-cosmic-light/80">Status</TableHead>
                <TableHead className="text-cosmic-light/80">Processing Fee</TableHead>
                <TableHead className="text-cosmic-light/80">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentMethods.map((method) => (
                <TableRow key={method.id} className="border-cosmic-light/10 hover:bg-cosmic-dark/30">
                  <TableCell className="font-medium text-cosmic-light">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-cosmic-accent" />
                      {method.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={method.enabled}
                      onCheckedChange={() => handleEnableToggle(method.id)}
                      className="data-[state=checked]:bg-cosmic-accent"
                    />
                  </TableCell>
                  <TableCell className="text-cosmic-light">{method.processingFee}</TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 text-cosmic-light hover:text-cosmic-accent"
                      onClick={() => handleEditPayment(method)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card className="cosmic-glass bg-cosmic-dark/40 border-cosmic-light/10">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-cosmic-light">Recent Transactions</CardTitle>
          <CardDescription className="text-cosmic-light/80">
            View and manage your payment transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-cosmic-light/10 hover:bg-cosmic-dark/30">
                <TableHead className="text-cosmic-light/80">Customer</TableHead>
                <TableHead className="text-cosmic-light/80">Amount</TableHead>
                <TableHead className="text-cosmic-light/80">Date</TableHead>
                <TableHead className="text-cosmic-light/80">Method</TableHead>
                <TableHead className="text-cosmic-light/80">Status</TableHead>
                <TableHead className="text-cosmic-light/80">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="border-cosmic-light/10 hover:bg-cosmic-dark/30">
                  <TableCell className="font-medium text-cosmic-light">{transaction.customer}</TableCell>
                  <TableCell className="text-cosmic-light">{transaction.amount}</TableCell>
                  <TableCell className="text-cosmic-light">{transaction.date}</TableCell>
                  <TableCell className="text-cosmic-light">{transaction.method}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.status === "completed" ? "bg-green-500/20 text-green-300" : 
                      transaction.status === "pending" ? "bg-amber-500/20 text-amber-300" :
                      "bg-red-500/20 text-red-300"
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 text-cosmic-light hover:text-cosmic-accent"
                      onClick={() => handleViewTransaction(transaction)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={isEditPaymentOpen} onOpenChange={setIsEditPaymentOpen}>
        {currentMethod && (
          <DialogContent className="cosmic-glass bg-cosmic-dark/40">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-cosmic-light">Edit Payment Method</DialogTitle>
              <DialogDescription className="text-cosmic-light/80">
                Configure {currentMethod.name} settings
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-cosmic-light">Method Name</Label>
                <Input 
                  id="name" 
                  defaultValue={currentMethod.name} 
                  className="bg-cosmic-dark/30 border-cosmic-light/30 text-cosmic-light"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fee" className="text-cosmic-light">Processing Fee</Label>
                <Input 
                  id="fee" 
                  defaultValue={currentMethod.processingFee} 
                  className="bg-cosmic-dark/30 border-cosmic-light/30 text-cosmic-light"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="enabled" className="text-cosmic-light">Enable Payment Method</Label>
                <Switch
                  id="enabled"
                  defaultChecked={currentMethod.enabled}
                  className="data-[state=checked]:bg-cosmic-accent"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={() => setIsEditPaymentOpen(false)}
                className="text-cosmic-light"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSavePaymentMethod}
                className="bg-cosmic-accent text-cosmic-dark hover:bg-cosmic-accent/80"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      <Dialog open={isTransactionDetailOpen} onOpenChange={setIsTransactionDetailOpen}>
        {currentTransaction && (
          <DialogContent className="cosmic-glass bg-cosmic-dark/40">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-cosmic-light">Transaction Details</DialogTitle>
              <DialogDescription className="text-cosmic-light/80">
                Transaction #{currentTransaction.id}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-cosmic-light/70">Customer</h3>
                  <p className="text-cosmic-light">{currentTransaction.customer}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-cosmic-light/70">Amount</h3>
                  <p className="text-cosmic-light">{currentTransaction.amount}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-cosmic-light/70">Date</h3>
                  <p className="text-cosmic-light">{currentTransaction.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-cosmic-light/70">Payment Method</h3>
                  <p className="text-cosmic-light">{currentTransaction.method}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-cosmic-light/70">Status</h3>
                  <p className="flex items-center">
                    {currentTransaction.status === "completed" ? (
                      <Check className="h-4 w-4 text-green-400 mr-1" />
                    ) : currentTransaction.status === "pending" ? (
                      <span className="h-4 w-4 bg-amber-400 rounded-full inline-block mr-1"></span>
                    ) : (
                      <X className="h-4 w-4 text-red-400 mr-1" />
                    )}
                    <span className={
                      currentTransaction.status === "completed" ? "text-green-400" : 
                      currentTransaction.status === "pending" ? "text-amber-400" : "text-red-400"
                    }>
                      {currentTransaction.status.charAt(0).toUpperCase() + currentTransaction.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-cosmic-light/70 mb-2">Transaction ID</h3>
                <p className="text-cosmic-light text-sm font-mono bg-cosmic-dark/30 p-2 rounded">
                  txn_{Math.random().toString(36).substr(2, 9)}
                </p>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default PaymentManager;
