'use client'

import { useState } from 'react'
import { Search, Filter, Download, Eye, Receipt } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Badge } from '../../../components/ui/Badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/Table'

const donations = [
  {
    id: 'DON-001',
    project: 'Clean Water Initiative',
    amount: 500,
    date: '2024-01-15',
    status: 'completed',
    method: 'Credit Card',
    receipt: true,
  },
  {
    id: 'DON-002',
    project: 'Education for Children',
    amount: 250,
    date: '2024-01-10',
    status: 'completed',
    method: 'PayPal',
    receipt: true,
  },
  {
    id: 'DON-003',
    project: 'Reforestation Project',
    amount: 1000,
    date: '2024-01-05',
    status: 'pending',
    method: 'Bank Transfer',
    receipt: false,
  },
  {
    id: 'DON-004',
    project: 'Medical Aid Fund',
    amount: 100,
    date: '2023-12-28',
    status: 'completed',
    method: 'Credit Card',
    receipt: true,
  },
  {
    id: 'DON-005',
    project: 'Animal Rescue',
    amount: 50,
    date: '2023-12-15',
    status: 'failed',
    method: 'PayPal',
    receipt: false,
  },
]

export default function DonationsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.project.toLowerCase().includes(search.toLowerCase()) ||
                         donation.id.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || donation.status === filter
    return matchesSearch && matchesFilter
  })

  const totalDonated = donations
    .filter(d => d.status === 'completed')
    .reduce((sum, d) => sum + d.amount, 0)

  const monthlyAverage = totalDonated / 12

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Donations</h1>
          <p className="text-muted-foreground">Track and manage all your donations</p>
        </div>
        <Button className="gap-2">
          <Receipt className="h-4 w-4" />
          New Donation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Total Donated</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Receipt className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${totalDonated.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Monthly Average</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Eye className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${monthlyAverage.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Per month average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <Filter className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{donations.length}</div>
            <p className="text-sm text-muted-foreground">All time donations</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search donations..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Donations Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDonations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell className="font-medium">{donation.id}</TableCell>
                  <TableCell>{donation.project}</TableCell>
                  <TableCell>${donation.amount.toLocaleString()}</TableCell>
                  <TableCell>{donation.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        donation.status === 'completed' ? 'default' :
                        donation.status === 'pending' ? 'secondary' :
                        'destructive'
                      }
                    >
                      {donation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{donation.method}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {donation.receipt && (
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}