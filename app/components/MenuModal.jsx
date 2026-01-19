import React, {useEffect} from 'react';
import AnimatedButton from './AnimatedButton';
import Close from '~/assets/CloseIcon.svg';
function MenuModal({
  setOpenModal,
  openModal,
  venue_id,
  link,
  api_key,
  isMobile = false,
}) {
  return (
    <>
      {openModal && (
        <div className="z-110 fixed top-[-100px] left-0 w-screen h-[calc(100vh+100px)] bg-black-op40 flex items-center justify-center px-6">
          <div className="bg-white rounded-xl flex flex-col items-center px-6 pt-[18px] pb-6 gap-8">
            <div className="relative w-full">
              <div className="w-full flex justify-end mb-2">
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  <img src={Close} alt="close icon" width={20} height={20} />
                </button>
              </div>
              <h3
                className={`${
                  isMobile ? 'h3-mobile' : 'h3-desktop'
                } text-center`}
              >
                View Our Menus
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <AnimatedButton
                text={'Menu'}
                bgColor={'black'}
                hoverColor={'black'}
                border="black"
                clickURL={'/menu'}
                h={isMobile ? '42px' : '42px'}
                w={isMobile ? '225px' : '339px'}
              />
              <AnimatedButton
                text={'Restaurant Week Menu'}
                bgColor={'black'}
                hoverColor={'black'}
                border="black"
                h={isMobile ? '42px' : '42px'}
                w={isMobile ? '225px' : '339px'}
                clickURL={'/restaurant-week-menu'}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MenuModal;
