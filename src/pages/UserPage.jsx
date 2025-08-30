import { useParams } from "react-router";
import { useApiQuery } from "@/api";
import { UserProfileSidebar } from "@/components/user";
import { PostList } from "@/components/post";

export default function UserPage() {
    const { userId } = useParams();

    const { data: profile, isLoading: loadingProfile } = useApiQuery(
        "profile",
        userId
    );

    if (loadingProfile) return <div>Cargando usuario...</div>;
    if (!profile) return <div>Usuario no encontrado.</div>;

    return (
        <div className="user-page">
            <UserProfileSidebar profile={profile} />
            <div className="timeline-page">
                <PostList userId={userId} />
            </div>
        </div> 
    );
}
