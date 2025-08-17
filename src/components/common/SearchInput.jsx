
const SearchInput = ({ value, onChange, placeholder = "Buscar..." }) => (
    <input
        type="text"
        className="search__input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
    />
);

export default SearchInput;
