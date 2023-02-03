import Usercard from 'Components/Usercard';
import React, { useEffect, useState } from 'react';
import { axiosI } from 'Utils/Types/axiosInstance';
import { IUser } from 'Utils/Types/userType';

import OnsTeamIcon from 'Images/Png/ons_team_icon.png';
import PageDivider from 'Components/PageDivider';

interface ITeamMember {
  first_name: string;
  last_name: string;
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
        .get<IUser[]>('/wp/v2/users?exclude=1,2,3&context=edit&per_page=50')
        .then(({ data }) => {
          const tempUsers: ITeamMember[] = [];
          data.forEach(
            ({
              first_name,
              last_name,
              email,
              acf: { functie, telefoonnummer },
              simple_local_avatar: { full },
            }) => {
              tempUsers.push({
                first_name,
                last_name,
                email,
                functie,
                telefoonnummer,
                full,
              });
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
            return (
              <Usercard
                key={index}
                img={user.full}
                firstname={user.first_name}
                lastname={user.last_name}
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
