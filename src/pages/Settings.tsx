
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Building, Users, Settings as SettingsIcon, CreditCard } from 'lucide-react';

const Settings: React.FC = () => {
  const [companyData, setCompanyData] = useState({
    name: '',
    address: '',
    gstin: '',
    pan: '',
    cin: '',
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Configure your company profile and system preferences</p>
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Company
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Accounts
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              System
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input 
                      id="company-name" 
                      value={companyData.name}
                      onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                      placeholder="Your Company Pvt Ltd" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="gstin">GSTIN</Label>
                    <Input 
                      id="gstin" 
                      value={companyData.gstin}
                      onChange={(e) => setCompanyData({...companyData, gstin: e.target.value})}
                      placeholder="22AAAAA0000A1Z5" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="pan">PAN</Label>
                    <Input 
                      id="pan" 
                      value={companyData.pan}
                      onChange={(e) => setCompanyData({...companyData, pan: e.target.value})}
                      placeholder="AAAAA0000A" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="cin">CIN</Label>
                    <Input 
                      id="cin" 
                      value={companyData.cin}
                      onChange={(e) => setCompanyData({...companyData, cin: e.target.value})}
                      placeholder="U74140DL2023PTC000000" 
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Registered Address</Label>
                  <Input 
                    id="address" 
                    value={companyData.address}
                    onChange={(e) => setCompanyData({...companyData, address: e.target.value})}
                    placeholder="Complete registered address" 
                  />
                </div>
                <Button className="bg-green-600 hover:bg-green-700">Save Company Details</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <CardTitle>Team Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Invite team members and manage access controls</p>
                <Button className="bg-green-600 hover:bg-green-700">Invite Team Member</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accounts">
            <Card>
              <CardHeader>
                <CardTitle>Chart of Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Configure your accounting structure</p>
                <Button className="bg-green-600 hover:bg-green-700">Setup Chart of Accounts</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Financial year, tax settings, and integrations</p>
                <Button className="bg-green-600 hover:bg-green-700">Configure System</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
