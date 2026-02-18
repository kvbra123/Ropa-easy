
// Configuración para el Storefront API de Shopify
const SHOPIFY_DOMAIN = 'tu-tienda.myshopify.com';
const STOREFRONT_ACCESS_TOKEN = 'tu_access_token';

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  price: string;
  currencyCode: string;
  imageUrl: string;
  availableForSale: boolean;
}

// Datos de ejemplo basados en la estética Bécane
const MOCK_PRODUCTS: ShopifyProduct[] = [
  {
    id: '1',
    title: 'NIKITA BODY OLIVE',
    handle: 'nikita-body-olive',
    price: '230.00',
    currencyCode: 'EUR',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0905/9637/6920/files/P250317104650-1-TIFF-14_400x.jpg',
    availableForSale: true
  },
  {
    id: '2',
    title: 'KIDDO PANT KAKI',
    handle: 'kiddo-pant-kaki',
    price: '210.00',
    currencyCode: 'EUR',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0905/9637/6920/files/P250317115446-1-TIFF-17_400x.jpg',
    availableForSale: true
  },
  {
    id: '3',
    title: 'BEATRIX COAT',
    handle: 'beatrix-coat',
    price: '750.00',
    currencyCode: 'EUR',
    imageUrl: 'https://cdn.shopify.com/s/files/1/0905/9637/6920/files/P250317115446-1-TIFF-1_400x.jpg',
    availableForSale: true
  }
];

export const getFeaturedProducts = async (): Promise<ShopifyProduct[]> => {
  // En producción, aquí harías el fetch al API de Shopify
  // const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2023-01/graphql.json`, { ... });
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_PRODUCTS), 800);
  });
};
