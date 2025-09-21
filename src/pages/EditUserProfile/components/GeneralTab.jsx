import { useState, useEffect, useImperativeHandle, forwardRef, useRef } from "react";
import AvatarSection from "./AvatarSection";

/**
 * GeneralTab component
 *
 * This component renders a form to edit general user profile information 
 * such as name, surname, nickname, bio, and avatar.
 *
 * It uses `forwardRef` to expose imperative methods to parent components,
 * so that the parent can:
 * - Retrieve the current form data (`getData`)
 * - Trigger the avatar upload (`uploadAvatar`)
 *
 * @component
 * @param {Object} props
 * @param {Object} props.initialData - Initial values for the form fields (name, surname, nick, bio, image)
 * @param {React.Ref} ref - Forwarded ref to expose imperative methods
 *
 * @returns {JSX.Element} The rendered GeneralTab component
 */

const GeneralTab = forwardRef(({ initialData }, ref) => {
    const [form, setForm] = useState({
        name: "",
        surname: "",
        bio: "",
        nick: "",
        image: ""
    });
    /** Ref to control the AvatarSection child component */
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