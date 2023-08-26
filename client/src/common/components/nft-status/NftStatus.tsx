import { NftStatuses } from "src/api/actions";
import { getNftStatus } from "src/common/util";

import './status-style.scss';


export const NftStatus = ({ status }: { status: string | '' }) => {
    let style = {}
    if (status === NftStatuses.DECLINED)
        style = "red";
    else if (status === NftStatuses.APPROVED)
        style = "lightgreen";
    else if (status === NftStatuses.UNDER_REVIEW)
        style = "orange";
    else if (status === NftStatuses.OWNED)
        style = "blue";
    else if (status === NftStatuses.RETIRED)
        style = "grey";
    else if (status === NftStatuses.LISTED_FOR_SALE)
        style = "black";
    else
        style = "grey";
    return (<>
        <span className={`${style}`}>{getNftStatus(status)}</span>
    </>);
}