import React from 'react';

import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover } from '@headlessui/react';

import { Show } from 'src/common/layout';

import tooltipStyles from 'src/common/components/icons/TooltipIcon.module.scss';

interface TooltipIconProps {
  tooltip?: string;
}

export const TooltipIcon = React.memo((props: TooltipIconProps) => {
  const { tooltip } = props;
  return (
    <Popover className={tooltipStyles.popover}>
      <Popover.Button>
        <FontAwesomeIcon icon={faQuestionCircle} color="#C3C4C5" />
      </Popover.Button>
      <Show show={Boolean(tooltip)}>
        <div className={`${tooltipStyles.tooltipContents} bg-gray-100 text-neutral-600 p-3 border rounded-md`}>
          {tooltip}
        </div>
      </Show>
    </Popover>
  );
});
