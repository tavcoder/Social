/**
 * Edit User Profile Page Component
 *
 * Single form for editing user profile information including name, surname,
 * nickname, bio, email, and avatar.
 */
import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useApiMutation, uploadFile } from "@/api";
import { useFileUpload } from "@/hooks/common";
import { AuthContext } from "@/context";
import { Avatar } from "@/components/common";

const EditUserProfile = () => {
  const { user: authUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    name: "",
    surname: "",
    nick: "",
    bio: "",
    email: "",
  });

  // UI state
  const [message, setMessage] = useState("");

  // Avatar upload state
  const {
    file: avatarFile,
    previewUrl,
    selectFile,
    clearFile,
    uploadFile: uploadFileHook,
  } = useFileUpload();

  // Mutation for updating user profile
  const updateUserMutation = useApiMutation("updateUser");

  // Store initial user data for comparison
  const initialUser = useRef(authUser);

  // Initialize form with user data
  useEffect(() => {
    if (authUser) {
      setForm({
        name: authUser.name || "",
        surname: authUser.surname || "",
        nick: authUser.nick || "",
        bio: authUser.bio || "",
        email: authUser.email || "",
      });
    }
  }, [authUser]);

  // Handle form input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * Handle avatar upload or reset
   * @param {File|string} fileOrUrl - A File to upload, or URL string for reset
   */
  const handleAvatarUpload = async (fileOrUrl) => {
    let fileToUse;

    if (typeof fileOrUrl === 'string') {
      // Handle URL (for reset to default)
      try {
        const response = await fetch(fileOrUrl);
        if (!response.ok) throw new Error('Failed to fetch default avatar');
        const blob = await response.blob();
        fileToUse = new File([blob], "default.png", { type: response.headers.get('content-type') || 'image/png' });
      } catch (error) {
        setMessage("Error fetching default avatar: " + error.message);
        return;
      }
    } else if (fileOrUrl instanceof File) {
      // Handle File (for upload)
      fileToUse = fileOrUrl;
    } else {
      setMessage("Invalid file or URL provided");
      return;
    }

    if (fileToUse) {
      try {
        const uploadData = await uploadFileHook(async (fileToUpload) => {
          const response = await uploadFile("user/upload", fileToUpload);
          if (response.status !== "success") {
            throw new Error(response.message || "Error uploading avatar");
          }
          return response;
        });

        if (uploadData?.user) {
          setUser(uploadData.user);
        }

        // Clear file only for user uploads (not reset)
        if (fileOrUrl instanceof File) clearFile();

        setMessage(fileOrUrl instanceof File ? "Avatar uploaded successfully 🎉" : "Avatar deleted successfully 🎉");
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "There was an error with the avatar ❌";
        setMessage(errorMessage);
      }
    }
  };

  /**
   * Handle form submission for profile updates
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload avatar first if a new file was selected
    if (avatarFile) {
      await handleAvatarUpload(avatarFile);
    }

    try {
      // Update profile data via API mutation
      const data = await updateUserMutation.mutateAsync(form);

      if (data.status === "success") {
        const changedFields = getChangedFields(initialUser.current, data.user);
        const successMessage = generateSuccessMessage(changedFields);
        setMessage(successMessage);
        setUser(data.user);
        initialUser.current = data.user;
      } else {
        setMessage("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      const errorMessage =
        error.response?.data?.message ||
        "There was an error connecting to the server ❌";
      setMessage(errorMessage);
    }
  };

  // Determine avatar src
  const avatarSrc =
    previewUrl ||
    (authUser?.image
      ? `http://localhost:3900/api/user/avatar/${authUser.image}`
      : "");

  return (
    <div className="profile-form-container card">
      <h2 className="form-title">Edit Profile</h2>

      {/* Status messages for user feedback */}
      {message && <p className="status-message">{message}</p>}

      {/* Main form */}
      <form
        onSubmit={handleSubmit}
        className="form-grid"
        style={{
          opacity: updateUserMutation.isLoading ? 0.6 : 1,
          pointerEvents: updateUserMutation.isLoading ? "none" : "auto",
        }}
      >
        {/* Avatar section */}
        <div className="avatar-section">
          <Avatar src={avatarSrc} alt={form.name} size={60} />
          <div className="avatar-buttons">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => selectFile(e.target.files[0])}
              style={{ display: "none" }}
              id="avatar-upload"
            />
            <label htmlFor="avatar-upload" className="btn btn--level1">
              Select Avatar
            </label>
            {authUser?.image && authUser.image !== "default.png" && (
              <button
                type="button"
                onClick={() => handleAvatarUpload("http://localhost:3900/api/user/avatar/default.png")}
                disabled={updateUserMutation.isLoading}
                className="btn btn--level3"
              >
                Delete Avatar
              </button>
            )}
          </div>
        </div>

        {/* Form fields */}
        <div className="info-section">
          <div className="form-group">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="First Name"
              value={form.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="surname">Last Name</label>
            <input
              type="text"
              id="surname"
              name="surname"
              placeholder="Last Name"
              value={form.surname}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="nick">Nickname</label>
            <input
              type="text"
              id="nick"
              name="nick"
              placeholder="Nickname"
              value={form.nick}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Bio"
              value={form.bio}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        {/* Form action buttons */}
        <div className="form-actions">
          <button
            type="submit"
            className="save-button"
            disabled={updateUserMutation.isLoading}
          >
            {updateUserMutation.isLoading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn--level3"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Helper functions for success messages
const fieldLabels = {
  name: "first name",
  surname: "last name",
  nick: "nickname",
  bio: "bio",
  email: "email address",
};

function getChangedFields(oldUser, newUser) {
  const fields = ["name", "surname", "nick", "bio", "email"];
  return fields.filter((field) => oldUser?.[field] !== newUser?.[field]);
}

function generateSuccessMessage(changedFields) {
  if (changedFields.length === 0) return "Profile updated successfully 🎉";
  const messages = changedFields.map(
    (field) => `Your ${fieldLabels[field]} was successfully updated.`
  );
  return messages.join(" ") + " 🎉";
}

export default EditUserProfile;
