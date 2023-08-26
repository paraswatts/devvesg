import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

type UseQueryStatus = 'unresolved' | 'loading' | 'resolved' | 'error';

interface UseQueryResponse<ResponseData> {
  response?: ResponseData;
  status: UseQueryStatus;
  error?: any;
}

interface UseLazyQueryOptions<ResponseData> {
  // Disables the automatic toast message that displays on an HTTP error
  disableErrorToast?: boolean;
  // Shows success toast
  enableSuccessToast?: boolean;
  // A callback that executes when a query successfully completes
  onSuccess?: (response: ResponseData) => void;
  // A callback that executes when a query fails
  onError?: (error: any) => void;
}

type UseQueryRequest<T> = (params: T) => void;

/**
 * A hook to support making lazy HTTP / asynchronous function calls.
 *
 * Note that the proxied request will not be memoized and will be refreshed every render
 * unless `options` itself is memoized.
 *
 * Use the options object to defined programatic callbacks, or react to changes on the response
 * object's status.
 *
 * Example:
 *
 * const queryOptions = {
 *   disableErrorToast: true,
 *   onSuccess: (response: ApiResponseType) => console.log('Success! Retrieved data', response),
 *   onError: (error: any) => alert('Error! ' + error.message)
 * };
 * const [runQuery, queryResponse] = useLazyQuery<ApiParamsType, ApiResponseType>(aFunctionThatCallsAnApi, queryOptions);
 *
 * if (queryResponse.status === 'resolved') {
 *   // Do something with the data
 *   console.log(queryResponse.response);
 * }
 *
 * if (queryResponse.status === 'loading') {
 *   // Show spinner
 * }
 *
 * if (queryResponse.status === 'error') {
 *   // Display error message
 *   alert('Error! ' + queryResponse.error.message)
 * }
 *
 * @param query A function that returns a promise - typically an API callback
 * @param options Configuration options for the lazy query
 * @returns A tuple with the first element being a function to execute the query, the second being the state of the query execution
 */
export function useLazyQuery<Params, ResponseData>(
  query: (params: Params) => Promise<ResponseData>,
  options?: UseLazyQueryOptions<ResponseData>,
): [UseQueryRequest<Params>, UseQueryResponse<ResponseData>] {
  const [proxiedResponse, setProxiedResponse] = useState<UseQueryResponse<ResponseData>>({ status: 'unresolved' });
  const optionsRef = useRef<UseLazyQueryOptions<ResponseData>>();

  const { t } = useTranslation();

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const proxiedRequest = useCallback<UseQueryRequest<Params>>(
    async (params) => {
      setProxiedResponse((prevState) => ({ ...prevState, status: 'loading' }));
      try {
        const response = await query(params);
        setProxiedResponse((prevState) => ({ ...prevState, response, status: 'resolved', error: undefined }));
        if (optionsRef.current?.enableSuccessToast) {
          toast.success(t('success'));
        }
        if (optionsRef.current?.onSuccess) {
          optionsRef.current.onSuccess(response);
        }
      } catch (e: any) {
        let errorData = e.response?.data || {};
        if (typeof errorData !== 'object' || errorData === null) {
          errorData = {};
        }
        if (!errorData.status) {
          errorData.status = 500;
        }
        if (!errorData.message) {
          errorData.message = 'request-failed';
        }
        setProxiedResponse((prevState) => ({ ...prevState, status: 'error', error: errorData }));
        if (!optionsRef.current?.disableErrorToast) {
          toast.error(t(`${errorData.message}`));
        }
        if (optionsRef.current?.onError) {
          optionsRef.current.onError(errorData);
        }
      }
    },

    //eslint-disable-next-line
    [query],
  );

  return useMemo(() => [proxiedRequest, proxiedResponse], [proxiedRequest, proxiedResponse]);
}
