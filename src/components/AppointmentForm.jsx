import PropTypes from 'prop-types';
import { useState, useRef} from 'react';
import { useHospital } from '../context/HospitalContext';

function AppointmentForm({ selectedDoctor, services, onSubmit, onDoctorSelect  }) {
  const { doctors } = useHospital();
  const initialState = {
    name: '',
    email: '',
    phone: '',
    date: '',
    message: ''
  };
  const nameInputRef            = useRef(null);
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      doctor: selectedDoctor
    });

    setFormData(initialState);
    nameInputRef.current.focus();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-first-color">Agendar Cita</h2>
      {/* Selección de Doctor */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Doctor</label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedDoctor ? selectedDoctor.name : ''}
          onChange={(e) => {
            const doctor = doctors.find(d => d.name === e.target.value);
            onDoctorSelect(doctor);
          }}
          ref={nameInputRef}
          required
        >
          <option value="">Seleccione un doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.name} value={doctor.name}>
              {doctor.name} - {doctor.specialty}
            </option>
          ))}
        </select>
      </div>
      {selectedDoctor && (
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="font-semibold">Doctor seleccionado:</p>
          <p>{selectedDoctor.name} - {selectedDoctor.specialty}</p>
          <p className="text-sm text-gray-600">{selectedDoctor.experience} años de experiencia</p>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre Completo</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Teléfono</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Fecha</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Mensaje (opcional)</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          rows="4"
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          disabled={!selectedDoctor}
          className={`bg-third-color hover:bg-second-color text-first-color font-bold py-2 px-4 rounded
            ${(!selectedDoctor) 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {!selectedDoctor 
            ? 'Seleccione doctor' 
            : 'Agendar Cita'
          }
        </button>
      </div>
    </form>
  );
}
AppointmentForm.propTypes = {
  selectedDoctor: PropTypes.shape({
    name: PropTypes.string.isRequired,
    specialty: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired
  }),
  services: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDoctorSelect: PropTypes.func.isRequired
};

export default AppointmentForm;