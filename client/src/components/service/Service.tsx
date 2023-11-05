import CarBody from '../CarBody';
import './service.scss';
import { useState } from 'react';
import { Carbody } from '../../enums/carbody';
import Box from '../Box';
import { Col, Divider, Row, Steps } from 'antd';
import { ServiceStepsList } from '../../lists/ServiceSteps.list';
import { StepsSwitch } from '../stepsSwitch/StepsSwitch';
import Employee from '../employee/Employee';
import Customer from '../customer/Customer';
import { IService } from '../servicesTable/ServicesTable';
import Services from './steps/services/Services';

const Service = () => {
    const [step, setStep] = useState<number>(1);
    const [carBody, setCarBody] = useState<string>(Carbody.Sedan);
    const [client, setClient] = useState<number>();
    const [box, setBox] = useState<number>(1);
    const [customer, setCustomer] = useState<string>();
    const [services, setServices] = useState<Array<IService>>([]);
    const [materials, setMaterials] = useState<Array<IService>>([]);
    console.log('services', services);
    const onChangeStep = (value: number): void => {
        setStep(value);
    };

    return (
        <div className="service">
            <div className="service__tab">
                <Steps current={step} items={ServiceStepsList} onChange={onChangeStep} />
                {!step ? (
                    <>
                        <CarBody value={carBody} setValue={setCarBody} />
                        <Row gutter={16}>
                            <Col span={8}>
                                <Employee value={client} setValue={setClient} />
                            </Col>
                            <Col span={16}>
                                <Box value={box} setValue={setBox} />
                            </Col>
                        </Row>
                        <Divider />
                        <Customer value={customer} setValue={setCustomer} />
                    </>
                ) : null}
                {step === 1 ? (
                    <Services
                        services={services}
                        setServices={setServices}
                        materials={materials}
                        setMaterials={setMaterials}
                    />
                ) : null}
            </div>
            <StepsSwitch step={step} setStep={setStep} />
        </div>
    );
};

export default Service;
