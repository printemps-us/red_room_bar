import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useState} from 'react';
import {Image, Money, getSeoMeta} from '@shopify/hydrogen';
import RedRoomLogo from '~/components/RedRoomLogo';
import RestaurantModal from '~/components/RestaurantModal';
import AnimatedButton from '~/components/AnimatedButton';
/**
 * @type {MetaFunction}
 */

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}
export const meta = ({data}) => {
  // pass your SEO object to getSeoMeta()
  return getSeoMeta({
    title: 'Red Room Bar - Snack, Sip, and Shop! ',
    description:
      "An intimate cocktail lounge serving expertly crafted drinks and bar snacks in a warm, inviting space—where you can also browse a selection of gifts, home décor, and objets d’art.",
    // image: data.staticData.seo?.reference.image?.reference?.image.url,
  });
};

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const [email, setEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [state, setState] = useState({
    isWaiting: false,
    isSubmitted: false,
    isError: false,
  });
  const url = 'https://printempsnewyork.activehosted.com/proc.php?jsonp=true';

  // NOTE • Valid Email checker
  const validEmail = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );

  const handleSubmit = (e) => {
    console.log('tirrger');
    exponea.identify(
      {email_id: email.toLowerCase()},
      {
        email: email.toLowerCase(),
        data_source: 'restaurant',
      },
    );
    exponea.track('consent', {
      category: 'email',
      valid_until: 'unlimited',
      action: 'accept',
      data_source: 'restaurant',
    });
    setState({
      isWaiting: false,
      isSubmitted: true,
    });
  };

  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="background">
      <RestaurantModal
        setOpenModal={setModalOpen}
        openModal={modalOpen}
        venue_id={'87093'}
        link={'https://resy.com/cities/new-york-ny/venues/red-room-bar'}
        api_key={'MfrYLpfKWLBWL77fTAsmkZqB9gqZdW64'}
      ></RestaurantModal>
      <div className="main-area">
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
            MONDAY - SUNDAY: 11AM-7PM
          </p>
          <span
            className="moderat-bold mt-1"
            style={{color: '#FFFAE1', fontSize: 12}}
          >
            {'(ENTER THROUGH PRINTEMPS ON BROADWAY AND EXCHANGE PL.)'}
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
            w="339px"
          />
          <AnimatedButton
            text={'View Menu'}
            bgColor={'white'}
            hoverColor={'white'}
            clickURL={'/menu'}
            textColor="#DCB243"
            h="42px"
            w="339px"
            arrow
            arrowStart
          />
        </div>
      </div>
      <div className="footer-container">
        <div className="above-footer">
          <a
            href="https://urlgeni.us/instagram/theredroombar"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://cdn.shopify.com/s/files/1/0918/8635/4743/files/F_BLandingPages_IG_Colors-04.png?v=1741379913"
              alt="Instagram Logo"
              width={80}
            />
          </a>
          <p className="moderat-bold sign-up-text" style={{color: '#FFFAE1'}}>
            Red Room Bar is part of Printemps new york, For more information
            sign up for our newsletter
          </p>
        </div>

        <div className="footer-area">
          <p
            className="moderat-bold"
            style={{fontSize: '14px', color: 'black', marginRight: '8px'}}
          >
            {state.isSubmitted ? 'Merci!' : 'Sign up for our newsletter'}
          </p>
          {state.isSubmitted ? (
            <p
              className="moderat-bold"
              style={{fontSize: '14px', color: 'black', marginRight: '8px'}}
            >
              Check your email for updates
            </p>
          ) : (
            <input
              value={email}
              placeholder="Enter email address"
              onChange={(e) => setEmail(e.target.value)}
              className="moderat-bold footer-input bg-white"
              style={{fontSize: '12px'}}
            ></input>
          )}
          {state.isSubmitted ? (
            <p></p>
          ) : (
            <button
              className="footer-button"
              onClick={handleSubmit}
              disabled={!validEmail.test(email)}
              style={{cursor: !validEmail.test(email) ? 'auto' : 'pointer'}}
            >
              <p
                className="moderat-bold"
                style={{fontSize: '12px', color: 'white'}}
              >
                Submit
              </p>
            </button>
          )}
        </div>
      </div>
    </div>
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
