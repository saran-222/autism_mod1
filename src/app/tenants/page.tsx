// app/create-tenant/page.tsx or a component
'use client';

import { useState } from 'react';

export default function CreateTenantForm() {
  const [loading, setLoading] = useState(false);
  const [logo, setLogo] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    hospitalId: '',
    plan: '',
    primaryColor: '#0070f3',      // Default to blue
    secondaryColor: '#1c1c1e',    // Default to dark
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (logo) {
      data.append('logo', logo);
    }

    const res = await fetch('/api/tenants/create', {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(result.error || 'Error creating tenant');
      return;
    }

    alert('Tenant created successfully');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Create Hospital Tenant</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
        <input
          name="name"
          placeholder="Hospital Name"
          onChange={handleChange}
          value={form.name}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
        <input
          name="slug"
          placeholder="Unique Slug"
          onChange={handleChange}
          value={form.slug}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Hospital ID</label>
        <input
          name="hospitalId"
          placeholder="Hospital ID"
          onChange={handleChange}
          value={form.hospitalId}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
        <input
          name="plan"
          placeholder="Plan"
          onChange={handleChange}
          value={form.plan}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="flex items-center gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
          <input
            type="color"
            name="primaryColor"
            value={form.primaryColor}
            onChange={handleChange}
            className="w-12 h-10 p-0 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Color</label>
          <input
            type="color"
            name="secondaryColor"
            value={form.secondaryColor}
            onChange={handleChange}
            className="w-12 h-10 p-0 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
        <input
          type="file"
          name="logo"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="w-full"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Tenant'}
      </button>
    </form>
  );
}
