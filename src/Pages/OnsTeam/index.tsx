import Usercard from 'Components/Usercard';
import React, { useEffect, useState } from 'react';
import { axiosI } from 'Utils/Types/axiosInstance';
import { IUser } from 'Utils/Types/userType';

import PageDivider from 'Components/PageDivider';

interface ITeamMember {
  name: string;
  email: string;
  functie: string;
  telefoonnummer: string;
  full: string;
}

export default function OnsTeam() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<ITeamMember[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      await axiosI
        .get<IUser[]>('/wp/v2/users?exclude=1,2,3')
        .then(({ data }) => {
          console.log({ data });
          const tempUsers = data.map(
            ({
              name,
              email,
              acf: { functie, telefoonnummer },
              simple_local_avatar,
            }) => {
              return {
                name,
                email,
                functie,
                telefoonnummer,
                full: simple_local_avatar?.full || '',
              };
            }
          );
          setUsers(tempUsers);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchUsers();
  }, []);

  return (
    <>
      <PageDivider title={'Ons Team'} />
      <div className='c-usercard__grid'>
        {loading === false &&
          users.map((user, index) => {
            const key = user.email || `${user.name}-${index}`;
            return (
              <Usercard
                key={key}
                img={user.full}
                name={user.name}
                description={user.functie}
                email={user.email}
                phonenumber={user.telefoonnummer}
              />
            );
          })}
      </div>
    </>
  );
}
