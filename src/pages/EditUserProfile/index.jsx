/**
 * Edit User Profile Page Component
 *
 * Multi-tab interface for editing user profile information.
 * Handles general profile data (name, bio, avatar) and security settings
 * (email, password). Uses refs to communicate with child tab components.
 */
import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { useApiMutation } from "@/api";
import { AuthContext } from "@/context";
import { GeneralTab, SecurityTab } from "./components";

/**
 * EditUserProfile component - Profile editing interface with tabs
 *
 * @returns {JSX.Element} Profile editing page with general and security tabs
 */
const EditUserProfile = () => {
    const { user: authUser, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
console.log(authUser);
    // UI state
    const [message, setMessage] = useState("");
    const [activeTab, setActiveTab] = useState("general");

    // Refs to communicate with tab components
    const generalTabRef = useRef();
    const securityTabRef = useRef();

    // Mutation for updating user profile
    const updateUserMutation = useApiMutation("updateUser");

    // Store initial user data for comparison
    const initialUser = useRef(authUser);

    /**
     * Handle form submission for profile updates
     * Processes both general and security data, uploads avatar separately
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Upload avatar first (handled by GeneralTab component)
        await generalTabRef.current?.uploadAvatar();

        // Collect form data from both tabs
        const generalData = generalTabRef.current?.getData();
        const securityData = securityTabRef.current?.getData();
        const formData = { ...generalData, ...securityData };

        try {
            // Update profile data via API mutation
            const data = await updateUserMutation.mutateAsync(formData);

            if (data.status === "success") {
                const changedFields = getChangedFields(initialUser.current, data.user);
                const successMessage = generateSuccessMessage(changedFields);
                setMessage(successMessage);
                // Update context with new user data (context handles localStorage)
                setUser(data.user);
                // Update initialUser for future comparisons
                initialUser.current = data.user;
            } else {
                setMessage("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage("There was an error connecting to the server ❌");
        }
    };

    return (
        <div className="profile-form-container card">
            <h2 className="form-title">Account Settings</h2>

            {/* Status messages for user feedback */}
            {message && <p className="status-message">{message}</p>}

            {/* Tab navigation between General and Security settings */}
            <div className="tabs">
                <button
                    className={`tab-button ${activeTab === "general" ? "active" : ""}`}
                    onClick={() => setActiveTab("general")}
                >
                    General
                </button>
                <button
                    className={`tab-button ${activeTab === "security" ? "active" : ""}`}
                    onClick={() => setActiveTab("security")}
                >
                    Security
                </button>
            </div>

            {/* Main form with conditional tab content */}
            <form onSubmit={handleSubmit} className="form-grid">
                {/* General tab: profile info and avatar */}
                {activeTab === "general" && <GeneralTab ref={generalTabRef} initialData={authUser} className="generalTab" />}

                {/* Security tab: email and password */}
                {activeTab === "security" && <SecurityTab ref={securityTabRef} initialData={authUser} />}

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
    name: 'first name',
    surname: 'last name',
    nick: 'nickname',
    bio: 'bio',
    email: 'email address'
};

function getChangedFields(oldUser, newUser) {
    const fields = ['name', 'surname', 'nick', 'bio', 'email'];
    return fields.filter(field => oldUser?.[field] !== newUser?.[field]);
}

function generateSuccessMessage(changedFields) {
    if (changedFields.length === 0) return "Profile updated successfully 🎉";
    const messages = changedFields.map(field => `Your ${fieldLabels[field]} was successfully updated.`);
    return messages.join(' ') + ' 🎉';
}

export default EditUserProfile;