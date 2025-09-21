/**
 * SearchInput component
 *
 * A reusable text input for search functionality.  
 * Updates the parent component state on change.
 *
 * @component
 * @param {Object} props
 * @param {string} props.search - The current search value
 * @param {function} props.setSearch - Function to update the search value
 * @param {string} [props.placeholder="Buscar..."] - Optional placeholder text
 *
 */
export const SearchInput = ({ search, setSearch, placeholder = "Buscar..." }) => (
    <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={placeholder}
    />
);
