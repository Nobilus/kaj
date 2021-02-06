export interface Capabilities {
  switch_themes: boolean;
  edit_themes: boolean;
  activate_plugins: boolean;
  edit_plugins: boolean;
  edit_users: boolean;
  edit_files: boolean;
  manage_options: boolean;
  moderate_comments: boolean;
  manage_categories: boolean;
  manage_links: boolean;
  upload_files: boolean;
  import: boolean;
  unfiltered_html: boolean;
  edit_posts: boolean;
  edit_others_posts: boolean;
  edit_published_posts: boolean;
  publish_posts: boolean;
  edit_pages: boolean;
  read: boolean;
  level_10: boolean;
  level_9: boolean;
  level_8: boolean;
  level_7: boolean;
  level_6: boolean;
  level_5: boolean;
  level_4: boolean;
  level_3: boolean;
  level_2: boolean;
  level_1: boolean;
  level_0: boolean;
  edit_others_pages: boolean;
  edit_published_pages: boolean;
  publish_pages: boolean;
  delete_pages: boolean;
  delete_others_pages: boolean;
  delete_published_pages: boolean;
  delete_posts: boolean;
  delete_others_posts: boolean;
  delete_published_posts: boolean;
  delete_private_posts: boolean;
  edit_private_posts: boolean;
  read_private_posts: boolean;
  delete_private_pages: boolean;
  edit_private_pages: boolean;
  read_private_pages: boolean;
  delete_users: boolean;
  create_users: boolean;
  unfiltered_upload: boolean;
  edit_dashboard: boolean;
  update_plugins: boolean;
  delete_plugins: boolean;
  install_plugins: boolean;
  update_themes: boolean;
  install_themes: boolean;
  update_core: boolean;
  list_users: boolean;
  remove_users: boolean;
  promote_users: boolean;
  edit_theme_options: boolean;
  delete_themes: boolean;
  export: boolean;
  manage_woocommerce: boolean;
  view_woocommerce_reports: boolean;
  edit_product: boolean;
  read_product: boolean;
  delete_product: boolean;
  edit_products: boolean;
  edit_others_products: boolean;
  publish_products: boolean;
  read_private_products: boolean;
  delete_products: boolean;
  delete_private_products: boolean;
  delete_published_products: boolean;
  delete_others_products: boolean;
  edit_private_products: boolean;
  edit_published_products: boolean;
  manage_product_terms: boolean;
  edit_product_terms: boolean;
  delete_product_terms: boolean;
  assign_product_terms: boolean;
  edit_shop_order: boolean;
  read_shop_order: boolean;
  delete_shop_order: boolean;
  edit_shop_orders: boolean;
  edit_others_shop_orders: boolean;
  publish_shop_orders: boolean;
  read_private_shop_orders: boolean;
  delete_shop_orders: boolean;
  delete_private_shop_orders: boolean;
  delete_published_shop_orders: boolean;
  delete_others_shop_orders: boolean;
  edit_private_shop_orders: boolean;
  edit_published_shop_orders: boolean;
  manage_shop_order_terms: boolean;
  edit_shop_order_terms: boolean;
  delete_shop_order_terms: boolean;
  assign_shop_order_terms: boolean;
  edit_shop_coupon: boolean;
  read_shop_coupon: boolean;
  delete_shop_coupon: boolean;
  edit_shop_coupons: boolean;
  edit_others_shop_coupons: boolean;
  publish_shop_coupons: boolean;
  read_private_shop_coupons: boolean;
  delete_shop_coupons: boolean;
  delete_private_shop_coupons: boolean;
  delete_published_shop_coupons: boolean;
  delete_others_shop_coupons: boolean;
  edit_private_shop_coupons: boolean;
  edit_published_shop_coupons: boolean;
  manage_shop_coupon_terms: boolean;
  edit_shop_coupon_terms: boolean;
  delete_shop_coupon_terms: boolean;
  assign_shop_coupon_terms: boolean;
  list_roles: boolean;
  create_roles: boolean;
  edit_roles: boolean;
  delete_roles: boolean;
  edit_role_menus: boolean;
  edit_posts_role_permissions: boolean;
  edit_pages_role_permissions: boolean;
  edit_nav_menu_permissions: boolean;
  edit_content_shortcodes: boolean;
  delete_content_shortcodes: boolean;
  edit_login_redirects: boolean;
  delete_login_redirects: boolean;
  bulk_edit_roles: boolean;
  edit_widget_permissions: boolean;
  edit_attachments: boolean;
  delete_attachments: boolean;
  read_others_attachments: boolean;
  edit_others_attachments: boolean;
  delete_others_attachments: boolean;
  edit_users_higher_level: boolean;
  delete_users_higher_level: boolean;
  promote_users_higher_level: boolean;
  promote_users_to_higher_level: boolean;
  wpseo_manage_options: boolean;
  edit_comment: boolean;
  add_users: boolean;
  administrator: boolean;
  webadmin: boolean;
}

export interface ExtraCapabilities {
  administrator: boolean;
  webadmin: boolean;
}

export interface AvatarUrls {
  24: string;
  48: string;
  96: string;
}

export interface SimpleLocalAvatar {
  media_id: number;
  full: string;
  192: string;
  96: string;
  64: string;
  32: string;
  128: string;
  52: string;
  26: string;
  500: string;
  250: string;
}

export interface Acf {
  functie: string;
  telefoonnummer: string;
}

export interface WoocommerceMeta {
  activity_panel_inbox_last_read: string;
  activity_panel_reviews_last_read: string;
  categories_report_columns: string;
  coupons_report_columns: string;
  customers_report_columns: string;
  orders_report_columns: string;
  products_report_columns: string;
  revenue_report_columns: string;
  taxes_report_columns: string;
  variations_report_columns: string;
  dashboard_sections: string;
  dashboard_chart_type: string;
  dashboard_chart_interval: string;
  dashboard_leaderboard_rows: string;
  homepage_layout: string;
  homepage_stats: string;
  android_app_banner_dismissed: string;
}

export interface Self {
  href: string;
}

export interface Collection {
  href: string;
}

export interface Links {
  self: Self[];
  collection: Collection[];
}

export interface IUser {
  id: number;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  url: string;
  description: string;
  link: string;
  locale: string;
  nickname: string;
  slug: string;
  roles: string[];
  registered_date: Date;
  capabilities: Capabilities;
  extra_capabilities: ExtraCapabilities;
  avatar_urls: AvatarUrls;
  meta: any[];
  simple_local_avatar: SimpleLocalAvatar;
  acf: Acf;
  woocommerce_meta: WoocommerceMeta;
  yoast_head: string;
  _links: Links;
}
