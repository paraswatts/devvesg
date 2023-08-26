import { useTranslation } from 'react-i18next';

export const EmailVerificationNotification = () => {
    const { t } = useTranslation();
    return (
        <div className="notification" >
            <div className="icon">
                <img src="http://localhost:3000/wallet/images/error-message.png" alt="" title="" />
            </div>
            <div className="message" >
               {t("wallet.email-not-verified")}
            </div>
        </div>
    );
}