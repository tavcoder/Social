import { useState, useEffect, useImperativeHandle, forwardRef } from "react";

const SecurityTab = forwardRef(({ initialData }, ref) => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                email: initialData.email || "",
                password: "" // Keep empty for security
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    useImperativeHandle(ref, () => ({
        getData: () => form
    }));

    return (
        <>
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
                <label htmlFor="password">New password (optional)</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="New password (optional)"
                    value={form.password}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>
        </>
    );
});

SecurityTab.displayName = 'SecurityTab';

export default SecurityTab;