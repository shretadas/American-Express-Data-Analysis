import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  Users, 
  BarChart3, 
  PieChart,
  Shield,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [spendingData, setSpendingData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  // Enhanced sample data with more metrics
  const periodData = {
    daily: {
      spending: [
        { x: 1, y: 2400, name: 'Mon', trend: 5.2 },
        { x: 2, y: 1398, name: 'Tue', trend: -2.1 },
        { x: 3, y: 9800, name: 'Wed', trend: 15.3 },
        { x: 4, y: 3908, name: 'Thu', trend: -1.2 },
        { x: 5, y: 4800, name: 'Fri', trend: 3.5 },
        { x: 6, y: 3800, name: 'Sat', trend: 2.8 },
        { x: 7, y: 4300, name: 'Sun', trend: 4.1 }
      ],
      categories: [
        { name: 'Dining', value: 2400, risk: 'low' },
        { name: 'Shopping', value: 4567, risk: 'medium' },
        { name: 'Travel', value: 1398, risk: 'low' },
        { name: 'Entertainment', value: 9800, risk: 'high' },
        { name: 'Others', value: 3908, risk: 'low' }
      ]
    },
    weekly: {
      spending: [
        { x: 1, y: 15000, name: 'Week 1', trend: 8.2 },
        { x: 2, y: 12000, name: 'Week 2', trend: -5.1 },
        { x: 3, y: 18000, name: 'Week 3', trend: 12.3 },
        { x: 4, y: 14000, name: 'Week 4', trend: -2.4 }
      ],
      categories: [
        { name: 'Dining', value: 8400, risk: 'medium' },
        { name: 'Shopping', value: 15567, risk: 'low' },
        { name: 'Travel', value: 12398, risk: 'high' },
        { name: 'Entertainment', value: 19800, risk: 'medium' },
        { name: 'Others', value: 8908, risk: 'low' }
      ]
    },
    monthly: {
      spending: [
        { x: 1, y: 45000, name: 'Jan', trend: 12.5 },
        { x: 2, y: 52000, name: 'Feb', trend: 15.6 },
        { x: 3, y: 48000, name: 'Mar', trend: -7.7 },
        { x: 4, y: 51000, name: 'Apr', trend: 6.3 },
        { x: 5, y: 53000, name: 'May', trend: 3.9 },
        { x: 6, y: 49000, name: 'Jun', trend: -7.5 }
      ],
      categories: [
        { name: 'Dining', value: 24000, risk: 'low' },
        { name: 'Shopping', value: 45670, risk: 'medium' },
        { name: 'Travel', value: 33980, risk: 'high' },
        { name: 'Entertainment', value: 28000, risk: 'low' },
        { name: 'Others', value: 19080, risk: 'low' }
      ]
    },
    yearly: {
      spending: [
        { x: 1, y: 540000, name: '2020', trend: 15.2 },
        { x: 2, y: 620000, name: '2021', trend: 14.8 },
        { x: 3, y: 580000, name: '2022', trend: -6.5 },
        { x: 4, y: 610000, name: '2023', trend: 5.2 },
        { x: 5, y: 590000, name: '2024', trend: -3.3 }
      ],
      categories: [
        { name: 'Dining', value: 240000, risk: 'medium' },
        { name: 'Shopping', value: 456700, risk: 'high' },
        { name: 'Travel', value: 339800, risk: 'low' },
        { name: 'Entertainment', value: 280000, risk: 'medium' },
        { name: 'Others', value: 190800, risk: 'low' }
      ]
    }
  };

  const COLORS = {
    default: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'],
    risk: {
      low: '#00C49F',
      medium: '#FFBB28',
      high: '#FF8042'
    }
  };

  const stats = [
    { 
      title: 'Total Transactions',
      value: '$2.4M',
      change: '+12.5%',
      icon: CreditCard 
    },
    { 
      title: 'Average Spend',
      value: '$1,250',
      change: '+5.2%',
      icon: DollarSign 
    },
    { 
      title: 'Active Users',
      value: '85.2K',
      change: '+18.3%',
      icon: Users 
    },
    { 
      title: 'Fraud Prevention',
      value: '99.9%',
      change: '+0.2%',
      icon: Shield 
    }
  ];

  useEffect(() => {
    setSpendingData(periodData[selectedPeriod].spending);
    setCategoryData(periodData[selectedPeriod].categories);
  }, [selectedPeriod]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCategoryClick = (data) => {
    if (data && data.name) {
      setSelectedCategory(data.name === selectedCategory ? null : data.name);
    }
  };

  const getRiskColor = (risk) => COLORS.risk[risk] || COLORS.risk.low;

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 p-4 z-50"
          >
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <p className="text-yellow-700">Unusual spending pattern detected in Entertainment category</p>
              <button
                onClick={() => setShowAlert(false)}
                className="ml-4 text-yellow-700 hover:text-yellow-900"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="bg-blue-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="h-8 w-8 mr-3" />
              <h1 className="text-2xl font-bold">American Express Analytics</h1>
            </div>
            <div className="flex space-x-4">
              <select 
                className="bg-blue-800 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    {parseFloat(stat.change) > 0 ? (
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <p className={`text-sm ${parseFloat(stat.change) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
                <stat.icon className="h-8 w-8 text-blue-900" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Spending Trends</h2>
              <BarChart3 className="h-5 w-5 text-blue-900" />
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="x" 
                    type="number" 
                    name="period"
                    tickFormatter={(value) => {
                      const dataPoint = spendingData[value - 1];
                      return dataPoint ? dataPoint.name : '';
                    }}
                  />
                  <YAxis 
                    dataKey="y" 
                    name="amount"
                    tickFormatter={(value) => `$${value/1000}k`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 shadow-lg rounded-lg border">
                            <p className="font-semibold">{data.name}</p>
                            <p className="text-blue-900">{formatCurrency(data.y)}</p>
                            <p className={`text-sm ${data.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {data.trend > 0 ? '↑' : '↓'} {Math.abs(data.trend)}%
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter 
                    data={spendingData} 
                    fill="#1e3a8a"
                    line={{ stroke: '#1e3a8a', strokeWidth: 2 }}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Category Distribution</h2>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-green-500 mr-1"></span>
                  <span className="text-xs text-gray-600">Low Risk</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-yellow-500 mr-1"></span>
                  <span className="text-xs text-gray-600">Medium Risk</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-red-500 mr-1"></span>
                  <span className="text-xs text-gray-600">High Risk</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    onClick={handleCategoryClick}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={getRiskColor(entry.risk)}
                        opacity={selectedCategory === null || selectedCategory === entry.name ? 1 : 0.3}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 shadow-lg rounded-lg border">
                            <p className="font-semibold">{data.name}</p>
                            <p className="text-blue-900">{formatCurrency(data.value)}</p>
                            <p className={`text-sm ${
                              data.risk === 'high' ? 'text-red-600' :
                              data.risk === 'medium' ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              {data.risk.charAt(0).toUpperCase() + data.risk.slice(1)} Risk
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { date: '2024-03-15', transaction: 'Online Purchase', amount: '$299.99', status: 'Completed' },
                  { date: '2024-03-14', transaction: 'Restaurant', amount: '$85.50', status: 'Completed' },
                  { date: '2024-03-14', transaction: 'Travel Booking', amount: '$450.00', status: 'Pending' },
                  { date: '2024-03-13', transaction: 'Retail Store', amount: '$199.99', status: 'Completed' },
                ].map((item, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.transaction}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default App;