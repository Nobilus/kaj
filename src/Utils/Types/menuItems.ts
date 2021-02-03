interface Item {
  id: number;
  order: number;
  parent: number;
  title: string;
  url: string;
  attr: string;
  target: string;
  classes: string;
  xfn: string;
  description: string;
  object_id: number;
  object: string;
  object_slug: string;
  type: string;
  type_label: string;
}

interface Links {
  collection: string;
  self: string;
}

interface Meta {
  links: Links;
}

export interface MenuI {
  ID: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  items: Item[];
  meta: Meta;
}
