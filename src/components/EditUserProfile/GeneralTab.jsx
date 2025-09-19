import { Avatar } from "@/components/common";

const GeneralTab = ({ form, handleChange, avatarFile, setAvatarFile, handleAvatarUpload, handleAvatarDelete }) => {
    return (
        <>
            <div className="avatar-section">
                <Avatar
                    src={form.image ? `http://localhost:3900/api/user/avatar/${form.image}` : ""}
                    alt={form.name}
                    size={60}
                />
                <div className="avatar-buttons">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAvatarFile(e.target.files[0])}
                        style={{ display: "none" }}
                        id="avatar-upload"
                    />
                    <label htmlFor="avatar-upload" className="btn btn--level1">
                        Seleccionar Avatar
                    </label>
                    <button
                        type="button"
                        onClick={handleAvatarDelete}
                        className="btn btn--level3"
                    >
                        Eliminar Avatar
                    </button>
                </div>
            </div>
            <div className="info-section">
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Apellido</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        placeholder="Apellido"
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
                    <label htmlFor="bio">Biografía</label>
                    <textarea
                        id="bio"
                        name="bio"
                        placeholder="Biografía"
                        value={form.bio}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

            </div>
        </>
    );
};

export default GeneralTab;