# Sistema Hospital las Casitas

## 📋 Descripción
Sistema web para la gestión de citas médicas desarrollado con React, Vite y Tailwind CSS. 

## 🚀 Características Principales
- Visualización de doctores por especialidad.
- Formulario de agendamiento de citas.
- Selección de doctor
- Panel de consultas.
- Interfaz responsiva y amigable.

## 🛠️ Tecnologías Utilizadas
- React
- Vite
- Tailwind CSS
- useState y useEffect Hooks

## 📦 Instalación

1. Clonar el repositorio
```bash
git clone https://github.com/amoragau/m4-ejercicio2.git
cd m4-ejercicio1
```

2. Instalar dependencias
```bash
npm install
```

3. Iniciar el servidor de desarrollo
```bash
npm run dev
```

## 🔧 Configuración

### Estructura de Archivos
```
m4-ejercicio1/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AppointmentForm.jsx
│   │   ├── DoctorList.jsx
│   │   ├── DoctorCard.jsx
│   │   ├── DoctorDetailsModal.jsx
│   │   ├── HOCLoadAndError.jsx
│   │   ├── HospitalWebsite.jsx
│   │   ├── Modal.jsx
│   │   ├── ServiceListWithLoading.jsx
│   │   └── ServiceList.jsx
│   ├── context/
│   │   └── HospitalContext.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── README.md
├── tailwind.config.js 
```

### 1. Manejo del DOM Virtual en ReactJS

```javascript
const [pacientes, setPacientes] = useState([
  { id: 1, nombre: 'Ana García', edad: 45, estado: 'En consulta' },
  // ...más pacientes
]);
```
- React mantiene una representación virtual de este estado.
- Las actualizaciones se procesan en memoria antes de aplicarse al DOM real.

Actualizaciones Eficientes

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setPacientes(prev => prev.map(paciente => {
      if (Math.random() > 0.7) {
        // Solo actualiza los pacientes necesarios
        return { ...paciente, estado: nuevoEstado };
      }
      return paciente;
    }));
  }, 5000);
  return () => clearInterval(interval);
}, []);
```
- Las actualizaciones automáticas cada 5 segundos.
- React solo rerenderiza los componentes que cambian.

#### Beneficios del Virtual DOM

1. **Rendimiento Optimizado**
   - Minimiza manipulaciones del DOM real.
   - Reduce el costo de actualizaciones frecuentes.
   - Agrupa múltiples cambios en una sola actualización.

2. **Actualizaciones Eficientes**
   - Solo se actualizan los componentes necesarios.
   - Evita repintados innecesarios del navegador.
   - Mantiene la interfaz fluida incluso con muchos datos.

3. **Gestión de Memoria**
   - Limpieza automática de event listeners.
   - Prevención de memory leaks.
   - Gestión eficiente de recursos.

### 2. Creación y Uso de Referencias en React 
Se utiliza en el componente `AppointmentForm.jsx` para enfocar automaticamente el campo del formulario que permite seleccionar un doctor una vez que el formulario ha sido enviado. 

```jsx
const nameInputRef = useRef(null);

const handleSubmit = (e) => {
  e.preventDefault();
  onSubmit({
    ...formData,
    doctor: selectedDoctor
  });

  setFormData(initialState);
  nameInputRef.current.focus();
};

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
```

### 3. Uso de Fragmentos y Contexto en ReactJS

#### Fragment
Se utiliza en el componente `ServiceList.jsx`

```jsx
{services.map((service) => (
  <React.Fragment key={service.id}>
    <li className="flex items-center text-gray-700">
      <svg 
        className="w-5 h-5 mr-2 text-first-color" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      />
      {service.name}
    </li>
  </React.Fragment>
))}
```
#### Context
Se crea el context `HospitalProvider.jsx` para cargar los datos se los doctores sin tener que pasarlos entre los componentes utilizando props.

Se utiliza en en componente `DoctorList.jsx`:

```jsx
const { doctors } = useHospital();
//resto de codigo
```

### 4. Verificación de Tipos con PropTypes

Se utiliza en:
- `AppointmentForm.jsx`
```jsx
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
```
- `DoctorCard.jsx`
```jsx
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
```
- `ServiceList.jsx`
```jsx
ServiceList.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
};
```

### 5. Uso de Componentes de Orden Superior y Portales

Para el sitio web del Hospital se utiliza un HOC para manejar los estados de carga de los Servicios.

#### Componente `HOCLoadAndError.jsx`:
- Muestra un spinner de carga cuando `isLoading` es true.
- Maneja errores si ocurren.
- Gestiona la presentación de datos cuando están disponibles.

Se utiliza en `ServiceListWithLoading.jsx`:
```jsx
// Cuando un componente usa HOCLoadAndError
const ServiceListWithLoading = HOCLoadAndError(ServiceList);

// Lo que sucede internamente:
- Si está cargando → Muestra un spinner giratorio.
- Si hay error → Muestra un mensaje de error.
- Si hay datos → Muestra el componente original con los datos.
```
Para que en la interfaz se muestre el spinner giratorio se simula la llamada de una Api para cargar los servicios con un retraseo de 3 segundos.

`HospitalWebsite.jsx`
```jsx
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
```

### 6. Optimización de Rendimiento y Profiler en ReactJS

La implementación del Profiler permite:

- Medir tiempos de renderizado
- Identificar re-renders innecesarios
- Optimizar interacciones costosas
- Monitorear el rendimiento en producción
- Detectar cuellos de botella en el rendimiento

```jsx
import { Profiler } from 'react';

//Callback 
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
```
El Profiler en utiliza en `DoctorCard.jsx` para medir y monitorear el rendimiento del componente.

```jsx
<Profiler id="DoctorCard" onRender={onRenderCallback}>
  {/* Componente DoctorCard */}
</Profiler>
```


## 📱 Responsive Design
El sistema está diseñado para funcionar en:
- Dispositivos móviles
- Tablets
- Escritorio

## Recursos ✒️

* [unDraw](https://undraw.co)
* [DALL-E](https://openai.com/index/dall-e-3/)
* [ChatGPT](https://openai.com/index)

## Autor
Desarrollado Ana Moraga.
