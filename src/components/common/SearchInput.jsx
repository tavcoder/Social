export const SearchInput = ({ search, setSearch, placeholder = "Buscar..." }) => (
    <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={placeholder}
    />
);
