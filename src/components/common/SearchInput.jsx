
const SearchInput = ({ value, onChange, placeholder = "Buscar..." }) => (
    <input
        type="text"
        className="search-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    />
);

export default SearchInput;
