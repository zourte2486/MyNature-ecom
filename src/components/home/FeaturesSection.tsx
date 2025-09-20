import { Award, Leaf, Truck, Headphones } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'جودة عالية',
    titleEn: 'High Quality',
    description: 'منتجاتنا مختارة بعناية من أفضل المزارع والمربين المغاربة',
    descriptionEn: 'Our products are carefully selected from the best Moroccan farms and beekeepers'
  },
  {
    icon: Leaf,
    title: '100% طبيعي',
    titleEn: '100% Natural',
    description: 'جميع منتجاتنا طبيعية 100% بدون أي إضافات كيميائية أو مواد حافظة',
    descriptionEn: 'All our products are 100% natural without any chemical additives or preservatives'
  },
  {
    icon: Truck,
    title: 'توصيل سريع',
    titleEn: 'Fast Delivery',
    description: 'نقدم خدمة توصيل سريعة وآمنة لجميع أنحاء المملكة المغربية',
    descriptionEn: 'We provide fast and secure delivery service throughout the Kingdom of Morocco'
  },
  {
    icon: Headphones,
    title: 'دعم عملاء',
    titleEn: 'Customer Support',
    description: 'فريق دعم العملاء متاح لمساعدتك في أي وقت من الأوقات',
    descriptionEn: 'Our customer support team is available to help you at any time'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">
            لماذا تختار MyNature؟
          </h2>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            نحن ملتزمون بتقديم أفضل تجربة تسوق للمنتجات الطبيعية المغربية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-amber-100"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-amber-700 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">
                تراث طبيعي مغربي أصيل
              </h3>
              <p className="text-amber-700 mb-6">
                منذ أجيال، يعمل المزارعون والمربون المغاربة على إنتاج أجود أنواع العسل والمنتجات الطبيعية. 
                نحن فخورون بكوننا جزء من هذا التراث العريق ونعمل على نقله للأجيال القادمة.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-sm text-amber-700">
                  <div className="w-2 h-2 bg-amber-600 rounded-full ml-2"></div>
                  عسل طبيعي من جبال الأطلس
                </div>
                <div className="flex items-center text-sm text-amber-700">
                  <div className="w-2 h-2 bg-amber-600 rounded-full ml-2"></div>
                  زيت أركان معصور على البارد
                </div>
                <div className="flex items-center text-sm text-amber-700">
                  <div className="w-2 h-2 bg-amber-600 rounded-full ml-2"></div>
                  أعشاب طبية تقليدية
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="w-48 h-48 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <div className="text-6xl">🍯</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
