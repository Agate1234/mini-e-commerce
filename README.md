# Mini E-Commerce

Aplikasi katalog produk sederhana yang dibangun dengan Vue 3 + TypeScript, menampilkan daftar produk dari REST API publik [DummyJSON](https://dummyjson.com/docs/products), lengkap dengan pencarian, filter kategori, pagination, halaman detail, dan fitur favorit.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`.

## Production Build

```bash
npm run build
```

Hasil build akan tersedia di folder `dist/`.


## Struktur / Arsitektur Aplikasi

Aplikasi dipisah berlapis, dari data mentah sampai tampilan:

```
src/
├── types/            # Interface TypeScript (Product)
├── services/         # Lapisan API — fetch wrapper + endpoint DummyJSON
│   ├── api.ts
│   └── api/
│       └── product.ts
├── composables/      # Reusable stateful logic (Vue Composition API)
│   ├── useFavorites.ts   # Shared/global state (singleton) + localStorage
│   ├── useProducts.ts    # State halaman list: search, filter, pagination
│   └── useProduct.ts     # Fetch satu produk (halaman detail)
├── components/       # View Component
│   ├── ProductCard.vue
│   ├── SearchInput.vue
│   ├── CategoryFilter.vue
│   ├── Pagination.vue
│   └── LoadingSkeleton.vue
├── views/            # Halaman per-route
│   ├── ProductListView.vue
│   ├── ProductDetailView.vue
│   └── FavoritesView.vue
├── router/           # Konfigurasi Vue Router
├── App.vue           # Root layout + navigasi
├── main.ts
└── style.css
```

**Alur data:** `View` memanggil `Composable` untuk mengelola state dan logic. Selanjutnya, `Composable` memanggil `Service` untuk melakukan API call ke DummyJSON. Data yang diperoleh dari API dikembalikan ke `Composable` untuk memperbarui state, kemudian ditampilkan kembali oleh `View` melalui komponen-komponen presentational.

Komponen yang berada di folder `components/` bersifat presentational. Komponen tersebut hanya menerima data melalui `props` dan mengirimkan interaksi pengguna melalui event `emit`. Komponen tidak melakukan fetch data secara langsung.

```text
View
  ↓
Composable
  ↓
Service
  ↓
DummyJSON API
  ↓
Service
  ↓
Composable State
  ↓
View / Components
```

Favorit sengaja dibuat sebagai composable singleton (state di level module, bukan di dalam komponen), supaya status favorit otomatis sinkron di semua tempat (card di list, halaman detail, halaman favorit, badge di navbar) tanpa perlu state management library terpisah.

## Library yang Digunakan

- **Vue 3** (Composition API, `<script setup>`)
- **TypeScript**
- **Vite** — build tool & dev server
- **Vue Router** — routing SPA
- **Tailwind CSS v4** — styling utility-first (via `@tailwindcss/vite`)
- **Axios**
- **DummyJSON** — sumber data produk (REST API publik)

## Fitur yang Berhasil Diselesaikan

- Daftar produk: gambar, nama, harga, kategori, rating, tombol "Lihat Detail"
- Pencarian produk dengan debounce (400ms)
- Filter berdasarkan kategori
- Pagination dengan nomor halaman, tombol Prev/Next, dan lompat langsung ke halaman tertentu lewat klik "…" (jump to page)
- Halaman detail produk (galeri gambar, deskripsi, stok, rating)
- Fitur favorit: toggle dari card maupun halaman detail, disimpan di `localStorage`, halaman Favorit terpisah, badge jumlah favorit di navbar
- Desain responsive

## Fitur yang Belum Diselesaikan

- Sorting produk (harga termurah/termahal, rating tertinggi)
- Unit test

## Known Issues / Limitations

- DummyJSON tidak mendukung kombinasi filter search + category langsung di satu endpoint. Solusinya, saat search dan filter kategori aktif bersamaan, aplikasi mengambil sampai 100 hasil pencarian lalu memfilter & memaginasi di sisi client — kalau hasil pencarian asli lebih dari 100 item, sebagian kemungkinan tidak ikut terfilter.
- Favorit disimpan sebagai snapshot lengkap data produk bukan cuma ID di `localStorage`. Konsekuensinya: halaman Favorit tidak perlu fetch ulang ke API (lebih cepat), tapi datanya bisa jadi tidak up-to-date kalau harga/stok produk berubah di sumbernya. Favorit juga hanya tersimpan per-browser, bukan per-akun, dan akan hilang kalau data browser dibersihkan.
- Belum ada penanganan khusus untuk route yang tidak dikenal (404).

## Penggunaan AI Coding Assistant

Proyek ini dikembangkan dengan bantuan **Claude** sebagai AI coding assistant, digunakan untuk:

- Penulisan kode composable useFavorites (singleton)
- Setup dan konfigurasi styling Tailwind CSS
- Membantu proses debugging serta memberikan saran perbaikan kode
- Review kode untuk meningkatkan keterbacaan, struktur, dan maintainability