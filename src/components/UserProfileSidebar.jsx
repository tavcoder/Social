function UserProfileSidebar() {
    return (
        <div className="profile-box" style={{ border: "1px solid #ddd", padding: "1rem", marginBottom: "1rem" }}>
            <img src="/avatar.png" alt="avatar" width="80" />
            <h4>Victor Robles</h4>
            <p>@VictorWeb</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Siguiendo <br /><strong>10</strong></div>
                <div>Seguidores <br /><strong>13</strong></div>
                <div>Publicaciones <br /><strong>17</strong></div>
            </div>
        </div>
    );
}

export default UserProfileSidebar;
