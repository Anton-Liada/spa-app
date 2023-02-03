import React from 'react';
import { ICompany } from '../../types/types';
import { ButtonComponent } from '../button';
import { useAppDispatch } from '/src/features/hooks/hooks';
import { deleteCompany, fetchOneCompany } from '/src/features/slices/companiesSlice';
import styles from '../button/button.module.scss';
import { Link } from 'react-router-dom';

interface IProps {
  company: ICompany;
}

export const CompanyExcerpt: React.FC<IProps> = ({ company }) => {
  const {
    id,
    name,
    address,
    serviceOfActivity,
    numberOfEmployees,
  } = company;
  const dispatch = useAppDispatch();

  const handleRemoveCompany = async (id: number) => {
    await dispatch(deleteCompany(id));
  };

  return (
    <tr key={id}>
      <td>{id}</td>

      <td>{name}</td>

      <td>{address}</td>

      <td>{serviceOfActivity}</td>

      <td>{numberOfEmployees}</td>

      <td>
        <Link
          className={styles.button}
          to={`editingCompany/${id}`}
        >
          update
        </Link>

        <ButtonComponent onClick={() => handleRemoveCompany(id)} content="delete" />
      </td>
    </tr>
  );
};
