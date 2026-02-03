"use client";

import { useState } from "react";
import Link from "next/link";

interface BOQItem {
  id: string;
  description: string;
  unit: string;
  quantity: number;
  rate: number;
  amount: number;
  category: string;
}

interface BOQCategory {
  name: string;
  items: BOQItem[];
  subtotal: number;
}

export default function BOQPage() {
  const [categories, setCategories] = useState<BOQCategory[]>([
    {
      name: "Earthwork",
      items: [
        { id: "1", description: "Excavation for foundation", unit: "Cum", quantity: 0, rate: 0, amount: 0, category: "Earthwork" },
        { id: "2", description: "Backfilling", unit: "Cum", quantity: 0, rate: 0, amount: 0, category: "Earthwork" },
        { id: "3", description: "Compaction", unit: "Sqm", quantity: 0, rate: 0, amount: 0, category: "Earthwork" },
      ],
      subtotal: 0,
    },
    {
      name: "Concrete Work",
      items: [
        { id: "4", description: "RCC Foundation", unit: "Cum", quantity: 0, rate: 0, amount: 0, category: "Concrete Work" },
        { id: "5", description: "RCC Columns", unit: "Cum", quantity: 0, rate: 0, amount: 0, category: "Concrete Work" },
        { id: "6", description: "RCC Beams", unit: "Cum", quantity: 0, rate: 0, amount: 0, category: "Concrete Work" },
        { id: "7", description: "RCC Slab", unit: "Cum", quantity: 0, rate: 0, amount: 0, category: "Concrete Work" },
      ],
      subtotal: 0,
    },
    {
      name: "Masonry",
      items: [
        { id: "8", description: "Brick masonry 1st class", unit: "Cum", quantity: 0, rate: 0, amount: 0, category: "Masonry" },
        { id: "9", description: "Block masonry", unit: "Cum", quantity: 0, rate: 0, amount: 0, category: "Masonry" },
        { id: "10", description: "Stone masonry", unit: "Cum", quantity: 0, rate: 0, amount: 0, category: "Masonry" },
      ],
      subtotal: 0,
    },
    {
      name: "Finishing",
      items: [
        { id: "11", description: "Plastering 12mm", unit: "Sqm", quantity: 0, rate: 0, amount: 0, category: "Finishing" },
        { id: "12", description: "Painting 2 coats", unit: "Sqm", quantity: 0, rate: 0, amount: 0, category: "Finishing" },
        { id: "13", description: "Flooring tiles", unit: "Sqm", quantity: 0, rate: 0, amount: 0, category: "Finishing" },
        { id: "14", description: "False ceiling", unit: "Sqm", quantity: 0, rate: 0, amount: 0, category: "Finishing" },
      ],
      subtotal: 0,
    },
    {
      name: "Electrical",
      items: [
        { id: "15", description: "Electrical wiring", unit: "Sqm", quantity: 0, rate: 0, amount: 0, category: "Electrical" },
        { id: "16", description: "Light fixtures", unit: "Nos", quantity: 0, rate: 0, amount: 0, category: "Electrical" },
        { id: "17", description: "Power outlets", unit: "Nos", quantity: 0, rate: 0, amount: 0, category: "Electrical" },
      ],
      subtotal: 0,
    },
    {
      name: "Plumbing",
      items: [
        { id: "18", description: "Water supply pipes", unit: "Rmt", quantity: 0, rate: 0, amount: 0, category: "Plumbing" },
        { id: "19", description: "Drainage pipes", unit: "Rmt", quantity: 0, rate: 0, amount: 0, category: "Plumbing" },
        { id: "20", description: "Sanitary fixtures", unit: "Nos", quantity: 0, rate: 0, amount: 0, category: "Plumbing" },
      ],
      subtotal: 0,
    },
  ]);

  const [projectInfo, setProjectInfo] = useState({
    projectName: "",
    location: "",
    client: "",
    date: new Date().toISOString().split('T')[0],
  });

  const updateItem = (
    categoryIndex: number,
    itemIndex: number,
    field: keyof BOQItem,
    value: string | number
  ) => {
    const newCategories = [...categories];
    const item = newCategories[categoryIndex].items[itemIndex];

    if (field === 'quantity') {
      item.quantity = Number(value);
      item.amount = item.quantity * item.rate;
    } else if (field === 'rate') {
      item.rate = Number(value);
      item.amount = item.quantity * item.rate;
    } else if (field === 'description') {
      item.description = String(value);
    } else if (field === 'unit') {
      item.unit = String(value);
    } else if (field === 'id') {
      item.id = String(value);
    } else if (field === 'category') {
      item.category = String(value);
    }

    // Recalculate category subtotal
    newCategories[categoryIndex].subtotal = newCategories[categoryIndex].items.reduce(
      (sum, item) => sum + item.amount, 0
    );

    setCategories(newCategories);
  };

  const addNewItem = (categoryIndex: number) => {
    const newCategories = [...categories];
    const newId = (newCategories[categoryIndex].items.length + 1).toString();
    const newItem: BOQItem = {
      id: newId,
      description: "",
      unit: "",
      quantity: 0,
      rate: 0,
      amount: 0,
      category: newCategories[categoryIndex].name,
    };
    newCategories[categoryIndex].items.push(newItem);
    setCategories(newCategories);
  };

  const removeItem = (categoryIndex: number, itemIndex: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].items.splice(itemIndex, 1);
    // Recalculate category subtotal
    newCategories[categoryIndex].subtotal = newCategories[categoryIndex].items.reduce(
      (sum, item) => sum + item.amount, 0
    );
    setCategories(newCategories);
  };

  const totalAmount = categories.reduce((sum, category) => sum + category.subtotal, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const printBOQ = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Book of Quantities</h1>
              <p className="text-gray-600 mt-1">Construction cost estimation and quantity calculation</p>
            </div>
            <div className="flex gap-3">
              <Link href="/" className="text-gray-400 hover:text-gray-900 text-2xl transition-colors bg-white/50 p-2 rounded-full hover:shadow-sm" aria-label="Back to Home">
                ←
              </Link>
              <button
                onClick={printBOQ}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Print BOQ
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Project Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Project Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input
                type="text"
                value={projectInfo.projectName}
                onChange={(e) => setProjectInfo({ ...projectInfo, projectName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter project name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={projectInfo.location}
                onChange={(e) => setProjectInfo({ ...projectInfo, location: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Client</label>
              <input
                type="text"
                value={projectInfo.client}
                onChange={(e) => setProjectInfo({ ...projectInfo, client: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter client name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={projectInfo.date}
                onChange={(e) => setProjectInfo({ ...projectInfo, date: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* BOQ Categories */}
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <div className="flex items-center gap-4">
                <span className="text-lg font-medium text-green-600">
                  {formatCurrency(category.subtotal)}
                </span>
                <button
                  onClick={() => addNewItem(categoryIndex)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Add Item
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Description</th>
                    <th className="text-left py-2 px-3">Unit</th>
                    <th className="text-right py-2 px-3">Quantity</th>
                    <th className="text-right py-2 px-3">Rate (₹)</th>
                    <th className="text-right py-2 px-3">Amount (₹)</th>
                    <th className="text-center py-2 px-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category.items.map((item, itemIndex) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(categoryIndex, itemIndex, 'description', e.target.value)}
                          className="w-full border-none bg-transparent focus:outline-none"
                          placeholder="Enter description"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="text"
                          value={item.unit}
                          onChange={(e) => updateItem(categoryIndex, itemIndex, 'unit', e.target.value)}
                          className="w-full border-none bg-transparent focus:outline-none"
                          placeholder="Unit"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(categoryIndex, itemIndex, 'quantity', e.target.value)}
                          className="w-full border-none bg-transparent focus:outline-none text-right"
                          placeholder="0"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="py-2 px-3">
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => updateItem(categoryIndex, itemIndex, 'rate', e.target.value)}
                          className="w-full border-none bg-transparent focus:outline-none text-right"
                          placeholder="0"
                          min="0"
                          step="0.01"
                        />
                      </td>
                      <td className="py-2 px-3 text-right font-medium">
                        {formatCurrency(item.amount)}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <button
                          onClick={() => removeItem(categoryIndex, itemIndex)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Total Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Total Project Cost</h2>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(totalAmount)}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Excluding taxes and contingencies
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Contingency (5%)</div>
              <div className="text-lg font-semibold">{formatCurrency(totalAmount * 0.05)}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">GST (18%)</div>
              <div className="text-lg font-semibold">{formatCurrency(totalAmount * 0.18)}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Grand Total</div>
              <div className="text-xl font-bold text-green-600">{formatCurrency(totalAmount * 1.23)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
