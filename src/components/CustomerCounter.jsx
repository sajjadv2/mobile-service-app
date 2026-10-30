export default function CustomerCounter({ count,filteredCount }) {
  return (
    <div>
      <h3>Total Customers: {count}</h3>
      <h3>Search Results: {filteredCount}</h3>
    </div>
  );
}
