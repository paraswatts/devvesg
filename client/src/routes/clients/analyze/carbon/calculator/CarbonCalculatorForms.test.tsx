import { testRenderer } from 'src/mocks/renderer';
import { CarbonCalculatorForms } from 'src/routes/clients/analyze/carbon/calculator/CarbonCalculatorForms';

describe('CarbonCalculatorForms', () => {
  const onChange = jest.fn();
  const onSubmit = jest.fn();

  const renderTest = testRenderer(<CarbonCalculatorForms onChange={onChange} onSubmit={onSubmit} />);

  test('it render different forms', async () => {
    renderTest();
  });
});
