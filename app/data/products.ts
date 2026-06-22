import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'nike-1',
    name: 'Nike Air Zoom Alphafly v3',
    brand: 'Nike',
    category: 'Calzado',
    gender: 'Hombre',
    description: 'La zapatilla de running definitiva perfeccionada para batir récords mundiales. Con dos unidades de Zoom Air bajo el antepié y la espuma ZoomX, experimentarás un retorno de energía sin precedentes. La placa de fibra de carbono Flyplate de largo completo proporciona una propulsión extrema en cada pisada.',
    price: 310,
    originalPrice: 350,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Rojo Voltaje', class: 'bg-red-600', hex: '#dc2626' },
      { name: 'Cal de Neón', class: 'bg-lime-400', hex: '#a3e635' },
      { name: 'Azul Eléctrico', class: 'bg-indigo-600', hex: '#4f46e5' }
    ],
    isNew: true,
    isFeatured: true,
    discount: 11
  },
  {
    id: 'adidas-1',
    name: 'Adidas Ultraboost Light 23',
    brand: 'Adidas',
    category: 'Calzado',
    gender: 'Hombre',
    description: 'Experimenta una energía ininterrumpida con la Ultraboost Light, la Ultraboost más ligera jamás creada. El secreto reside en la entresuela Light BOOST de última generación, con una amortiguación única que responde a cada esfuerzo físico. Construida con un ajuste Primeknit+ transpirable que se adapta como un guante.',
    price: 190,
    rating: 4.8,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: [
      { name: 'Blanco Puro', class: 'bg-slate-100 border border-neutral-300', hex: '#f1f5f9' },
      { name: 'Negro Core', class: 'bg-neutral-900', hex: '#171717' }
    ],
    isFeatured: true
  },
  {
    id: 'puma-1',
    name: 'Puma Fast-R Nitro Elite 2',
    brand: 'Puma',
    category: 'Calzado',
    gender: 'Unisex',
    description: 'Presentamos la joya de la corona de Puma Motorsport y atletismo de fondo. Con tecnología NITRO elite que concentra gas nitrógeno para darte un impulso reactivo hiperligero, combinado con la placa PWRPLATE de fibra de carbono visible expuesta en el mediopié, lo cual garantiza la máxima estabilidad estructural.',
    price: 260,
    originalPrice: 280,
    rating: 4.7,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    colors: [
      { name: 'Naranja Llama', class: 'bg-orange-500', hex: '#f97316' },
      { name: 'Negro Carbón', class: 'bg-neutral-800', hex: '#262626' }
    ],
    isNew: true,
    discount: 7
  },
  {
    id: 'nike-2',
    name: 'Chaqueta Cortavientos Nike Repel Windrunner',
    brand: 'Nike',
    category: 'Ropa',
    gender: 'Hombre',
    description: 'Un clásico renovado. La chaqueta cortavientos original de running Nike Windrunner se actualiza con materiales hidrófugos de primera calidad y un diseño de ventilación optimizado en la espalda para mantener una temperatura fresca durante tus carreras bajo la lluvia o con vientos fuertes.',
    price: 110,
    rating: 4.6,
    reviewsCount: 78,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Obsidiana', class: 'bg-blue-950', hex: '#0f172a' },
      { name: 'Gris Aura', class: 'bg-gray-400', hex: '#9ca3af' }
    ],
    isFeatured: true
  },
  {
    id: 'adidas-2',
    name: 'Sudadera con Capucha Adidas Z.N.E. Premium',
    brand: 'Adidas',
    category: 'Ropa',
    gender: 'Mujer',
    description: 'Diseñada para aislarte de las distracciones en los momentos previos a la competición. Esta sudadera con capucha premium de Adidas está confeccionada con un tejido suave de triple capa de algodón y poliéster reciclado, cuello alto de máxima cobertura y un ajuste cómodo que favorece el precalentamiento óptimo.',
    price: 95,
    originalPrice: 120,
    rating: 4.8,
    reviewsCount: 167,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Blanco Crema', class: 'bg-stone-100 border border-neutral-300', hex: '#f5f5f4' },
      { name: 'Negro Sombrío', class: 'bg-stone-900', hex: '#1c1917' }
    ],
    discount: 20
  },
  {
    id: 'puma-2',
    name: 'Leggings de Compresión Puma Evostripe',
    brand: 'Puma',
    category: 'Ropa',
    gender: 'Mujer',
    description: 'Siente el soporte integral y la libertad de movimiento definitiva. Hechos con tecnología dryCELL de absorción de sudor de Puma, paneles transpirables de malla en los puntos clave de calor corporal y una cintura alta reforzada para potenciar tus entrenamientos diarios o de alta intensidad.',
    price: 65,
    rating: 4.5,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Negro Puma', class: 'bg-black', hex: '#000000' },
      { name: 'Morado Ciruela', class: 'bg-fuchsia-950', hex: '#4a044e' }
    ],
    isNew: true
  },
  {
    id: 'nike-3',
    name: 'Bolsa Deportiva Convertible Nike Utility Power',
    brand: 'Nike',
    category: 'Accesorios',
    gender: 'Unisex',
    description: 'La solución definitiva para llevar tus implementos deportivos con orden y máxima ventilación. Ofrece almacenamiento seguro con múltiples bolsillos con cremallera, asas acolchadas, compartimento para calzado sucio y material ultra-resistente que soporta la intemperie y el roce rudo.',
    price: 75,
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['Estandard (51L)'],
    colors: [
      { name: 'Verde Militar', class: 'bg-emerald-950', hex: '#022c22' },
      { name: 'Negro Táctico', class: 'bg-zinc-900', hex: '#18181b' }
    ]
  },
  {
    id: 'puma-3',
    name: 'Gorra Running Puma Lightweight Pro',
    brand: 'Puma',
    category: 'Accesorios',
    gender: 'Unisex',
    description: 'Mantén el sudor y el sol alejados de tus ojos con la gorra súper ligera diseñada junto a atletas olímpicos. Presenta cierre trasero elástico auto-ajustable, visera flexible curva de rápido secado y detalles reflectantes de alta visibilidad para garantizar protección diurna y seguridad en entornos oscuros.',
    price: 30,
    originalPrice: 38,
    rating: 4.4,
    reviewsCount: 46,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80'
    ],
    sizes: ['Ajustable'],
    colors: [
      { name: 'Gris Platino', class: 'bg-zinc-400', hex: '#a1a1aa' },
      { name: 'Blanco Nieve', class: 'bg-white border border-neutral-300', hex: '#ffffff' }
    ],
    discount: 21
  }
];

