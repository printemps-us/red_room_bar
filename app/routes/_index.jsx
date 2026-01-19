import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useState} from 'react';
import {Image, Money, getSeoMeta} from '@shopify/hydrogen';
import RedRoomLogo from '~/components/RedRoomLogo';
import RestaurantModal from '~/components/RestaurantModal';
import AnimatedButton from '~/components/AnimatedButton';
import FooterComponent from '~/components/FooterComponent';
import {createStaticDataLoader} from '~/components/functions/loadStaticData';
import {HOME_QUERY} from '~/components/query/homeQuery';
import StoreInfo from '~/components/StoreInfo';
import RoomCard from '~/components/RoomCard';
import useIsMobile from '~/components/functions/isMobile';
import HomePageMobile from '~/components/mobile/HomePageMobile';
import SmoothScroll from '~/components/SmoothScroll';
import MenuModal from '~/components/MenuModal';
/**
 * @param {LoaderFunctionArgs} args
 */
export const loader = createStaticDataLoader(HOME_QUERY);

export const meta = ({data}) => {
  return getSeoMeta({
    title: data?.staticData?.seo?.reference?.title?.value,
    description: data?.staticData?.seo?.reference?.description?.value,
    image: data?.staticData?.seo?.reference?.image?.reference?.image?.url,
  });
};

