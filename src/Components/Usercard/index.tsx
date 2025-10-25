import React from 'react';

interface IUserCard {
  img: string;
  name: string;
  description: string;
  phonenumber: string;
  email: string;
}

function Usercard({ img, name, description, phonenumber, email }: IUserCard) {
  return (
    <div className='c-usercard'>
      <div className='c-usercard__item'>
        <img className='c-usercard__img' src={img} alt={name + ' avatar'} />
        <h5 className='c-usercard__title'>{name}</h5>
        <p className='c-usercard__description'>{description}</p>
        <p className='c-usercard__subtext'>{email}</p>
        <a href={'tel:' + phonenumber} className='c-usercard__subtext'>
          {phonenumber}
        </a>
      </div>
    </div>
  );
}

export default Usercard;