export const HERO_SLIDES = [
  {
    id: 1,
    title: 'ROMPER RÉCORDS ES HISTORIA.',
    subtitle: 'NUEVA COLECION DE MARATÓN',
    description: 'Zapatillas de fibra de carbono más rápidas del planeta para entrenar, conquistar distancias y desafiar al viento.',
    brand: 'Nike',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1600&auto=format&fit=crop&q=85',
    ctaText: 'COMPRAR COLECION',
    accentColor: 'from-orange-600 to-red-700',
    productId: 'nike-1'
  },
  {
    id: 2,
    title: 'DISEÑO MÁXIMO, CERO PESO.',
    subtitle: 'ADIDAS ULTRABOOST LIGHT',
    description: 'Siente la increíble amortiguación que responde activamente a la energía de tus pies. Diseñado para un kilómetro más sin fatiga.',
    brand: 'Adidas',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=1600&auto=format&fit=crop&q=85',
    ctaText: 'VER ULTRABOOST',
    accentColor: 'from-zinc-900 to-stone-950 border border-neutral-700',
    productId: 'adidas-1'
  },
  {
    id: 3,
    title: 'VELOCIDAD SIN PRECEDENTES.',
    subtitle: 'PUMA NITRO NITROGEN RUNNING',
    description: 'La unión perfecta entre espuma inyectada con gas nitrógeno y placas de propulsión de carbono puro. Siente el despegue inmediato.',
    brand: 'Puma',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1600&auto=format&fit=crop&q=85',
    ctaText: 'ADQUIRIR YA',
    accentColor: 'from-amber-600 to-orange-600',
    productId: 'puma-1'
  }
];