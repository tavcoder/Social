import { useState, useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { GeneralTab, SecurityTab } from "@/components/EditUserProfile";
import { AuthContext } from "@/context";

const EditUserProfile = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log("user:", user);
    const [message, setMessage] = useState("");
    const [activeTab, setActiveTab] = useState("general");
    const generalTabRef = useRef();
    const securityTabRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Upload avatar if needed
        await generalTabRef.current?.uploadAvatar();

        const generalData = generalTabRef.current?.getData();
        const securityData = securityTabRef.current?.getData();
        const formData = { ...generalData, ...securityData };

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3900/api/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.status === "success") {
                setMessage("Profile updated successfully 🎉");
                // Guardar cambios en localStorage
                localStorage.setItem("user", JSON.stringify(data.user));
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

            {message && <p className="status-message">{message}</p>}

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



            <form onSubmit={handleSubmit} className="form-grid">
                {activeTab === "general" && <GeneralTab ref={generalTabRef} initialData={user} className="generalTab" />}

                {activeTab === "security" && <SecurityTab ref={securityTabRef} initialData={user} />}

                <div className="form-actions">
                    <button
                        type="submit"
                        className="save-button"
                    >
                        Save
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

export default EditUserProfile;