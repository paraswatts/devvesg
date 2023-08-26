import { screen } from '@testing-library/react';

import { Card, CardBody, CardSubtitle, CardTitle, CardTitles } from 'src/common/layout/cards/Card';
import { testRenderer } from 'src/mocks/renderer';

describe('Card components', () => {
  test('card renders children', () => {
    const cardRenderer = testRenderer(<Card>Card Children</Card>);
    cardRenderer();
    expect(screen.getByText('Card Children')).toBeInTheDocument();
  });

  test('card body renders children', () => {
    const cardRenderer = testRenderer(<CardBody>Card Body Children</CardBody>);
    cardRenderer();
    expect(screen.getByText('Card Body Children')).toBeInTheDocument();
  });

  test('card titles renders children', () => {
    const cardRenderer = testRenderer(<CardTitles>Card Titles Children</CardTitles>);
    cardRenderer();
    expect(screen.getByText('Card Titles Children')).toBeInTheDocument();
  });

  test('card title renders children', () => {
    const cardRenderer = testRenderer(<CardTitle>Card Title Children</CardTitle>);
    cardRenderer();
    expect(screen.getByRole('heading', { name: 'Card Title Children' })).toBeInTheDocument();
  });

  test('card subtitle renders children', () => {
    const cardRenderer = testRenderer(<CardSubtitle>Card Subtitle Children</CardSubtitle>);
    cardRenderer();
    expect(screen.getByText('Card Subtitle Children')).toBeInTheDocument();
  });

  test('all works together', () => {
    const cardRenderer = testRenderer(
      <Card>
        <CardBody>
          <CardTitles>
            <CardTitle>Card Title</CardTitle>
            <CardSubtitle>Card Subtitle</CardSubtitle>
          </CardTitles>
          <div>Card Body</div>
        </CardBody>
      </Card>,
    );
    cardRenderer();
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Card Body')).toBeInTheDocument();
  });
});
