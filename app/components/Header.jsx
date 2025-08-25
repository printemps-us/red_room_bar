import React, {useState, useRef, useEffect} from 'react';
import {Image} from '@shopify/hydrogen';
import RestaurantModal from './RestaurantModal';
import {Link} from '@remix-run/react';
import {data, useLoaderData, defer} from '@remix-run/react';
import AnimatedButton from './AnimatedButton';
import HeaderDropDown from './HeaderDropDown';
import Carrot from '~/assets/Carrot';
import {useLocation} from '@remix-run/react';
import Homepage from '~/routes/_index';
import useIsMobile from './functions/isMobile';
import HeaderMobile from './mobile/HeaderMobile';
import RedRoomLogo from '~/components/RedRoomLogo';

function HeaderComponent({data, isMobile, pathname}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [showDetails, setShowDetails] = useState(() => {
    // On homepage, show only if already scrolled
    if (typeof window !== 'undefined' && isHomePage) {
      return window.scrollY > 200;
    }
    // On any other page, always show
    return true;
  });

  const hoverRef = useRef(null);
  const dropdownRef = useRef(null);
  let leaveTimeout = null;

  // Use the server-side mobile detection
  const isMobileActive = useIsMobile(isMobile);

  useEffect(() => {
    if (location.pathname !== '/') {
      setShowDetails(true);
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowDetails(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleMouseLeave = (e) => {
    if (e.relatedTarget instanceof Window) {
      setIsHover(false);
      // Add your hover close logic here
    } else if (
      e.relatedTarget &&
      dropdownRef.current &&
      dropdownRef.current?.contains(e.relatedTarget) &&
      !hoverRef.current.contains(e.relatedTarget)
    ) {
      // If the mouse is moving into the specific div, do nothing.
      return;
    }
    leaveTimeout = setTimeout(() => {
      setIsHover(false);
    }, 200);
  };

  const handleMouseEnter = () => {
    clearTimeout(leaveTimeout);
    setIsHover(true);
  };

  // If mobile, render the mobile header
  if (isMobileActive) {
    return (
      <>
        <RestaurantModal
          setOpenModal={setModalOpen}
          openModal={modalOpen}
          venue_id={'87093'}
          link={'https://resy.com/cities/new-york-ny/venues/red-room-bar'}
          api_key={'MfrYLpfKWLBWL77fTAsmkZqB9gqZdW64'}
        />
        <HeaderMobile data={data} pathname={pathname} />
      </>
    );
  }
  // Desktop header
  return (
    <>
      <RestaurantModal
        setOpenModal={setModalOpen}
        openModal={modalOpen}
        venue_id={'87093'}
        link={'https://resy.com/cities/new-york-ny/venues/red-room-bar'}
        api_key={'MfrYLpfKWLBWL77fTAsmkZqB9gqZdW64'}
      ></RestaurantModal>
      <div className="w-full bg-[#DCB243] flex justify-between sticky top-0 h-[100px] z-100">
        <div
          className={`p-4 transition-all duration-500 ease-in-out flex flex-col justify-center  ${
            showDetails ? 'opacity-100 h-full' : 'opacity-0 max-h-0'
          }`}
          style={{ overflow: 'visible' }}
        >
          <Link to="/">
            <div className='w-[200px] flex items-center justify-center overflow-visible' style={{ height: 'auto', minHeight: '0' }}>
              <RedRoomLogo></RedRoomLogo>
            </div>
          </Link>

        </div>
        <div className="flex gap-12 items-center px-4">
          <div
            className="text-[#fffae1] moderat-bold cursor-pointer h-full flex items-center gap-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={hoverRef}
          >
            <span>ABOUT</span>
            <Carrot rotated={isHover} />
          </div>
          <Link
            to="/location"
            className="text-[#fffae1] moderat-bold cursor-pointer"
          >
            LOCATION
          </Link>
          <Link
            to="/menu"
            className="text-[#fffae1] moderat-bold cursor-pointer"
          >
            MENU
          </Link>
          <Link
            to="/contact-us"
            className="text-[#fffae1] moderat-bold cursor-pointer"
          >
            CONTACT US
          </Link>
          <AnimatedButton
            text="RESERVE A TABLE"
            // clickURL="https://resy.com/cities/new-york-ny/venues/maison-passerelle"
            onClick={() => setModalOpen(true)}
            bgColor="#fffae1"
            textColor="#DCB243"
            hoverColor="#fffae1"
            border="#fffae1"
            w="180px"
            h="40px"
          />
        </div>
        <HeaderDropDown
          isHover={isHover}
          handleMouseLeave={handleMouseLeave}
          dropdownRef={dropdownRef}
          hoverRef={hoverRef}
          hoverValue="menu"
          headerData={data}
          handleMouseEnter={handleMouseEnter}
        />
      </div>
    </>
  );
}

export default HeaderComponent;
