import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useLazyQuery } from 'src/api/useLazyQuery';

interface ComponentProps {
  onSuccess: () => {};
  onError: () => {};
  apiCall: () => Promise<any>;
}

const Component = ({ onSuccess, onError, apiCall }: ComponentProps) => {
  const [call, callResponse] = useLazyQuery(apiCall, {
    onError,
    onSuccess,
  });

  return (
    <div>
      <button type="button" onClick={() => call({ foo: 'bar' })}>
        Call
      </button>
      <div>{callResponse.status}</div>
    </div>
  );
};

const apiError = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(''));
    }, 0);
  });
};

const apiSuccess = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ foo: 'bar' });
    }, 0);
  });
};
describe('useLazyQuery', () => {
  describe('success', () => {
    test('it calls a callback', async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();
      render(<Component onSuccess={onSuccess} onError={onError} apiCall={apiSuccess} />);

      userEvent.click(screen.getByRole('button'));

      await waitFor(async () => {
        expect(onSuccess).toHaveBeenCalledWith({ foo: 'bar' });
      });
      expect(onError).not.toHaveBeenCalled();
    });

    test('it updates the status', async () => {
      render(<Component onSuccess={jest.fn()} onError={jest.fn()} apiCall={apiSuccess} />);

      await waitFor(async () => {
        expect(screen.getByText('unresolved')).toBeInTheDocument();
      });
      userEvent.click(screen.getByRole('button'));
      await waitFor(async () => {
        expect(screen.getByText('loading')).toBeInTheDocument();
      });
      await waitFor(async () => {
        expect(screen.getByText('resolved')).toBeInTheDocument();
      });
    });
  });

  describe('error', () => {
    test('it calls a callback', async () => {
      const onSuccess = jest.fn();
      const onError = jest.fn();
      render(<Component onSuccess={onSuccess} onError={onError} apiCall={apiError} />);

      userEvent.click(screen.getByRole('button'));

      await waitFor(async () => {
        expect(onError).toHaveBeenCalledWith({ status: 500, message: 'request-failed' });
      });
      expect(onSuccess).not.toHaveBeenCalled();
    });

    test('it updates the status', async () => {
      render(<Component onSuccess={jest.fn()} onError={jest.fn()} apiCall={apiError} />);

      await waitFor(async () => {
        expect(screen.getByText('unresolved')).toBeInTheDocument();
      });
      userEvent.click(screen.getByRole('button'));
      await waitFor(async () => {
        expect(screen.getByText('loading')).toBeInTheDocument();
      });
      await waitFor(async () => {
        expect(screen.getByText('error')).toBeInTheDocument();
      });
    });
  });
});
