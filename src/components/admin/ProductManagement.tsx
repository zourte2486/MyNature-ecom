'use client';

import { useState, useEffect } from 'react';
import { formatPrice } from '@/lib/utils';
import { Edit, Trash2, Search, Plus } from 'lucide-react';
import { Product, Category } from '@/lib/types';
import { useToast } from '@/components/ui/Toast';
import { ProductForm } from './ProductForm';

interface ProductManagementProps {
  products: Product[];
  categories: Category[];
}

export function ProductManagement({ products: initialProducts, categories }: ProductManagementProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { showSuccess, showError, showLoading, hideToast } = useToast();


  // Update products when props change
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && product.is_active) ||
                         (filterStatus === 'inactive' && !product.is_active) ||
                         (filterStatus === 'in_stock' && product.in_stock) ||
                         (filterStatus === 'out_of_stock' && !product.in_stock);
    
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleSave = async (productData: {
    name: string;
    name_ar: string;
    description: string;
    description_ar: string;
    price: number;
    category_id: string;
    stock_quantity: number;
    images: File[];
  }) => {
    const loadingToast = showLoading('جاري الحفظ...', 'يرجى الانتظار');
    
    try {
      // Create FormData for file uploads
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('name_ar', productData.name_ar);
      formData.append('description', productData.description);
      formData.append('description_ar', productData.description_ar);
      formData.append('price', productData.price.toString());
      formData.append('category_id', productData.category_id);
      formData.append('stock_quantity', productData.stock_quantity.toString());
      
      // Append images
      productData.images.forEach((image) => {
        formData.append('images', image);
      });

      if (editingProduct) {
        // Update existing product
        const response = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: 'PUT',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Update product failed:', response.status, errorData);
          throw new Error(errorData.error || `Failed to update product (${response.status})`);
        }

        const updatedProduct = await response.json();
        setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
        hideToast(loadingToast);
        showSuccess('تم التحديث بنجاح!', 'تم تحديث المنتج بنجاح');
      } else {
        // Create new product
        const response = await fetch('/api/admin/products', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Create product failed:', response.status, errorData);
          throw new Error(errorData.error || `Failed to create product (${response.status})`);
        }

        const newProduct = await response.json();
        setProducts([newProduct, ...products]);
        hideToast(loadingToast);
        showSuccess('تم الإضافة بنجاح!', 'تم إضافة المنتج الجديد بنجاح');
      }
    } catch (error) {
      hideToast(loadingToast);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      showError('خطأ في الحفظ', `حدث خطأ أثناء حفظ المنتج: ${errorMessage}`);
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (productId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      const loadingToast = showLoading('جاري الحذف...', 'يرجى الانتظار');
      
      try {
        const response = await fetch(`/api/admin/products/${productId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        setProducts(products.filter(p => p.id !== productId));
        hideToast(loadingToast);
        showSuccess('تم الحذف بنجاح!', 'تم حذف المنتج بنجاح');
      } catch (error) {
        hideToast(loadingToast);
        showError('خطأ في الحذف', 'حدث خطأ أثناء حذف المنتج. يرجى المحاولة مرة أخرى.');
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleToggleStatus = async (product: Product) => {
    const loadingToast = showLoading('جاري التحديث...', 'يرجى الانتظار');
    
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !product.is_active }),
      });

      if (!response.ok) {
        throw new Error('Failed to update product status');
      }

      const updatedProduct = await response.json();
      setProducts(products.map(p => 
        p.id === product.id ? updatedProduct : p
      ));
      hideToast(loadingToast);
      showSuccess('تم التحديث بنجاح!', `تم ${product.is_active ? 'إلغاء تفعيل' : 'تفعيل'} المنتج`);
    } catch (error) {
      hideToast(loadingToast);
      showError('خطأ في التحديث', 'حدث خطأ أثناء تحديث حالة المنتج. يرجى المحاولة مرة أخرى.');
      console.error('Error updating product status:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="البحث في المنتجات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">جميع المنتجات</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
            <option value="in_stock">متوفر</option>
            <option value="out_of_stock">غير متوفر</option>
          </select>
          
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Plus className="w-4 h-4" />
            إضافة منتج
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المنتج
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الفئة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  السعر
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المخزون
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    لا توجد منتجات
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.name_ar || product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.name !== product.name_ar ? product.name : ''}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.category?.name_ar || product.category?.name || 'غير محدد'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.stock_quantity || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.is_active ? 'نشط' : 'غير نشط'}
                        </span>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.in_stock 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {product.in_stock ? 'متوفر' : 'غير متوفر'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2 space-x-reverse">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="تعديل المنتج"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(product)}
                          className={`${
                            product.is_active 
                              ? 'text-red-600 hover:text-red-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                          title={product.is_active ? 'إلغاء التفعيل' : 'تفعيل'}
                        >
                          {product.is_active ? 'إلغاء التفعيل' : 'تفعيل'}
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900"
                          title="حذف المنتج"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


      {/* Product Form Modal */}
      <ProductForm
        isOpen={showForm}
        onClose={handleCloseForm}
        product={editingProduct}
        categories={categories}
        onSave={handleSave}
      />
    </div>
  );
}