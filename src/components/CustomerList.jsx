import { useEffect, useState } from "react";
import "../style/CustomerList.css";

export default function CustomerList({
  onDeleteCustomer,
  onStartEdit,
  filteredCustomers,
  search,
  setSearch,
}) {
  const [sortBy, setSortBy] = useState("")
  const [sortOrder, setSortOrder] = useState("asc")

  const sortedCustomers=[...filteredCustomers].sort((a,b)=>{
    if(!sortBy) return 0;

    const result = a[sortBy].localeCompare(b[sortBy])

    return sortOrder==='asc'? result : -result;
  });

  const [currentPage,setCurrentPage]=useState(1)
  const customersPerPage = 5;
  const indexOfLastCustomer= currentPage * customersPerPage
  const indexOfFirstCustomer=indexOfLastCustomer-customersPerPage
  const currentCustomers=sortedCustomers.slice(indexOfFirstCustomer,indexOfLastCustomer)
  const totalPages=Math.ceil(sortedCustomers.length/customersPerPage)
  const pageNumbers = []
  for(let i=1; i<=totalPages;i++){
    pageNumbers.push(i);
  }

  useEffect(()=>{setCurrentPage(1)},[search])

  useEffect(()=>{
    if(totalPages>0 && currentPage>totalPages){
      setCurrentPage(totalPages)
    }
  },[totalPages,currentPage])

  
  return (
    <div className="customer-list">
      <h2>لیست مشتریان</h2>

      <input
        className="customer-search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Customers search"
      />

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">مرتب سازی</option>
        <option value="name"> بر اساس نام</option>
        <option value="city">بر اساس شهر </option>
      </select>
      <label htmlFor="chekbox">
        <input
          type="checkbox"
          id="checkbox"
          checked={sortOrder === 'desc'}
          onChange={(e) =>
            setSortOrder(e.target.checked ? 'desc' : 'asc')
          }
        />
        نزولی
      </label>

      {filteredCustomers.length > 0 ? (
        <table className="customer-table">
          <thead>
            <tr>
              <th>ردیف</th>
              <th>نام مشتری</th>
              <th>تلفن </th>
              <th>شهر</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {currentCustomers.map((customer, index) => (
              <tr key={customer.id}>
                <td>{indexOfFirstCustomer+ index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.phone}</td>
                <td>{customer.city}</td>
                <td className="action">
                  <button
                    className="delete-btn"
                    onClick={() => onDeleteCustomer(customer.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="edit-btn"
                    onClick={() => onStartEdit(customer)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>Oops! Customer not found</h2>
      )}

      <div className="pagination">
        <button disabled={currentPage===1} onClick={()=>{setCurrentPage(currentPage-1)}} >قبلی</button>

        {pageNumbers.map((page)=>(
          <button
            key={page} 
            onClick={()=>setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button disabled={currentPage===totalPages} onClick={()=>{setCurrentPage(currentPage+1)}}>بعدی</button>
      </div>

    </div>
  );
}
