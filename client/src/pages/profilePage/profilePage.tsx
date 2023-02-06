import React, { useMemo } from 'react'
import { useAppSelector } from '/src/features/hooks/hooks'
import { CompaniesList } from '/src/componets/companiesList';
import './profilePage.scss';

export const ProfilePage: React.FC = () => {
  const profile = useAppSelector(state => state.profile.profile);
  const companies = useAppSelector(state => state.companies.companies);

  const myCompanies = useMemo(() => {
    return companies.filter(({ userId }) => userId === profile?.id)
  }, [companies]);

  return (
    <>
      <section className="profile-section container">
        <div className="profile-block">
          <div className="profile-block__img-wrapper">
            <img
              src="https://api.realworld.io/images/smiley-cyrus.jpeg"
              alt=""
              className="profile-block__img"
            />
          </div>

          <div className="profile-block__info">
            <ul className="info-list">
              <li className="title">
                {profile?.nick_name}
              </li>

              <li className="info-list__item">
                {`First name: ${profile?.first_name}`}
              </li>

              <li className="info-list__item">
                {`Last name: ${profile?.last_name}`}
              </li>

              <li className="info-list__item">
                {`Email: ${profile?.email}`}
              </li>

              <li className="info-list__item">
                {`Role: ${profile?.roles?.map(role => role.position)}`}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <CompaniesList companies={myCompanies} title='My companies' />
    </>
  )
}
