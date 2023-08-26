import { memo } from 'react';

import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { DateFmt } from 'src/common/formatters';

interface DateIconProps {
  date?: Date;
  hideIcon?: boolean;
}

export const DateIcon = memo((props: DateIconProps) => {
  let { date, hideIcon } = props;

  return (
    <span className="flex gap-2 items-center">
      {!hideIcon && <FontAwesomeIcon icon={faCalendarAlt} className="text-neutral-900" size="xs" />}
      <span>
        <DateFmt value={date} dateStyle="medium" />
      </span>
    </span>
  );
});
