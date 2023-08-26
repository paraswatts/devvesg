import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Outlet } from 'react-router-dom';

import { useUser } from 'src/common/providers/UserProvider';
import { UserTypes } from 'src/interfaces';

interface PrivateRouteProps {
  allowedTypes?: UserTypes[];
}
export const PrivateRoute = (props: PrivateRouteProps) => {
  const { user } = useUser();
  const { allowedTypes } = props;

  if (allowedTypes && allowedTypes.includes(user.type)) {
    return <Outlet />;
  }

  return (
    <div className="flex items-center justify-center w-full ">
      <div className="bg-white bg-opacity-80 p-8 md:p-16 shadow text-center">
        <div className="mb-4 text-6xl">
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </div>
        <h1 className="text-3xl mb-0">Not Authorized</h1>
      </div>
    </div>
  );
};
