import PropTypes from 'prop-types';
import DoctorCard from "./DoctorCard";
import { useHospital } from '../context/HospitalContext';

function DoctorList({ onDoctorSelect }) {
  const { doctors } = useHospital();
  return (
    <div className="grid grid-cols-2 gap-4">
      {doctors.map((doctor, index) => (
        <DoctorCard
          key={index}
          doctor={doctor}
          onSelect={() => onDoctorSelect(doctor)}
        />
      ))}
    </div>
  );
}
DoctorList.propTypes = {
  onDoctorSelect: PropTypes.func.isRequired
};
export default DoctorList;