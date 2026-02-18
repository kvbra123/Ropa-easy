
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  price: string;
  currencyCode: string;
  imageUrl: string;
  availableForSale: boolean;
}

const MOCK_PRODUCTS: ShopifyProduct[] = [
  {
    id: '1',
    title: 'NIKITA BODY OLIVE',
    handle: 'nikita-body-olive',
    price: '230.00',
    currencyCode: 'EUR',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    availableForSale: true
  },
  {
    id: '2',
    title: 'KIDDO PANT KAKI',
    handle: 'kiddo-pant-kaki',
    price: '210.00',
    currencyCode: 'EUR',
    imageUrl: 'https://images.unsplash.com/photo-1539109132381-31a077a5b23f?q=80&w=1000&auto=format&fit=crop',
    availableForSale: true
  },
  {
    id: '3',
    title: 'BEATRIX COAT',
    handle: 'beatrix-coat',
    price: '750.00',
    currencyCode: 'EUR',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop',
    availableForSale: true
  }
];

export const getFeaturedProducts = async (): Promise<ShopifyProduct[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_PRODUCTS), 600);
  });
};
