
import { UserWalletStatus } from 'src/api';
import { Button } from 'src/common/interactions/Button'; //common/interactions/Button

import errorImg from './images/error-message.png';

export const RegisterWallet = ({ errorState }: { errorState: UserWalletStatus }) => {

    return (
        <div className="notification" >
            <div className="icon">
                <img src={errorImg} alt="" title="" />
            </div>
            <div className="message-div">
                <p className="message">{errorState.message}</p>
                <p className="title">You do not have any Wallet, click to register.</p>
            </div>
            <div className="notification" >
                <div style={{ display: 'flex', width:'100%' }}>
                    <input className="email-input" type="email" name="email" id="email" placeholder="Enter Email" required />
                </div>
                <div style={{ display: 'flex', width:'100%' }}>
                    <input className="email-input" type="password" name="password" id="password" placeholder="" required />
                </div>
                <Button.Outline type="submit">
                    Submit
                </Button.Outline>
            </div>
        </div>

    );
};