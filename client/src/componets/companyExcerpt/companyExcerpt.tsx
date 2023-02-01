import React from 'react';
// import { deleteUser } from '../../features/users/usersSlice';
import { ICompany } from '../../types/types';
// import { Button } from '../Button';
import { useAppDispatch } from '/src/features/hooks/hooks';

type Props = {
  company: ICompany;
  // isOpenModal: (value: ICompany | null) => void;
};

export const CompanyExcerpt: React.FC<Props> = ({ company }) => {
  const { id,
    name,
    address,
    serviceOfActivity,
    numberOfEmployees,
    author } = company;
  const dispatch = useAppDispatch();

  // const handleRemoveUser = async () => {
  //   await dispatch(deleteUser(id));
  // };

  return (
    <tr key={id}>
      <td>{id}</td>

      <td>{name}</td>

      <td>{address}</td>

      <td>{serviceOfActivity}</td>

      <td>{numberOfEmployees}</td>

      <td>
        <button 
          className="table-button" 
          // onClick={() => isOpenModal(company)}
          >
          update
        </button>

        {/* <Button onClick={handleRemoveUser} content="delete" /> */}
      </td>
    </tr>
  );
};
