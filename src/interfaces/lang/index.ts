import { Locale } from "@/i18n.config";

export interface IParams {
  params: {
    lang: Locale;
  };
}



// types.d.ts or a similar file for your type definitions
export interface AuthDictionary {
  full_name: string;
  email_address: string;
  password: string;
  confirm_password: string;
  phone_number: string;
  create_account: string;
  forgot_password: string;
  remember_me: string;
  login: string;
  register: string;
  logout: string;
}

export interface PageDictionary {
  home: string;
  about: string;
  shop: string;
  contact: string;
  cart: string;
  search: string;
  wishlist: string;
  account: string;
  categories: string;
  allCategories: string;
  checkout: string;
}

export interface LandingDictionary {
  addtocart: string;
  top_new_arrival: string;
  trending_products: string;
  shopbycategory: string;
  free_shipping: string;
  money_return: string;
  support_24_7: string;
  shop_now: string;
  x30_days_return: string;
  customer_support: string;
  order_over_$200: string;
}

export interface FilterDictionary {
  filter: string;
  sort: string;
  price: string;
  color: string;
  size: string;
  brand: string;
  clear: string;
  rating: string;
  apply: string;
  low_to_high: string;
  high_to_low: string;
  newest: string;
  oldest: string;
}

export interface ProductDictionary {
  product: string;
  products: string;
  product_details: string;
  description: string;
  reviews: string;
  related_products: string;
  order_summary: string;
  shipping: string;
  payment: string;
  total: string;
  place_order: string;
}

export interface AddressDictionary {
  fName: string;
  lName: string;
  email: string;
  phone: string;
  country_region: string;
  street_address: string;
  city: string;
  company: string;
}

export interface Dictionary {
  auth: AuthDictionary;
  page: PageDictionary;
  landing: LandingDictionary;
  filter: FilterDictionary;
  product: ProductDictionary;
  address: AddressDictionary;
}

