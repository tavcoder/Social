/**
 * Custom hook for search functionality.
 *
 * Manages search state and provides filtering function for items based on keys.
 *
 * @param {string} initialValue - Initial search value.
 * @returns {Object} search state, setSearch function, filteredItems function.
 */
import { useState } from "react";

export function useSearch(initialValue = "") {
    const [search, setSearch] = useState(initialValue);

    const filteredItems = (items, keys) => {
        if (!search) return items;
        const lowerSearch = search.toLowerCase();
        return items.filter(item =>
            keys.some(key => item[key]?.toLowerCase().includes(lowerSearch))
        );
    };

    return { search, setSearch, filteredItems };
}
