interface Guid {
  rendered: string;
}

interface Title {
  rendered: string;
}

interface Content {
  rendered: string;
  protected: boolean;
}

interface Excerpt {
  rendered: string;
  protected: boolean;
}

interface Self {
  href: string;
}

interface Collection {
  href: string;
}

interface About {
  href: string;
}

interface Author {
  embeddable: boolean;
  href: string;
}

interface Reply {
  embeddable: boolean;
  href: string;
}

interface VersionHistory {
  count: number;
  href: string;
}

interface PredecessorVersion {
  id: number;
  href: string;
}

interface WpAttachment {
  href: string;
}

interface Cury {
  name: string;
  href: string;
  templated: boolean;
}

interface FeaturedMedia {
  embeddable: boolean;
  href: string;
}

interface Links {
  self: Self[];
  collection: Collection[];
  about: About[];
  author: Author[];
  replies: Reply[];
  "version-history": VersionHistory[];
  "predecessor-version": PredecessorVersion[];
  "wp:attachment": WpAttachment[];
  "wp:featuredmedia"?: FeaturedMedia[];
  curies: Cury[];
}

interface EmbeddedFeaturedMedia {
  source_url: string;
  alt_text: string;
}

interface Embedded {
  "wp:featuredmedia"?: EmbeddedFeaturedMedia[];
}

export interface IPage {
  id: number;
  date: Date;
  date_gmt: Date;
  guid: Guid;
  modified: Date;
  modified_gmt: Date;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: Title;
  content: Content;
  excerpt: Excerpt;
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: string;
  ping_status: string;
  template: string;
  meta: any[];
  acf: any[];
  yoast_head: string;
  _links: Links;
  _embedded: Embedded;
}
