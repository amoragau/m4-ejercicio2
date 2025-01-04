import { useState, useEffect, useMemo } from 'react';

const HospitalPanel = () => {
  const [pacientes, setPacientes] = useState([
    { id: 1, nombre: 'Ana García', edad: 45, estado: 'En consulta' },
    { id: 2, nombre: 'Carlos López', edad: 32, estado: 'Esperando' },
    { id: 3, nombre: 'María Rodríguez', edad: 28, estado: 'Atendido' },
    { id: 4, nombre: 'Juan Pérez', edad: 56, estado: 'Esperando' },
  ]);
  const [filtroEstado, setFiltroEstado] = useState('todos');

  // Simulación de actualizaciones en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setPacientes(prev => prev.map(paciente => {
        if (Math.random() > 0.7) {
          const estados = ['Esperando', 'En consulta', 'Atendido'];
          return {
            ...paciente,
            estado: estados[Math.floor(Math.random() * estados.length)]
          };
        }
        return paciente;
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  const pacientesFiltrados = useMemo(() => {
    return pacientes.filter(paciente => 
      filtroEstado === 'todos' ? true : paciente.estado === filtroEstado
    );
  }, [pacientes, filtroEstado]);
  const estadisticas = useMemo(() => {
    return {
      totalPacientes: pacientes.length,
      enEspera: pacientes.filter(p => p.estado === 'Esperando').length,
      atendidos: pacientes.filter(p => p.estado === 'Atendido').length,
      enConsulta: pacientes.filter(p => p.estado === 'En consulta').length
    };
  }, [pacientes]);

  return (
    <div className="flex items-center">
      <div className="w-full p-4">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
          {/* Lista de Pacientes */}
          <div className="space-y-6">
            {/* Filtro de Estado */}
            <div className="flex justify-end">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
              >
                <option value="todos">Todos los estados</option>
                <option value="Esperando">Esperando</option>
                <option value="En consulta">En consulta</option>
                <option value="Atendido">Atendido</option>
              </select>
            </div>

            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-first-color mb-4">
                  Pacientes Actuales
                </h2>
                <div className="space-y-4">
                  {pacientesFiltrados.map(paciente => (
                    <div
                      key={paciente.id}
                      className={`rounded-lg p-4 shadow-sm ${
                        paciente.estado === 'Esperando' ? 'bg-yellow-50' :
                        paciente.estado === 'En consulta' ? 'bg-blue-50' : 'bg-green-50'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                          <h3 className="text-gray-800">{paciente.nombre}</h3>
                          <p className="text-sm text-gray-600">Edad: {paciente.edad}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">
                            {paciente.estado}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Panel de Control */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-first-color mb-4">
                Panel de Control
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm">Total Pacientes</p>
                  <p className="text-2xl">{estadisticas.totalPacientes}</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-sm">En Espera</p>
                  <p className="text-2xl">{estadisticas.enEspera}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm">Atendidos</p>
                  <p className="text-2xl">{estadisticas.atendidos}</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm">En Consulta</p>
                  <p className="text-2xl">{estadisticas.enConsulta}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HospitalPanel;