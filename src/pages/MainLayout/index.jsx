/**
 * Main Layout Component
 *
 * Root layout component that provides the overall application structure.
 * Implements a three-column layout: sidebar-left (profile/activity),
 * main feed (dynamic content via Outlet), and sidebar-right (messages).
 * Used as the main wrapper for authenticated pages.
 */
import { Outlet, useParams } from "react-router";
import { UserProfileSidebar } from "@/components/userSideBar";
import { UserSuggestions } from "@/components/userSuggestion";
import { Navbar } from "./components";

import "../../styles/MainLayout.css";

/**
 * MainLayout component - Application layout wrapper
 *
 * @returns {JSX.Element} Three-column layout with navigation and sidebars
 */
function MainLayout() {
    // Extract userId from URL params (used by child routes)
    const { userId } = useParams();
    return (
        <div className="app__container">
            {/* Top navigation bar */}
            <Navbar />

            <div className="content__container">
                {/* Left sidebar: user profile and activity */}
                <aside className="sidebar-left">
                    <UserProfileSidebar />
                    <UserSuggestions />
                </aside>

                {/* Main content area: dynamic page content via React Router */}
                <main className="feed">
                    <Outlet />
                </main>

                 {/* Right sidebar: messages and additional features */}
                 <aside className="sidebar-right">
                     {/* Chat removed */}
                 </aside>
            </div>
        </div>
    );
}

export default MainLayout;
