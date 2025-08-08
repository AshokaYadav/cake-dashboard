export type SubCategory = {
  name: string;
  id: string;
};

export type Category = {
  name: string;
  id: string;
  SubCategories: SubCategory[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  image1: string | null;
  image2: string | null;
  image3: string | null;
  image4: string | null;
  location: string;
  createdAt: string;
  updatedAt: string;
  category_id: string;
  subcategory_id: string;
};