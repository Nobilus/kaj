import React from 'react';
import { useLocation } from 'react-router-dom';

// icons
import kijkerIcon from 'Images/Png/in_de_kijker_icon.png';
import onsteamIcon from 'Images/Png/ons_team_icon.png';
import shopIcon from 'Images/Png/shop_icon_white.png';
import gear from 'Images/Svg/gear.svg';
import pin from 'Images/Svg/pin.svg';
import over_ons from 'Images/Svg/over_ons_icon.svg';
import calendar from 'Images/Svg/calendar.svg';

interface IDivider {
  src?: string;
  alt?: string;
  title: string;
}

const icons: { [key: string]: string } = {
  'in-de-kijker': kijkerIcon,
  Kalender: calendar,
  'precair-werk': kijkerIcon,
  scheidingssituaties: kijkerIcon,
  'waardig-leven': kijkerIcon,
  uitbouw: kijkerIcon,
  afdelingen: pin,
  'over-ons': over_ons,
  'ons-team': onsteamIcon,
  praktisch: gear,
  shop: shopIcon,
  winkelwagen: shopIcon,
  afrekenen: shopIcon,
  nieuws: kijkerIcon,
  themas: kijkerIcon,
  evenementen: calendar,
};

const capFirstLetter = (title: string) => {
  return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
};

function PageDivider({ src, title, alt = title }: IDivider) {
  const { pathname } = useLocation();
  const parentPath = pathname.split('/')[1];

  // Prefer an explicit `src` prop, then a mapped icon for the current parent path,
  // otherwise fall back to a sensible default icon so the image never breaks.
  const icon = src || icons[parentPath];

  return (
    <div className='c-homepage-divider'>
      <div className='c-kijker'>
        {icon && <img className='c-kijker__icon' src={icon} alt={alt} />}
      </div>
      <h4>{capFirstLetter(title)}</h4>
    </div>
  );
}

export default PageDivider;
