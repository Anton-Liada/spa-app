import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '/src/features/hooks/hooks'
import { fetchOneCompany, updateCompany } from '/src/features/slices/companiesSlice';
import styles from './editingPage.module.scss';
import { ICompany } from '/src/types/types';

export const EditingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const company = useAppSelector((state) => (
    state.companies.companies.find(company => company.id === Number(id))));
  const nav = useNavigate();
  useEffect(() => {
    dispatch(fetchOneCompany(Number(id)))
  }, [id])

  // const company = useAppSelector(state => state.companies.selectedCompany)

  // console.log(company)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<ICompany>({
    defaultValues: {
      name: company?.name,
      address: company?.address,
      serviceOfActivity: company?.serviceOfActivity,
      numberOfEmployees: company?.numberOfEmployees,
    }
  });


  const onSubmit = async (values: ICompany) => {
    if (company) {
      dispatch(updateCompany({ ...values, id: company.id }));
    }

    nav('/');
  };

  return (
    <section className={styles.section}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Name</label>

          <input
            {...register('name', { required: 'enter data' })}
            className={styles.input}
            type="text"
            placeholder='Enter company name'
          />

          <label className={styles.label}>Number of employees</label>

          <input
            {...register('numberOfEmployees', { required: 'enter data' })}
            className={styles.input}
            type="number"
            placeholder='Enter number of employees'
          />

          <label className={styles.label}>Address</label>

          <input
            {...register('address', { required: 'enter data' })}
            className={styles.input}
            type="text"
            placeholder='Enter company address'
          />

          <label className={styles.label}>Service of activity</label>

          <input
            {...register('serviceOfActivity', { required: 'enter data' })}
            className={styles.input}
            type="textarea"
            placeholder='Enter service of activity'
          />
        </div>

        <button type='submit' className={styles.button}>UPDATE</button>
      </form >
    </section>
  )
}
