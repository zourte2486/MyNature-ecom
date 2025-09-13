'use client';

import { useState } from 'react';

export default function TestProductCreation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [testResults, setTestResults] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);

  const testVercelBlobConfig = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-vercel-blob');
      const data = await response.json();
      setTestResults({ vercelBlob: data });
    } catch {
      setTestResults({ vercelBlob: { error: 'Failed to test Vercel Blob config' } });
    }
    setLoading(false);
  };

  const testProductCreation = async () => {
    setLoading(true);
    try {
      // Create a test product
      const formData = new FormData();
      formData.append('name', 'Test Product');
      formData.append('name_ar', 'منتج تجريبي');
      formData.append('description', 'Test description');
      formData.append('description_ar', 'وصف تجريبي');
      formData.append('price', '29.99');
      formData.append('category_id', 'test-category-id');
      formData.append('stock_quantity', '10');

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setTestResults(prev => ({ ...prev, productCreation: { status: response.status, data } }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        productCreation: { 
          error: error instanceof Error ? error.message : 'Unknown error' 
        } 
      }));
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Product Creation Test
        </h1>

        <div className="space-y-6">
          {/* Vercel Blob Config Test */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">1. Test Vercel Blob Configuration</h2>
            <button
              onClick={testVercelBlobConfig}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Vercel Blob Config'}
            </button>
            
            {testResults?.vercelBlob && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <h3 className="font-semibold mb-2">Vercel Blob Config Results:</h3>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(testResults.vercelBlob, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Product Creation Test */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">2. Test Product Creation</h2>
            <button
              onClick={testProductCreation}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Testing...' : 'Test Product Creation'}
            </button>
            
            {testResults?.productCreation && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <h3 className="font-semibold mb-2">Product Creation Results:</h3>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(testResults.productCreation, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-yellow-800">Setup Instructions</h2>
            <ol className="list-decimal list-inside space-y-2 text-yellow-700">
              <li>Install Vercel Blob: <code>npm install @vercel/blob</code></li>
              <li>Copy <code>env-template.txt</code> to <code>.env.local</code></li>
              <li>Get your Vercel Blob token and add to <code>.env.local</code></li>
              <li>Restart your development server: <code>npm run dev</code></li>
              <li>Test Vercel Blob configuration first</li>
              <li>Then test product creation</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