export default function Homepage() {
  const [email, setEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [state, setState] = useState({
    isWaiting: false,
    isSubmitted: false,
    isError: false,
  });

  /** @type {LoaderReturnData} */
  const {staticData, isMobile} = useLoaderData();
  const isMobileActive = useIsMobile(isMobile);

  // If mobile, render the mobile version
  if (isMobileActive) {
    return <HomePageMobile staticData={staticData} />;
  }
  const url = 'https://printempsnewyork.activehosted.com/proc.php?jsonp=true';

  // NOTE • Valid Email checker
  const validEmail = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );

  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <SmoothScroll>
      <RestaurantModal
        setOpenModal={setModalOpen}
        openModal={modalOpen}
        venue_id={'87093'}
        link={'https://resy.com/cities/new-york-ny/venues/red-room-bar'}
        api_key={'MfrYLpfKWLBWL77fTAsmkZqB9gqZdW64'}
      ></RestaurantModal>

      <MenuModal
        setOpenModal={setMenuModalOpen}
        openModal={menuModalOpen}
      ></MenuModal>
      <div className="main-area bg-[#DCB243] py-20">
        <div className="responsive-icon">
          <svg
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 160.71 160.71"
            className="w-full h-full"
          >
            <defs>
              <style>{`.cls-1 { fill: #FFFAE1; }`}</style>
            </defs>
            <path
              className="cls-1"
              d="M147.52,153.44h-45.66c-20.52,0-30.79-15.92-35.8-29.27-1.38-3.68-1.82-7.67-1.29-11.56,3.63-26.73,14.57-43.66,32.6-50.35,13.74-5.09,33.53-5.57,46.78,4.85,8.71,6.85,9.31,17.33,9.31,17.33v63.07c0,3.27-2.65,5.93-5.93,5.93M13.2,153.44c-3.27,0-5.93-2.65-5.93-5.93v-53.68h.05c0-.1-.76-9.76,3.92-15.96,3.18-4.2,9.73-6.21,15.6-4.76,5.47,1.35,10.69,5.26,14.69,11.02,3.78,5.45,6.21,11.92,8.55,18.16l9.16,24.42c4,10.68,9.49,18.92,16.27,24.61.85.72.32,2.1-.79,2.1H13.2ZM7.27,13.2c0-3.27,2.65-5.93,5.93-5.93h40.07c11.03,0,14.6,6.37,15.65,11.72,1.02,5.19.07,10.68-2.63,15.06-5.21,8.47-15.66,11.5-25.77,14.43-2.72.79-5.39,1.56-7.91,2.42-.98.34-2.01.66-3.06,1-6.23,1.99-14.15,4.53-20.22,10.64-.76.76-2.06.24-2.06-.84V13.2ZM94.42,34.04c-2.69-4.38-3.65-9.87-2.63-15.05,1.05-5.34,4.63-11.72,15.65-11.72h40.06c3.27,0,5.93,2.65,5.93,5.93v53.07c-1.36-1.76-2.93-3.4-4.81-4.88-3.13-2.46-6.57-4.39-10.17-5.88v-.02c-2.84-1.4-7.15-3.51-10.35-4.6-2.52-.86-5.19-1.63-7.91-2.42-10.11-2.93-20.56-5.96-25.77-14.43M147.52,0h-40.07c-17.44,0-21.74,12.3-22.79,17.58-1.37,6.96-.07,14.35,3.57,20.27,3.82,6.22,9.51,10.06,15.73,12.79,1.08.48.92,2.03-.24,2.27-3.13.65-6.12,1.51-8.89,2.53-18.76,6.96-31.06,23.88-36.08,49.23l-1.85-4.93c-2.5-6.67-5.09-13.56-9.39-19.76-5.01-7.21-11.73-12.15-18.92-13.93-2.41-.59-4.87-.78-7.29-.62-1.3.09-1.83-1.64-.69-2.26,3.55-1.92,7.43-3.17,11.15-4.36,1.1-.36,2.17-.7,3.19-1.04,2.42-.83,4.98-1.57,7.59-2.32,10.91-3.16,23.26-6.74,29.94-17.6,3.64-5.92,4.94-13.31,3.57-20.27-1.04-5.29-5.35-17.58-22.79-17.58H13.2C5.91,0,0,5.91,0,13.2v134.31c0,7.29,5.91,13.2,13.2,13.2h134.32c7.29,0,13.2-5.91,13.2-13.2V13.2c0-7.29-5.91-13.2-13.2-13.2"
            />
          </svg>
        </div>
        <div className="responsive-logo mt-6">
          <RedRoomLogo></RedRoomLogo>
        </div>
        <div className="flex flex-col items-center mt-10">
          <p className="moderat-bold" style={{color: '#FFFAE1'}}>
            HOURS
          </p>
          <p className="moderat-bold" style={{color: '#FFFAE1'}}>
            MONDAY - SUNDAY: 11AM-11PM
          </p>
          <span
            className="moderat-bold mt-1"
            style={{color: '#FFFAE1', fontSize: 12}}
          >
            {'(ENTER AT ONE WALL ST AND BROADWAY)'}
          </span>
        </div>
        <div className="mt-2 h-auto w-full flex max-[835px]:flex-col gap-3 justify-center items-center">
          <AnimatedButton
            text={'Book with Resy'}
            bgColor={'white'}
            hoverColor={'white'}
            border="white"
            textColor="#DCB243"
            onClick={() => setModalOpen(true)}
            h="42px"
            w="90%"
          />
          <AnimatedButton
            text={'View Menu'}
            bgColor={'white'}
            hoverColor={'white'}
            onClick={() => setMenuModalOpen(true)}
            textColor="#DCB243"
            h="42px"
            w="90%"
            arrow
            arrowStart
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center h-[200px] text-center my-6">
        <p className="w-[450px] p-standard-medium-desktop text-black-2">
          {staticData.about_sub.value}
        </p>
      </div>
      <div className="flex gap-2 w-full overflow-y-hidden hide-scrollbar h-[550px] no-overscroll px-8">
        {staticData.about_options.references.nodes.map((item, index) => (
          <div key={item.id} id={item.header.value} className="flex-1">
            <RoomCard
              header={item.header.value}
              sub={item.sub?.value}
              button_text={item.button_text.value}
              image={item.image.reference.image}
              link={item.link?.value}
            />
          </div>
        ))}
      </div>

      <div className="h-[500px] bg-white-2 border-y-1 border-y-white-4 flex">
        <div
          className="flex-1 rounded-br-[300px]"
          style={{
            backgroundSize: 'cover', // Ensures the image covers the entire container
            backgroundPosition: 'center', // Centers the image within the container
            backgroundRepeat: 'no-repeat', // Prevents the image from repeating
            backgroundImage: `url(${staticData.find_us_image.reference.image.url})`,
          }}
        ></div>
        <div className="flex-1 flex-col flex justify-center items-center gap-6 text-center">
          <h2 className="h2-desktop w-[220px]">
            {staticData.find_us_title.value}
          </h2>
          <p className="w-[450px] p-standard-medium-desktop text-black-2">
            {staticData.find_us_sub.value}
          </p>
          <AnimatedButton
            h={'42px'}
            w={'339px'}
            text={staticData.find_us_button.reference.button_text.value}
            bgColor={staticData.find_us_button.reference.color.value}
            hoverColor={staticData.find_us_button.reference.hover_color.value}
            clickURL={staticData.find_us_button.reference?.link.value}
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center h-[200px] text-center my-12">
        <h2 className="h2-desktop">{staticData.title_header.value}</h2>
        <p className="w-[450px] p-standard-medium-desktop text-black-2">
          {staticData.title_sub.value}
        </p>
      </div>
      <div className="flex gap-4 px-6 mb-10 w-full">
        {staticData.title_images.references.nodes.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden flex-1 rounded-xl h-[450px]"
          >
            <Image data={item.image} className="w-full h-full object-cover">
              {/* your content here */}
            </Image>
          </div>
        ))}
      </div>
      {/* <StoreInfo data={staticData.icons} bgColor={'#AF4145'}></StoreInfo> */}

      <div className="overflow-hidden w-full h-[300px]">
        <Image
          data={staticData.filler_image?.reference.image}
          className="w-full h-full object-cover"
        ></Image>
      </div>
      <div className="py-10 border-y-1 border-white-4 my-14 bg-white-2">
        <p className="h2-desktop text-center">
          {staticData.as_seen_header?.value}
        </p>
        <div className="pt-12 flex gap-10 items-center overflow-x-auto py-4 justify-center">
          {staticData.as_seen_images?.references.nodes.map((item, index) => (
            <div key={index} className="h-10 flex-shrink-0">
              <Image
                data={item.image}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <FooterComponent></FooterComponent>
    </SmoothScroll>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <Link
                      key={product.id}
                      className="recommended-product"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        data={product.images.nodes[0]}
                        aspectRatio="1/1"
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4>{product.title}</h4>
                      <small>
                        <Money data={product.priceRange.minVariantPrice} />
                      </small>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
