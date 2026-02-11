/* ========= Category ========= */

export type subCategory = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

/* ========= Metadata ========= */

export type PaginationMetadata = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
};

/* ========= API Response ========= */

export type CategoriesResponse = {
  results: number;
  metadata: PaginationMetadata;
  data: subCategory[];
};
