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
    if (!value) return "Password is required";
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

    if (!trimmed) {
      return "Post text is required";
    }

    return null;
  },

  comment: (value) => {
    const trimmed = value?.trim();

    if (!trimmed) return "Comment text is required";

    return null;
  }
};