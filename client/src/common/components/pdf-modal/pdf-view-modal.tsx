
import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Document, Page, pdfjs } from 'react-pdf';

import { CircularProgressBar } from './circular-progress-bar';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import './pdf-view-style.scss';


export const PDFView = React.memo(({ assetUrl, modalWidth = 650 }: { assetUrl: string, modalWidth?: number }) => {

   const [numPages, setNumPages] = useState(null);
   const { t } = useTranslation();
   const [progress, setProgress] = useState<{ percent?: number, className?: string, format?: () => string, progressType?: any }>({ percent: 0, className: "progress", format: () => 'Done', progressType: "circle" });

   const onDocumentLoadSuccess = ({ numPages }: { numPages: any }) => {
      setNumPages(numPages);
   }

   const onLoadProgress = () => {
      setProgress(prevState => ({ ...prevState, percent: ((prevState?.percent || 0) + 10) }));
   }

   useEffect(() => {
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
   }, [assetUrl]);

   return (
      <div>

         <Document
            file={assetUrl}
            options={{ workerSrc: "/pdf.worker.js" }}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<CircularProgressBar ctrl={progress} />}
            error={t('pdf-view-form.error.load-error')}
            onLoadProgress={onLoadProgress}
         >
            {Array.from(new Array(numPages), (el, index) => (
               <Page key={`page_${index + 1}`} pageNumber={index + 1} width={modalWidth} />
            ))}
         </Document>

      </div >
   );
});
