import React from 'react';

import { Card, CardBody } from 'src/common/layout/cards';

import {AdminCarbonCredits} from './AdminCarbonCredits';
import {AdminCarbonCreditsHeading} from './AdminCarbonCreditsHeading';

import 'antd/dist/antd.css';
import './style.scss'

export const AdminCarbonCreditsContainer = React.memo(() => {

  return (

    <div>
      <Card>
        <CardBody>
          <AdminCarbonCreditsHeading></AdminCarbonCreditsHeading>
          <AdminCarbonCredits></AdminCarbonCredits>
        </CardBody>
      </Card>
    </div>
  );
});
