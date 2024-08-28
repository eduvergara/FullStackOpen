// Filter component
const Filter = ({ handleNameSearch }) => {
  return (
    <div className="filter-form">
      filter shown with
      <input onChange={handleNameSearch} />
    </div>
  );
};

export default Filter;

