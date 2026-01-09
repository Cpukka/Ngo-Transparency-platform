'use client'

import { useState } from 'react'
import { Download, FileText, PieChart, BarChart3, Calendar, Filter } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/Select'
import { toast } from 'sonner'

const reportTypes = [
  { id: 'donation', name: 'Donation Report', icon: FileText, description: 'Detailed donation history and analytics' },
  { id: 'financial', name: 'Financial Report', icon: PieChart, description: 'Financial summaries and breakdowns' },
  { id: 'impact', name: 'Impact Report', icon: BarChart3, description: 'Project impact and outcomes analysis' },
  { id: 'monthly', name: 'Monthly Summary', icon: Calendar, description: 'Monthly performance and trends' },
]

const reportTemplates = [
  { id: 'template1', name: 'Standard Donation Report', type: 'donation' },
  { id: 'template2', name: 'Annual Impact Report', type: 'impact' },
  { id: 'template3', name: 'Quarterly Financial Summary', type: 'financial' },
  { id: 'template4', name: 'Project Performance Report', type: 'impact' },
  { id: 'template5', name: 'Donor Analytics Report', type: 'donation' },
]

export default function ReportsPage() {
  const [selectedType, setSelectedType] = useState('all')
  const [dateRange, setDateRange] = useState('last-month')
  const [format, setFormat] = useState('pdf')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = () => {
    setIsGenerating(true)
    toast.info('Generating report...')
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      toast.success('Report generated successfully!')
      
      // Simulate download
      const link = document.createElement('a')
      link.href = '/api/export/report'
      link.download = `report-${new Date().toISOString().split('T')[0]}.${format}`
      link.click()
    }, 2000)
  }

  const filteredTemplates = selectedType === 'all' 
    ? reportTemplates 
    : reportTemplates.filter(t => t.type === selectedType)

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Generate and export detailed reports</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Types */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Report Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTypes.map((report) => {
                  const Icon = report.icon
                  return (
                    <button
                      key={report.id}
                      onClick={() => setSelectedType(report.id)}
                      className={`p-4 border rounded-lg text-left transition-all hover:shadow-md ${
                        selectedType === report.id 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-lg ${
                          selectedType === report.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="font-semibold">{report.name}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Report Templates */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Report Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
                  >
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {template.type} Report
                      </p>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Generate
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generate Report Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Generate Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Report Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Reports</SelectItem>
                      {reportTypes.map((report) => (
                        <SelectItem key={report.id} value={report.id}>
                          {report.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Date Range</label>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select date range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-week">Last Week</SelectItem>
                      <SelectItem value="last-month">Last Month</SelectItem>
                      <SelectItem value="last-quarter">Last Quarter</SelectItem>
                      <SelectItem value="last-year">Last Year</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Format</label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV File</SelectItem>
                      <SelectItem value="json">JSON Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Include Sections</label>
                  <div className="space-y-2">
                    {['Summary', 'Charts', 'Detailed Data', 'Analytics', 'Recommendations'].map((section) => (
                      <div key={section} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={section.toLowerCase()}
                          defaultChecked
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor={section.toLowerCase()} className="text-sm">
                          {section}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="w-full gap-2 mt-6"
                >
                  {isGenerating ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Generate & Download Report
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Report History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Generated This Month</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Reports</span>
                  <span className="font-semibold">48</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Most Used Format</span>
                  <span className="font-semibold">PDF</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}