import PropTypes from 'prop-types';
import { useState, Profiler } from 'react';
import DoctorDetailsModal from './DoctorDetailsModal';

// Callback de medición de rendimiento
const onRenderCallback = (
  id, // el id prop del Profiler tree que acaba de actualizar
  phase, // "mount" (primera vez) o "update" (re-renderizado)
  actualDuration, // tiempo dedicado a renderizar el componente
  baseDuration, // tiempo estimado de renderizado sin memoización
  startTime, // cuando React comenzó a renderizar este update
  commitTime, // cuando React hizo commit de este update
  interactions // Set de interacciones pertenecientes al update
) => {
  console.group(`Profiler: ${id}`);
  console.log(`Fase: ${phase}`);
  console.log(`Duración actual: ${actualDuration.toFixed(2)}ms`);
  console.log(`Duración base: ${baseDuration.toFixed(2)}ms`);
  console.log(`Tiempo de inicio: ${startTime}`);
  console.log(`Tiempo de commit: ${commitTime}`);
  console.groupEnd();
};

function DoctorCard({ doctor, onSelect }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Profiler id="DoctorCard" onRender={onRenderCallback}>
      <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        <img 
          src={doctor.img}
          alt={doctor.name} 
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          loading="lazy"
        />
        <h3 className="text-xl font-semibold">{doctor.name}</h3>
        <p className="text-gray-600">{doctor.specialty}</p>
        <p className="text-sm text-gray-500 mt-2"> {doctor.experience} años de experiencia.</p>
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-third-color text-first-color py-2 rounded hover:bg-second-color"
        >
          Ver Detalles
        </button>
        <button 
          onClick={onSelect}
          className="w-full mt-4 bg-third-color text-first-color py-2 px-4 rounded hover:bg-second-color transition-colors"
        >
          Seleccionar Doctor
        </button>
      </div>
      
      <DoctorDetailsModal
        doctor={doctor}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
      </Profiler>
    </>
  );
}
DoctorCard.propTypes = {
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
  }).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default DoctorCard;