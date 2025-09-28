import { useState } from "react";
import { Image } from "phosphor-react";
import { toast } from "react-toastify";
import { useApiMutation, uploadFile } from "@/api";
import { useFileUpload } from "@/hooks/common";
import { TextInput } from "@/components/common";


function NewPostForm() {
    const [text, setText] = useState("");

    const { file, previewUrl, isLoading: fileLoading, selectFile, clearFile, uploadFile: uploadFileHook } = useFileUpload();
    const createPublicationMutation = useApiMutation("createPublication");
    const loading = createPublicationMutation.isLoading || fileLoading;

    const handleSend = async () => {
        if (!text && !file) {
            toast.error("You must write something or upload a photo.");
            return;
        }

        try {
            // 1. Crear publicación con texto
            const response = await createPublicationMutation.mutateAsync({ text });

            if (!response?._id) {
                throw new Error("Error creating the publication");
            }

            // 2. Si hay archivo, subirlo usando el hook
            if (file) {
                await uploadFileHook(async (fileToUpload) => {
                    const uploadData = await uploadFile(`publication/upload/${response._id}`, fileToUpload);
                    if (uploadData.status !== "success") {
                        throw new Error(uploadData.message || "Error uploading file");
                    }
                    return uploadData;
                });
            }

            toast.success("Post created successfully!");
            setText("");
            clearFile();
        } catch (err) {
            toast.error(err.message || "Unknown error");
        }
    };

    return (
        <div className="new__post__form card">
            <TextInput
                value={text}
                onChange={(e) => setText(e.target.value)}
                onSend={handleSend}
                placeholder="What´s on your mind?"
                disabled={loading}
                sendDisabled={!text.trim() && !file}
            />

            <label htmlFor="file" className="upload__btn">
                <Image className="icon" size={18} weight="bold" />
                <span className="upload__text">Image</span>
            </label>
            <input
                type="file"
                id="file"
                accept="image/*"
                onChange={(e) => selectFile(e.target.files[0])}
                disabled={loading}
                style={{ display: "none" }}
            />

            {previewUrl && (
                <div className="image-preview">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="preview-image"
                    />
                </div>
            )}
        </div>
    );
}

export default NewPostForm;