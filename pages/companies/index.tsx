import type { GetServerSideProps } from 'next';
import { apiURL } from '../../api/routes';
import CompanyListView from '../../components/Company/CompanyList.view';
import { ICompany } from '../../interfaces/Company.interface';

type Props = {
	companies: ICompany[];
};

const Companies = ({ companies }: Props) => {
	return <CompanyListView companies={companies} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
	const res = await fetch(apiURL('company'));
	const companies = await res.json();
	return { props: { companies } };
};

export default Companies;
