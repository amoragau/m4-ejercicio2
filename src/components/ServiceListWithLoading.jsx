import HOCLoadAndError from './HOCLoadAndError';
import ServiceList from './ServiceList';

const ServiceListWithLoading = HOCLoadAndError(ServiceList);

export default ServiceListWithLoading;