import { ReactNode } from 'react';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface OrderedActivityStep {
  id: string;
  label: ReactNode;
}

interface OrderedActivityStepsProps {
  active: string; // The id of the active step
  steps: OrderedActivityStep[];
}
export const OrderedActivitySteps = (props: OrderedActivityStepsProps) => {
  const { steps, active } = props;
  const activeIndex = steps.findIndex((step) => step.id === active) || 0;

  // This component assumes a limited number of steps and has been hardcoded to break at medium width
  // If more steps or longer text is added, this component will need to be modified.
  return (
    <ol className="flex flex-col justify-center gap-2 md:flex-row">
      {steps.map((step, index) => (
        <OrderedActivityStepItem key={step.id} step={step} index={index} state={getState(index, activeIndex)} />
      ))}
    </ol>
  );
};

enum OrderedActivityState {
  RESOLVED,
  ACTIVE,
  PENDING,
}

interface OrderedActivityStepProps {
  index: number;
  step: OrderedActivityStep;
  state: OrderedActivityState;
}
const OrderedActivityStepItem = (props: OrderedActivityStepProps) => {
  const { t } = useTranslation();
  const { index, step, state } = props;
  return (
    <li className="flex flex-col gap-2" aria-current={state === OrderedActivityState.ACTIVE ? 'step' : undefined}>
      {index !== 0 && <span className="block w-10 h-px m-auto md:hidden bg-gray-300" />}
      <div className="flex items-center justify-center md:justify-start gap-2">
        {index !== 0 && <span className="w-10 h-px hidden md:block bg-gray-300" />}
        <span
          className={clsx(
            'flex items-center justify-center w-5 h-5 rounded-full font-bold',
            state === OrderedActivityState.RESOLVED && 'bg-blue-100 text-blue-500',
            state === OrderedActivityState.ACTIVE && 'bg-blue-500 text-white',
            state === OrderedActivityState.PENDING && 'bg-gray-300 text-white',
          )}
        >
          {state === OrderedActivityState.RESOLVED ? <FontAwesomeIcon icon={faCheck} size="xs" /> : index + 1}
        </span>
        <span
          className={clsx(
            'uppercase font-semibold whitespace-nowrap',
            state === OrderedActivityState.RESOLVED && 'text-gray-500',
            state === OrderedActivityState.PENDING && 'text-gray-300',
          )}
        >
          {t(`onboarding.${step.label}`)}
        </span>
      </div>
    </li>
  );
};

function getState(index: number, activeIndex: number): OrderedActivityState {
  if (index === activeIndex) {
    return OrderedActivityState.ACTIVE;
  } else if (index > activeIndex) {
    return OrderedActivityState.PENDING;
  } else {
    return OrderedActivityState.RESOLVED;
  }
}
