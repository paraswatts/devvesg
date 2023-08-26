import { useTranslation } from 'react-i18next';

import { ExternalLinkButton } from 'src/common/interactions/Button';

export const ConfirmationContainer = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex items-center justify-center w-full bg-white rounded px-4 py-8 md:py-24">
        <div className="text-center flex flex-col gap-4">
          <div className="flex justify-center">
            <MountainFlagIcon />
          </div>

          <h1 className="mb-0 text-3xl">{t('onboarding.thankyou-partners')}</h1>

          <div className="max-w-md mx-auto">
            <p className="m-0">{t('onboarding.application-under-review')}</p>
            <p className="m-0">{t('onboarding.have-sustainable-day')}</p>
          </div>

          <div>
            <ExternalLinkButton.Primary href="https://www.devvesg.com/" className="w-64">
              {t('home')}
            </ExternalLinkButton.Primary>
          </div>
        </div>
      </div>
    </div>
  );
};

const MountainFlagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="97" height="96">
    <path
      data-name="Path 1531"
      d="M50.617 20.247h27.295a1.057 1.057 0 0 0 1.119-1.119V1.119A1.057 1.057 0 0 0 77.912 0H49.499a1.057 1.057 0 0 0-1.119 1.119v36.8h2.237Zm0-18.01h26.176V18.01H50.617Z"
    />
    <path
      data-name="Path 1532"
      d="M96.816 82.554a1.016 1.016 0 0 0 0-1.119L82.162 58.169a4.364 4.364 0 0 0-3.8-2.125 4.667 4.667 0 0 0-3.8 2.014l-4.7 7.159-4.363-6.935a1.27 1.27 0 0 0-.336-.895c-.112-.112-.224-.224-.336-.224L56.77 44.298a9.354 9.354 0 0 0-7.495-4.251 9.053 9.053 0 0 0-7.607 4.027l-9.955 15.773-4.81-7.718a4.364 4.364 0 0 0-3.8-2.125 4.667 4.667 0 0 0-3.8 2.014L.168 81.436a1.016 1.016 0 0 0 0 1.119 1.175 1.175 0 0 0 1.007.559h15.436l-5.929 9.061a1.016 1.016 0 0 0 0 1.119 1.175 1.175 0 0 0 1.007.559h74.389a1.175 1.175 0 0 0 1.007-.559 1.016 1.016 0 0 0 0-1.119l-5.7-9.061h14.654a1.158 1.158 0 0 0 .777-.56ZM43.682 45.416a6.663 6.663 0 0 1 5.593-3.02h.112a6.623 6.623 0 0 1 5.593 3.132l8.054 12.752-4.922 5.481-4.139-2.461a1.061 1.061 0 0 0-1.454.224l-5.593 6.712-4.363-7.607a1.644 1.644 0 0 0-.671-.559 1.189 1.189 0 0 0-.895.112l-5.481 3.691-1.342-3.915ZM3.188 80.877l18.01-27.742a2.3 2.3 0 0 1 3.8 0l5.372 8.612-12.3 19.017H3.188Zm10.515 10.85 18.9-29.2 1.23 3.58a1.008 1.008 0 0 0 .671.671 1.087 1.087 0 0 0 1.007-.112l5.7-3.915 4.586 7.942a1.141 1.141 0 0 0 .895.559h.112a1.017 1.017 0 0 0 .895-.447l6.051-7.267 4.139 2.461a1.21 1.21 0 0 0 1.454-.224l5.034-5.593 4.81 7.718L83.95 91.727Zm66.11-10.85-8.5-13.535 5.257-8.054a2.3 2.3 0 0 1 3.8 0l13.538 21.589Z"
    />
  </svg>
);
