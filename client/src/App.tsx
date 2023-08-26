import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CookieBanner } from 'src/common/components/cookie-banner';
import { AuthenticationProvider } from 'src/common/providers/AuthenticationProvider';
import { UserProvider } from 'src/common/providers/UserProvider';
import { Footer } from 'src/common/skeleton/Footer';
import { Header } from 'src/common/skeleton/Header';
import { Main } from 'src/common/skeleton/Main';
import { UnauthenticatedHeader } from 'src/common/skeleton/UnauthenticatedHeader';
import { GqlProvider } from 'src/gql';
import { AuthRouter } from 'src/routes/auth/AuthRouter';
import { OnboardingRouter } from 'src/routes/onboarding/OnboardingRouter';
import { TermsContainer } from 'src/routes/public-routes/TermsContainer';
import { RootRouter } from 'src/routes/RootRouter';
import 'src/App.scss';

function App() {
  return (
    <GqlProvider>
      <BrowserRouter>
        <Routes>
          <Route path="auth/*" element={<AuthSkeleton />} />
          <Route path="onboarding/*" element={<OnboardingSkeleton />} />
          <Route path="terms" element={<TermsContainer />} />

          <Route
            path="*"
            element={
              <AuthenticationProvider skeleton={<IndeterminateSkeleton />} UserProvider={UserProvider}>
                <AuthenticatedSkeleton />
              </AuthenticationProvider>
            }
          />
        </Routes>
        <ToastContainer />
        <CookieBanner />
      </BrowserRouter>
    </GqlProvider>
  );
}

export default App;

const AuthSkeleton = () => {
  return (
    <>
      <UnauthenticatedHeader />
      <Main>
        <AuthRouter />
      </Main>
      <Footer />
    </>
  );
};

const OnboardingSkeleton = () => {
  return (
    <>
      <UnauthenticatedHeader />
      <Main>
        <OnboardingRouter />
      </Main>
      <Footer />
    </>
  );
};

const IndeterminateSkeleton = () => {
  return (
    <>
      <UnauthenticatedHeader />
      <Main />
      <Footer />
    </>
  );
};

const AuthenticatedSkeleton = () => {
  return (
    <>
      <Header />
      <Main>
        <RootRouter />
      </Main>
      <Footer />
    </>
  );
};
