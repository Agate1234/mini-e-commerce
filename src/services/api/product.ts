import api from './../api'
import type { Product, ProductsResponse, Category } from '@/types/product'

export function getProducts(limit = 12, skip = 0) {
  return api.get<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`)
}

export function searchProducts(query: string, limit = 100, skip = 0) {
  const q = encodeURIComponent(query)
  return api.get<ProductsResponse>(`/products/search?q=${q}&limit=${limit}&skip=${skip}`)
}

export function getProductsByCategory(slug: string, limit = 100, skip = 0) {
  return api.get<ProductsResponse>(`/products/category/${slug}?limit=${limit}&skip=${skip}`)
}

export function getCategories() {
  return api.get<Category[]>('/products/categories')
}

export function getProductById(id: number | string) {
  return api.get<Product>(`/products/${id}`)
}
