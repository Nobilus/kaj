export interface IBlogpost {
  date: Date;
  title: { rendered: string };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };

  _embedded: {
    author: Array<{
      name: string;
    }>;
    "wp:term": Array<{ name: string }>;
    "wp:featuredmedia": Array<{ source_url: string }>;
  };
}
