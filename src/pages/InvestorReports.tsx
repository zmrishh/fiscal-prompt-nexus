
import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, DollarSign, Users, Download } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const InvestorReports: React.FC = () => {
  const fundUtilization = [
    { category: 'Engineering & Product', allocated: 40, spent: 35, percentage: '87.5%' },
    { category: 'Marketing & Sales', allocated: 25, spent: 18, percentage: '72%' },
    { category: 'Operations', allocated: 20, spent: 22, percentage: '110%' },
    { category: 'Infrastructure', allocated: 15, spent: 12, percentage: '80%' },
  ];

  const investors = [
    { name: 'Sequoia Capital', investment: '₹5 Cr', equity: '20%', boardSeat: 'Yes' },
    { name: 'Accel Partners', investment: '₹3 Cr', equity: '12%', boardSeat: 'No' },
    { name: 'Individual Angels', investment: '₹1 Cr', equity: '8%', boardSeat: 'No' },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Investor Reports</h1>
          <p className="text-gray-600">Maintain transparency with automated investor updates and board reporting</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹9 Cr</div>
              <p className="text-xs text-muted-foreground">Raised to date</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Runway</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18 months</div>
              <p className="text-xs text-muted-foreground">At current burn rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Burn</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹35 L</div>
              <p className="text-xs text-muted-foreground">Average monthly</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valuation</CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹45 Cr</div>
              <p className="text-xs text-muted-foreground">Post-money</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="utilization" className="space-y-6">
          <TabsList>
            <TabsTrigger value="utilization">Fund Utilization</TabsTrigger>
            <TabsTrigger value="mis">MIS Reports</TabsTrigger>
            <TabsTrigger value="cap-table">Cap Table</TabsTrigger>
            <TabsTrigger value="board-docs">Board Docs</TabsTrigger>
          </TabsList>

          <TabsContent value="utilization">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Fund Utilization Report
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Allocated (₹L)</TableHead>
                      <TableHead>Spent (₹L)</TableHead>
                      <TableHead>Utilization %</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fundUtilization.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.category}</TableCell>
                        <TableCell>₹{item.allocated}L</TableCell>
                        <TableCell>₹{item.spent}L</TableCell>
                        <TableCell>{item.percentage}</TableCell>
                        <TableCell>
                          <span className={item.spent > item.allocated ? 'text-red-600' : 'text-green-600'}>
                            {item.spent > item.allocated ? 'Over Budget' : 'On Track'}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Insights</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Operations spending exceeded budget by 10% due to office expansion</li>
                    <li>• Engineering efficiency improved - 12.5% under budget</li>
                    <li>• Marketing ROI tracking shows 3.2x return on ad spend</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mis">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly MIS Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded">
                      <div className="text-lg font-bold text-green-600">₹12.5L</div>
                      <div className="text-sm text-gray-600">Revenue</div>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="text-lg font-bold text-red-600">₹35L</div>
                      <div className="text-sm text-gray-600">Expenses</div>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="text-lg font-bold text-blue-600">₹8.2L</div>
                      <div className="text-sm text-gray-600">Cash Balance</div>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="text-lg font-bold text-purple-600">22.5L</div>
                      <div className="text-sm text-gray-600">Burn Rate</div>
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Generate Full Report</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Runway Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Current Scenario</h4>
                      <p className="text-sm text-gray-600">18 months runway at current burn rate</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Optimistic Case</h4>
                      <p className="text-sm text-gray-600">24 months with 20% revenue growth</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Conservative Case</h4>
                      <p className="text-sm text-gray-600">14 months with increased hiring</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cap-table">
            <Card>
              <CardHeader>
                <CardTitle>Capitalization Table</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Investor</TableHead>
                      <TableHead>Investment</TableHead>
                      <TableHead>Equity %</TableHead>
                      <TableHead>Board Seat</TableHead>
                      <TableHead>Investment Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investors.map((investor, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{investor.name}</TableCell>
                        <TableCell>{investor.investment}</TableCell>
                        <TableCell>{investor.equity}</TableCell>
                        <TableCell>{investor.boardSeat}</TableCell>
                        <TableCell>Series A</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold">60%</div>
                      <div className="text-sm text-gray-600">Founder Equity</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">32%</div>
                      <div className="text-sm text-gray-600">Investor Equity</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">8%</div>
                      <div className="text-sm text-gray-600">ESOP Pool</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="board-docs">
            <Card>
              <CardHeader>
                <CardTitle>Board Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Board Resolutions</h4>
                    <p className="text-sm text-gray-600 mb-3">Generate corporate resolutions</p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Create Resolution</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Meeting Minutes</h4>
                    <p className="text-sm text-gray-600 mb-3">Board meeting documentation</p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Generate Minutes</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Audit Kit</h4>
                    <p className="text-sm text-gray-600 mb-3">Complete financial package</p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Download Kit</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Compliance Report</h4>
                    <p className="text-sm text-gray-600 mb-3">Statutory compliance status</p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Generate Report</Button>
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

export default InvestorReports;
