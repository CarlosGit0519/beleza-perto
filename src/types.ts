export type Professional = {
  id: string; name: string; category: string; region: string; city: string;
  rating: string; reviews: number; price: number; image: string; alt: string;
  tags: string[]; bio: string;
};

export type Product = {
  id: string; name: string; category: string; description: string;
  region: string; image: string; alt: string;
};
