
import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { Api, UserWalletStatus, WalletEmailVerificationStatus, WalletErrorStatus, useLazyQuery } from 'src/api';
import { useUser } from 'src/common/providers/UserProvider';
import { WalletRegistration } from 'src/interfaces';

import {  } from './EmailAlreadyUsed';
import { EmailVerificationNotification } from './EmailVerificationNotification';
import { RegisterWallet } from './RegisterWallet';

import './WalletRegistrationNotification.scss';

export const WalletRegistrationNotification = React.memo(() => {
    const { user } = useUser();
    const { userWallet, uuid } = user;
    const [walletRegistration, walletRegistrationResponse] = useLazyQuery<WalletRegistration, { data: UserWalletStatus }>(Api.wallet.registerWallet);
    const { trigger } = useForm<WalletRegistration>({
        shouldFocusError: true,
        mode: "onChange",
        defaultValues: {}
    });
    const [errorState, setErrorState] = React.useState<UserWalletStatus>(userWallet);
    useEffect(() => {
        setErrorState(userWallet);
    }, [userWallet]);

    if (walletRegistrationResponse.status === 'resolved' && walletRegistrationResponse.response?.data) {
        const res: UserWalletStatus = walletRegistrationResponse.response?.data;
        userWallet.status = res.status;
        userWallet.success = res.success;
    }

    const submit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formRef = new FormData(event.target as HTMLFormElement);
        const isValid = await trigger();
        if (isValid) {
            walletRegistration({
                userId: uuid,
                email: formRef.get("email")?.toString(),
                password: formRef.get("passord")?.toString()
            });
        }

    }

    return (
        <div>
            <form onSubmit={submit} hidden={!(errorState.status === WalletErrorStatus.NO_WALLET)}>
                <div className="main" >
                    <RegisterWallet errorState={errorState}></RegisterWallet>
                </div>
            </form>
            <div className="main" hidden={!(errorState.status === WalletErrorStatus.OK && errorState.isVerified === WalletEmailVerificationStatus.NO)}>
                <EmailVerificationNotification></EmailVerificationNotification>
            </div>

        </div>
    );
});
