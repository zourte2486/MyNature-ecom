import { Heart, Award, Users, MapPin, Phone, Mail } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              من نحن
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              قصة MyNature - رحلة في عالم المنتجات الطبيعية المغربية الأصيلة
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Our Story */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-6">
                قصتنا
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  بدأت رحلة MyNature من حب عميق للطبيعة المغربية وثرواتها الطبيعية. 
                  منذ أجيال، يعمل المزارعون والمربون المغاربة على إنتاج أجود أنواع العسل 
                  والمنتجات الطبيعية، ونحن فخورون بكوننا جزء من هذا التراث العريق.
                </p>
                <p>
                  تأسست MyNature في عام 2020 بهدف ربط المستهلكين بالمنتجات الطبيعية 
                  المغربية الأصيلة. نعمل مباشرة مع المزارعين المحليين ومربي النحل 
                  لضمان جودة المنتجات وأصالتها.
                </p>
                <p>
                  نحن نؤمن بأن الطبيعة تقدم لنا أفضل ما لديها، وهدفنا هو نقل هذه 
                  الهدايا الطبيعية إليكم بأعلى معايير الجودة والشفافية.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary-200 to-primary-300 rounded-2xl flex items-center justify-center shadow-honey-lg">
                <div className="text-center">
                  <div className="text-8xl mb-4">🍯</div>
                  <div className="text-2xl font-bold text-primary-800">طبيعة مغربية أصيلة</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary-200 rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent-300 rounded-full opacity-60"></div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
            قيمنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-honey">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                الطبيعة أولاً
              </h3>
              <p className="text-text-secondary">
                نحن ملتزمون بحماية البيئة ودعم الممارسات الزراعية المستدامة
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-honey">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                الجودة المضمونة
              </h3>
              <p className="text-text-secondary">
                نضمن جودة منتجاتنا من خلال فحص دقيق ومتابعة مستمرة
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-honey">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">
                دعم المجتمع المحلي
              </h3>
              <p className="text-text-secondary">
                نعمل مباشرة مع المزارعين المحليين لدعم الاقتصاد المحلي
              </p>
            </div>
          </div>
        </section>

        {/* Our Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
            عمليتنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                الاختيار الدقيق
              </h3>
              <p className="text-text-secondary text-sm">
                نختار أفضل المنتجات من المزارعين والمربين الموثوقين
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                الفحص والتحليل
              </h3>
              <p className="text-text-secondary text-sm">
                نفحص كل منتج للتأكد من جودته وأصالته
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                التعبئة الآمنة
              </h3>
              <p className="text-text-secondary text-sm">
                نعبئ المنتجات بطريقة آمنة تحافظ على جودتها
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                التوصيل السريع
              </h3>
              <p className="text-text-secondary text-sm">
                نوصلكم المنتجات بسرعة وأمان
              </p>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
              أرقامنا تتحدث
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-text-secondary">عميل راضي</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-text-secondary">منتج طبيعي</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-text-secondary">مزارع شريك</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <div className="text-text-secondary">طبيعي</div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-12">
            تواصل معنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-honey">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                العنوان
              </h3>
              <p className="text-text-secondary">
                الدار البيضاء، المغرب
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-honey">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                الهاتف
              </h3>
              <p className="text-text-secondary phone">+212 6 12 34 56 78</p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-honey">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                البريد الإلكتروني
              </h3>
              <p className="text-text-secondary">info@mynature.ma</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
