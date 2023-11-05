import ServicesTable, { IService } from '../../../servicesTable/ServicesTable';
import React from 'react';
import './services.scss';

interface ServicesProps {
    services: Array<IService>;
    setServices: Function;
    materials: Array<IService>;
    setMaterials: Function;
}
const Services: React.FC<ServicesProps> = ({ services, setServices, materials, setMaterials }) => {
    return (
        <div className="services">
            <ServicesTable title="Услуги" value={services} setValue={setServices} />
            <ServicesTable title="Материалы" value={materials} setValue={setMaterials} />
        </div>
    );
};

export default Services;
