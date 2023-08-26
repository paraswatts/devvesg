

import { useTranslation } from 'react-i18next';

import { ExternalLinkButton } from 'src/common/interactions/Button';
import { CardTitles, } from 'src/common/layout/cards';

import logo from 'src/assets/images/glassblock.svg';

export const GlassBlockBanner = () => {
    const { t } = useTranslation();

    return (
        <CardTitles>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
                <div className="flex flex-col h-full bg-white rounded-xl">
                    <div
                        style={{ backgroundImage: `url(${logo})`, height: '3rem' }}
                        className="mt-2 bg-no-repeat rounded-t-xl bg-neutral-10 bg-opacity-25 bg-blend-overlay"
                    />
                    <div className="flex flex-col gap-2 flex-grow pt-5 pb-5u px-5 text-center">
                        <div>
                            <ExternalLinkButton.Primary href="https://glassblock.io" style={{ float: 'left' }}>{t('improve.visit-to-marketplace')}</ExternalLinkButton.Primary>
                        </div>
                    </div>
                </div>
            </div>
        </CardTitles>
    );
}