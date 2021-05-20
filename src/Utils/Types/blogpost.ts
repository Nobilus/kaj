interface IFeaturedMedia {
  source_url: string;
  alt_text: string;
}

interface ITerm {
  name: string;
}

interface IAuthor {
  name: string;
}

export interface IBlogpost {
  id: number;
  slug: string;
  date: Date;
  title: { rendered: string };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  tags: Array<number>;

  _embedded: {
    author: Array<IAuthor>;
    "wp:term": Array<ITerm>;
    "wp:featuredmedia": Array<IFeaturedMedia>;
  };
}
