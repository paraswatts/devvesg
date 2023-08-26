import * as z from 'zod';

import { ProjectStatuses, UserTypes } from '../entities';
import { ProjectPostReq, ProjectPutReq } from './admin/client.controller';

export const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

// Conditional validation for client and partner uuids based on the passed user type
export const userRefineFn = (data: any) => {
  if (data.type === UserTypes.CLIENT && data.clientUuid === undefined) {
    return false;
  } else if (data.type === UserTypes.PARTNER && data.partnerUuid === undefined) {
    return false;
  } else if (data.type === UserTypes.ADMIN) {
    return data.clientUuid === undefined && data.partnerUuid === undefined;
  } else if (data.password) {
    return data.password === data.passwordConfirm && data.password.match(passwordRegex);
  } else {
    return true;
  }
};

export const translateDates = (body: any) => {
  if (body.startDate) {
    body.startDate = new Date(body.startDate);
  }
  if (body.endDate) {
    body.endDate = new Date(body.endDate);
  }
  if (body.completionDate) {
    body.completionDate = new Date(body.completionDate);
  }
  if (body.endGoalDate) {
    body.endGoalDate = new Date(body.endGoalDate);
  }
};

export const projectNewFormSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  status: z.enum([
    ProjectStatuses.IN_PROGRESS,
    ProjectStatuses.NOT_STARTED,
    ProjectStatuses.DONE,
    ProjectStatuses.ON_HOLD,
  ]),
  startDate: z.date().optional().nullable(),
  endGoalDate: z.date().optional().nullable(),
  completionDate: z.date().optional().nullable(),
  projectTypeUuid: z.string().nonempty(),
});
