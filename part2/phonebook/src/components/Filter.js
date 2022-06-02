const Filter = ({ filterName, handleFilterChange }) => (
    <p>
        filter shown with
        <input value={filterName} onChange={handleFilterChange} />
    </p>
)

export default Filter