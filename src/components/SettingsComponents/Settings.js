import { useGetUserDataQuery } from '../../store/services/userApi';
import PersonalInfo from './PersonalInfo/PersonalInfo';
import ProfessionalInfo from './ProfessionalInfo/ProfessionalInfo';
import Privacy from './Privacy/Privacy';
import General from './General/General';

export default function Settings() {
  const { data, error, isLoading } = useGetUserDataQuery();

  if (isLoading) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <PersonalInfo data={data} />
      <ProfessionalInfo data={data} />
      <Privacy data={data} />
      <General data={data} />
    </>
  );
}
