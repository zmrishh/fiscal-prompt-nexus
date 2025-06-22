
import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, DollarSign, FileText, Clock } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Payroll: React.FC = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Rahul Sharma', role: 'Frontend Developer', salary: 80000, pf: 9600, tds: 8000, status: 'Active' },
    { id: 2, name: 'Priya Patel', role: 'Backend Developer', salary: 90000, pf: 10800, tds: 10000, status: 'Active' },
    { id: 3, name: 'Amit Kumar', role: 'Designer', salary: 65000, pf: 7800, tds: 5000, status: 'Active' },
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    salary: '',
    email: '',
  });

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payroll Management</h1>
          <p className="text-gray-600">Manage employee salaries, benefits, and tax compliance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Active employees</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Payroll</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹6,40,000</div>
              <p className="text-xs text-muted-foreground">Gross salaries</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">TDS Deducted</CardTitle>
              <FileText className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹64,000</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Slips</CardTitle>
              <Clock className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">To be generated</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="employees" className="space-y-6">
          <TabsList>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="salary-run">Salary Run</TabsTrigger>
            <TabsTrigger value="payslips">Payslips</TabsTrigger>
            <TabsTrigger value="statutory">Statutory</TabsTrigger>
          </TabsList>

          <TabsContent value="employees">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Employee List</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Salary</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell className="font-medium">{employee.name}</TableCell>
                          <TableCell>{employee.role}</TableCell>
                          <TableCell>₹{employee.salary.toLocaleString()}</TableCell>
                          <TableCell>
                            <span className="text-green-600">{employee.status}</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Add New Employee</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="emp-name">Full Name</Label>
                    <Input 
                      id="emp-name" 
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                      placeholder="Employee full name" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="emp-role">Role</Label>
                    <Input 
                      id="emp-role" 
                      value={newEmployee.role}
                      onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                      placeholder="Job title" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="emp-salary">Monthly Salary</Label>
                    <Input 
                      id="emp-salary" 
                      type="number"
                      value={newEmployee.salary}
                      onChange={(e) => setNewEmployee({...newEmployee, salary: e.target.value})}
                      placeholder="Monthly gross salary" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="emp-email">Email</Label>
                    <Input 
                      id="emp-email" 
                      type="email"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                      placeholder="employee@company.com" 
                    />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Add Employee</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="salary-run">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Salary Run</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">January 2024 Payroll</h4>
                    <p className="text-gray-600 mb-4">Process salaries for 8 employees</p>
                    <div className="flex gap-2">
                      <Button className="bg-green-600 hover:bg-green-700">Run Payroll</Button>
                      <Button variant="outline">Preview</Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 border rounded">
                      <div className="text-lg font-bold">₹6,40,000</div>
                      <div className="text-sm text-gray-600">Gross Pay</div>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="text-lg font-bold">₹76,800</div>
                      <div className="text-sm text-gray-600">PF Deduction</div>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="text-lg font-bold">₹64,000</div>
                      <div className="text-sm text-gray-600">TDS Deduction</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payslips">
            <Card>
              <CardHeader>
                <CardTitle>Payslip Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">January 2024 Payslips</h4>
                    <Button className="bg-green-600 hover:bg-green-700">Generate All Payslips</Button>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Employee</TableHead>
                        <TableHead>Gross Salary</TableHead>
                        <TableHead>Deductions</TableHead>
                        <TableHead>Net Pay</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>{employee.name}</TableCell>
                          <TableCell>₹{employee.salary.toLocaleString()}</TableCell>
                          <TableCell>₹{(employee.pf + employee.tds).toLocaleString()}</TableCell>
                          <TableCell>₹{(employee.salary - employee.pf - employee.tds).toLocaleString()}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline">Generate</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="statutory">
            <Card>
              <CardHeader>
                <CardTitle>Statutory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">EPF Returns</h4>
                    <p className="text-sm text-gray-600 mb-3">Monthly ECR filing</p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Generate ECR</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">ESI Returns</h4>
                    <p className="text-sm text-gray-600 mb-3">Employee state insurance</p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Generate</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">TDS Returns</h4>
                    <p className="text-sm text-gray-600 mb-3">Quarterly challan & filing</p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">File Returns</Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Form 16</h4>
                    <p className="text-sm text-gray-600 mb-3">Annual TDS certificate</p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Generate</Button>
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

export default Payroll;
