
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Globe, Lock, User, Palette, Bell, ShieldAlert, Database, Eye, EyeOff } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AdminSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "astroJanak Admin",
    siteDescription: "The ultimate astrology management system",
    adminEmail: "admin@astrojanak.com",
    language: "en"
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    passwordExpiry: 30,
    sessionTimeout: 60,
    securityQuestions: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    systemAlerts: true,
    marketingEmails: false
  });
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "cosmic",
    animations: true,
    compactSidebar: false,
    fontSize: "medium"
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleGeneralSettingsChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSecurityToggle = (key) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleNotificationToggle = (key) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleAppearanceChange = (key, value) => {
    setAppearanceSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    // Apply font size change immediately
    if (key === 'fontSize') {
      document.documentElement.style.fontSize = 
        value === 'small' ? '14px' : 
        value === 'large' ? '18px' : '16px';
      
      toast({
        title: "Font Size Changed",
        description: `Text size set to ${value}`,
        duration: 2000,
      });
    }
    
    // Apply theme change
    if (key === 'theme') {
      toast({
        title: "Theme Changed",
        description: `Theme set to ${value}`,
        duration: 2000,
      });
    }
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when typing
    if (passwordError) setPasswordError("");
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError("All fields are required");
      setIsLoading(false);
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match");
      setIsLoading(false);
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowPasswordDialog(false);
      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully",
        duration: 3000,
      });
    }, 1500);
  };

  const handleSaveSettings = (settingType) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings Saved",
        description: `Your ${settingType} settings have been updated successfully.`,
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-8 animate-fade-in">
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-bold text-cosmic-light">Admin Settings</h1>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4">
        <div className="cosmic-glass p-1.5 rounded-lg inline-block">
          <TabsList className="bg-cosmic-dark/30">
            <TabsTrigger value="general" className="data-[state=active]:bg-cosmic-accent/40 data-[state=active]:text-cosmic-light text-cosmic-accent">
              <Globe className="mr-2 h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-cosmic-accent/40 data-[state=active]:text-cosmic-light text-cosmic-accent">
              <Lock className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-cosmic-accent/40 data-[state=active]:text-cosmic-light text-cosmic-accent">
              <User className="mr-2 h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="appearance" className="data-[state=active]:bg-cosmic-accent/40 data-[state=active]:text-cosmic-light text-cosmic-accent">
              <Palette className="mr-2 h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-cosmic-accent/40 data-[state=active]:text-cosmic-light text-cosmic-accent">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>
        </div>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card className="cosmic-glass dashboard-content">
            <CardHeader>
              <CardTitle className="text-cosmic-light">General Settings</CardTitle>
              <CardDescription className="text-cosmic-accent">
                Manage your website's general configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName" className="text-cosmic-light">Site Name</Label>
                  <Input 
                    id="siteName"
                    name="siteName"
                    className="bg-cosmic-dark/50 border-cosmic-light/30 text-cosmic-light"
                    value={generalSettings.siteName}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail" className="text-cosmic-light">Admin Email</Label>
                  <Input 
                    id="adminEmail"
                    name="adminEmail"
                    className="bg-cosmic-dark/50 border-cosmic-light/30 text-cosmic-light"
                    value={generalSettings.adminEmail}
                    onChange={handleGeneralSettingsChange}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="siteDescription" className="text-cosmic-light">Site Description</Label>
                  <Textarea 
                    id="siteDescription"
                    name="siteDescription"
                    className="bg-cosmic-dark/50 border-cosmic-light/30 text-cosmic-light"
                    value={generalSettings.siteDescription}
                    onChange={handleGeneralSettingsChange}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-cosmic-light">Default Language</Label>
                  <select 
                    id="language"
                    name="language"
                    className="w-full h-10 rounded-md border border-cosmic-light/30 bg-cosmic-dark/50 px-3 py-2 text-base text-cosmic-light"
                    value={generalSettings.language}
                    onChange={handleGeneralSettingsChange}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeZone" className="text-cosmic-light">Time Zone</Label>
                  <select 
                    id="timeZone"
                    name="timeZone"
                    className="w-full h-10 rounded-md border border-cosmic-light/30 bg-cosmic-dark/50 px-3 py-2 text-base text-cosmic-light"
                  >
                    <option value="UTC">UTC</option>
                    <option value="EST">Eastern Time (EST)</option>
                    <option value="PST">Pacific Time (PST)</option>
                    <option value="GMT">Greenwich Mean Time (GMT)</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                className="bg-cosmic-light text-cosmic-dark hover:bg-cosmic-light/90 font-medium animate-button-pulse"
                onClick={() => handleSaveSettings('general')}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card className="cosmic-glass dashboard-content">
            <CardHeader>
              <CardTitle className="text-cosmic-light">Security Settings</CardTitle>
              <CardDescription className="text-cosmic-accent">
                Configure security options for your admin panel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-cosmic-light">Two-Factor Authentication</Label>
                  <p className="text-cosmic-light/70 text-sm">Add an extra layer of security to your account</p>
                </div>
                <Switch 
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={() => handleSecurityToggle('twoFactorAuth')}
                  className="data-[state=checked]:bg-cosmic-accent"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-cosmic-light">Security Questions</Label>
                  <p className="text-cosmic-light/70 text-sm">Set security questions for account recovery</p>
                </div>
                <Switch 
                  checked={securitySettings.securityQuestions}
                  onCheckedChange={() => handleSecurityToggle('securityQuestions')}
                  className="data-[state=checked]:bg-cosmic-accent"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry" className="text-cosmic-light">Password Expiry (days)</Label>
                  <Input 
                    id="passwordExpiry"
                    type="number"
                    className="bg-cosmic-dark/50 border-cosmic-light/30 text-cosmic-light"
                    value={securitySettings.passwordExpiry}
                    onChange={e => setSecuritySettings({...securitySettings, passwordExpiry: parseInt(e.target.value)})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout" className="text-cosmic-light">Session Timeout (minutes)</Label>
                  <Input 
                    id="sessionTimeout"
                    type="number"
                    className="bg-cosmic-dark/50 border-cosmic-light/30 text-cosmic-light"
                    value={securitySettings.sessionTimeout}
                    onChange={e => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              <div className="border-t border-cosmic-light/10 pt-4">
                <Button 
                  variant="destructive"
                  onClick={() => toast({
                    title: "Security Alert",
                    description: "All active sessions have been terminated.",
                    variant: "destructive"
                  })}
                >
                  <ShieldAlert className="mr-2 h-4 w-4" />
                  Revoke All Sessions
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                className="bg-cosmic-light text-cosmic-dark hover:bg-cosmic-light/90 font-medium animate-button-pulse"
                onClick={() => handleSaveSettings('security')}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="cosmic-glass dashboard-content">
            <CardHeader>
              <CardTitle className="text-cosmic-light">Notification Preferences</CardTitle>
              <CardDescription className="text-cosmic-accent">
                Choose which notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-cosmic-light">Email Notifications</Label>
                  <p className="text-cosmic-light/70 text-sm">Receive important updates via email</p>
                </div>
                <Switch 
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                  className="data-[state=checked]:bg-cosmic-accent"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-cosmic-light">Order Notifications</Label>
                  <p className="text-cosmic-light/70 text-sm">Get notified when new orders are placed</p>
                </div>
                <Switch 
                  checked={notificationSettings.orderNotifications}
                  onCheckedChange={() => handleNotificationToggle('orderNotifications')}
                  className="data-[state=checked]:bg-cosmic-accent"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-cosmic-light">System Alerts</Label>
                  <p className="text-cosmic-light/70 text-sm">Receive alerts about system updates and maintenance</p>
                </div>
                <Switch 
                  checked={notificationSettings.systemAlerts}
                  onCheckedChange={() => handleNotificationToggle('systemAlerts')}
                  className="data-[state=checked]:bg-cosmic-accent"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-cosmic-light">Marketing Emails</Label>
                  <p className="text-cosmic-light/70 text-sm">Receive promotional content and news</p>
                </div>
                <Switch 
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={() => handleNotificationToggle('marketingEmails')}
                  className="data-[state=checked]:bg-cosmic-accent"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                className="bg-cosmic-light text-cosmic-dark hover:bg-cosmic-light/90 font-medium animate-button-pulse"
                onClick={() => handleSaveSettings('notification')}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Account Settings Tab */}
        <TabsContent value="account" className="space-y-4">
          <Card className="cosmic-glass dashboard-content">
            <CardHeader>
              <CardTitle className="text-cosmic-light">Account Settings</CardTitle>
              <CardDescription className="text-cosmic-accent">
                Update your account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="accountName" className="text-cosmic-light">Name</Label>
                  <Input 
                    id="accountName"
                    className="bg-cosmic-dark/50 border-cosmic-light/30 text-cosmic-light"
                    defaultValue="Admin User"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountEmail" className="text-cosmic-light">Email</Label>
                  <Input 
                    id="accountEmail"
                    className="bg-cosmic-dark/50 border-cosmic-light/30 text-cosmic-light"
                    defaultValue="admin@astrojanak.com"
                  />
                </div>
              </div>
              <div className="pt-4 border-t border-cosmic-light/10">
                <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline"
                      className="border-cosmic-light/20 text-cosmic-light hover:bg-cosmic-accent/20"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="cosmic-glass border-cosmic-light/30 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-cosmic-light">Change Password</DialogTitle>
                      <DialogDescription className="text-cosmic-light/70">
                        Enter your current password and a new password
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handlePasswordSubmit} className="space-y-4 py-2">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword" className="text-cosmic-light">Current Password</Label>
                        <div className="relative">
                          <Input 
                            id="currentPassword"
                            name="currentPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            className="bg-cosmic-dark/50 border-cosmic-light/30 text-cosmic-light pr-10"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-cosmic-light/70 hover:text-cosmic-light"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="newPassword" className="text-cosmic-light">New Password</Label>
                        <div className="relative">
                          <Input 
                            id="newPassword"
                            name="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            className="bg-cosmic-dark/50 border-cosmic-light/30 text-cosmic-light pr-10"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                          />
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-cosmic-light/70 hover:text-cosmic-light"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-cosmic-light">Confirm New Password</Label>
                        <Input 
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          className="bg-cosmic-dark/50 border-cosmic-light/30 text-cosmic-light"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      
                      {passwordError && (
                        <div className="text-red-400 text-sm">{passwordError}</div>
                      )}
                      
                      <DialogFooter className="pt-4">
                        <Button 
                          type="button"
                          variant="outline"
                          className="border-cosmic-light/20 text-cosmic-light hover:bg-cosmic-light/10"
                          onClick={() => {
                            setShowPasswordDialog(false);
                            setPasswordData({
                              currentPassword: "",
                              newPassword: "",
                              confirmPassword: ""
                            });
                            setPasswordError("");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          className="bg-cosmic-light text-cosmic-dark hover:bg-cosmic-light/90"
                          disabled={isLoading}
                        >
                          {isLoading ? "Saving..." : "Update Password"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                className="bg-cosmic-light text-cosmic-dark hover:bg-cosmic-light/90 font-medium animate-button-pulse"
                onClick={() => handleSaveSettings('account')}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Appearance Settings Tab */}
        <TabsContent value="appearance" className="space-y-4">
          <Card className="cosmic-glass dashboard-content">
            <CardHeader>
              <CardTitle className="text-cosmic-light">Appearance Settings</CardTitle>
              <CardDescription className="text-cosmic-accent">
                Customize how the admin panel looks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-cosmic-light mb-2 block">Color Theme</Label>
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { name: "cosmic", gradient: "bg-gradient-to-r from-purple-600 to-red-500" },
                      { name: "dark", gradient: "bg-gradient-to-r from-gray-900 to-gray-700" },
                      { name: "light", gradient: "bg-gradient-to-r from-gray-200 to-gray-300" },
                      { name: "blue", gradient: "bg-gradient-to-r from-blue-600 to-blue-800" }
                    ].map((theme) => (
                      <div 
                        key={theme.name}
                        className={`h-10 rounded-md cursor-pointer transition-all hover:scale-105 ${
                          theme.gradient
                        } ${
                          appearanceSettings.theme === theme.name ? "ring-2 ring-cosmic-accent shadow-lg" : ""
                        }`}
                        onClick={() => handleAppearanceChange('theme', theme.name)}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-cosmic-light">Animations</Label>
                    <p className="text-cosmic-light/70 text-sm">Enable UI animations</p>
                  </div>
                  <Switch 
                    checked={appearanceSettings.animations}
                    onCheckedChange={(checked) => handleAppearanceChange('animations', checked)}
                    className="data-[state=checked]:bg-cosmic-accent"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-cosmic-light">Sidebar Compact Mode</Label>
                    <p className="text-cosmic-light/70 text-sm">Use a more compact sidebar layout</p>
                  </div>
                  <Switch 
                    checked={appearanceSettings.compactSidebar}
                    onCheckedChange={(checked) => handleAppearanceChange('compactSidebar', checked)}
                    className="data-[state=checked]:bg-cosmic-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fontSize" className="text-cosmic-light">Text Size</Label>
                  <select
                    id="fontSize"
                    className="w-full h-10 rounded-md border border-cosmic-light/20 bg-cosmic-dark/30 px-3 py-2 text-base text-cosmic-light"
                    value={appearanceSettings.fontSize}
                    onChange={(e) => handleAppearanceChange('fontSize', e.target.value)}
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                className="bg-cosmic-light text-cosmic-dark hover:bg-cosmic-light/90 font-medium animate-button-pulse"
                onClick={() => handleSaveSettings('appearance')}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
