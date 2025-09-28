import { useState, useCallback } from 'react';
import { fieldValidators } from './useFieldValidators';

export function useContentValidation(formData, type = 'post') {
  const [errors, setErrors] = useState({});

  const validateField = useCallback((field, value = formData[field]) => {
    let error = null;

    if (field === 'text') {
      if (type === 'post') {
        error = fieldValidators.post(value);
      } else if (type === 'comment') {
        error = fieldValidators.comment(value);
      }
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  }, [formData, type]);

  const validateAll = useCallback(() => {
    const fieldValid = validateField('text');
    return { isValid: fieldValid, errors };
  }, [validateField, errors]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((field) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  const hasErrors = Object.keys(errors).some(field => errors[field]);

  return {
    errors,
    validateField,
    validateAll,
    clearErrors,
    clearFieldError,
    isValid: !hasErrors,
    hasErrors
  };
}