import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Search = ({ data, setFilteredData, setHighlightTerm, keyToSearch, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      const term = searchTerm.trim().toLowerCase();
      setHighlightTerm && setHighlightTerm(term); // Set highlight term if provided

      if (term === "") {
        setFilteredData(data); // Show all when input is empty
      } else {
        const filtered = data.filter((item) =>
          keyToSearch.some((key) =>
            item[key]?.toString().toLowerCase().includes(term)
          )
        );
        setFilteredData(filtered);
      }
    }, 500); // Debounce for better performance

    return () => clearTimeout(handler);
  }, [searchTerm, data, setFilteredData, keyToSearch, setHighlightTerm]);

  return (
    <input
      className="sts-search"
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
};

Search.propTypes = {
  data: PropTypes.array.isRequired,         // Dynamic dataset (tests or students)
  setFilteredData: PropTypes.func.isRequired, // Function to update filtered data
  keyToSearch: PropTypes.array.isRequired,  // Array of field names to filter by
  placeholder: PropTypes.string,              // Input placeholder
  setHighlightTerm: PropTypes.func,           // Optional highlight term setter
};

export default Search;
