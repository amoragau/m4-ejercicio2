import { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const HospitalContext = createContext();

// Crear el Provider personalizado
export const HospitalProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(()=>{
    //Simular API
    setDoctors([
      {id: 1, name: 'Dr. Juan Pérez', specialty: 'Cirugía General', experience: 7, img: 'medico1.jpg',
        schedule: {
          lunes: { hours: '09:00-17:00', available: true },
          martes: { hours: '09:00-17:00', available: true },
          miercoles: { hours: '09:00-13:00', available: true },
          jueves: { hours: '14:00-17:00', available: true },
          viernes: { hours: '09:00-17:00', available: true }
        }
      },
      {id: 2, name: 'Dra. María González', specialty: 'Pediatría', experience: 10, img: 'medico3.jpg',
        schedule: {
          lunes: { hours: '08:00-16:00', available: true },
          martes: { hours: '08:00-16:00', available: true },
          miercoles: { hours: '14:00-20:00', available: true },
          jueves: { hours: '08:00-16:00', available: true },
          viernes: { hours: '08:00-13:00', available: true }
        }
      },
      {id: 3, name: 'Dr. Luis Sánchez', specialty: 'Cardiología', experience: 15, img: 'medico2.jpg',
        schedule: {
          lunes: { hours: '10:00-18:00', available: true },
          martes: { hours: '10:00-18:00', available: true },
          miercoles: { hours: '10:00-18:00', available: true },
          jueves: { hours: '10:00-18:00', available: true },
          viernes: { hours: '10:00-15:00', available: true }
        }
      },
      {id: 4, name: 'Dr. Luis Mendoza', specialty: 'Neurología', experience: 8, img: 'medico4.jpg',
        schedule: {
          lunes: { hours: '08:00-14:00', available: true },
          martes: { hours: '14:00-20:00', available: true },
          miercoles: { hours: '08:00-14:00', available: true },
          jueves: { hours: '14:00-20:00', available: true },
          viernes: { hours: '08:00-14:00', available: true }
        }
      },
    ])
  }, []);

  const value = {
    doctors,
  };

  return (
    <HospitalContext.Provider value={value}>
      {children}
    </HospitalContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital debe ser usado dentro de un HospitalProvider');
  }
  return context;
};
export default HospitalProvider;