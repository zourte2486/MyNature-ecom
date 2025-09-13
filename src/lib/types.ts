export interface Category {
  id: string
  name: string
  name_ar: string
  description?: string
  description_ar?: string
  image_url?: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  name_ar: string
  description?: string
  description_ar?: string
  price: number
  category_id: string
  image_urls: string[]
  stock_quantity?: number
  weight_grams?: number
  is_active: boolean
  in_stock?: boolean
  origin?: string
  tags?: string[]
  created_at: string
  updated_at: string
  category?: Category
}

export interface Order {
  id: string
  customer_name: string
  customer_phone: string
  customer_address: string
  city: string
  notes?: string
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  total_amount: number
  created_at: string
  updated_at: string
  order_items?: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
  product?: Product
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  created_at: string
  updated_at: string
}

export interface OrderFormData {
  customer_name: string
  customer_phone: string
  customer_address: string
  city: string
  notes?: string
  items: {
    product_id: string
    quantity: number
  }[]
}
