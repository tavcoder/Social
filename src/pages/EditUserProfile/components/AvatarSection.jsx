import { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { uploadFile } from "@/api";
import { useFileUpload } from "@/hooks/common";
import { Avatar } from "@/components/common";

const AvatarSection = forwardRef(({ form, onImageUpdate }, ref) => {
    const [message, setMessage] = useState("");
    const [defaultImage, setDefaultImage] = useState(null);
    const [isDelete, setIsDelete] = useState(false);

    const { file: avatarFile, previewUrl, isLoading: fileLoading, selectFile, clearFile, uploadFile: uploadFileHook } = useFileUpload();

    // Load default image
    useEffect(() => {
        fetch('/assets/default.PNG')
            .then(res => res.blob())
            .then(blob => setDefaultImage(new File([blob], 'default.png', { type: 'image/png' })))
            .catch(err => console.error('Error loading default image:', err));
    }, []);

    useImperativeHandle(ref, () => ({
        getAvatarData: () => ({ avatarFile, isDelete }),
        uploadAvatar: async () => {
            if (avatarFile) {
                await handleAvatarAction(avatarFile, "Avatar updated successfully 🎉");
                clearFile();
            } else if (isDelete) {
                await handleAvatarAction(defaultImage, "Avatar deleted successfully 🎉");
                setIsDelete(false);
            }
        }
    }));

    // Determine avatar src: preview if file selected, handle delete case, else current image
    let avatarSrc = previewUrl;
    if (!avatarSrc && isDelete && defaultImage) {
        avatarSrc = URL.createObjectURL(defaultImage);
    }
    if (!avatarSrc) {
        avatarSrc = form.image ? `http://localhost:3900/api/user/avatar/${form.image}` : "";
    }

    // Check if current avatar is default to hide delete button
    const isDefaultAvatar = !avatarSrc || avatarSrc.includes('default.png') || form.image === 'default.png';     

    const handleAvatarAction = async (file, successMessage) => {
        try {
            console.log("Sending upload request...");
            const data = await uploadFileHook(async (fileToUpload) => {
                const uploadData = await uploadFile("user/upload", fileToUpload);
                if (uploadData.status !== "success") {
                    throw new Error(uploadData.message || "Error uploading avatar");
                }
                return uploadData;
            });

            setMessage(successMessage);
            localStorage.setItem("user", JSON.stringify(data.user));
            onImageUpdate(data.user.image);
        } catch (error) {
            console.error("Error uploading avatar:", error);
            setMessage("There was an error uploading the avatar ❌");
        }
    };

    const handleAvatarDelete = () => {
        setIsDelete(true);
        clearFile();
        setMessage("Avatar will be deleted on save.");
    };

    return (
        <div className="avatar-section">
            {message && <p className="status-message">{message}</p>}
            <Avatar
                src={avatarSrc}
                alt={form.name}
                size={60}
            />
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

                {!isDefaultAvatar && (
                    <button
                        type="button"
                        onClick={handleAvatarDelete}
                        className="btn btn--level3"
                    >
                        Delete Avatar
                    </button>
                )}

            </div>
        </div>
    );
});

AvatarSection.displayName = 'AvatarSection';

export default AvatarSection;