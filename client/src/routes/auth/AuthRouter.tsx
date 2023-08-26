import { Route, Routes } from 'react-router-dom';

import { ForgotPasswordContainer } from 'src/routes/auth/forgot-password/ForgotPasswordContainer';
import { ResetPasswordContainer } from 'src/routes/auth/reset-password/ResetPasswordContainer';
import { SignInContainer } from 'src/routes/auth/sign-in/SignInContainer';
import { UnauthorizedContainer } from 'src/routes/auth/unauthorized/UnauthorizedContainer';
import { UnsubscribePartnerContainer } from 'src/routes/auth/unsubscribe/UnsubscribePartnerContainer';

export const AuthRoutes = {
  LOGIN: 'login',
  UNAUTHORIZED: 'unauthorized',
  FORGOT_PASSWORD: 'forgotPassword',
  RESET_PASSWORD: 'resetPassword/:resetPasswordToken',
  UNSUBSCRIBE_PARTNER: 'unsubscribe/partner/:partnerId',
};

export const AuthRouter = () => (
  <Routes>
    <Route path={AuthRoutes.LOGIN} element={<SignInContainer />} />
    <Route path={AuthRoutes.UNAUTHORIZED} element={<UnauthorizedContainer />} />
    <Route path={AuthRoutes.FORGOT_PASSWORD} element={<ForgotPasswordContainer />} />
    <Route path={AuthRoutes.RESET_PASSWORD} element={<ResetPasswordContainer />} />
    <Route path={AuthRoutes.UNSUBSCRIBE_PARTNER} element={<UnsubscribePartnerContainer />} />
  </Routes>
);
