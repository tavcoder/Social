const SecurityTab = ({ form, handleChange }) => {
    return (
        <>
            <div className="form-group">
                <label htmlFor="email">Correo</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Correo"
                    value={form.email}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">Nueva contraseña (opcional)</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Nueva contraseña (opcional)"
                    value={form.password}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>
        </>
    );
};

export default SecurityTab;