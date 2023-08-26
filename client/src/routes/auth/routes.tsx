export const AuthRoot = '/auth';

export const AuthRoutes = {
  LOGIN: `${AuthRoot}/login`,
  UNAUTHORIZED: `${AuthRoot}/unauthorized`,
  FORGOT_PASSWORD: `${AuthRoot}/forgotPassword`,
  RESET_PASSWORD: `${AuthRoot}/resetPassword/:resetPasswordToken`,
  UNSUBSCRIBE_PARTNER: `${AuthRoot}/unsubscribe/partner/:partnerId`,
};
