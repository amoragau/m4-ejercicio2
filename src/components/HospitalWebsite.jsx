import { useState, useEffect, Profiler } from 'react'
import '../App.css'
import { HospitalProvider } from '../context/HospitalContext';
import DoctorList from './DoctorList';
/* import ServiceList from './ServiceList'; */
import AppointmentForm from './AppointmentForm';
import hopitalImagen from '../assets/hospital.svg'
import hopitalLogo from '../assets/Las casitas.png'
import ServiceListWithLoading  from './ServiceListWithLoading';
import HospitalPanel  from './HospitalPanel';

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

const HospitalWebsite  = () => {
  const [currentPage, setCurrentPage]       = useState('home');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [services, setServices]             = useState(null);
  const [isLoading, setIsLoading]           = useState(true);
  useEffect(()=>{
    // Simular una llamada a API
    const fetchServices = async () => {
      try {
        console.log('Cargando datos...');
        // Simular delay
        await new Promise(resolve => setTimeout(resolve, 3000));
        const data = [
          {id: 1, name: 'Medicina General'},
          {id: 2, name: 'Cardiología'},
          {id: 3, name: 'Pediatría'},
          {id: 4, name: 'Ginecología'},
          {id: 5, name: 'Neurología'},
          {id: 6, name: 'Radiología'},
          {id: 7, name: 'Cirugía General'},
          {id: 8, name: 'Oncología'}
        ];
        console.log('Datos cargados:', data);
        setServices(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setCurrentPage('contact');
  };
  const handleAppointmentSubmit = (formData) => {
    console.log('Datos del formulario:', formData);
    alert('Cita agendada con éxito');
    setSelectedDoctor(null);
  };
  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <div className="container mx-auto px-4 py-8">
            <Profiler id="Home" onRender={onRenderCallback}>
              <div className="text-center">
                <h1 className="text-4xl font-bold text-first-color mb-4">
                  Hospital Las Casitas
                </h1>
                <p className="">
                  <img src={hopitalImagen} className="imagen-inicio" alt="Imagen hospital" />
                </p>
                <br />
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-first-color mb-4">
                      Nuestros Servicios
                    </h2>
                    <p className="text-black-600 mb-4">
                      Ofrecemos atención médica integral con los mejores especialistas.
                    </p>
                    <button 
                      onClick={() => setCurrentPage('medical-team')} 
                      className="bg-third-color text-first-color px-4 py-2 rounded hover:bg-second-color"
                    >
                      Ver Equipo Médico
                    </button>
                  </div>
                  <div className="shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-first-color mb-4">
                      Agende su Cita
                    </h2>
                    <p className="text-black-600 mb-4">
                      Reserva tu consulta de manera rápida y sencilla.
                    </p>
                    <button 
                      onClick={() => setCurrentPage('contact')} 
                      className="bg-third-color text-first-color px-4 py-2 rounded hover:bg-second-color"
                    >
                      Solicitar Cita
                    </button>
                  </div>
                  <div className="shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-first-color mb-4">
                      Atención 24/7
                    </h2>
                    <p className="text-black-600 mb-4">
                      Estamos disponibles para ti en cualquier momento.
                    </p>
                    <a 
                      href="tel:+56991234567" 
                      className="bg-third-color text-first-color px-4 py-2 rounded hover:bg-second-color"
                    >
                      Contactar
                    </a>
                  </div>
                </div>
              </div>
            </Profiler>
          </div>
        );
      
      case 'medical-team':
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-[2fr_1fr] gap-8">
              <div>
                <h2 className="text-3xl font-bold text-first-color mb-6">
                  Nuestro Equipo Médico
                </h2>
                <HospitalProvider>
                  <DoctorList onDoctorSelect={handleDoctorSelect} />
                </HospitalProvider>
              </div>
              <ServiceListWithLoading 
                isLoading={isLoading}
                services={services}
              />
            </div>
          </div>
        );
        
      case 'panel':
        return (
          <div className="container mx-auto px-4 py-8">
            <HospitalPanel />
          </div>
        );

      case 'contact':
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-first-color mb-6">
                  Contacto
                </h2>
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Información de Contacto
                  </h3>
                  <p className="text-gray-700 mb-2">
                    <strong>Dirección:</strong> Av. Salvador 364, Providencia, Región Metropolitana
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Teléfono:</strong> +56 9 9123 4567
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Email:</strong> 123@hlc.cl
                  </p>
                </div>
              </div>
              <HospitalProvider>
                <AppointmentForm
                  selectedDoctor={selectedDoctor}
                  services={services}
                  onSubmit={handleAppointmentSubmit}
                  onDoctorSelect={setSelectedDoctor}
                />
              </HospitalProvider>

            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
return (
    <div className="flex flex-col min-h-screen">
      <Profiler id="NavBar" onRender={onRenderCallback}>
        {/* Navbar */}
        <nav className="bg-third-color text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <img src={hopitalLogo} className="logo" alt="Imagen hospital" />
            <span className="text-2xl font-bold text-first-color">Hospital Las Casitas</span>
            <div className="space-x-4">
              <button 
                onClick={() => setCurrentPage('home')} 
                className="text-first-color hover:text-second-color"
              >
                Inicio
              </button>
              <button 
                onClick={() => setCurrentPage('medical-team')} 
                className="text-first-color hover:text-second-color"
              >
                Equipo Médico
              </button>
              <button 
                onClick={() => setCurrentPage('contact')} 
                className="text-first-color hover:text-second-color"
              >
                Agendar Cita
              </button>
              <button 
                onClick={() => setCurrentPage('panel')} 
                className="text-first-color hover:text-second-color"
              >
                Panel
              </button>
            </div>
          </div>
        </nav>
      </Profiler>
      {renderPage()}

      <footer className="bg-third-color text-white py-8 mt-auto">
        <div className="container mx-auto grid md:grid-cols-3 gap-6 text-first-color">
          <div>
            <h3 className="text-xl font-bold mb-4">Hospital Las Casitas</h3>
            <p className="text-sm">
              Comprometidos con tu salud y bienestar
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <div className="space-y-2">
              <button onClick={() => setCurrentPage('home')}>Inicio</button> ||
              <button onClick={() => setCurrentPage('medical-team')}>Equipo Médico</button> ||
              <button onClick={() => setCurrentPage('contact')}>Agendar Cita</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HospitalWebsite;