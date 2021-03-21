export interface Event {
  events: EventElement[];
  rest_url: string;
  total: number;
  total_pages: number;
}

export interface EventElement {
  id: number;
  global_id: string;
  global_id_lineage: string[];
  author: string;
  status: string;
  date: Date;
  date_utc: Date;
  modified: Date;
  modified_utc: Date;
  url: string;
  rest_url: string;
  title: string;
  description: string;
  excerpt: string;
  slug: string;
  image: boolean | ImageClass;
  all_day: boolean;
  start_date: Date;
  start_date_details: DateDetails;
  end_date: Date;
  end_date_details: DateDetails;
  utc_start_date: Date;
  utc_start_date_details: DateDetails;
  utc_end_date: Date;
  utc_end_date_details: DateDetails;
  timezone: string;
  timezone_abbr: string;
  cost: string;
  cost_details: CostDetails;
  website: string;
  show_map: boolean;
  show_map_link: boolean;
  hide_from_listings: boolean;
  sticky: boolean;
  featured: boolean;
  categories: any[];
  tags: any[];
  venue: any[];
  organizer: any[];
}

export interface CostDetails {
  currency_symbol: string;
  currency_position: string;
  values: any[];
}

export interface DateDetails {
  year: string;
  month: string;
  day: string;
  hour: string;
  minutes: string;
  seconds: string;
}

export interface ImageClass {
  url: string;
  id: number;
  extension: string;
  width: number;
  height: number;
  sizes: { [key: string]: Size };
}

export interface Size {
  width: number;
  height: number;
  "mime-type": MIMEType;
  url: string;
  uncropped?: boolean;
}

export enum MIMEType {
  ImageJPEG = "image/jpeg",
}
