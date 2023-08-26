import { memo } from 'react';

import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import styles from './InfoTooltip.module.scss';

interface InfoTooltipProps {
  content: string;
  className?: string;
}

export const InfoTooltip = memo((props: InfoTooltipProps) => {
  const { className = '', content } = props;
  return (
    <div className={clsx(styles.trigger, className)} data-tooltip={content}>
      <FontAwesomeIcon icon={faCircleQuestion} />
    </div>
  );
});
