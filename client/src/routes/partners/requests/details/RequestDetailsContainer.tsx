import { memo, useCallback, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { DateIcon, StatusIcon } from 'src/common/components';
import { useParams } from 'src/common/hooks';
import { Button } from 'src/common/interactions/Button';
import { SectionLabel } from 'src/common/typography';
import { RequirementRequestStatus } from 'src/gql';
import { usePartner } from 'src/routes/partners/PartnerProvider';
import { PartnerAbsoluteRoutes } from 'src/routes/partners/PartnerRouter';
import {
  GetRequest,
  GetRequestVariables,
  GetRequest_partner_requirementRequest as RequirementRequest,
} from 'src/routes/partners/requests/details/__gql__/GetRequest';
import {
  RequirementRequestStatusChange,
  RequirementRequestStatusChangeVariables,
} from 'src/routes/partners/requests/details/__gql__/RequirementRequestStatusChange';
import { GET_REQUEST, REQUEST_STATUS_CHANGE } from 'src/routes/partners/requests/details/RequestDetailsContainer.query';

import tableStyles from 'src/common/styles/Table.module.scss';

export const RequestDetailsContainer = () => {
  const { t } = useTranslation();
  const { partner } = usePartner();
  const { requestUuid } = useParams<{ requestUuid: string }>();
  const navigate = useNavigate();

  const [request, setRequest] = useState<RequirementRequest>();

  useQuery<GetRequest, GetRequestVariables>(GET_REQUEST, {
    variables: {
      partnerId: partner.uuid,
      requirementRequestId: requestUuid,
    },
    onCompleted: (response) => {
      setRequest(response.partner.requirementRequest);
    },
  });

  const [changeStatus, { loading: statusChangeLoading }] = useMutation<
    RequirementRequestStatusChange,
    RequirementRequestStatusChangeVariables
  >(REQUEST_STATUS_CHANGE, {
    onCompleted: (response) => {
      let path: string;
      let message: string;
      if (response.requirementRequestStatusChange.requestStatus === RequirementRequestStatus.APPROVED) {
        path = generatePath(PartnerAbsoluteRoutes.REQUIREMENT_DETAILS, {
          partnerUuid: partner.uuid,
          requirementUuid: response.requirementRequestStatusChange.uuid,
        });
        message = t('partner.request-accepted');
      } else {
        path = generatePath(PartnerAbsoluteRoutes.REQUESTS, {
          partnerUuid: partner.uuid,
        });
        message = t('partner.request-declined');
      }
      toast.success(message);
      navigate(path, { replace: true });
    },
  });

  const handleAccept = useCallback(() => {
    changeStatus({
      variables: {
        requestStatus: RequirementRequestStatus.APPROVED,
        requirementRequestId: requestUuid,
      },
    });
  }, [changeStatus, requestUuid]);

  const handleReject = useCallback(() => {
    changeStatus({
      variables: {
        requestStatus: RequirementRequestStatus.UNASSIGNED,
        requirementRequestId: requestUuid,
      },
    });
  }, [changeStatus, requestUuid]);

  return (
    <div className="px-8 py-10 bg-white shadow">
      {request && (
        <RequestDetails
          request={request}
          onAccept={handleAccept}
          onDecline={handleReject}
          loading={statusChangeLoading}
        />
      )}
    </div>
  );
};

interface RequestDetailsProps {
  request: RequirementRequest;
  loading?: boolean;
  onAccept: () => void;
  onDecline: () => void;
}
const RequestDetails = memo(({ request, loading, onAccept, onDecline }: RequestDetailsProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <h1 className="font-bold mb-3">{t('partner.requirement-information')}</h1>
      <p>{t('partner.requirement-information-desc')}.</p>

      <div className={tableStyles.scrollXTableContainer}>
        <table className={tableStyles.devvEsgTable}>
          <tbody>
            <tr>
              <td>
                <SectionLabel>{t('project.initiative')}</SectionLabel>
              </td>
              <td aria-label={t('partner.esg-initiative')}>{request.project.initiative.name}</td>
            </tr>
            <tr>
              <td>
                <SectionLabel>{t('partner.project')}</SectionLabel>
              </td>
              <td aria-label={t('improve.project-type-label')}>{request.project.projectType.name}</td>
            </tr>
            <tr>
              <td>
                <SectionLabel>{t('project.requirement')}</SectionLabel>
              </td>
              <td aria-label={t('project.requirement')}>{request.requirementType.name}</td>
            </tr>
            <tr>
              <td>
                <SectionLabel>{t('partner.requirement-status')}</SectionLabel>
              </td>
              <td aria-label={t('project.status')}>{request.status && <StatusIcon status={request.status} />}</td>
            </tr>
            <tr>
              <td>
                <SectionLabel>{t('partner.requirement-start-date')}</SectionLabel>
              </td>
              <td aria-label={t('project.start-date')}>
                {request.startDate ? <DateIcon date={request.startDate} hideIcon /> : t('placeholder.none')}
              </td>
            </tr>
            <tr>
              <td>
                <SectionLabel>{t('partner.requirement-end-date')}</SectionLabel>
              </td>
              <td aria-label={t('project.end-date')}>
                {request.endDate ? <DateIcon date={request.endDate} hideIcon /> : t('placeholder.none')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="ml-4">
        <span>
          * {t('partner.by-accepting-this-connection')}{' '}
          <Link to="/terms" target="_blank">
            {t('partner.partner-agreement')}
          </Link>
          .
        </span>
        <div className="mt-8">
          <Button.Primary className="mr-4" type="button" disabled={loading} onClick={onAccept}>
            {t('buttons.accept')}
          </Button.Primary>
          <Button.Primary type="button" disabled={loading} onClick={onDecline}>
            {t('buttons.decline')}
          </Button.Primary>
        </div>
      </div>
    </div>
  );
});
