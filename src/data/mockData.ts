import { Category, Product } from 'src/types';

export const CATEGORIES: Category[] = [
  {
    id: 'furniture',
    name: 'Mobilya',
    slug: 'mobilya',
    description: 'Evcil hayvanınız için el yapımı, masif ahşap ve modern tasarım mobilyalar.',
    image: '/images/dog-bed.png',
    isActive: true
  },
  {
    id: 'accessories',
    name: 'Aksesuar',
    slug: 'aksesuar',
    description: 'Birinci sınıf malzemelerle tasarlanmış şık tasmalar, mama kapları ve taşıma çantaları.',
    image: '/images/pet-bowl.png',
    isActive: true
  },
  {
    id: 'health',
    name: 'Sağlık & Vitamin',
    slug: 'saglik-vitamin',
    description: 'Tamamen organik, veteriner onaylı vitaminler, takviyeler ve bakım ürünleri.',
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=800',
    isActive: true
  },
  {
    id: 'cleaning',
    name: 'Kum & Temizlik',
    slug: 'kum-temizlik',
    description: 'Tozsuz, kokusuz organik kedi kumları ve şık tuvalet kabinleri.',
    image: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=800',
    isActive: true
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'nest-cat-tower',
    name: 'Nest Masif Meşe Kedi Kulesi',
    slug: 'nest-masif-mese-kedi-kulesi',
    description: 'Mid-century modern tarzında, masif meşe ağacından el yapımı üretilmiş premium kedi oyun ve uyku kulesi.',
    detailedDescription: `
# Estetik ve Fonksiyonelliğin Zirvesi

Nest Kedi Kulesi, evinizin dekorasyonuyla kusursuz bir uyum yakalarken evcil dostunuza benzersiz bir yaşam alanı sunmak için tasarlandı. Apple tasarım çizgisinden ilham alan minimalist yapısı, evinizin en göz alıcı mobilyası olmaya aday.

### Özellikler ve Malzeme Kalitesi

* **Doğal Malzemeler:** Tamamen FSC sertifikalı sürdürülebilir masif meşe ağacından üretilmiştir. Herhangi bir yapay kaplama veya zararlı kimyasal vernik içermez.
* **Premium Kumaşlar:** Minderlerinde kullanılan kumaşlar leke tutmaz, kolayca temizlenebilir ve OEKO-TEX sertifikalı organik yünden üretilmiştir.
* **El İşçiliği:** Her bir köşe, zanaatkarlarımız tarafından pürüzsüzleştirilmiş ve elde zımparalanmıştır.
* **Ergonomik Tasarım:** Kedi dostunuzun doğal tırmanma, tırmalama ve saklanma içgüdülerini en üst düzeyde destekler.

### Teknik Detaylar

* **Yükseklik:** 135 cm
* **Taban Alanı:** 50x50 cm
* **Minderler:** Çıkarılabilir ve 30 derecede yıkanabilir organik yün
* **Tırmalama Direği:** Doğal kalın jüt halat sarılı masif kolon
    `,
    price: 8499,
    compareAtPrice: 9999,
    categoryId: 'furniture',
    images: [
      '/images/cat-tower.png',
      'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800'
    ],
    variants: [
      {
        id: 'nest-oak-beige',
        name: 'Doğal Meşe / Ekru Yün',
        sku: 'PL-NST-OAK-BG',
        stock: 12,
        attributes: { color: 'Doğal Meşe', fabric: 'Ekru Yün' }
      },
      {
        id: 'nest-walnut-gray',
        name: 'Ceviz / Antrasit Yün',
        sku: 'PL-NST-WLN-GR',
        price: 9299,
        stock: 8,
        attributes: { color: 'Ceviz', fabric: 'Antrasit Yün' }
      }
    ],
    attributes: {
      'Malzeme': 'Masif Meşe ve Ceviz Seçeneği',
      'Yükseklik': '135 cm',
      'Menşei': 'Türkiye (El Yapımı)',
      'Garanti': '2 Yıl'
    },
    stock: 20,
    rating: 4.9,
    reviewsCount: 34,
    isFeatured: true,
    createdAt: '2026-01-15T10:00:00Z'
  },
  {
    id: 'snooze-pet-bed',
    name: 'Snooze Premium Evcil Hayvan Yatağı',
    slug: 'snooze-premium-evcil-hayvan-yatagi',
    description: 'Ortopedik visco süngerli, yüksek kaliteli keten kumaş kaplamalı ve masif ahşap ayaklı lüks pet yatağı.',
    detailedDescription: `
# Kusursuz Bir Uyku Deneyimi

Snooze, köpek ve kedilerin anatomasine uygun olarak tasarlanmış ortopedik bir yataktır. Yükseltilmiş ahşap çerçevesi, yerle teması keserek soğuktan koruma sağlar ve lüks bir uyku deneyimi sunar.

### Ortopedik Destek ve Konfor

* **Ortopedik Visco Köpük:** Evcil dostunuzun eklem ve omurga sağlığını koruyan yüksek yoğunluklu visco sünger kullanılmıştır.
* **Nefes Alabilir Premium Keten:** Dış kılıfı terletmeyen, alerjen içermeyen lüks keten kumaştır.
* **Masif Ayaklar:** Fırınlanmış gürgen ağacından üretilen ayaklar stabiliteyi ve dayanıklılığı en üst düzeye çıkarır.

### Boyut Seçenekleri

Yatağımız farklı ırklara hitap edebilmek için varyantlı olarak sunulmaktadır.
    `,
    price: 4299,
    categoryId: 'furniture',
    images: [
      '/images/dog-bed.png',
      'https://images.unsplash.com/photo-1541599540903-216a46ca1ad0?auto=format&fit=crop&q=80&w=800'
    ],
    variants: [
      {
        id: 'snooze-s-beige',
        name: 'Small / Ekru Keten',
        sku: 'PL-SNZ-S-BG',
        stock: 15,
        attributes: { size: 'Small (50x40 cm)', color: 'Ekru Keten' }
      },
      {
        id: 'snooze-m-beige',
        name: 'Medium / Ekru Keten',
        sku: 'PL-SNZ-M-BG',
        price: 4999,
        stock: 10,
        attributes: { size: 'Medium (70x55 cm)', color: 'Ekru Keten' }
      },
      {
        id: 'snooze-l-gray',
        name: 'Large / Antrasit Keten',
        sku: 'PL-SNZ-L-GR',
        price: 5799,
        stock: 5,
        attributes: { size: 'Large (90x70 cm)', color: 'Antrasit Keten' }
      }
    ],
    attributes: {
      'Sünger': 'Ortopedik Visco Sünger',
      'Kılıf': 'Fermuarlı, Yıkanabilir Lüks Keten',
      'Ayak Malzemesi': 'Masif Gürgen',
      'Montaj': 'Kolay Kurulum (Alet Gerektirmez)'
    },
    stock: 30,
    rating: 4.8,
    reviewsCount: 52,
    isFeatured: true,
    createdAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 'arc-ceramic-bowl',
    name: 'Arc Ahşap Standlı Çiftli Seramik Mama Kabı',
    slug: 'arc-ahsap-standli-ciftli-seramik-mama-kabi',
    description: 'Eğimli huş papel ahşap standı ve el yapımı çift porselen kaseleri ile minimalist beslenme ünitesi.',
    detailedDescription: `
# Sindirimi Kolaylaştıran Minimalist Tasarım

Arc Seramik Mama Kabı, evcil hayvanların doğal beslenme duruşuna (ergonomisine) uygun olarak hafif eğimli ve yükseltilmiş olarak tasarlanmıştır. Bu sayede yemek yerken boyun ve omurga üzerindeki baskıyı azaltır.

### Özellikler

* **El Yapımı Seramik:** Çift pişirim yapılmış, gıda uyumlu, kurşunsuz porselen kaseler. Mikrodalga ve bulaşık makinesinde yıkanabilir.
* **Kavisli Ahşap Stand:** Isıya ve neme dayanıklı huş papel ahşaptan preslenerek üretilmiştir. Altındaki kaydırmaz silikon pabuçlar sayesinde kayma yapmaz.
* **Kolay Temizlik:** Kaseler standından bağımsız olarak çıkarılıp kolayca temizlenebilir.
    `,
    price: 1899,
    compareAtPrice: 2200,
    categoryId: 'accessories',
    images: [
      '/images/pet-bowl.png',
      'https://images.unsplash.com/photo-1615678815958-5910c6811c25?auto=format&fit=crop&q=80&w=800'
    ],
    variants: [
      {
        id: 'arc-birch-white',
        name: 'Huş Stand / Beyaz Kase',
        sku: 'PL-ARC-BCH-WT',
        stock: 25,
        attributes: { stand: 'Doğal Huş', bowl: 'Mat Beyaz' }
      },
      {
        id: 'arc-walnut-black',
        name: 'Ceviz Stand / Siyah Kase',
        sku: 'PL-ARC-WLN-BK',
        price: 2199,
        stock: 14,
        attributes: { stand: 'Koyu Ceviz', bowl: 'Mat Siyah' }
      }
    ],
    attributes: {
      'Kase Hacmi': '2 x 400 ml',
      'Stand Malzemesi': 'Kavisli Huş Papel',
      'Kase Malzemesi': 'Premium Porselen Seramik',
      'Kaydırmaz': 'Evet (Silikon Pabuçlar Dahil)'
    },
    stock: 39,
    rating: 4.9,
    reviewsCount: 88,
    isFeatured: true,
    createdAt: '2026-03-01T12:00:00Z'
  },
  {
    id: 'halo-leather-collar',
    name: 'Halo Akıllı Pirinç Tokalı Deri Tasma',
    slug: 'halo-akilli-pirinc-tokali-deri-tasma',
    description: 'Bitkisel tabaklanmış (vegetable-tanned) İtalyan derisinden üretilmiş, pirinç tokalı ve entegre Apple AirTag yuvalı lüks tasma.',
    detailedDescription: `
# Hem Güvenli Hem Son Derece Şık

Halo Deri Tasma, zarafeti ve güvenliği bir araya getiriyor. İtalyan derisinden el yapımı üretilen bu tasma, gizli Apple AirTag yuvası sayesinde evcil dostunuzu şıklığından ödün vermeden takip etmenizi sağlar.

### Neden Halo Deri Tasma?

* **İtalyan Derisi:** Zamanla kullandıkça güzelleşen ve patine alan hakiki bitkisel tabaklanmış İtalyan derisidir. Yumuşak kenarları sayesinde köpeğinizin tüylerini dökmez ve boynunu tahriş etmez.
* **%100 Masif Pirinç:** Toka ve D-halkası döküm masif pirinçten üretilmiştir, paslanmaz ve aşınmaz.
* **Gizli AirTag Bölmesi:** Tasmanın iç kısmında yer alan güvenli ve su geçirmez cep, Apple AirTag cihazınızı gizlice yerleştirmenize olanak tanır (AirTag dahil değildir).
    `,
    price: 1499,
    categoryId: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=800'
    ],
    variants: [
      {
        id: 'halo-s-tan',
        name: 'S - Taba Deri',
        sku: 'PL-HALO-S-TN',
        stock: 20,
        attributes: { size: 'S (25-35 cm)', color: 'Taba' }
      },
      {
        id: 'halo-m-tan',
        name: 'M - Taba Deri',
        sku: 'PL-HALO-M-TN',
        stock: 18,
        attributes: { size: 'M (35-45 cm)', color: 'Taba' }
      },
      {
        id: 'halo-l-black',
        name: 'L - Siyah Deri',
        sku: 'PL-HALO-L-BK',
        price: 1599,
        stock: 12,
        attributes: { size: 'L (45-55 cm)', color: 'Siyah' }
      }
    ],
    attributes: {
      'Deri Türü': 'Bitkisel Tabaklanmış Hakiki İtalyan Derisi',
      'Metal Aksam': '%100 Masif Pirinç',
      'AirTag Uyumluluğu': 'Evet (Özel gizli yuva)',
      'Genişlik': '2.5 cm'
    },
    stock: 50,
    rating: 4.7,
    reviewsCount: 29,
    isFeatured: false,
    createdAt: '2026-03-10T12:00:00Z'
  },
  {
    id: 'bio-shield-drops',
    name: 'Bio-Shield Organik Bağışıklık Güçlendirici Damla',
    slug: 'bio-shield-organik-bagisiklik-guclendirici-damla',
    description: 'Kedi ve köpekler için propolis, ekinezya ve deve dikeni içeren veteriner formüllü %100 organik takviye.',
    detailedDescription: `
# Doğal Koruma Kalkanı

Bio-Shield, evcil dostlarımızın bağışıklık sistemini desteklemek amacıyla özel olarak formüle edilmiş sıvı bir gıda takviyesidir. Soğuk sıkım yöntemleriyle elde edilen aktif bileşenler maksimum emilim sunar.

### Aktif Bileşenler ve Faydaları

* **Organik Propolis:** Doğal bir antibiyotik ve antioksidandır. Virüs ve bakterilere karşı korur.
* **Ekinezya Özü:** Hücresel bağışıklığı destekler, mevsim geçişlerindeki halsizliği giderir.
* **Deve Dikeni (Milk Thistle):** Karaciğer fonksiyonlarını destekler, vücuttaki toksinlerin atılmasına yardımcı olur.

### Kullanım Şekli

Günde 1 kez mama veya içme suyuna evcil hayvanınızın ağırlığına göre damlatılarak kullanılır (Her 5 kg için 5 damla).
    `,
    price: 549,
    categoryId: 'health',
    images: [
      'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800'
    ],
    variants: [
      {
        id: 'bio-shield-50ml',
        name: '50 ml Damlalıklı Şişe',
        sku: 'PL-BIO-50',
        stock: 100,
        attributes: { volume: '50 ml' }
      }
    ],
    attributes: {
      'Hacim': '50 ml',
      'İçerik': 'Propolis, Ekinezya, Deve Dikeni, Vitamin C',
      'Formül': '%100 Organik & Alkol içermez',
      'Kullanım Ömrü': 'Açıldıktan sonra 6 ay'
    },
    stock: 100,
    rating: 4.8,
    reviewsCount: 112,
    isFeatured: false,
    createdAt: '2026-02-20T08:00:00Z'
  },
  {
    id: 'tofu-fresh-litter',
    name: 'Tofu-Fresh Organik Tozsuz Kedi Kumu',
    slug: 'tofu-fresh-organik-tozsuz-kedi-kumu',
    description: 'Soya liflerinden üretilmiş, yüksek emiş gücüne sahip, tuvalete atılabilir ultra topaklaşan organik kedi kumu.',
    detailedDescription: `
# Kediniz ve Gezegenimiz İçin En Doğal Tercih

Tofu-Fresh, geleneksel bentonit kumların aksine, gıda sınıfı soya liflerinden elde edilmiş çevre dostu bir kedi kumudur. Solunum yolu hassasiyeti olan kediler ve sahipleri için %100 tozsuz deneyim sunar.

### Avantajları

* **Kusursuz Topaklaşma:** Sıvıyla temas ettiği anda saniyeler içinde sıkı topaklar oluşturur. Kolayca elenir.
* **Sıfır Toz:** Kedinizin patilerine yapışmaz, evinize yayılmaz. Astım veya alerji tetiklemez.
* **Tuvalete Atılabilir:** Suda tamamen çözülebilen yapısı sayesinde kullanılmış topakları güvenle doğrudan evdeki tuvalete atıp sifonu çekebilirsiniz.
* **Koku Kontrolü:** Doğal aktif karbon ve soya kokusu sayesinde kokuyu anında hapseder.
    `,
    price: 349,
    categoryId: 'cleaning',
    images: [
      'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?auto=format&fit=crop&q=80&w=800'
    ],
    variants: [
      {
        id: 'tofu-fresh-original',
        name: 'Orijinal Soya / 6 L',
        sku: 'PL-TOFU-ORG-6',
        stock: 80,
        attributes: { scent: 'Orijinal Doğal', volume: '6 Litre (2.8 kg)' }
      },
      {
        id: 'tofu-fresh-lavender',
        name: 'Lavanta Esintili / 6 L',
        sku: 'PL-TOFU-LAV-6',
        price: 379,
        stock: 65,
        attributes: { scent: 'Doğal Lavanta', volume: '6 Litre (2.8 kg)' }
      }
    ],
    attributes: {
      'Hacim': '6 Litre',
      'Malzeme': '%100 Doğal Soya Lifleri',
      'Toz Oranı': '%0 (Tozsuz)',
      'Koku Giderme': 'Üstün Aktif Karbon Teknolojisi'
    },
    stock: 145,
    rating: 4.6,
    reviewsCount: 143,
    isFeatured: true,
    createdAt: '2026-04-01T15:00:00Z'
  }
];
