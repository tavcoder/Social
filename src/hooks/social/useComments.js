/**
 * Custom hook for managing comment visibility in posts.
 *
 * Provides state and toggle function to show/hide comments section.
 *
 * @returns {Object} showComments state and handleCommentToggle function.
 */
import { useState } from 'react';

export function useComments() {
    const [showComments, setShowComments] = useState(false);

    const handleCommentToggle = () => {
        setShowComments(!showComments);
    };

    return { showComments, handleCommentToggle };
}