import PersonalInfo from './PersonalInfo/PersonalInfo';
import ProfessionalInfo from './ProfessionalInfo/ProfessionalInfo';
import Privacy from './Privacy/Privacy';
import General from './General/General';

export default function Settings() {
  return (
    <>
       <PersonalInfo />
       <ProfessionalInfo />
       <Privacy />
       <General />
    </>
  )
}
