import { onError } from '@apollo/client/link/error';
import { toast } from 'react-toastify';

import { setBearerToken } from 'src/api/client';
import { AuthRoutes } from 'src/routes/auth';

// Custom errors
export const APOLLO_AUTHENTICATION_CODE = 'AUTHENTICATION_ERROR';
export const APOLLO_FORBIDDEN_CODE = 'FORBIDDEN_ERROR';
export const APOLLO_FORM_VALIDATION_CODE = 'FORM_VALIDATION_ERROR';
export const APOLLO_NOT_FOUND_CODE = 'NOT_FOUND_ERROR';
export const APOLLO_UNKNOWN_CODE = 'UNKNOWN_ERROR';
export const APOLLO_UNPROCESSABLE_ENTITY_CODE = 'UNPROCESSABLE_ENTITY_ERROR';

export const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions: { code } }) => {
      // In useQuery, you may add "context: { disableGlobalErrors: true }" to query options to prevent this
      // handler from being called. The error can then be handled locally in the onError function.
      if (!operation.getContext().disableGlobalErrors) {
        // Show toast for GQL error
        toast.error(message);
      }
      // log the user out on auth error
      if (code === APOLLO_AUTHENTICATION_CODE && !window.location.href.includes('login')) {
        localStorage.removeItem('token');
        setBearerToken(''); // TODO: remove this once we remove REST APIs
        window.location.href = AuthRoutes.LOGIN;
      }
    });
  }

  if (networkError) {
    // show toast for network error
    toast.error(networkError.message || 'Network error');
  }
});
