export interface WPPost {
  id: number;
  date: string;
  slug: string;
  link: string;

  title: {
    rendered: string;
  };

  excerpt?: {
    rendered: string;
    protected: boolean;
  };

  content?: {
    rendered: string;
    protected: boolean;
  };

  featured_media?: number;

  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}
