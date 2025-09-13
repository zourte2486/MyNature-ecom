'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  phone: z.string().min(10, 'رقم الهاتف غير صحيح'),
  subject: z.string().min(5, 'الموضوع مطلوب'),
  message: z.string().min(10, 'الرسالة مطلوبة'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would submit the contact form to Supabase or email service
      console.log('Contact form data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
      
      // Reset form
      reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              اتصل بنا
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              نحن هنا لمساعدتك. تواصل معنا لأي استفسار أو طلب
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-honey p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-6">
              أرسل لنا رسالة
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    الاسم الكامل *
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="أدخل اسمك الكامل"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    البريد الإلكتروني *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  رقم الهاتف *
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent phone"
                  placeholder="06 12 34 56 78"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  الموضوع *
                </label>
                <select
                  {...register('subject')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">اختر الموضوع</option>
                  <option value="استفسار عن منتج">استفسار عن منتج</option>
                  <option value="طلب خاص">طلب خاص</option>
                  <option value="شكوى">شكوى</option>
                  <option value="اقتراح">اقتراح</option>
                  <option value="أخرى">أخرى</option>
                </select>
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  الرسالة *
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="اكتب رسالتك هنا..."
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

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
                    <Send className="w-5 h-5 ml-2" />
                    إرسال الرسالة
                  </div>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow-honey p-8">
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                معلومات الاتصال
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">العنوان</h3>
                    <p className="text-text-secondary">
                      الدار البيضاء، المغرب<br />
                      شارع محمد الخامس، رقم 123
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">الهاتف</h3>
                    <p className="text-text-secondary phone">+212 6 12 34 56 78</p>
                    <p className="text-text-secondary phone">+212 5 22 33 44 55</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">البريد الإلكتروني</h3>
                    <p className="text-text-secondary">info@mynature.ma</p>
                    <p className="text-text-secondary">support@mynature.ma</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary mb-1">ساعات العمل</h3>
                    <p className="text-text-secondary">
                      الأحد - الخميس: 9:00 - 18:00<br />
                      الجمعة: 9:00 - 12:00<br />
                      السبت: مغلق
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-text-primary mb-6">
                أسئلة شائعة
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">
                    ما هي مدة التوصيل؟
                  </h3>
                  <p className="text-text-secondary text-sm">
                    مدة التوصيل 2-3 أيام عمل داخل الدار البيضاء، و3-5 أيام للمدن الأخرى.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-text-primary mb-2">
                    هل التوصيل مجاني؟
                  </h3>
                  <p className="text-text-secondary text-sm">
                    نعم، التوصيل مجاني للطلبات أكثر من 200 درهم.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-text-primary mb-2">
                    كيف يمكنني تتبع طلبي؟
                  </h3>
                  <p className="text-text-secondary text-sm">
                    سنرسل لك رقم التتبع عبر الرسائل النصية عند شحن طلبك.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
