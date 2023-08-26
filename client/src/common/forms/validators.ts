import { RegisterOptions, UseFormSetError } from 'react-hook-form';

import { passwordMeetsRequirements } from 'src/common/util';
import { ClientPartnerLocation } from 'src/interfaces';

const MEGABYTE_IN_BYTES = 1000000;
const allowedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
const allowedDocumentTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
];
const allowedDocumentTypesFriendly = ['pdf', 'doc', 'docx'];

// Common react-hook-form validator objects to combine with other validations
export const Validators: {
  maxLength: (maxLength: number, message?: string) => RegisterOptions;
  required: (translate: (key: string) => string) => RegisterOptions;
  locations: (translate: (key: string) => string) => RegisterOptions;
  password: (translate: (key: string) => string) => RegisterOptions;
  url: (translate: (key: string) => string) => RegisterOptions;
  documentFileSize: (maxSizeMb: number, translate: (key: string) => string) => RegisterOptions;
  imageFileSize: (maxSizeMb: number, translate: (key: string) => string) => RegisterOptions;
  passwordMatch: (password: string, translate: (key: string) => string) => RegisterOptions;
  pdfFileSize: (maxSizeMb: number, translate: (key: string) => string) => RegisterOptions;
  compareDates: (translate: (key: string) => string, toDate?: Date) => RegisterOptions;
} = {
  maxLength: (maxLength: number, message: string = 'Too many characters') => ({
    maxLength: { value: maxLength, message },
  }),
  required: (translate: (key: string) => string) => {
    return { required: translate('warnings.required') };
  },
  imageFileSize: (maxSizeMb: number, translate: (key: string) => string) => ({
    validate: (files: FileList) => {
      if (files === null || files === undefined || typeof files === 'string' || files.length === 0) {
        // allow if empty or is an existing file string
        return undefined;
      }
      // check size
      if (files[0].size > maxSizeMb * MEGABYTE_IN_BYTES) {
        return `${translate('warnings.file-limit')} ${maxSizeMb}MB`;
      }
      // check file type
      if (!allowedImageTypes.includes(files[0].type.toLowerCase())) {
        return `${translate('warnings.unsupported-image-format')} ${allowedImageTypes.join(', ')}`;
      }
      return undefined;
    },
  }),
  documentFileSize: (maxSizeMb: number, translate: (key: string) => string) => ({
    validate: (files: FileList) => {
      if (files === null || files === undefined || typeof files === 'string' || files.length === 0) {
        return translate('warnings.required');
      }
      // check size
      if (files[0].size > maxSizeMb * MEGABYTE_IN_BYTES) {
        return `${translate('warnings.file-limit')} ${maxSizeMb}MB`;
      }
      // check file type
      if (!allowedDocumentTypes.includes(files[0].type.toLowerCase())) {
        return `${translate('warnings.unsupported-doc-format')} ${allowedDocumentTypesFriendly.join(', ')}`;
      }
      return undefined;
    },
  }),
  locations: (translate: (key: string) => string) => ({
    required: translate('warnings.required'),
    validate: (locations: ClientPartnerLocation[]) => {
      let emptyProvinces = false;
      locations.forEach((location) => {
        const validProvinces = location.provinces.filter((province) => province !== '');
        if (!location.country || validProvinces.length === 0) {
          emptyProvinces = true;
        }
      });
      return emptyProvinces ? translate('warnings.not-all-province') : undefined;
    },
  }),
  password: (translate: (key: string) => string) => ({
    required: translate('warnings.required'),
    validate: (password: string) => {
      const valid = passwordMeetsRequirements(password);
      if (!valid) {
        return translate('warnings.password-pattern');
      }
      return undefined;
    },
  }),
  passwordMatch: (password: string, translate: (key: string) => string) => ({
    required: translate('warnings.required'),
    validate: (passwordMatch: string) => {
      if (password !== passwordMatch) {
        return translate('warnings.password-must-match');
      }
    },
  }),
  pdfFileSize: (maxSizeMb: number, translate: (key: string) => string) => ({
    validate: (files: FileList) => {
      if (files.length === 0 || typeof files === 'string') {
        // allow if empty or is an existing file string
        return undefined;
      }
      // check size
      if (files[0].size > maxSizeMb * MEGABYTE_IN_BYTES) {
        return `${translate('warnings.file-limit')} ${maxSizeMb}MB`;
      }
      // check file type
      if (!allowedDocumentTypes.includes(files[0].type.toLowerCase())) {
        return `${translate('warnings.unsupported-doc-format')} ${allowedDocumentTypes.join(', ')}`;
      }
      return undefined;
    },
  }),
  url: (translate: (key: string) => string) => ({
    required: translate('warnings.required'),
    validate: (value: string) => {
      if (!/^http(s?):\/\//.test(value)) {
        return translate('warnings.must-start-with');
      }

      return undefined;
    },
  }),
  compareDates: (translate: (key: string) => string, projectToDate?: Date) => ({
    required: translate('warnings.required'),
    validate: (projectFromDate: Date) => {
      if (projectToDate && projectFromDate > projectToDate) {
        return translate('warnings.start-date');
      }
    },
  }),
};

export interface ZodErrors {
  issues: { path: string; message: string }[];
}
/**
 * Applies Zod error responses from the server to a react-hook-form.
 *
 * Note that you may not be able to use this if your client side form
 * does not match the structure of validation occurring on the server.
 * The 'paths' should match on both sides.
 *
 * @param errors An error object response received from the server
 * @param setError An existing react-hook-form error setter
 */
export function applyHookFormErrors(errors: ZodErrors, setError: UseFormSetError<any>) {
  if (errors && Array.isArray(errors.issues)) {
    errors.issues.forEach((issue) => {
      setError(issue.path, { message: issue.message });
    });
  }
}
