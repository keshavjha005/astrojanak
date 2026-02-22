import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileEdit, Eye, Trash2, Plus, User, Search, MoreHorizontal, Shield } from 'lucide-react';

// Sample users data
const sampleUsers = [
  { id: 1, username: "johndoe", email: "john@example.com", role: "user", status: "active", joined: "2025-03-15" },
  { id: 2, username: "janedoe", email: "jane@example.com", role: "admin", status: "active", joined: "2025-02-10" },
  { id: 3, username: "mikesmith", email: "mike@example.com", role: "user", status: "inactive", joined: "2025-01-05" },
  { id: 4, username: "sarahwilson", email: "sarah@example.com", role: "moderator", status: "active", joined: "2025-04-01" },
];

const UserManager = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(sampleUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const [editForm, setEditForm] = useState({
    username: "",
    email: "",
    role: "",
    status: ""
  });

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditForm({
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "User Deleted",
      description: "The user has been removed from the system",
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

  const handleRoleChange = (value) => {
    setEditForm(prev => ({
      ...prev,
      role: value
    }));
  };

  const handleStatusChange = (value) => {
    setEditForm(prev => ({
      ...prev,
      status: value
    }));
  };

  const handleSaveUser = () => {
    if (!editForm.username || !editForm.email || !editForm.role || !editForm.status) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    if (selectedUser) {
      // Update existing user
      const updatedUsers = users.map(u => 
        u.id === selectedUser.id ? { ...u, ...editForm } : u
      );
      setUsers(updatedUsers);
      toast({
        title: "User Updated",
        description: `User ${editForm.username} has been updated.`
      });
    } else {
      // Create new user
      const newUser = {
        id: users.length + 1,
        joined: new Date().toISOString().slice(0, 10),
        ...editForm
      };
      setUsers([...users, newUser]);
      toast({
        title: "User Created",
        description: `User ${editForm.username} has been created.`
      });
    }

    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const handleCreateNewUser = () => {
    setSelectedUser(null);
    setEditForm({
      username: "",
      email: "",
      role: "user",
      status: "active"
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const filteredUsers = users.filter(user => {
    // Filter by search term
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by role
    const matchesRole = filterRole === "all" || user.role === filterRole;
    
    // Filter by status
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-cosmic-light">User Management</h1>
        <Button 
          className="bg-cosmic-accent text-cosmic-light hover:bg-cosmic-accent/80"
          onClick={handleCreateNewUser}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>
      
      <Card className="cosmic-glass dashboard-content">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-cosmic-light">User List</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex items-center gap-2">
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="bg-cosmic-dark/30 border-cosmic-light/20 text-cosmic-light w-28 h-8">
                    <SelectValue placeholder="Filter role" className="text-cosmic-light" />
                  </SelectTrigger>
                  <SelectContent className="bg-cosmic-dark/80 border-cosmic-light/20">
                    <SelectItem value="all" className="text-cosmic-light">All Roles</SelectItem>
                    <SelectItem value="admin" className="text-cosmic-light">Admin</SelectItem>
                    <SelectItem value="moderator" className="text-cosmic-light">Moderator</SelectItem>
                    <SelectItem value="user" className="text-cosmic-light">User</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="bg-cosmic-dark/30 border-cosmic-light/20 text-cosmic-light w-28 h-8">
                    <SelectValue placeholder="Filter status" className="text-cosmic-light" />
                  </SelectTrigger>
                  <SelectContent className="bg-cosmic-dark/80 border-cosmic-light/20">
                    <SelectItem value="all" className="text-cosmic-light">All Status</SelectItem>
                    <SelectItem value="active" className="text-cosmic-light">Active</SelectItem>
                    <SelectItem value="inactive" className="text-cosmic-light">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-1.5 h-4 w-4 text-cosmic-light/70" />
                <Input 
                  placeholder="Search users..." 
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
                <TableHead className="text-cosmic-light/70">User</TableHead>
                <TableHead className="text-cosmic-light/70">Email</TableHead>
                <TableHead className="text-cosmic-light/70">Role</TableHead>
                <TableHead className="text-cosmic-light/70">Status</TableHead>
                <TableHead className="text-cosmic-light/70">Joined</TableHead>
                <TableHead className="text-cosmic-light/70">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-cosmic-dark/20 border-cosmic-light/10 group">
                    <TableCell className="text-cosmic-light">
                      <div className="flex items-center space-x-3">
                        <div className="bg-cosmic-accent/20 p-1.5 rounded-full">
                          <User className="h-4 w-4 text-cosmic-light" />
                        </div>
                        <span>{user.username}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-cosmic-light">{user.email}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === "admin" ? "bg-red-500/20 text-red-300" : 
                        user.role === "moderator" ? "bg-amber-500/20 text-amber-300" : 
                        "bg-blue-500/20 text-blue-300"
                      }`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.status === "active" ? "bg-green-500/20 text-green-300" : 
                        "bg-gray-500/20 text-gray-300"
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-cosmic-light">{user.joined}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-cosmic-light hover:text-cosmic-accent" onClick={() => handleViewUser(user)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-cosmic-light hover:text-cosmic-accent" onClick={() => handleEditUser(user)}>
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-cosmic-light hover:text-destructive" onClick={() => handleDeleteUser(user.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-cosmic-light/70">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Edit/View Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="cosmic-glass text-cosmic-light">
          <DialogHeader>
            <DialogTitle className="text-cosmic-accent">
              {isEditing ? (selectedUser ? "Edit User" : "Create New User") : "View User"}
            </DialogTitle>
            <DialogDescription className="text-cosmic-light/70">
              {isEditing ? "Fill in the details below to save this user" : `Viewing user ${selectedUser?.username}`}
            </DialogDescription>
          </DialogHeader>
          
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-cosmic-light">Username</Label>
                  <Input 
                    id="username"
                    name="username"
                    className="bg-cosmic-dark/30 border-cosmic-light/20 text-cosmic-light"
                    value={editForm.username}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-cosmic-light">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    className="bg-cosmic-dark/30 border-cosmic-light/20 text-cosmic-light"
                    value={editForm.email}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-cosmic-light">Role</Label>
                  <Select value={editForm.role} onValueChange={handleRoleChange}>
                    <SelectTrigger id="role" className="bg-cosmic-dark/30 border-cosmic-light/20 text-cosmic-light">
                      <SelectValue placeholder="Select role" className="text-cosmic-light" />
                    </SelectTrigger>
                    <SelectContent className="bg-cosmic-dark/80 border-cosmic-light/20">
                      <SelectItem value="admin" className="text-cosmic-light">Admin</SelectItem>
                      <SelectItem value="moderator" className="text-cosmic-light">Moderator</SelectItem>
                      <SelectItem value="user" className="text-cosmic-light">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status" className="text-cosmic-light">Status</Label>
                  <Select value={editForm.status} onValueChange={handleStatusChange}>
                    <SelectTrigger id="status" className="bg-cosmic-dark/30 border-cosmic-light/20 text-cosmic-light">
                      <SelectValue placeholder="Select status" className="text-cosmic-light" />
                    </SelectTrigger>
                    <SelectContent className="bg-cosmic-dark/80 border-cosmic-light/20">
                      <SelectItem value="active" className="text-cosmic-light">Active</SelectItem>
                      <SelectItem value="inactive" className="text-cosmic-light">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ) : selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-center mb-2">
                  <div className="bg-cosmic-accent/20 p-6 rounded-full">
                    <User className="h-12 w-12 text-cosmic-light" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-4">
                  <div>
                    <span className="text-cosmic-light/70">Username:</span>
                    <div className="text-cosmic-light mt-1 font-medium">{selectedUser.username}</div>
                  </div>
                  <div>
                    <span className="text-cosmic-light/70">Email:</span>
                    <div className="text-cosmic-light mt-1">{selectedUser.email}</div>
                  </div>
                  <div>
                    <span className="text-cosmic-light/70">Role:</span>
                    <div className="text-cosmic-light mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedUser.role === "admin" ? "bg-red-500/20 text-red-300" : 
                        selectedUser.role === "moderator" ? "bg-amber-500/20 text-amber-300" : 
                        "bg-blue-500/20 text-blue-300"
                      }`}>
                        {selectedUser.role}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-cosmic-light/70">Status:</span>
                    <div className="text-cosmic-light mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedUser.status === "active" ? "bg-green-500/20 text-green-300" : 
                        "bg-gray-500/20 text-gray-300"
                      }`}>
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-cosmic-light/70">Joined:</span>
                    <div className="text-cosmic-light mt-1">{selectedUser.joined}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            {isEditing ? (
              <Button 
                className="bg-cosmic-accent text-cosmic-light hover:bg-cosmic-accent/80"
                onClick={handleSaveUser}
              >
                Save User
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

export default UserManager;
