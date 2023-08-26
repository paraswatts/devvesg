
import { useTranslation } from 'react-i18next';

import { UserWalletStatus } from 'src/api';
import { Button } from 'src/common/interactions/Button';

import errorImg from './images/error-message.png';

export const EmailAlreadyUsed = ({ errorState }: { errorState: UserWalletStatus }) => {
    const { t } = useTranslation();
    return (
        <div className="notification" >
            <div className="icon">
                <img src={errorImg} alt="" title="" />
            </div>
            <div className="message-div" >
                {t("wallet.create-wallet-server-error")}
            </div>
            <div className="button">
                <Button.Outline type="submit">
                {t("wallet.create-wallet")}
                </Button.Outline>
            </div>
        </div>
    )
};