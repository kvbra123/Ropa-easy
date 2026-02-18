
// Configuración para el Storefront API de Shopify
// Estos valores deben ser configurados en el entorno de Shopify o .env
const SHOPIFY_DOMAIN = window.location.hostname;

interface ShopifyGlobal {
  storefrontAccessToken?: string;
}

const STOREFRONT_ACCESS_TOKEN = (window as unknown as { Shopify?: ShopifyGlobal }).Shopify?.storefrontAccessToken || '';

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  price: string;
  currencyCode: string;
  imageUrl: string;
  availableForSale: boolean;
}

export const getFeaturedProducts = async (): Promise<ShopifyProduct[]> => {
  const query = `
    {
      products(first: 8) {
        edges {
          node {
            id
            title
            handle
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    // Si no hay token, devolvemos mock data para desarrollo, pero avisamos
    if (!STOREFRONT_ACCESS_TOKEN) {
      console.warn('Shopify Storefront Access Token no encontrado. Usando datos de prueba.');
      return MOCK_PRODUCTS;
    }

    const response = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();
    
    if (json.errors) {
      console.error('Error de Shopify API:', json.errors);
      return MOCK_PRODUCTS;
    }

    interface ShopifyProductEdge {
      node: {
        id: string;
        title: string;
        handle: string;
        availableForSale: boolean;
        priceRange: {
          minVariantPrice: {
            amount: string;
            currencyCode: string;
          };
        };
        images: {
          edges: Array<{
            node: {
              url: string;
            };
          }>;
        };
      };
    }

    return json.data.products.edges.map((edge: ShopifyProductEdge) => {
      const node = edge.node;
      return {
        id: node.id,
        title: node.title,
        handle: node.handle,
        price: node.priceRange.minVariantPrice.amount,
        currencyCode: node.priceRange.minVariantPrice.currencyCode,
        imageUrl: node.images.edges[0]?.node.url || '',
        availableForSale: node.availableForSale,
      };
    });
  } catch (error) {
    console.error('Error al conectar con Shopify:', error);
    return MOCK_PRODUCTS;
  }
};

// Datos de ejemplo (Fallback)
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
  }
];
