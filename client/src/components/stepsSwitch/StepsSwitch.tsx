import { ServiceStepsList } from '../../lists/ServiceSteps.list';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import './stepsSwitch.scss';
import { ERoutes } from '../../enums/routes';

interface PStepsSwitchProps {
    step: number;
    setStep: Function;
}

export const StepsSwitch: React.FC<PStepsSwitchProps> = ({ step, setStep }) => {
    const navigate = useNavigate();
    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const onCancel = () => {
        navigate(ERoutes.Main);
    };

    return (
        <div style={{ marginTop: 24 }} className="steps-switch">
            <div className="steps-switch__buttons">
                {step < ServiceStepsList.length - 1 && (
                    <Button type="primary" onClick={nextStep} className="steps-switch__button">
                        Далее
                    </Button>
                )}
                {step === ServiceStepsList.length - 1 && (
                    <Button
                        type="primary"
                        onClick={() => message.success('Processing complete!')}
                        className="steps-switch__button"
                    >
                        В работу
                    </Button>
                )}
                {step > 0 && (
                    <Button onClick={prevStep} className="steps-switch__button">
                        Назад
                    </Button>
                )}
            </div>
            <Button danger onClick={onCancel}>
                Отмена
            </Button>
        </div>
    );
};
