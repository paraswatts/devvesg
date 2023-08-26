import { TermsOfServiceContent } from 'src/common/components/user-agreement';
import { Footer } from 'src/common/skeleton/Footer';
import { UnauthenticatedHeader } from 'src/common/skeleton/UnauthenticatedHeader';

export const TermsContainer = () => (
  <>
    <UnauthenticatedHeader />
    <div className="bg-white w-full max-w-7xl mx-auto my-24 rounded shadow">
      <TermsOfServiceContent />
    </div>
    <Footer />
  </>
);
