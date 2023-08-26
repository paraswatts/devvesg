import { memo, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { color, score } from 'src/routes/clients/analyze/baseline/common/utils';

import { ProgressRing } from './ProgressRing';

interface BaselineDisplayProps {
  title: string;
  value: number;
  previousValue?: number;
  lastUpdated?: Date;
  hasPreviousScores?: boolean;
}

export const BaselineScoreBreakdown = memo((props: BaselineDisplayProps) => {
  const { title, value, previousValue = 0, hasPreviousScores } = props;
  const { t } = useTranslation();

  const difference = useMemo(() => {
    return Math.round((value - previousValue) / (previousValue || 1) * 100)
  }, [value, previousValue])

  return (
    <div className="flex grow border-[1px] border-[#cccccc] rounded-xl m-2 flex-col">
      <div className="flex flex-1 flex-col p-5">
        <div className="flex font-bold text-[18px] leading-5">
          {title}
          {hasPreviousScores && <div className="flex">
            <span className="font-normal mx-2">-</span>
            {Math.abs(difference)}%
            <div className={`ml-2 mt-0.5 ${difference < 0 ? 'rotate-180' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 8L1.41 9.41L7 3.83V16H9V3.83L14.58 9.42L16 8L8 0L0 8Z" fill={color(value)} />
              </svg>
            </div>
          </div>}
        </div>
        <div className="flex flex-col items-center flex-1 border-707070-500 py-7">
          <ProgressRing value={value} />
        </div>
      </div>

      {
        hasPreviousScores &&
        <>
          <div className='border-t-[1px] border-[#cccccc]'></div>
          <div className="flex flex-row flex-1 py-3 px-5 items-center justify-between">
            <div className="text-[#6a6a6a]">{t('buttons.previous')}:</div>
            <div className="px-6 py-1.5 rounded self-center" style={{ backgroundColor: color(previousValue) }}>
              <div className="text-white font-bold rounded px-1 py-.5" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                {score(previousValue)}
              </div>
            </div>
            <div className="text-base font-bold text-[#101011]">{previousValue}%</div>
          </div>
        </>
      }
    </div>
  );
});
