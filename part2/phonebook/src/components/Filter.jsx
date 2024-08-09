// Filter component
const Filter = ({ handleNameSearch }) => {
  return (
    <div>
      filter shown with
      <input onChange={handleNameSearch} />
    </div>
  );
};

export default Filter;
