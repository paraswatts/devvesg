import { Trans, useTranslation } from 'react-i18next';

export const TermsOfServiceContent = () => {
  const { t } = useTranslation();

  return (
    <div className="p-6">
      <h1>{t('terms-of-service.heading')}</h1>
      <p>{t('terms-of-service.sub-heading')}</p>
      <p>
        <strong>{t('terms-of-service.summary')}</strong>
      </p>
      <table>
        <colgroup>
          <col style={{ width: '24%' }} />
          <col style={{ width: '75%' }} />
        </colgroup>
        <thead>
          <tr className="header">
            <th>
              <em>{t('terms-of-service.section')}</em>
            </th>
            <th>
              <em>{t('terms-of-service.what-can-you-find-there')}</em>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd">
            <td>{t('terms-of-service.definitions')}</td>
            <td>{t('terms-of-service.definitions-desc')}</td>
          </tr>
          <tr className="even">
            <td>{t('terms-of-service.account-terms')}</td>
            <td>{t('terms-of-service.account-terms-desc')}</td>
          </tr>
          <tr className="odd">
            <td>{t('terms-of-service.acceptable-use')}</td>
            <td>{t('terms-of-service.acceptable-use-desc')}</td>
          </tr>
          <tr className="even">
            <td>
              {t('terms-of-service.copyright')} &amp; {t('terms-of-service.dmca-policy')}
            </td>
            <td>{t('terms-of-service.copyright-desc')}</td>
          </tr>
          <tr className="odd">
            <td>{t('terms-of-service.intellectual-property-notice')}</td>
            <td>{t('terms-of-service.intellectual-property-notice-desc')}</td>
          </tr>
          <tr className="even">
            <td>{t('terms-of-service.api-terms')}</td>
            <td>{t('terms-of-service.api-terms-desc')}</td>
          </tr>
          <tr className="odd">
            <td>{t('terms-of-service.additional-product-terms')}</td>
            <td>{t('terms-of-service.additional-product-terms-desc')}</td>
          </tr>
          <tr className="even">
            <td>{t('terms-of-service.beta-previews')}</td>
            <td>{t('terms-of-service.beta-previews-desc')}</td>
          </tr>
          <tr className="odd">
            <td>{t('terms-of-service.payment')}</td>
            <td>{t('terms-of-service.payment-desc')}</td>
          </tr>
          <tr className="even">
            <td>{t('terms-of-service.cancellation-and-termination')}</td>
            <td>{t('terms-of-service.cancellation-and-termination-desc')}</td>
          </tr>
          <tr className="odd">
            <td>{t('terms-of-service.communications-with-devvesg')}</td>
            <td>{t('terms-of-service.communications-with-devvesg-desc')}</td>
          </tr>
          <tr className="even">
            <td>{t('terms-of-service.publicity')}</td>
            <td>{t('terms-of-service.publicity-desc')}</td>
          </tr>
          <tr className="odd">
            <td>{t('terms-of-service.disclaimer-of-warranties')}</td>
            <td>{t('terms-of-service.disclaimer-of-warranties-desc')}</td>
          </tr>
          <tr className="even">
            <td>{t('terms-of-service.limitation-of-liability')}</td>
            <td>{t('terms-of-service.limitation-of-liability-desc')}</td>
          </tr>
          <tr className="odd">
            <td>{t('terms-of-service.release-and-indemnification')}</td>
            <td>{t('terms-of-service.release-and-indemnification-desc')}</td>
          </tr>
          <tr className="even">
            <td>{t('terms-of-service.changes-to-terms')}</td>
            <td>{t('terms-of-service.changes-to-terms-desc')}</td>
          </tr>
          <tr className="odd">
            <td>{t('terms-of-service.miscellaneous')}</td>
            <td>{t('terms-of-service.miscellaneous-desc')}</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>
          <br />
        </strong>
      </p>
      <p>
        <strong>{t('terms-of-service.definitions')}</strong>
      </p>
      <p>
        <em>{t('terms-of-service.summary-desc')}</em>
      </p>
      <p>
        <Trans i18nKey="terms-of-service.account-desc" components={[<strong />]} />
      </p>
      <p>
        <Trans i18nKey="terms-of-service.user-account-desc" components={[<strong />]} />
      </p>
      <p>
        <Trans i18nKey="terms-of-service.organizations-desc" components={[<strong />]} />
      </p>
      <p>
        <Trans
          i18nKey="terms-of-service.agreement-desc"
          components={[
            <strong />,
            <a href="https://www.devvesg.com/policies" target="_blank" rel="noreferrer">
              #
            </a>,
          ]}
        />
      </p>
      <p>
        <Trans i18nKey="terms-of-service.beta-previews-detail-desc" components={[<strong />]} />
      </p>
      <p>
        <Trans i18nKey="terms-of-service.content-desc" components={[<strong />]} />
      </p>
      <p>
        <Trans i18nKey="terms-of-service.user-generated-content-desc" components={[<strong />]} />
      </p>
      <p>
        <Trans i18nKey="terms-of-service.your-content-desc" components={[<strong />]} />
      </p>
      <p>
        <Trans i18nKey="terms-of-service.project-desc" components={[<strong />]} />
      </p>
      <p>
        <Trans i18nKey="terms-of-service.devvesg-desc" components={[<strong />]} />
      </p>
      <p>
        <Trans i18nKey="terms-of-service.service-desc" components={[<strong />]} />
      </p>
      <p>
        <Trans
          i18nKey="terms-of-service.service-desc-sub"
          components={[<strong />, <a href="#additional-terms">#</a>]}
        />
      </p>
      <p>
        <Trans i18nKey="terms-of-service.service-provider-desc" components={[<strong />]} />
      </p>
      <p>
        <Trans
          i18nKey="terms-of-service.website-desc"
          components={[
            <strong />,
            <a href="https://www.devvesg.com" target="_blank" rel="noreferrer">
              #
            </a>,
          ]}
        />
      </p>
      <p>
        <Trans i18nKey="terms-of-service.platform-desc" components={[<strong />]} />
      </p>
      <p>
        <strong>{t('terms-of-service.account-terms')}</strong>
      </p>
      <p>
        <em>{t('terms-of-service.account-terms-detail-desc')}</em>
      </p>
      <p>1. {t('terms-of-service.account-controls')}</p>
      <p>{t('terms-of-service.account-controls-desc1')}</p>
      <p>{t('terms-of-service.account-controls-desc2')}</p>
      <p>2. {t('terms-of-service.required-information')}</p>
      <p>{t('terms-of-service.required-information-desc')}</p>
      <p>3. {t('terms-of-service.account-requirements')}</p>
      <p>{t('terms-of-service.account-requirements-desc1')}</p>
      <p>{t('terms-of-service.account-requirements-desc2')}</p>
      <p>{t('terms-of-service.account-requirements-desc3')}</p>
      <p>{t('terms-of-service.account-requirements-desc4')}</p>
      <p>{t('terms-of-service.account-requirements-desc5')}</p>
      <p>4. {t('terms-of-service.user-account-security')}</p>
      <p>{t('terms-of-service.user-account-security-desc1')}</p>
      <p>{t('terms-of-service.user-account-security-desc2')}</p>
      <p>{t('terms-of-service.user-account-security-desc3')}</p>
      <p>{t('terms-of-service.user-account-security-desc4')}</p>
      <p style={{ scrollMarginTop: '5em' }} id="additional-terms">
        5. {t('terms-of-service.additional-terms')}
      </p>
      <p>{t('terms-of-service.additional-terms-desc1')}</p>
      <p>{t('terms-of-service.additional-terms-desc2')}</p>
      <p>
        <strong>{t('terms-of-service.acceptable-use')}</strong>
      </p>
      <p>
        <em>{t('terms-of-service.acceptable-use-summary')}</em>
      </p>
      <p>{t('terms-of-service.acceptable-use-detail-desc1')}</p>
      <p>{t('terms-of-service.acceptable-use-detail-desc2')}</p>
      <p>
        <strong>{t('terms-of-service.copyright-infringement')}</strong>
      </p>
      <p>{t('terms-of-service.copyright-infringement-desc1')}</p>
      <p>{t('terms-of-service.copyright-infringement-desc2')}</p>
      <p>
        <strong>{t('terms-of-service.intellectual-property-notice')}</strong>
      </p>
      <p>
        <em>{t('terms-of-service.intellectual-property-notice-summary')}</em>
      </p>
      <p>1. {t('terms-of-service.right-to-content')}</p>
      <p>{t('terms-of-service.right-to-content-desc')}</p>
      <p>2. {t('terms-of-service.trademark-and-logos')}</p>
      <p>
        <Trans
          i18nKey="terms-of-service.trademark-and-logos-desc"
          components={[
            <a href="https://www.devvesg.com/branding" target="_blank" rel="noreferrer">
              #
            </a>,
          ]}
        />
      </p>
      <p>
        <strong>{t('terms-of-service.api-terms')}</strong>
      </p>
      <p>
        <em>{t('terms-of-service.api-terms-summry')}</em>
      </p>
      <p>{t('terms-of-service.api-terms-desc1')}</p>
      <p>{t('terms-of-service.api-terms-desc2')}</p>
      <p>{t('terms-of-service.api-terms-desc3')}</p>
      <p>{t('terms-of-service.api-terms-desc4')}</p>
      <p>{t('terms-of-service.api-terms-desc5')}</p>
      <p>
        <strong>DevvESG {t('terms-of-service.additional-product-terms')}</strong>
      </p>
      <p>
        <em>{t('terms-of-service.additional-product-terms-summary')}</em>
      </p>
      <p>{t('terms-of-service.additional-product-terms-desc1')}</p>
      <p>
        <strong>{t('terms-of-service.beta-previews')}</strong>
      </p>
      <p>
        <em>{t('terms-of-service.beta-previews-summary')}</em>
      </p>
      <p>1. {t('terms-of-service.subject-to-change')}</p>
      <p>{t('terms-of-service.subject-to-change-desc')}</p>
      <p>2. {t('terms-of-service.confidentiality')}</p>
      <p>{t('terms-of-service.confidentiality-desc1')}</p>
      <p>{t('terms-of-service.confidentiality-desc2')}</p>
      <p>{t('terms-of-service.confidentiality-desc3')}</p>
      <p>3. {t('terms-of-service.feedback')}</p>
      <p>{t('terms-of-service.feedback-desc')}</p>
      <p>
        <strong>{t('terms-of-service.payment')}</strong>
      </p>
      <p>
        <em>{t('terms-of-service.payment-summary')}</em>
      </p>
      <p>1. {t('terms-of-service.pricing')}</p>
      <p>
        <Trans
          i18nKey="terms-of-service.pricing-desc1"
          components={[
            <a href="https://www.devvesg.com/pricing" target="_blank" rel="noreferrer">
              #
            </a>,
          ]}
        />
      </p>
      <p>2. {t('terms-of-service.upgrades')}</p>
      <p>{t('terms-of-service.upgrades-desc1')}</p>
      <p>{t('terms-of-service.upgrades-desc2')}</p>
      <p>{t('terms-of-service.upgrades-desc3')}</p>
      <p>{t('terms-of-service.upgrades-desc4')}</p>
      <p>3. {t('terms-of-service.billing-schedule')}</p>
      <p>{t('terms-of-service.billing-schedule-desc1')}</p>
      <p>{t('terms-of-service.billing-schedule-desc2')}</p>
      <p>{t('terms-of-service.billing-schedule-desc3')}</p>
      <p>4. {t('terms-of-service.authorization')}</p>
      <p>{t('terms-of-service.authorization-desc')}</p>
      <p>5. {t('terms-of-service.responsibility-for-payment')}</p>
      <p>{t('terms-of-service.responsibility-for-payment-desc')}</p>
      <p>6. {t('terms-of-service.noncircumvention')}</p>
      <p>{t('terms-of-service.noncircumvention-desc')}</p>
      <p>
        <strong>{t('terms-of-service.cancellation-and-termination')}</strong>
      </p>
      <p>
        <em>{t('terms-of-service.cancellation-and-termination-summary')}</em>
      </p>
      <p>1. {t('terms-of-service.account-cancellation')}</p>
      <p>{t('terms-of-service.account-cancellation-desc')}</p>
      <p>2. {t('terms-of-service.upon-cancellation')}</p>
      <p>{t('terms-of-service.upon-cancellation-desc1')}</p>
      <p>{t('terms-of-service.upon-cancellation-desc2')}</p>
      <p>{t('terms-of-service.upon-cancellation-desc3')}</p>
      <p>3. {t('terms-of-service.devvesg-may-terminate')}</p>
      <p>{t('terms-of-service.devvesg-may-terminate-desc')}</p>
      <p>4. {t('terms-of-service.survival')}</p>
      <p>{t('terms-of-service.survival-desc')}</p>
      <p>
        <strong>{t('terms-of-service.communications-with-devvesg')}</strong>
      </p>
      <p>
        <em>{t('terms-of-service.communications-with-devvesg-summary')}</em>
      </p>
      <p>1. {t('terms-of-service.electronic-communication-required')}</p>
      <p>{t('terms-of-service.electronic-communication-required-desc')}</p>
      <p>2. {t('terms-of-service.legal-notice')}</p>
      <p>{t('terms-of-service.legal-notice-desc')}</p>
      <p>3. {t('terms-of-service.no-phone-support')}</p>
      <p>{t('terms-of-service.no-phone-support-desc')}</p>
      <p>
        <strong>{t('terms-of-service.publicity')}</strong>
      </p>
      <p>{t('terms-of-service.publicity-desc1')}</p>
      <p>{t('terms-of-service.publicity-desc2')}</p>
      <p>
        <strong>{t('terms-of-service.disclaimer-of-warranties')}</strong>
      </p>
      <p>
        <em>{t('terms-of-service.disclaimer-of-warranties-summary')}</em>
      </p>
      <p>{t('terms-of-service.disclaimer-of-warranties-desc1')}</p>
      <p>{t('terms-of-service.disclaimer-of-warranties-desc2')}</p>
      <p>{t('terms-of-service.disclaimer-of-warranties-desc3')}</p>
      <p>
        <strong>{t('terms-of-service.limitation-of-liability')}</strong>
      </p>
      <p>
        <em>{t('terms-of-service.limitation-of-liability-summary')}</em>
      </p>
      <p>{t('terms-of-service.limitation-of-liability-desc1')}</p>
      <p>{t('terms-of-service.limitation-of-liability-desc2')};</p>
      <p>{t('terms-of-service.limitation-of-liability-desc3')};</p>
      <p>{t('terms-of-service.limitation-of-liability-desc4')};</p>
      <p>{t('terms-of-service.limitation-of-liability-desc5')};</p>
      <p>{t('terms-of-service.limitation-of-liability-desc6')};</p>
      <p>{t('terms-of-service.limitation-of-liability-desc7')};</p>
      <p>{t('terms-of-service.limitation-of-liability-desc8')}</p>
      <p>{t('terms-of-service.limitation-of-liability-desc9')}.</p>
      <p>{t('terms-of-service.limitation-of-liability-desc10')}.</p>
      <p>
        <strong>{t('terms-of-service.release-and-indemnification')}</strong>
      </p>
      <p>
        <em>{t('terms-of-service.release-and-indemnification-summary')}.</em>
      </p>
      <p>{t('terms-of-service.release-and-indemnification-desc1')}.</p>
      <p>{t('terms-of-service.release-and-indemnification-desc2')}</p>
      <p>
        <strong>{t('terms-of-service.changes-to-terms')}</strong>
      </p>
      <p>
        <em>{t('terms-of-service.changes-to-terms-desc1')}</em>
      </p>
      <p>{t('terms-of-service.changes-to-terms-desc2')}</p>
      <p>{t('terms-of-service.changes-to-terms-desc3')}</p>
      <p>
        <strong>{t('terms-of-service.miscellaneous')}</strong>
      </p>
      <p>1. {t('terms-of-service.governing-law')}</p>
      <p>{t('terms-of-service.governing-law-desc')}</p>
      <p>2. {t('terms-of-service.non-assignability')}</p>
      <p>{t('terms-of-service.non-assignability-desc')}</p>
      <p>3. {t('terms-of-service.section-headings-and-summaries')}</p>
      <p>{t('terms-of-service.section-headings-and-summaries-desc')}</p>
      <p>4. {t('terms-of-service.severability-no-waiver')}</p>
      <p>{t('terms-of-service.severability-no-waiver-desc')}</p>
      <p>5. {t('terms-of-service.amendments-complete-agreement')}</p>
      <p>{t('terms-of-service.amendments-complete-agreement-desc')}</p>
    </div>
  );
};
