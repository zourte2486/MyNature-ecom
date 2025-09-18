'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

const orderSchema = z.object({
  quantity: z.number().min(1, 'الكمية مطلوبة').max(10, 'الحد الأقصى 10 قطع'),
  customer_name: z.string().min(2, 'الاسم مطلوب'),
  customer_phone: z.string().min(10, 'رقم الهاتف غير صحيح'),
  customer_address: z.string().min(10, 'العنوان مطلوب'),
  city: z.string().min(2, 'المدينة مطلوبة').max(50, 'اسم المدينة طويل جداً'),
  notes: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

interface ProductOrderFormProps {
  product: Product;
}

export function ProductOrderForm({ product }: ProductOrderFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const totalPrice = product.price * quantity;

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);
    try {
      // Prepare order data
      const orderData = {
        customer_name: data.customer_name,
        customer_email: `${data.customer_name.replace(/\s+/g, '').toLowerCase()}@customer.local`,
        customer_phone: data.customer_phone,
        customer_address: data.customer_address,
        customer_city: data.city,
        items: [{
          product_id: product.id,
          quantity: quantity,
          price: product.price
        }],
        total_amount: totalPrice,
        notes: data.notes || ''
      };

      console.log('Form data:', data);
      console.log('Order data being sent:', orderData);

      // Additional validation
      if (!data.city || data.city.trim() === '') {
        throw new Error('المدينة مطلوبة');
      }
      
      // Submit order to API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Order creation error:', errorData);
        throw new Error(errorData.error || 'Failed to create order');
      }

      const order = await response.json();
      
      // Show success message
      alert(`تم إرسال طلبك بنجاح! رقم الطلب: ${order.id.slice(0, 8)}. سنتواصل معك قريباً.`);
      
      // Reset form
      reset();
      setQuantity(1);
    } catch (error) {
      console.error('Error submitting order:', error);
      alert(`حدث خطأ في إرسال الطلب: ${error instanceof Error ? error.message : 'يرجى المحاولة مرة أخرى'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (!product.in_stock) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-600 font-medium">هذا المنتج غير متوفر حالياً</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-honey">
      <h3 className="text-lg font-semibold text-text-primary mb-4">اطلب الآن</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Quantity Selector */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            الكمية
          </label>
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <button
              type="button"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              type="button"
              onClick={incrementQuantity}
              disabled={quantity >= 10}
              className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Customer Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              الاسم الكامل *
            </label>
            <input
              {...register('customer_name')}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="أدخل اسمك الكامل"
            />
            {errors.customer_name && (
              <p className="text-red-500 text-sm mt-1">{errors.customer_name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              رقم الهاتف *
            </label>
            <input
              {...register('customer_phone')}
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent phone"
              placeholder="06 12 34 56 78"
            />
            {errors.customer_phone && (
              <p className="text-red-500 text-sm mt-1">{errors.customer_phone.message}</p>
            )}
          </div>
        </div>


        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            العنوان *
          </label>
          <textarea
            {...register('customer_address')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="أدخل عنوانك الكامل"
          />
          {errors.customer_address && (
            <p className="text-red-500 text-sm mt-1">{errors.customer_address.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            المدينة *
          </label>
          <input
            {...register('city')}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="أدخل اسم المدينة"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            ملاحظات (اختياري)
          </label>
          <textarea
            {...register('notes')}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="أي ملاحظات إضافية..."
          />
        </div>

        {/* Total Price */}
        <div className="bg-accent rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-text-primary">المجموع:</span>
            <span className="text-2xl font-bold text-primary price">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <p className="text-sm text-text-secondary mt-1">
            {quantity} × {formatPrice(product.price)}
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
              جاري الإرسال...
            </div>
          ) : (
            <div className="flex items-center">
              <ShoppingCart className="w-5 h-5 ml-2" />
              اطلب الآن
            </div>
          )}
        </button>

        {/* Delivery Info */}
        <div className="text-center text-sm text-text-secondary">
          <p>التوصيل مجاني للطلبات أكثر من 200 درهم</p>
          <p>مدة التوصيل: 2-3 أيام عمل</p>
        </div>
      </form>
    </div>
  );
}
