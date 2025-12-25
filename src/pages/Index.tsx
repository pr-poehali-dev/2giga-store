import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

type Product = {
  id: number;
  name: string;
  category: 'cpu' | 'gpu' | 'ram' | 'motherboard' | 'ssd';
  price: number;
  specs: {
    brand?: string;
    cores?: number;
    frequency?: string;
    memory?: string;
    interface?: string;
    capacity?: string;
    speed?: string;
  };
  image: string;
};

type Staff = {
  id: number;
  name: string;
  position: string;
  experience: string;
  specialization: string;
  photo: string;
};

type Article = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
};

const ProductImage = ({ type }: { type: string }) => {
  const iconMap: { [key: string]: string } = {
    cpu: 'Cpu',
    gpu: 'MonitorUp',
    ram: 'MemoryStick',
    motherboard: 'Microchip',
    ssd: 'HardDrive'
  };
  
  return (
    <div className="flex items-center justify-center h-24 mb-4 bg-muted/30 rounded-lg">
      <Icon name={iconMap[type] || 'Package'} size={48} className="text-primary" />
    </div>
  );
};

const products: Product[] = [
  {
    id: 1,
    name: 'Intel Core i9-13900K',
    category: 'cpu',
    price: 54990,
    specs: { brand: 'Intel', cores: 24, frequency: '3.0 - 5.8 ГГц' },
    image: 'cpu'
  },
  {
    id: 2,
    name: 'AMD Ryzen 9 7950X',
    category: 'cpu',
    price: 49990,
    specs: { brand: 'AMD', cores: 16, frequency: '4.5 - 5.7 ГГц' },
    image: 'cpu'
  },
  {
    id: 3,
    name: 'NVIDIA RTX 4090',
    category: 'gpu',
    price: 189990,
    specs: { brand: 'NVIDIA', memory: '24 ГБ GDDR6X' },
    image: 'gpu'
  },
  {
    id: 4,
    name: 'AMD Radeon RX 7900 XTX',
    category: 'gpu',
    price: 99990,
    specs: { brand: 'AMD', memory: '24 ГБ GDDR6' },
    image: 'gpu'
  },
  {
    id: 5,
    name: 'Kingston Fury 32GB DDR5',
    category: 'ram',
    price: 12990,
    specs: { brand: 'Kingston', capacity: '32 ГБ', speed: '6000 МГц' },
    image: 'ram'
  },
  {
    id: 6,
    name: 'ASUS ROG Strix Z790-E',
    category: 'motherboard',
    price: 34990,
    specs: { brand: 'ASUS', interface: 'LGA1700' },
    image: 'motherboard'
  },
  {
    id: 7,
    name: 'Samsung 990 PRO 2TB',
    category: 'ssd',
    price: 15990,
    specs: { brand: 'Samsung', capacity: '2 ТБ', speed: '7450 МБ/с' },
    image: 'ssd'
  },
  {
    id: 8,
    name: 'WD Black SN850X 1TB',
    category: 'ssd',
    price: 9990,
    specs: { brand: 'Western Digital', capacity: '1 ТБ', speed: '7300 МБ/с' },
    image: 'ssd'
  }
];

const staff: Staff[] = [
  {
    id: 1,
    name: 'Алексей Петров',
    position: 'Старший консультант',
    experience: '8 лет в IT-индустрии',
    specialization: 'Процессоры и материнские платы',
    photo: '👨‍💼'
  },
  {
    id: 2,
    name: 'Мария Иванова',
    position: 'Специалист по видеокартам',
    experience: '5 лет опыта',
    specialization: 'GPU и игровые сборки',
    photo: '👩‍💼'
  },
  {
    id: 3,
    name: 'Дмитрий Смирнов',
    position: 'Консультант по накопителям',
    experience: '6 лет работы',
    specialization: 'SSD и системы хранения данных',
    photo: '👨‍💼'
  }
];

const articles: Article[] = [
  {
    id: 1,
    title: 'Как выбрать процессор в 2024 году',
    excerpt: 'Подробное руководство по выбору CPU для различных задач: от офисной работы до профессионального гейминга.',
    date: '15 декабря 2024',
    category: 'Процессоры'
  },
  {
    id: 2,
    title: 'DDR5 vs DDR4: стоит ли переходить?',
    excerpt: 'Сравнение технологий памяти нового и предыдущего поколений. Реальные тесты производительности.',
    date: '10 декабря 2024',
    category: 'Память'
  },
  {
    id: 3,
    title: 'NVMe SSD: скорость и надёжность',
    excerpt: 'Всё о технологии NVMe: преимущества перед SATA, выбор правильного накопителя для ваших задач.',
    date: '5 декабря 2024',
    category: 'Накопители'
  }
];

