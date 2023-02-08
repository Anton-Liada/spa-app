import { ICompany } from '../types/types';
import { filteredText } from './filteredText';

export const filteredCompaniesByKeyWords = (
  companies: ICompany[],
  value: string,
) => {
  const filteredByName = companies.filter(({ name }) =>
    filteredText(name, value),
  );

  const filteredByserviceOfActivity = companies.filter(
    ({ serviceOfActivity }) => filteredText(serviceOfActivity, value),
  );

  const filteredCompanies = [
    ...new Set([...filteredByName, ...filteredByserviceOfActivity]),
  ];

  return filteredCompanies;
};
