import { useState, useEffect, useImperativeHandle, forwardRef, useRef } from "react";
import AvatarSection from "./AvatarSection";

const GeneralTab = forwardRef(({ initialData }, ref) => {
    const [form, setForm] = useState({
        name: "",
        surname: "",
        bio: "",
        nick: "",
        image: ""
    });
    const avatarRef = useRef();

    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name || "",
                surname: initialData.surname || "",
                bio: initialData.bio || "",
                nick: initialData.nick || "",
                image: initialData.image || ""
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleImageUpdate = (image) => {
        setForm({ ...form, image });
    };

    useImperativeHandle(ref, () => ({
        getData: () => form,
        uploadAvatar: () => avatarRef.current?.uploadAvatar()
    }));

    return (
        <>
            <AvatarSection
                ref={avatarRef}
                form={form}
                onImageUpdate={handleImageUpdate}
            />
            <div className="info-section">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Surname</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        placeholder="Surname"
                        value={form.surname}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="nick">Nick</label>
                    <input
                        type="text"
                        id="nick"
                        name="nick"
                        placeholder="Nick"
                        value={form.nick}
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
        </>
    );
});

GeneralTab.displayName = 'GeneralTab';

export default GeneralTab;