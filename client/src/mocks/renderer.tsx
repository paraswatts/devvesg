import { render } from '@testing-library/react';

import { GraphQLHandler, GraphQLRequest } from 'msw';
import { MemoryRouter } from 'react-router-dom';

import { GqlProvider } from 'src/gql';
import { server } from 'src/mocks/server';

export interface TestRenderOptions {
  gqlOverrides: GraphQLHandler<GraphQLRequest<never>> | GraphQLHandler<GraphQLRequest<never>>[];
}

export const testRenderer = (ui: React.ReactNode) => (options?: TestRenderOptions) => {
  if (options && options.gqlOverrides) {
    const { gqlOverrides } = options;
    if (Array.isArray(gqlOverrides)) {
      gqlOverrides.forEach((override) => server.use(override));
    } else {
      server.use(gqlOverrides);
    }
  }
  const { rerender, asFragment, baseElement, container, debug, unmount } = render(
    <GqlProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </GqlProvider>,
  );

  return {
    rerender: (ui: React.ReactElement) =>
      rerender(
        <GqlProvider>
          <MemoryRouter>{ui}</MemoryRouter>
        </GqlProvider>,
      ),
    asFragment,
    baseElement,
    container,
    debug,
    unmount,
  };
};
