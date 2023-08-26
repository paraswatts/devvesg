import { PropsWithChildren } from 'react';

import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { withScalars } from 'apollo-link-scalars';
import { IntrospectionQuery, buildClientSchema } from 'graphql';
import { DateTimeResolver } from 'graphql-scalars';

import { errorLink } from 'src/gql/errors/utils';

import introspectionResult from './__generated__/graphql.schema.json';

const schema = buildClientSchema(introspectionResult as unknown as IntrospectionQuery);

const httpLink = new HttpLink({ uri: process.env.REACT_APP_HOST + '/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem('token');

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? token : undefined,
    },
  });

  return forward(operation);
});

const typesMap = {
  Date: DateTimeResolver,
};

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, withScalars({ schema, typesMap }), httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
});

export const GqlProvider = (props: PropsWithChildren<any>) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
