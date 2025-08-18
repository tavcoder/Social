// src/hooks/useComments.js
import { useState } from 'react';

export function useComments() {
    const [showComments, setShowComments] = useState(false);

    const handleCommentToggle = () => {
        setShowComments(!showComments);
    };

    return { showComments, handleCommentToggle };
}