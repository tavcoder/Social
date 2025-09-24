
// Componente para mostrar un indicador de carga (spinner) - Props: ninguna
export default function Spinner() {
    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
            <div
                style={{
                    width: "24px",
                    height: "24px",
                    border: "3px solid #ccc",
                    borderTop: "3px solid #333",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite"
                }}
            />
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                `}
            </style>
        </div>
    );
}