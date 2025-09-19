import { useState, useEffect, useContext } from "react";
import { GeneralTab, SecurityTab } from "@/components/EditUserProfile";
import { AuthContext } from "@/context";

const EditUserProfile = () => {
    const { user } = useContext(AuthContext);
    console.log("user:", user);
    const [form, setForm] = useState({
        name: "",
        surname: "",
        bio: "",
        nick: "",
        email: "",
        password: "",
        image: ""
    });
    const [avatarFile, setAvatarFile] = useState(null);
    const [message, setMessage] = useState("");
    const [activeTab, setActiveTab] = useState("general");

    // Load user data from useProfile hook
    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                surname: user.surname || "",
                bio: user.bio || "",
                nick: user.nick || "",
                email: user.email || "",
                password: "", // Keep empty for security
                image: user.image || ""
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3900/api/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (data.status === "success") {
                setMessage("Perfil actualizado con éxito 🎉");
                // Guardar cambios en localStorage
                localStorage.setItem("user", JSON.stringify(data.user));
            } else {
                setMessage("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setMessage("Hubo un error en la conexión con el servidor ❌");
        }
    };

    const handleAvatarUpload = async () => {
        if (!avatarFile) return;

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("file0", avatarFile);

        try {
            const res = await fetch("http://localhost:3900/api/user/upload", {
                method: "POST",
                headers: {
                    "Authorization": token
                },
                body: formData
            });

            const data = await res.json();

            if (data.status === "success") {
                setMessage("Avatar actualizado con éxito 🎉");
                localStorage.setItem("user", JSON.stringify(data.user));
                setForm({ ...form, image: data.user.image });
                setAvatarFile(null);
            } else {
                setMessage("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error uploading avatar:", error);
            setMessage("Hubo un error subiendo el avatar ❌");
        }
    };

    const handleAvatarDelete = async () => {
        // Since no delete endpoint, update with empty image
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:3900/api/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({ ...form, image: "" })
            });

            const data = await res.json();

            if (data.status === "success") {
                setMessage("Avatar eliminado con éxito 🎉");
                localStorage.setItem("user", JSON.stringify(data.user));
                setForm({ ...form, image: "" });
            } else {
                setMessage("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error deleting avatar:", error);
            setMessage("Hubo un error eliminando el avatar ❌");
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
                {activeTab === "general" && <GeneralTab form={form} handleChange={handleChange} avatarFile={avatarFile} setAvatarFile={setAvatarFile} handleAvatarUpload={handleAvatarUpload} handleAvatarDelete={handleAvatarDelete} className="generalTab"/>}

                {activeTab === "security" && <SecurityTab form={form} handleChange={handleChange} />}

                <button
                    type="submit"
                    className="save-button"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditUserProfile;