import { memo } from 'react';

import './ProgressRing.scss';
import { color, score } from 'src/routes/clients/analyze/baseline/common/utils';

interface ProgressRingProps {
  value: number;
}

export const ProgressRing = memo((props: ProgressRingProps) => {
  const { value } = props;

  return (
    <div className="frame">
      <svg width="150" height="150" viewBox="0 0 120 120">
        <circle
          className="percent ninety"
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke={color(value)}
          strokeWidth="14"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={`calc(100 - ${value})`}
          strokeLinecap="round"
        ></circle>
      </svg>

      <div className="center-ring">
        <div className="text-[45px] font-medium leading-10">{score(value)}</div>
        <div className="text-lg font-bold">{value}%</div>
      </div>
    </div>
  );
});
