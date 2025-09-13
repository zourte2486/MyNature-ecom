'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Product, Category } from '@/lib/types';
import { useToast } from '@/components/ui/Toast';

const productSchema = z.object({
  name: z.string().min(1, 'اسم المنتج مطلوب'),
  name_ar: z.string().min(1, 'الاسم العربي مطلوب'),
  description: z.string().min(1, 'الوصف مطلوب'),
  description_ar: z.string().min(1, 'الوصف العربي مطلوب'),
  price: z.number().min(0, 'السعر يجب أن يكون أكبر من 0'),
  category_id: z.string().min(1, 'الفئة مطلوبة'),
  stock_quantity: z.number().min(0, 'الكمية يجب أن تكون أكبر من أو تساوي 0'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  categories: Category[];
  onSave: (productData: ProductFormData & { images: File[] }) => Promise<void>;
}

export function ProductForm({ isOpen, onClose, product, categories, onSave }: ProductFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const { showSuccess, showError, showLoading, hideToast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      name_ar: '',
      description: '',
      description_ar: '',
      price: 0,
      category_id: '',
      stock_quantity: 0,
    }
  });

  // Reset form when product changes
  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('name_ar', product.name_ar);
      setValue('description', product.description || '');
      setValue('description_ar', product.description_ar || '');
      setValue('price', product.price);
      setValue('category_id', product.category_id);
      setValue('stock_quantity', product.stock_quantity || 0);
    } else {
      reset();
    }
    setImages([]);
    setPreviewUrls([]);
  }, [product, setValue, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    
    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviewUrls(newUrls);
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    const loadingToast = showLoading('جاري الحفظ...', 'يرجى الانتظار');
    
    try {
      await onSave({ ...data, images });
      hideToast(loadingToast);
      showSuccess('تم الحفظ بنجاح!', product ? 'تم تحديث المنتج' : 'تم إضافة المنتج الجديد');
      onClose();
      reset();
      setImages([]);
      setPreviewUrls([]);
    } catch (error) {
      hideToast(loadingToast);
      showError('خطأ في الحفظ', 'حدث خطأ أثناء حفظ المنتج. يرجى المحاولة مرة أخرى.');
      console.error('Error saving product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-text-primary">
              {product ? 'تعديل المنتج' : 'إضافة منتج جديد'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name (English) */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  اسم المنتج (إنجليزي) *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Product Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Product Name (Arabic) */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  اسم المنتج (عربي) *
                </label>
                <input
                  {...register('name_ar')}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="اسم المنتج"
                />
                {errors.name_ar && (
                  <p className="text-red-500 text-sm mt-1">{errors.name_ar.message}</p>
                )}
              </div>

              {/* Description (English) */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  الوصف (إنجليزي) *
                </label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Product Description"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Description (Arabic) */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  الوصف (عربي) *
                </label>
                <textarea
                  {...register('description_ar')}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="وصف المنتج"
                />
                {errors.description_ar && (
                  <p className="text-red-500 text-sm mt-1">{errors.description_ar.message}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  السعر (درهم) *
                </label>
                <input
                  {...register('price', { 
                    valueAsNumber: true,
                    setValueAs: (value) => parseFloat(value) || 0
                  })}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*\.?[0-9]*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  الفئة *
                </label>
                <select
                  {...register('category_id')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">اختر الفئة</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name_ar || category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>
                )}
              </div>

              {/* Stock Quantity */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  الكمية في المخزون *
                </label>
                <input
                  {...register('stock_quantity', { 
                    valueAsNumber: true,
                    setValueAs: (value) => parseInt(value) || 0
                  })}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="0"
                />
                {errors.stock_quantity && (
                  <p className="text-red-500 text-sm mt-1">{errors.stock_quantity.message}</p>
                )}
              </div>

            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                صور المنتج
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium"
                >
                  اختر الصور
                </label>
                <p className="text-sm text-gray-500 mt-1">
                  يمكنك اختيار عدة صور
                </p>
              </div>

              {/* Image Previews */}
              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={url}
                        alt={`Preview ${index + 1}`}
                        width={96}
                        height={96}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 space-x-reverse pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                {product ? 'حفظ التغييرات' : 'إضافة المنتج'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
