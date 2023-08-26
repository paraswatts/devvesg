
import { Progress } from 'antd';
export const CircularProgressBar = ({ ctrl }: { ctrl:{ percent?: number, className?: string, format?: () => string, progressType?: any }}) => {
    const {percent, className, format, progressType} = ctrl;
    return (
        <Progress type={progressType || "circle"} percent={percent || 10} format={format || (() => 'Done')} className={className} />
    );
}