const categoryNames = {
  cpu: 'Процессоры',
  gpu: 'Видеокарты',
  ram: 'Память',
  motherboard: 'Материнские платы',
  ssd: 'SSD'
};

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [compareItems, setCompareItems] = useState<number[]>([]);
  const [activeSection, setActiveSection] = useState<string>('products');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const compareProducts = products.filter(p => compareItems.includes(p.id));

  const toggleCompare = (id: number) => {
    if (compareItems.includes(id)) {
      setCompareItems(compareItems.filter(item => item !== id));
    } else if (compareItems.length < 4) {
      setCompareItems([...compareItems, id]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Cpu" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold">2giga</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <button 
                onClick={() => setActiveSection('products')}
                className={`hover:text-primary transition-colors ${activeSection === 'products' ? 'text-primary font-medium' : ''}`}
              >
                Товары
              </button>
              <button 
                onClick={() => setActiveSection('staff')}
                className={`hover:text-primary transition-colors ${activeSection === 'staff' ? 'text-primary font-medium' : ''}`}
              >
                Персонал
              </button>
              <button 
                onClick={() => setActiveSection('articles')}
                className={`hover:text-primary transition-colors ${activeSection === 'articles' ? 'text-primary font-medium' : ''}`}
              >
                Статьи
              </button>
              <button 
                onClick={() => setActiveSection('contact')}
                className={`hover:text-primary transition-colors ${activeSection === 'contact' ? 'text-primary font-medium' : ''}`}
              >
                Контакты
              </button>
            </nav>
            <Button variant="outline" size="sm">
              <Icon name="ShoppingCart" size={18} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'products' && (
          <>
            <section className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-4">Компьютерные комплектующие</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Процессоры, видеокарты, память и накопители от ведущих производителей
                </p>
              </div>

              <div className="flex gap-2 mb-6 flex-wrap justify-center">
                <Button 
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('all')}
                >
                  Все товары
                </Button>
                <Button 
                  variant={selectedCategory === 'cpu' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('cpu')}
                >
                  <Icon name="Cpu" size={16} className="mr-2" />
                  Процессоры
                </Button>
                <Button 
                  variant={selectedCategory === 'gpu' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('gpu')}
                >
                  <Icon name="MonitorUp" size={16} className="mr-2" />
                  Видеокарты
                </Button>
                <Button 
                  variant={selectedCategory === 'ram' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('ram')}
                >
                  <Icon name="MemoryStick" size={16} className="mr-2" />
                  Память
                </Button>
                <Button 
                  variant={selectedCategory === 'motherboard' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('motherboard')}
                >
                  <Icon name="Microchip" size={16} className="mr-2" />
                  Материнские платы
                </Button>
                <Button 
                  variant={selectedCategory === 'ssd' ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory('ssd')}
                >
                  <Icon name="HardDrive" size={16} className="mr-2" />
                  SSD
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="p-6 hover:shadow-lg transition-all hover-scale">
                    <ProductImage type={product.image} />
                    <Badge className="mb-2">{categoryNames[product.category]}</Badge>
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <div className="text-sm text-muted-foreground mb-4 space-y-1">
                      {product.specs.brand && <div>Бренд: {product.specs.brand}</div>}
                      {product.specs.cores && <div>Ядер: {product.specs.cores}</div>}
                      {product.specs.frequency && <div>Частота: {product.specs.frequency}</div>}
                      {product.specs.memory && <div>Память: {product.specs.memory}</div>}
                      {product.specs.capacity && <div>Объём: {product.specs.capacity}</div>}
                      {product.specs.speed && <div>Скорость: {product.specs.speed}</div>}
                      {product.specs.interface && <div>Разъём: {product.specs.interface}</div>}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</span>
                      <div className="flex items-center gap-2">
                        <Checkbox 
                          checked={compareItems.includes(product.id)}
                          onCheckedChange={() => toggleCompare(product.id)}
                          disabled={!compareItems.includes(product.id) && compareItems.length >= 4}
                        />
                        <span className="text-xs text-muted-foreground">Сравнить</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {compareItems.length > 0 && (
              <section className="mb-12">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">Сравнение комплектующих</h3>
                    <Button variant="outline" size="sm" onClick={() => setCompareItems([])}>
                      Очистить
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">Характеристика</th>
                          {compareProducts.map(p => (
                            <th key={p.id} className="text-left py-3 px-2">{p.name}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-2 font-medium">Категория</td>
                          {compareProducts.map(p => (
                            <td key={p.id} className="py-3 px-2">{categoryNames[p.category]}</td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-2 font-medium">Цена</td>
                          {compareProducts.map(p => (
                            <td key={p.id} className="py-3 px-2 text-primary font-bold">{p.price.toLocaleString()} ₽</td>
                          ))}
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-2 font-medium">Бренд</td>
                          {compareProducts.map(p => (
                            <td key={p.id} className="py-3 px-2">{p.specs.brand || '—'}</td>
                          ))}
                        </tr>
                        {compareProducts.some(p => p.specs.cores) && (
                          <tr className="border-b">
                            <td className="py-3 px-2 font-medium">Ядра</td>
                            {compareProducts.map(p => (
                              <td key={p.id} className="py-3 px-2">{p.specs.cores || '—'}</td>
                            ))}
                          </tr>
                        )}
                        {compareProducts.some(p => p.specs.frequency) && (
                          <tr className="border-b">
                            <td className="py-3 px-2 font-medium">Частота</td>
                            {compareProducts.map(p => (
                              <td key={p.id} className="py-3 px-2">{p.specs.frequency || '—'}</td>
                            ))}
                          </tr>
                        )}
                        {compareProducts.some(p => p.specs.memory) && (
                          <tr className="border-b">
                            <td className="py-3 px-2 font-medium">Память</td>
                            {compareProducts.map(p => (
                              <td key={p.id} className="py-3 px-2">{p.specs.memory || '—'}</td>
                            ))}
                          </tr>
                        )}
                        {compareProducts.some(p => p.specs.capacity) && (
                          <tr className="border-b">
                            <td className="py-3 px-2 font-medium">Объём</td>
                            {compareProducts.map(p => (
                              <td key={p.id} className="py-3 px-2">{p.specs.capacity || '—'}</td>
                            ))}
                          </tr>
                        )}
                        {compareProducts.some(p => p.specs.speed) && (
                          <tr className="border-b">
                            <td className="py-3 px-2 font-medium">Скорость</td>
                            {compareProducts.map(p => (
                              <td key={p.id} className="py-3 px-2">{p.specs.speed || '—'}</td>
                            ))}
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </section>
            )}
          </>
        )}

        {activeSection === 'staff' && (
          <section>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Наша команда</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Профессионалы с многолетним опытом помогут выбрать идеальные комплектующие
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {staff.map(member => (
                <Card key={member.id} className="p-6 text-center hover:shadow-lg transition-all hover-scale">
                  <div className="text-8xl mb-4">{member.photo}</div>
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">{member.position}</Badge>
                  <p className="text-sm text-muted-foreground mb-2">
                    <Icon name="Briefcase" size={14} className="inline mr-1" />
                    {member.experience}
                  </p>
                  <p className="text-sm">
                    <Icon name="Award" size={14} className="inline mr-1" />
                    {member.specialization}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'articles' && (
          <section>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Статьи о технологиях</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Полезная информация для правильного выбора комплектующих
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {articles.map(article => (
                <Card key={article.id} className="p-6 hover:shadow-lg transition-all hover-scale cursor-pointer">
                  <Badge className="mb-3">{article.category}</Badge>
                  <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Icon name="Calendar" size={14} className="mr-1" />
                    {article.date}
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'contact' && (
          <section>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Контакты</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Свяжитесь с нами любым удобным способом
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-6">
                <h3 className="text-2xl font-bold mb-6">Форма обратной связи</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Имя</label>
                    <Input placeholder="Ваше имя" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input type="email" placeholder="example@mail.ru" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Сообщение</label>
                    <Textarea placeholder="Ваш вопрос или комментарий" rows={5} />
                  </div>
                  <Button className="w-full">
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить
                  </Button>
                </div>
              </Card>

              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4">Контактная информация</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Icon name="MapPin" size={20} className="text-primary mt-1" />
                      <div>
                        <p className="font-medium">Адрес</p>
                        <p className="text-sm text-muted-foreground">г. Тверь, ул. Горького, д. 8</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Phone" size={20} className="text-primary mt-1" />
                      <div>
                        <p className="font-medium">Телефон</p>
                        <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Mail" size={20} className="text-primary mt-1" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">info@2giga.ru</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Clock" size={20} className="text-primary mt-1" />
                      <div>
                        <p className="font-medium">Часы работы</p>
                        <p className="text-sm text-muted-foreground">Пн-Пт: 10:00 - 20:00<br />Сб-Вс: 11:00 - 18:00</p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-0 overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/files/Screenshot_1.png" 
                    alt="Карта расположения магазина 2giga" 
                    className="w-full h-64 object-cover"
                  />
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="border-t mt-16 py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 2giga. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}