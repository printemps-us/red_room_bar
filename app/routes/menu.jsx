import React from 'react';
import RedRoomLogo from '~/components/RedRoomLogo';
import {data, useLoaderData, defer} from '@remix-run/react';

export async function loader(args) {
  const staticData = await loadStaticData(args);

  return defer({...staticData});
}

async function loadStaticData({context}) {
  try {
    // Run the query
    const data = await context.storefront.query(MENU_QUERY);

    // Process the result
    const metaobjects = data.metaobjects.nodes[0];
    console.log('test', metaobjects);
    return {
      staticData: metaobjects,
    };
    console.log(metaobjects);
  } catch (error) {
    console.error('Error in loader:', error);
    // Handle or rethrow the error as needed
    throw new Error('Failed to load static data');
  }
}
function menu() {
  const data = useLoaderData();
  console.log(useLoaderData());
  return (
    <div>
      <div
        className="p-14 flex justify-center w-full"
        style={{backgroundColor: '#DCB243'}}
      >
        {/* <div className="responsive-icon">
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
        </div> */}
        <div className="responsive-logo">
          <RedRoomLogo></RedRoomLogo>
        </div>
      </div>
      <div className="flex flex-col items-center gap-[120px] py-[50px] my-[60px]">
        {data.staticData.content?.references.nodes.map((item, index) => (
          <div
            key={`${item.title.value}_title_${index}`}
            className="section flex flex-col items-center gap-8"
          >
            <h3 className="h3-desktop pb-3">{item.title.value}</h3>
            {item.menu_items.references.nodes.map((item, index) => (
              <div
                key={`${item.title.value}_item_${index}`}
                className="gap-3 flex flex-col items-center"
              >
                <p className="p-standard-bold-desktop uppercase">
                  {item.title.value}
                </p>
                <div className="flex">
                  {JSON.parse(item.ingredients.value).map(
                    (ingredient, index, array) => (
                      <p
                        key={`${ingredient}_item_${index}`}
                        className="p-small-regular-desktop text-black-2"
                      >
                        {ingredient}
                        {index < array.length - 1 && '・'}
                      </p>
                    ),
                  )}
                </div>
                <p className="p-small-bold-desktop">${item.price.value}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default menu;

const MENU_QUERY = `query StaticPageContent {
  metaobjects(type: "menu", first: 10) {
    nodes {
      handle
      content: field(key: "content") {
        references(first: 10) {
          nodes {
            ... on Metaobject {
              title: field(key: "title") {
                value
              }
              menu_items: field(key: "menu_items") {
                references(first: 10) {
                  nodes {
                    ... on Metaobject {
                      title: field(key: "title") {
                        value
                      }
                      price: field(key: "price") {
                        value
                      }
                      ingredients: field(key: "ingredients") {
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;
