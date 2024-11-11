import { CategoryProduct } from "@prisma/client";

export interface CategoryProductRequest {
  id?: number;
  businessInfoId: number;
  status?: boolean;
}

export interface CreateCategory extends Omit<CategoryProduct, "id"> {}

export interface CreateCategoryProductRequest {
  data: CreateCategory;
}

export interface UpdateCategoryProduct extends Partial<CategoryProduct> {}

export interface UpdateCategoryProductRequest {
  businessInfoId: number;
  data: UpdateCategoryProduct;
}

export interface DeleteCategoryProductRequest {
  id: number;
  businessInfoId: number;
}
