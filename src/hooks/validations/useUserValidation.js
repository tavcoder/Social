import { useState, useCallback } from 'react';
import { fieldValidators } from './useFieldValidators';

export function useUserValidation(formData, includePassword = false) {
  const [errors, setErrors] = useState({});

  const validateField = useCallback((field, value = formData[field]) => {
    let error = null;

    switch (field) {
      case 'name':
      case 'surname':
        error = fieldValidators.nameOrSurname(value);
        break;
      case 'nick':
        error = fieldValidators.nick(value);
        break;
      case 'email':
        error = fieldValidators.email(value);
        break;
      case 'password':
        if (includePassword) {
          error = fieldValidators.password(value);
        }
        break;
      case 'bio':
        error = fieldValidators.bio(value);
        break;
    }

    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  }, [formData, includePassword]);

  const validateAll = useCallback(() => {
    const fields = ['name', 'surname', 'nick', 'email'];
    if (includePassword) fields.push('password');
    fields.push('bio'); // Opcional pero validar si presente

    const newErrors = {};
    let isValid = true;

    fields.forEach(field => {
      const fieldValid = validateField(field);
      if (!fieldValid) {
        isValid = false;
        newErrors[field] = errors[field];
      }
    });

    return { isValid, errors: newErrors };
  }, [validateField, errors, includePassword]);

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