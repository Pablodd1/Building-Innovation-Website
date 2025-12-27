
export interface Product {
  id: string;
  title: string;
  collection: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  price: number;
  type: 'interior' | 'exterior';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CarouselItem {
  id: number;
  image: string;
  title: string;
}
