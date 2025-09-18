// Componente para el input de búsqueda reutilizable - Props: search (string), setSearch (function), placeholder (string, opcional)
export const SearchInput = ({ search, setSearch, placeholder = "Buscar..." }) => (
    <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={placeholder}
    />
);
