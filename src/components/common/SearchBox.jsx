// src/components/common/SearchBox.jsx
// Componente para la caja de búsqueda que filtra y muestra resultados - Props: items (array), keys (array), placeholder (string), children (function)
import { useSearch } from "@/hooks/users";
import { SearchInput } from "@/components/common";

/**
 * SearchBox
 * @param {Array} items - Lista de items a filtrar
 * @param {Array} keys - Campos de cada item a filtrar (ej: ["name", "title"])
 * @param {String} placeholder - Texto del input
 * @param {Function} children - Render prop para renderizar items filtrados
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
