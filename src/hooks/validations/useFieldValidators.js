// Validadores individuales reutilizables
export const fieldValidators = {
  nameOrSurname: (value) => {
    const trimmed = value?.trim();
    if (!trimmed || trimmed.length < 3) return "Must be at least 3 characters";
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(trimmed)) return "Only letters and spaces allowed";
    return null;
  },

  nick: (value) => {
    const trimmed = value?.trim();
    if (!trimmed || trimmed.length < 2) return "Must be at least 2 characters";
    if (trimmed.length > 20) return "Must be no more than 20 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) return "Only letters, numbers and underscores";
    return null;
  },

  email: (value) => {
    const trimmed = value?.trim();
    if (!trimmed) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return "Invalid email format";
    return null;
  },

  password: (value) => {
    if (!value || value.length < 6) return "Password must be at least 6 characters";
    return null;
  },

  bio: (value) => {
    if (!value) return null; // Opcional
    const trimmed = value.trim();
    if (trimmed.length > 255) return "Bio cannot exceed 255 characters";
    return null;
  },

  post: (value) => {
    const trimmed = value?.trim();
    const minLength = 5; // Según especificación 1-5
    const maxLength = 1000; // Según especificación 500-1000

    if (!trimmed) {
      return "Post text is required";
    }

    if (trimmed.length < minLength) {
      return `Post must be at least ${minLength} characters`;
    }

    if (trimmed.length > maxLength) {
      return `Post cannot exceed ${maxLength} characters`;
    }

    // Anti-spam
    const spamPattern = /(.)\1{4,}/;
    if (spamPattern.test(trimmed)) {
      return "Post contains repetitive characters (spam)";
    }

    return null;
  },

  comment: (value) => {
    const trimmed = value?.trim();
    const minLength = 3; // Según especificación 1-3
    const maxLength = 500; // Según especificación 250-500

    if (!trimmed) return "Comment is required";

    if (trimmed.length < minLength) {
      return `Comment must be at least ${minLength} characters`;
    }

    if (trimmed.length > maxLength) {
      return `Comment cannot exceed ${maxLength} characters`;
    }

    // Anti-spam
    const spamPattern = /(.)\1{4,}/;
    if (spamPattern.test(trimmed)) {
      return "Comment contains repetitive characters (spam)";
    }

    return null;
  }
};