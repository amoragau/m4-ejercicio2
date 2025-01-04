import PropTypes from 'prop-types';
import React from "react";
function ServiceList({services}) {
  return (
    <div className="bg-third-color p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-first-color">Servicios Médicos</h2>
      <ul className="space-y-2">
        {services.map((service) => (
          <React.Fragment key={service.id}>
            <li className="flex items-center text-gray-700">
              <svg 
                className="w-5 h-5 mr-2 text-first-color" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
              {service.name}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
ServiceList.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
};
export default ServiceList;