// Filter component
const Filter = ({ handleNameSearch}) => {
  return (
    <div className="filter-form">
      <div>
        <p>filter by </p>
        <p>name or phone </p>  
      </div>
      <input onChange={handleNameSearch} />
    </div>
  );
};

export default Filter;