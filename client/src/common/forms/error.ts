import { FieldError, FieldErrors, FormState } from 'react-hook-form';

export const extractHookError = <T>(formState: FormState<T>, key: keyof FieldErrors<T>): string | undefined => {
  if (formState.isSubmitted && formState.errors && formState.errors[key]) {
    return (formState.errors[key] as FieldError).message;
  }
  return undefined;
};

export const extractStepFormError = <T>(formState: FormState<T>, key: keyof FieldErrors<T>): string | undefined => {
  if (formState.errors && formState.errors[key]) {
    return (formState.errors[key] as FieldError).message;
  }
  return undefined;
};
