
'use client';
import { PageHeader } from '@/components/page-header';
import { PaymentsTable } from './payments-table';
import { MOCK_PAYMENTS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { FileText, RefreshCw, Search, Calendar as CalendarIcon, Wallet, CreditCard, Landmark } from 'lucide-react';
import { PaymentStatCard } from './payment-stat-card';
import { RevenueTrendsChart } from './revenue-trends-chart';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { PaymentMethodsPerformance } from './payment-methods-performance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PaymentsPage() {
  const totalTransactions = MOCK_PAYMENTS.length;
  const pendingPayments = MOCK_PAYMENTS.filter(p => p.status === 'Pending').length;
  const failedTransactions = MOCK_PAYMENTS.filter(p => p.status === 'Failed').length;
  const monthlyRevenue = MOCK_PAYMENTS.reduce((acc, p) => p.status === 'Completed' ? acc + p.amount : acc, 0);

  return (
    <div className="space-y-6">
      <PageHeader title="Payments & Finance">
        <div className="flex items-center gap-2">
            <Button>
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
            </Button>
            <Button>
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync Payments
            </Button>
        </div>
      </PageHeader>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <PaymentStatCard 
            title="Monthly Revenue"
            value={`₹${monthlyRevenue.toLocaleString()}`}
            change="+15% from last month"
            changeType="increase"
            icon="DollarSign"
        />
        <PaymentStatCard 
            title="Total Transactions"
            value={totalTransactions.toLocaleString()}
            change="+8% from last month"
            changeType="increase"
            icon="Users"
        />
        <PaymentStatCard 
            title="Pending Payments"
            value={pendingPayments.toLocaleString()}
            change="-12% from last month"
            changeType="decrease"
            icon="Clock"
        />
        <PaymentStatCard 
            title="Failed Transactions"
            value={failedTransactions.toLocaleString()}
            change="-5% from last month"
            changeType="decrease"
            icon="AlertCircle"
        />
      </div>

      <RevenueTrendsChart />

      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
                <Input placeholder="Search by user or transaction ID..." className="pl-10" />
            </div>
            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
              <Select>
                  <SelectTrigger className="w-full sm:w-[180px] text-primary">
                      <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
              </Select>
              <Popover>
                  <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full sm:w-auto justify-start text-left font-normal text-primary">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>Date Range</span>
                      </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                      <Calendar mode="range" />
                  </PopoverContent>
              </Popover>
            </div>
        </CardContent>
      </Card>
      
      <PaymentsTable data={MOCK_PAYMENTS} />

      <PaymentMethodsPerformance />

    </div>
  );
}
