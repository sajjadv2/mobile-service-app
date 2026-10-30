import "../style/ServiceList.css";
import { useEffect, useMemo, useState } from "react";

export default function ServiceList({
  services,
  customers,
  onDeleteService,
  onStartEditService,
}) {
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);
  const [servicesPerPage, setServicesPerPage] = useState(5);
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;

  const filtredServices = useMemo(() => {
    return services.filter((service) => {
      if (!statusFilter) {
        return true;
      }
      return service.status === statusFilter;
    });
  }, [services, statusFilter]);

  const totalCost = services.reduce(
    (total, service) => total + Number(service.cost),
    0,
  );

  const searchedServices = useMemo(() => {
    return filtredServices.filter((service) => {
      const customer = customers.find(
        (customer) => customer.id === service.customerId,
      );
      const searchText = search.toLowerCase();
      return (
        service.device.toLowerCase().includes(searchText) ||
        service.serviceType.toLowerCase().includes(searchText) ||
        customer?.name.toLowerCase().includes(searchText)
      );
    });
  }, [filtredServices, customers, search]);

  const sortedService = [...searchedServices].sort((a, b) => {
    if (!sortBy) return 0;

    if (sortBy === "cost") {
      return sortOrder === "asc"
        ? Number(a.cost) - Number(b.cost)
        : Number(b.cost) - Number(a.cost);
    }

    const result = String(a[sortBy]).localeCompare(String(b[sortBy]), "fa");
    return setSortOrder === "asc" ? result : -result;
  });

  const totalPage = Math.ceil(sortedService.length / servicesPerPage);
  const currentSrvices = sortedService.slice(
    indexOfFirstService,
    indexOfLastService,
  );

  const pageNumbers = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);
  return (
    <div className="service-list">
      <h2>لیست خدمات</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="جستجو بر اساس مشتری یا دستگاه"
      ></input>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">بدون مرتب سازی</option>
        <option value="device">بر اساس مدل دستگاه</option>
        <option value="serviceType">بر اساس نوع خدمت</option>
        <option value="status">بر اساس وضعیت</option>
        <option value="cost">بر اساس هزینه</option>
      </select>
      <label>
        <input
          type="checkbox"
          checked={sortOrder === "desc"}
          onChange={(e) => {
            setSortOrder(e.target.checked ? "desc" : "asc");
          }}
        />
        نزولی
      </label>
      <p>مجموع هزینه خدمات: {totalCost.toLocaleString("fa-IR")}تومان</p>

      {services.length === 0 ? (
        <p>هنوز خدمتی ثبت نشده است </p>
      ) : (
        <>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">همه وضعیت ها</option>
            <option value="در انتظار بررسی">در انتظار بررسی</option>
            <option value="درحال تعمیر">درحال تعمیر</option>
            <option value="آماده تحویل">آماده تحویل</option>
            <option value="تحویل شده">تحویل شده</option>
            <option value="لغو شده">لغو شده</option>
          </select>
          <p>تعداد خدمات : {searchedServices.length}</p>
          <table className="service-table">
            <thead>
              <tr>
                <th>شناسه</th>
                <th>مشتری</th>
                <th>دستگاه</th>
                <th>نوع خدمت</th>
                <th>وضعیت</th>
                <th>هزینه</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {currentSrvices.map((service) => {
                const customer = customers.find(
                  (customer) => customer.id === Number(service.customerId),
                );
                return (
                  <tr key={service.id}>
                    <td>{service.id}</td>
                    <td>{customer?.name || "مشتری پیدا نشد"}</td>
                    <td>{service.device}</td>
                    <td>{service.serviceType}</td>
                    <td>{service.status}</td>
                    <td>{Number(service.cost).toLocaleString("fa-IR")}تومان</td>
                    <td>
                      <button onClick={() => onStartEditService(service)}>
                        ویرایش
                      </button>
                      <button onClick={() => onDeleteService(service.id)}>
                        حذف
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      <div className="paginaton">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          قبلی
        </button>
        {pageNumbers.map((page) => (
          <button key={page} onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        ))}
        <button
          disabled={currentPage === totalPage}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          بعدی
        </button>
      </div>
    </div>
  );
}
