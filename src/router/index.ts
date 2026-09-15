import { createRouter, createWebHistory } from 'vue-router'
import ProductListView from '@/views/ProductListView.vue'
import ProductDetailView from '@/views/ProductDetailView.vue'
import FavoritesView from '@/views/FavoriteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

routes: [
  { path: '/', name: 'products', component: ProductListView },
  { path: '/product/:id', name: 'product-detail', component: ProductDetailView },
  { path: '/favorites', name: 'favorites', component: FavoritesView },
],
})

export default router
