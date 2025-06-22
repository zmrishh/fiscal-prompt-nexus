
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const GSTCompliance: React.FC = () => {
  const filings = [
    { type: 'GSTR-1', period: 'January 2024', dueDate: '2024-02-11', status: 'Filed', amount: '₹45,000' },
    { type: 'GSTR-3B', period: 'January 2024', dueDate: '2024-02-20', status: 'Pending', amount: '₹12,000' },
    { type: 'GSTR-1', period: 'December 2023', dueDate: '2024-01-11', status: 'Filed', amount: '₹38,500' },
  ];

  const compliance = [
    { task: 'Board Resolution - Q4 2023', dueDate: '2024-01-30', status: 'Completed' },
    { task: 'Form AOC-4 Filing', dueDate: '2024-02-29', status: 'Pending' },
    { task: 'Advance Tax Payment', dueDate: '2024-03-15', status: 'Upcoming' },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">GST & Compliance</h1>
          <p className="text-gray-600">Manage tax filings, compliance deadlines, and statutory requirements</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">GST Collected</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,24,500</div>
              <p className="text-xs text-muted-foreground">This quarter</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Input Tax Credit</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹45,200</div>
              <p className="text-xs text-muted-foreground">Available to use</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Filings</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Due this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-muted-foreground">On-time filings</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="gst" className="space-y-6">
          <TabsList>
            <TabsTrigger value="gst">GST Returns</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="gst">
            <Card>
              <CardHeader>
                <CardTitle>GST Return Status</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Return Type</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Tax Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filings.map((filing, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{filing.type}</TableCell>
                        <TableCell>{filing.period}</TableCell>
                        <TableCell>{filing.dueDate}</TableCell>
                        <TableCell>{filing.amount}</TableCell>
                        <TableCell>
                          <span className={filing.status === 'Filed' ? 'text-green-600' : 'text-orange-600'}>
                            {filing.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {filing.status === 'Pending' ? (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">File Now</Button>
                          ) : (
                            <Button size="sm" variant="outline">View</Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {compliance.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{item.task}</h4>
                        <p className="text-sm text-gray-600">Due: {item.dueDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={
                          item.status === 'Completed' ? 'text-green-600' : 
                          item.status === 'Pending' ? 'text-orange-600' : 'text-blue-600'
                        }>
                          {item.status}
                        </span>
                        {item.status !== 'Completed' && (
                          <Button size="sm" variant="outline">View</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Statutory Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Form 16 (2023-24)</h4>
                    <p className="text-sm text-gray-600 mb-3">Annual TDS certificate for employees</p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Generate</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">26AS Statement</h4>
                    <p className="text-sm text-gray-600 mb-3">Tax credit statement from government</p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Download</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Board Resolutions</h4>
                    <p className="text-sm text-gray-600 mb-3">Corporate governance documents</p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Create</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">MCA Filings</h4>
                    <p className="text-sm text-gray-600 mb-3">AOC-4, MGT-7 and other forms</p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">File</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default GSTCompliance;
