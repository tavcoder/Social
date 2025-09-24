import { useSearch } from "@/hooks/users";
import { SearchInput } from "@/components/common";

/**
 * SearchBox component
 *
 * A reusable search box that filters a list of items based on specified keys 
 * and displays the filtered results. Can optionally use a render prop (`children`)
 * to customize how each item is rendered.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.items - Array of items to filter
 * @param {Array} props.keys - Keys in each item to filter by (e.g., ["name", "title"])
 * @param {string} [props.placeholder="Buscar..."] - Placeholder text for the input
 * @param {function} [props.children] - Optional render prop function that receives filtered items
 */
export const SearchBox = ({ items = [], keys = [], placeholder = "Buscar...", children }) => {
    const { search, setSearch, filteredItems } = useSearch();

    // Si no hay búsqueda, devolvemos todos los items
    const displayItems = search ? filteredItems(items, keys) : items;

    return (
        <div className="search-box">
            <SearchInput search={search} setSearch={setSearch} placeholder={placeholder} />

            {children && typeof children === "function"
                ? children(displayItems)
                : displayItems.map(item => (
                    <div key={item._id || item.id}>{item.name || item.title}</div>
                ))
            }
        </div>
    );
};
     