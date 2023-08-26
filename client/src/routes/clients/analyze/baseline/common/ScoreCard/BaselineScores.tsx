import { memo } from 'react';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { color, score } from 'src/routes/clients/analyze/baseline/common/utils';

interface BaselineDisplayProps {
  title: string;
  value: number;
  lastUpdated: string | undefined;
}

export const BaselineDisplayComponent = memo((props: BaselineDisplayProps) => {
  const { title, value, lastUpdated = new Date() } = props;
  const { t } = useTranslation();
  return (
    <div className="flex grow border-solid border-[1px] border-[#cccccc] rounded-xl m-2">
      <div className="flex flex-row grow">
        <div className="flex items-center border-right border-ccc-500 border-r-2 p-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="42.042" height="36.879" viewBox="0 0 42.042 36.879">
            <path id="Path_1816" data-name="Path 1816" d="M41-22.63C41-12.388,35.391-3.788,26.962-1a14.033,14.033,0,0,1-5.18,1A14.148,14.148,0,0,1,9.314-7.568,19.448,19.448,0,0,0,3.792,1.088,1.923,1.923,0,0,1,1.923,2.563a1.977,1.977,0,0,1-.449-.053A1.925,1.925,0,0,1,.053.191C.822-2.972,7.3-17.939,26.9-17.939a1.284,1.284,0,0,0,1.284-1.28A1.285,1.285,0,0,0,26.906-20.5a31.142,31.142,0,0,0-19.2,6.054,14.44,14.44,0,0,1,.283-2.647A14.079,14.079,0,0,1,18.516-27.839a14.087,14.087,0,0,1,6.481,0,10.785,10.785,0,0,0,11.956-4.9,1.108,1.108,0,0,1,1.975.066A25.159,25.159,0,0,1,41-22.63Z" transform="translate(0.542 33.817)" fill={`${color(value)}`} stroke="rgba(0,0,0,0)" strokeWidth="1" />
          </svg>

        </div>
        <div className="flex flex-col px-6 my-2 self-center">
          <div className="text-sm">{title}</div>
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="flex-1 text-4xl">{value}%</div>
            </div>
          </div>
          <div className="text-[10px] text-[#101011]">
            {t('questionnaire.last-updated')}:
            <span className="ml-0.5">
              {dayjs(lastUpdated).format('MMMM DD,YYYY')}
            </span>
          </div>
        </div>
        <div className="flex flex-row flex-1 justify-end pr-6">
          <div className="p-4 rounded self-center" style={{ backgroundColor: color(value) }}>
            <div className="text-white font-bold rounded px-1 py-.5" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
              {score(value)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
