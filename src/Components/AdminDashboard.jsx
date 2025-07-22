"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  Car,
  DollarSign,
  TrendingUp,
  Settings,
  LogOut,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  BarChart3,
  PieChartIcon,
  Activity,
  Bell,
} from "lucide-react"
import { vehiclesData } from "../data/vehiclesData"

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("all")

  // Calculate statistics from vehicle data
  const totalVehicles = vehiclesData.length
  const vehiclesSold = 4 // Mock data
  const totalRevenue = vehiclesData.reduce((sum, vehicle) => sum + vehicle.price, 0)
  const averagePrice = totalRevenue / totalVehicles

  // Sales data for charts
  const salesData = [
    { month: "Jan", sales: 12, revenue: 2.4 },
    { month: "Feb", sales: 19, revenue: 3.8 },
    { month: "Mar", sales: 15, revenue: 3.0 },
    { month: "Apr", sales: 25, revenue: 5.0 },
    { month: "May", sales: 22, revenue: 4.4 },
    { month: "Jun", sales: 30, revenue: 6.0 },
  ]

  // Brand distribution data
  const brandData = vehiclesData.reduce((acc, vehicle) => {
    const brand = vehicle.brand
    acc[brand] = (acc[brand] || 0) + 1
    return acc
  }, {})

  const pieData = Object.entries(brandData).map(([brand, count]) => ({
    name: brand,
    value: count,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
  }))

  // Filter vehicles based on search and brand
  const filteredVehicles = vehiclesData.filter((vehicle) => {
    const matchesSearch =
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBrand = selectedBrand === "all" || vehicle.brand === selectedBrand
    return matchesSearch && matchesBrand
  })

  const handleLogout = () => {
    localStorage.removeItem("adminSession")
    onLogout()
  }

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <motion.div whileHover={{ scale: 1.02 }} className={`stat-card ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 flex items-center mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-gradient-to-r ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </motion.div>
  )

  const TabButton = ({ id, label, icon: Icon, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive ? "bg-blue-600 text-white shadow-lg" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon className="h-5 w-5 mr-2" />
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">AutoHub Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 bg-white p-2 rounded-lg shadow-sm">
          <TabButton
            id="overview"
            label="Overview"
            icon={BarChart3}
            isActive={activeTab === "overview"}
            onClick={setActiveTab}
          />
          <TabButton
            id="vehicles"
            label="Vehicles"
            icon={Car}
            isActive={activeTab === "vehicles"}
            onClick={setActiveTab}
          />
          <TabButton
            id="analytics"
            label="Analytics"
            icon={PieChartIcon}
            isActive={activeTab === "analytics"}
            onClick={setActiveTab}
          />
          <TabButton
            id="activity"
            label="Activity"
            icon={Activity}
            isActive={activeTab === "activity"}
            onClick={setActiveTab}
          />
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Vehicles"
                value={totalVehicles}
                icon={Car}
                color="from-blue-500 to-blue-600"
                change="+12% from last month"
              />
              <StatCard
                title="Vehicles Sold"
                value={vehiclesSold}
                icon={TrendingUp}
                color="from-green-500 to-green-600"
                change="+8% from last month"
              />
              <StatCard
                title="Total Revenue"
                value={`₹${(totalRevenue / 10000000).toFixed(2)}Cr`}
                icon={DollarSign}
                color="from-purple-500 to-purple-600"
                change="+15% from last month"
              />
              <StatCard
                title="Average Price"
                value={`₹${(averagePrice / 100000).toFixed(1)}L`}
                icon={BarChart3}
                color="from-orange-500 to-orange-600"
                change="+5% from last month"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sales Chart */}
              <div className="admin-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Sales</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="sales" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Brand Distribution */}
              <div className="admin-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {/* Vehicles Tab */}
        {activeTab === "vehicles" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Filters */}
            <div className="admin-card">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search vehicles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Brands</option>
                    {Object.keys(brandData).map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Vehicle
                  </button>
                </div>
              </div>
            </div>

            {/* Vehicles Table */}
            <div className="admin-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vehicle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Brand
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredVehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={vehicle.image || "/placeholder.svg"}
                              alt={vehicle.name}
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{vehicle.name}</div>
                              <div className="text-sm text-gray-500">
                                {vehicle.fuel} • {vehicle.transmission}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.brand}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{(vehicle.price / 100000).toFixed(1)}L
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.year}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                            Available
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Chart */}
              <div className="admin-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Sales by Brand */}
              <div className="admin-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Brand</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={Object.entries(brandData).map(([brand, count]) => ({ brand, count }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="brand" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {/* Activity Tab */}
        {activeTab === "activity" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="admin-card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {[
                  { action: "New vehicle added", details: "Toyota Camry 2023", time: "2 hours ago", type: "success" },
                  { action: "Vehicle sold", details: "Honda Civic 2022", time: "4 hours ago", type: "info" },
                  { action: "Price updated", details: "BMW X5 2021", time: "6 hours ago", type: "warning" },
                  { action: "New inquiry", details: "Mercedes C-Class", time: "8 hours ago", type: "info" },
                  { action: "Vehicle removed", details: "Audi A4 2020", time: "1 day ago", type: "error" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div
                      className={`w-3 h-3 rounded-full mr-4 ${
                        activity.type === "success"
                          ? "bg-green-500"
                          : activity.type === "info"
                            ? "bg-blue-500"
                            : activity.type === "warning"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.details}</p>
                    </div>
                    <span className="text-sm text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
