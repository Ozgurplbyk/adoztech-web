const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src/i18n/locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

const blogPostsEn = {
  "post1Title": "The Future of Web Development in 2026: Trends That Define the Next Era",
  "post1Desc": "From server components to edge computing, explore the technologies reshaping web development and what they mean for your business.",
  "post2Title": "Building Scalable Mobile Apps: Architecture Patterns That Work",
  "post2Desc": "Learn the architectural decisions that separate apps with 100 users from those serving millions — without sacrificing development speed.",
  "post3Title": "How AI Is Transforming Small Business Operations",
  "post3Desc": "Artificial intelligence is no longer just for tech giants. Discover practical AI applications that can streamline your small business today.",
  "post4Title": "Designing for Accessibility: Why Inclusive Design Is Premium Design",
  "post4Desc": "Accessibility is not a feature — it is a quality standard. Learn how inclusive design principles lead to better products for everyone.",
  "post5Title": "Social Media Strategy in 2026: Beyond Likes and Followers",
  "post5Desc": "The metrics that matter have changed. Learn how to build a social media strategy that drives real business results.",
  "post6Title": "The Digital Growth Playbook: From Zero to Market Leader",
  "post6Desc": "A comprehensive guide to digital transformation — from building your online presence to dominating your market through technology.",
  "post7Title": "React Native vs Flutter in 2026: Making the Right Choice",
  "post7Desc": "An honest comparison of the two dominant cross-platform frameworks, based on real project experience and performance data.",
  "post8Title": "Technical SEO Guide: The Foundation Your Website Needs",
  "post8Desc": "Great content means nothing if search engines cannot find and index it. Master the technical fundamentals of SEO.",
  "post9Title": "AI-Powered Customer Experience: The New Frontier",
  "post9Desc": "From intelligent chatbots to personalized recommendations, discover how AI is redefining what customers expect from digital interactions.",
  "post10Title": "Building a Brand Identity in the Digital Age",
  "post10Desc": "Your brand is more than a logo. Learn how to build a cohesive digital identity that resonates across every touchpoint.",
  "post11Title": "Leadership in the AI Revolution: The New Course for Companies",
  "post11Desc": "As a CEO, adapting to the rapid pace of AI is non-negotiable. Learn our strategic framework for implementing AI across business units safely and effectively.",
  "post12Title": "Future Digital Agencies: At the Intersection of Tech and Design",
  "post12Desc": "Why the traditional agency model is dead, and how hybrid tech-design studios like Adoztech are leading the charge in delivering true digital transformation."
};

const blogPostsTr = {
  "post1Title": "2026'da Web Geliştirmenin Geleceği: Yeni Çağı Belirleyen Trendler",
  "post1Desc": "Sunucu bileşenlerinden uç bilişime kadar, web geliştirmeyi yeniden şekillendiren teknolojileri ve işiniz için ne anlama geldiklerini keşfedin.",
  "post2Title": "Ölçeklenebilir Mobil Uygulamalar Geliştirmek: İşe Yarayan Mimari Kalıplar",
  "post2Desc": "Geliştirme hızından ödün vermeden, 100 kullanıcılı uygulamaları milyonlara hizmet verenlerden ayıran mimari kararları öğrenin.",
  "post3Title": "Yapay Zeka Küçük İşletme Operasyonlarını Nasıl Dönüştürüyor",
  "post3Desc": "Yapay zeka artık sadece teknoloji devleri için değil. Bugün küçük işletmenizi kolaylaştırabilecek pratik YZ uygulamalarını keşfedin.",
  "post4Title": "Erişilebilirlik İçin Tasarım: Kapsayıcı Tasarım Neden Premium Tasarımdır",
  "post4Desc": "Erişilebilirlik bir özellik değildir, bir kalite standardıdır. Kapsayıcı tasarım ilkelerinin herkes için nasıl daha iyi ürünlere dönüştüğünü öğrenin.",
  "post5Title": "2026'da Sosyal Medya Stratejisi: Beğenilerin ve Takipçilerin Ötesinde",
  "post5Desc": "Önemli olan metrikler değişti. Gerçek iş sonuçları getiren bir sosyal medya stratejisi oluşturmayı öğrenin.",
  "post6Title": "Dijital Büyüme Rehberi: Sıfırdan Pazar Liderliğine",
  "post6Desc": "Dijital varlığınızı oluşturmaktan teknolojiyi kullanarak pazarınızı domine etmeye kadar kapsamlı bir dijital dönüşüm rehberi.",
  "post7Title": "React Native vs Flutter 2026: Doğru Seçimi Yapmak",
  "post7Desc": "Gerçek proje deneyimine ve performans verilerine dayanan, baskın iki çapraz platform çerçevesinin dürüst bir karşılaştırması.",
  "post8Title": "Teknik SEO Kılavuzu: Web Sitenizin İhtiyacı Olan Temel",
  "post8Desc": "Arama motorları bulup indeksleyemiyorsa, harika içerik hiçbir şey ifade etmez. SEO'nun teknik temellerinde ustalaşın.",
  "post9Title": "Yapay Zeka Destekli Müşteri Deneyimi: Yeni Sınır",
  "post9Desc": "Akıllı chatbot'lardan kişiselleştirilmiş önerilere kadar, yapay zekanın müşterilerin dijital etkileşimlerden beklentilerini nasıl yeniden tanımladığını keşfedin.",
  "post10Title": "Dijital Çağda Marka Kimliği Oluşturmak",
  "post10Desc": "Markanız bir logodan daha fazlasıdır. Her temas noktasında yankı uyandıran tutarlı bir dijital kimlik oluşturmayı öğrenin.",
  "post11Title": "Yapay Zeka Devriminde Liderlik: Şirketlerin Yeni Rotası",
  "post11Desc": "Bir CEO olarak YZ'nin hızlı gelişimine uyum sağlamak tartışılamaz. YZ'yi iş birimlerinde güvenli ve etkili bir şekilde uygulamak için stratejik çerçevemizi öğrenin.",
  "post12Title": "Geleceğin Dijital Ajansları: Teknoloji ve Tasarımın Kesişiminde",
  "post12Desc": "Geleneksel ajans modelinin neden öldüğünü ve Adoztech gibi hibrit teknoloji-tasarım stüdyolarının gerçek dijital dönüşümü sağlamada nasıl öncülük ettiğini öğrenin."
};

for (const file of files) {
  const filePath = path.join(localesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const isTr = file === 'tr.json';
  
  if (!data.blogposts) {
    data.blogposts = {};
  }
  
  // Apply blog translations
  const blogData = isTr ? blogPostsTr : blogPostsEn;
  data.blogposts = blogData;
  
  // Location
  if (data.contact) {
    if (isTr) {
      data.contact.location = "İstanbul, Türkiye";
    } else {
      data.contact.location = "Istanbul, Turkey";
    }
  }

  // Footer Heart Note
  if (data.footer) {
    if (isTr) {
      data.footer.madeWith = "Adoztech tarafından <span class='heart-icon' style='color: var(--color-primary-400)'>♥</span> ile yapıldı";
    } else {
      data.footer.madeWith = "Made with <span class='heart-icon' style='color: var(--color-primary-400)'>♥</span> by Adoztech";
    }
  }
  
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
}
console.log("Locales updated!");
