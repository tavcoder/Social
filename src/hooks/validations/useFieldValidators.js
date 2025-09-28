// Validadores individuales reutilizables
export const fieldValidators = {
  nameOrSurname: (value) => {
    const errors = [];
    const trimmed = value?.trim();
    if (!trimmed || trimmed.length < 3) {
      errors.push("Must be at least 3 characters");
    }
    if (trimmed && !/^[a-zA-ZÀ-ÿ\s]+$/.test(trimmed)) {
      errors.push("Only letters and spaces allowed");
    }
    return errors;
  },

  nick: (value) => {
    const errors = [];
    const trimmed = value?.trim();
    if (!trimmed || trimmed.length < 2) {
      errors.push("Must be at least 2 characters");
    }
    if (trimmed && !/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      errors.push("Only letters, numbers and underscores");
    }
    return errors;
  },

  email: (value) => {
    const errors = [];
    const trimmed = value?.trim();
    if (!trimmed) {
      errors.push("Email is required");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        errors.push("Invalid email format");
      }
    }
    return errors;
  },

  password: (value) => {
    const errors = [];
    if (!value) {
      errors.push("Password is required");
    }
    return errors;
  },

  bio: (value) => {
    const errors = [];
    if (value) { // Solo validar si tiene valor
      const trimmed = value.trim();
      if (trimmed.length > 255) {
        errors.push("Bio cannot exceed 255 characters");
      }
    }
    return errors;
  },

  post: (value) => {
    const errors = [];
    const trimmed = value?.trim();

    if (!trimmed) {
      errors.push("Post text is required");
    }

    return errors;
  },

  comment: (value) => {
    const errors = [];
    const trimmed = value?.trim();

    if (!trimmed) {
      errors.push("Comment text is required");
    }

    return errors;
  }
};