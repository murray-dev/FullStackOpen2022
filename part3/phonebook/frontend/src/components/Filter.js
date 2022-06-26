const Filter = ({ filterName, setFilterName }) => {
    const handleFilterChange = (event) => setFilterName(event.target.value)
    
    return (
        <p>
            filter shown with
            <input value={filterName} onChange={handleFilterChange} />
        </p>
    )
}

export default Filter
