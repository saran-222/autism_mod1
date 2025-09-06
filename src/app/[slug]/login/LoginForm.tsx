'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Tenant } from '../../../lib/types';

interface Props {
  tenant: Tenant;
}

const LoginForm = ({ tenant }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const theme = tenant.theme || {};
  const primaryColor = theme.primaryColor 
  const secondaryColor = theme.secondaryColor 

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`/api/${tenant.slug}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid login credentials');
      }

      // Redirect logic here
      console.log('Login successful:', data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundColor: '#f9fafb',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <form onSubmit={handleLogin} className="w-full max-w-md bg-white p-8 rounded-xl shadow space-y-4">
        {tenant.logoUrl && (
          <img src={tenant.logoUrl} alt={`${tenant.name} Logo`} className="h-16 mx-auto" />
        )}

        <h1 className="text-center text-xl font-semibold">{tenant.name} Portal</h1>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm text-center p-2 rounded">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          style={{ backgroundColor: secondaryColor }}
          className="w-full py-2 text-white rounded disabled:opacity-60"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="text-sm text-center text-gray-500 mt-4">
          <p>
            Forgot password?{' '}
            <a
              href={`/reset-password?tenant=${tenant.slug}`}
              className="text-blue-600 hover:underline"
            >
              Reset here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
export default LoginForm
