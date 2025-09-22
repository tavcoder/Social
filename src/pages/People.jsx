/**
 * People Page Component
 *
 * Displays different types of user lists based on URL parameters:
 * - /people/followers/:userId - Shows followers of a user
 * - /people/following/:userId - Shows users followed by a user
 * - /people - Shows all users (default)
 *
 * Includes search functionality and follow/unfollow actions.
 */
import { useParams } from "react-router";
import { useUsers } from "@/hooks/userConnections";
import { usePeopleLists } from "@/hooks/users";
import { SearchBox, UserList } from "@/components/common";
import "../styles/People.css";

/**
 * People component - User discovery and relationship management page
 *
 * @returns {JSX.Element} People page with searchable user lists
 */
function People() {
    // Get URL parameters for list type and user ID
    const { type, userId } = useParams();

    // Fetch user data based on context (all users, followers, following)
    const {
        users,
        followers,
        following,
        loading,
        error,
        hasMore,
        loadMore
    } = useUsers(userId, 1);
    
    console.log("following:", following);
    console.log("followers:", followers);
    // Process data to determine which list to display and search placeholder
    const { listToDisplay, placeholder } = usePeopleLists(
        type,
        userId,
        users,
        followers,
        following
    );

    // Loading and error states
    if (loading && users.length === 0) return <p className="people__loading">Cargando usuarios...</p>;
    if (error) return <p className="people__error">Error al cargar usuarios.</p>;
    return (
        <div className="people-page">
            {/* Searchable user list with follow/unfollow functionality */}
            <SearchBox
                items={listToDisplay}
                keys={["name", "nick"]}
                placeholder={placeholder}
            >
                {(listToDisplay) => (
                    <UserList
                        // Normalize user objects (some have nested user property)
                        users={listToDisplay.map(item => item.user || item)}
                        // Display nickname as secondary text
                        getSubText={(user) => user.nick}
                        // Display user row with follow button
                        showFollowButton={true}
                    />
                )}
            </SearchBox>

            {/* Load more button for pagination */}
            {hasMore && (
                <button
                    onClick={loadMore}
                    className="people__load-more"
                    disabled={loading}
                >
                    {loading ? "Cargando..." : "Cargar más"}
                </button>
            )}
        </div>
    );
}

export default People;
