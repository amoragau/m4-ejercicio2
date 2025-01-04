import PropTypes from 'prop-types';
import Modal from './Modal';
const DoctorDetailsModal = ({ doctor, isOpen, onClose }) => {
  if (!doctor) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <img 
          src={doctor.img} 
          alt={doctor.name}
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          loading="lazy"
        />
        <h2 className="text-2xl font-bold mb-2">{doctor.name}</h2>
        <p className="text-lg text-gray-600 mb-4">{doctor.specialty}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded">
            <h3 className="font-bold mb-2">Experiencia</h3>
            <p>{doctor.experience} años</p>
          </div>
          <div className="bg-blue-50 p-4 rounded">
            <h3 className="font-bold mb-2">Consultas</h3>
            <p>+1000 pacientes</p>
          </div>
        </div>

        <div className="text-left mb-6">
          <h3 className="font-bold mb-2">Horarios de Atención</h3>
          <ul className="space-y-1">
            {Object.entries(doctor.schedule).map(([day, info], index) => (
              <li key={index} className="flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {day}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-left mb-6">
          <h3 className="font-bold mb-2">Especialidad</h3>
          <p>{doctor.specialty}</p>
        </div>

        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};
DoctorDetailsModal.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    schedule: PropTypes.shape({
      lunes: PropTypes.shape({
        hours: PropTypes.string.isRequired,
        available: PropTypes.bool.isRequired
      }),
      martes: PropTypes.shape({
        hours: PropTypes.string.isRequired,
        available: PropTypes.bool.isRequired
      }),
      miercoles: PropTypes.shape({
        hours: PropTypes.string.isRequired,
        available: PropTypes.bool.isRequired
      }),
      jueves: PropTypes.shape({
        hours: PropTypes.string.isRequired,
        available: PropTypes.bool.isRequired
      }),
      viernes: PropTypes.shape({
        hours: PropTypes.string.isRequired,
        available: PropTypes.bool.isRequired
      })
    }).isRequired
  }).isRequired
};

export default DoctorDetailsModal;