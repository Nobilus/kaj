import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import endpoints from 'Utils/endpoints';
import { axiosI } from 'Utils/Types/axiosInstance';
import parse from 'html-react-parser';
import { IPage } from 'Utils/Types/page';
import PageDivider from 'Components/PageDivider';

// OnsTeamIcon removed (unused)
import Winkelwagen from 'Pages/Winkelwagen';
import Checkout from 'Pages/Checkout';
import Shop from 'Pages/Shop';
import EventPage from 'Pages/EventPage';
import Praktisch from 'Pages/Praktisch';

interface ILocalPage {
  title: string;
  slug: string;
  id?: any;
}

function Page({ title, slug, id }: ILocalPage) {
  const [page, setPage] = useState<IPage>();
  console.log(page);
  useEffect(() => {
    const fetchPage = async () => {
      const axiosconf: AxiosRequestConfig = {
        params: {
          slug: slug,
          _embed: true,
        },
      };
      axiosI
        .get<Array<IPage>>(endpoints.pagebyslug, axiosconf)
        .then(({ data }) => {
          setPage(data[0]);
        })
        .catch(() => {});
    };

    if (
      slug !== 'shop' &&
      slug !== 'winkelwagen' &&
      slug !== 'afrekenen' &&
      slug !== 'evenement' &&
      slug !== 'praktisch'
    ) {
      fetchPage();
    }
  }, [slug]);

  switch (slug) {
    case 'shop':
      return <Shop title={title} />;

    case 'winkelwagen':
      return <Winkelwagen />;

    case 'afrekenen':
      return <Checkout />;

    case 'evenement':
      return <EventPage />;
    case 'praktisch':
      return <Praktisch id={id} title={title} />;

    default:
      return (
        <>
          <PageDivider src={page?.acf?.page_icon || undefined} title={title} />
          <div className='c-page'>
            {page && page?._embedded['wp:featuredmedia'] && (
              <img
                src={page._embedded['wp:featuredmedia'][0].source_url}
                alt={page._embedded['wp:featuredmedia'][0].alt_text}
              />
            )}
            {page && parse(page.content.rendered)}
          </div>
        </>
      );
  }
}

export default Page;
