import { render, screen } from '@testing-library/react';

import { I18nextProvider } from 'react-i18next';

import { OrderedActivitySteps } from 'src/common/components/ordered-activity-steps/OrderedActivitySteps';
import i18n from 'src/mocks/i18nForTests';

describe('OrderedActivitySteps', () => {
  test('it renders the provided steps', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <OrderedActivitySteps
          steps={[
            { id: 'a', label: 'Foo' },
            { id: 'b', label: 'Bar' },
            { id: 'c', label: 'Baz' },
          ]}
          active="a"
        />
      </I18nextProvider>,
    );
    const [foo, bar, baz] = screen.getAllByRole('listitem');
    expect(foo).toHaveTextContent('Foo');
    expect(foo).toHaveTextContent('1');
    expect(bar).toHaveTextContent('Bar');
    expect(bar).toHaveTextContent('2');
    expect(baz).toHaveTextContent('Baz');
    expect(baz).toHaveTextContent('3');
  });

  test('it marks the active step as current', () => {
    render(
      <I18nextProvider i18n={i18n}>
        <OrderedActivitySteps
          steps={[
            { id: 'a', label: 'Foo' },
            { id: 'b', label: 'Bar' },
            { id: 'c', label: 'Baz' },
          ]}
          active="b"
        />
      </I18nextProvider>,
    );
    const [foo, bar] = screen.getAllByRole('listitem');
    expect(bar).toHaveAttribute('aria-current', 'step');
    expect(foo).not.toHaveTextContent('1');
  });
});
