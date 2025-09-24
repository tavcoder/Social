/**
 * Home Page Component
 *
 * Main landing page that displays the social feed.
 * Shows the new post form and the list of posts from followed users.
 */
import { PostList, NewPostForm } from "@/components/post";

/**
 * Home component - Main social feed page
 *
 * @returns {JSX.Element} The home page with post creation form and post list
 */
function Home() {
    return (
        <section>
            {/* Form to create new posts */}
            <NewPostForm />
            {/* List of posts from followed users */}
            <PostList />
        </section>
    );
}

export default Home;