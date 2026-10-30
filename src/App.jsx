import { useEffect, useMemo, useState } from "react";
import Header from "./components/header";
import CustomerForm from "./components/CustomerForm";
import CustomerList from "./components/CustomerList";
import CustomerCounter from "./components/CustomerCounter";
import CustomerStats from "./components/CustomerStats";
import ServiceList from "./components/ServiceList";
import ServiceForm from "./components/ServiceForm";
const API_URL=import.meta.env.VITE_API_URL;
function App() {
  const [customers, setCustomers] = useState([]);

  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState("");

  const [editingCustomer, setEditingCustomer] = useState(null);
  const [editingService, setEditingService] = useState(null);

  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isServiceFormOpen, setIsServiceFormOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);
  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    console.log(API_URL)
    fetch(`${API_URL}customers`)
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => {
        console.error("error fetching customers", error);
      });
  }, []);

  useEffect(() => {
    const loadServices = async () => {
      try {
        setServicesLoading(true);
        setServicesError("");
        const response = await fetch(`${API_URL}services`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "فراخوانی سرویس ها ناموفق بود");
        }
        setServices(data);
      } catch (error) {
        console.error("Error loading services", error);
        setServicesError("ارتباط با سرور برقرار نشد");
      } finally {
        setServicesLoading(false);
      }
    };

    loadServices();
  }, []);

  //--------------------------Customer CRUD -----------------------

  const addCustomer = async (customer) => {
    try {
      const response = await fetch(`${API_URL}customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "ثبت مشتری تانوفق بود");
      }
      setCustomers((prev) => [...prev, data]);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error adding customers", error);
      alert(error.message || "ارتباط با سرور برقرار نشد");
    }
  };

  const deleteCustomer = async (id) => {
    const hasService = services.some(
      (service) => Number(service.customerId) === id,
    );
    if (hasService) {
      alert("این مشتری خدمات ثبت شده دارد و قابل حذف نمی باشد");
      return;
    }
    try {
      const response = await fetch(
        `${API_URL}customers/${id}`,
        {
          method: "DELETE",
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "حذف مشتری  ناموفق بود");
      }
      setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    } catch (error) {
      console.error("Error deleting data", error);
      alert(error.message || "ارتباط با سرور برقرا نشد");
    }
  };

  const startEditCustomer = (customer) => {
    setEditingCustomer(customer);
  };

  const updateCustomer = async (id, updatedCustomer) => {
    try {
      const response = await fetch(
        `${API_URL}customers/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCustomer),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new error(data.message || "ویراش مشتری نا موفق بود");
      }
      setCustomers((prev) =>
        prev.map((customer) => (customer.id === data.id ? data : customer)),
      );
      setEditingCustomer(null);
      setIsFormOpen(false);
    } catch (error) {
      console.error("error updateing customer", error);
      alert(error.message || "ارتباط با سرور برقرار نشد");
    }
  };

  const cancelEdit = () => {
    setEditingCustomer(null);
    setIsFormOpen(false);
  };

  const closeModal = () => {
    setIsFormOpen(false);
    setEditingCustomer(null);
  };

  //------------------------------ Service CRUD -----------------
  const addService = async (service) => {
    try {
      const response = await fetch(`${API_URL}services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "اضافه کردن سریس ناموفق بود");
      }
      setServices((prev) => [...prev, data]);
      setIsServiceFormOpen(false);
    } catch (error) {
      console.error("error updateing customer", error);
      alert(error.message || "ارتباط با سرور برقرار نشد");
    }
  };

  const deleteService = async (id) => {
    try {
      const response = await fetch(`${API_URL}services/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "حذف سرویس ناموفق بود");
      }
      setServices((prev) => prev.filter((service) => service.id !== id));
    } catch (error) {
      console.error("error updateing service", error);
      alert(error.message || "ارتباط با سرور برقرار نشد");
    }
  };

  const startEditService = (service) => {
    setEditingService(service);
    setIsServiceFormOpen(true);
  };

  const updateService = async (id, updatedService) => {
    try {
      const response = await fetch(`${API_URL}services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedService),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "ویرایش انجام نشد");
      }
      setServices((prevServices) =>
        prevServices.map((service) => (service.id === id ? data : service)),
      );
      setEditingService(null);
      setIsServiceFormOpen(false);
    } catch (error) {
      console.log("error updating service", error);
      alert(error.message || "ارتباط با سرور برقرار نشد");
    }
  };

  const cancelEditeService = () => {
    setEditingService(null);
    setIsServiceFormOpen(false);
  };

  //------------------------------Customer Search --------------

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.city.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search),
  );

  //-----------------------------Dashboard --------------------------
  const totalServices = services.length;

  const totalRevenue = services.reduce((total, service) => total + Number(service.cost), 0);
 

  const pendingServices = services.filter(
    (service) => service.status === "در انتظار بررسی",
  ).length;
  const repairingServices = services.filter(
    (service) => service.status === "درحال تعمیر",
  ).length;
  const readyServices = services.filter(
    (service) => service.status === "آماده تحویل",
  ).length;
  const deliveredServices = services.filter(
    (service) => service.status === "تحویل شده",
  ).length;
  const cancelledServices = services.filter(
    (service) => service.status === "لغو شده",
  ).length;

  return (
    <>
      <Header
        title="Mobile Service"
        subtitle="سیستم مدیریت خدمات موبایل"
        user="مدیر سیستم"
      />

      <p>به پنل مدیریت خدمات موبایل خوش آمدید</p>

      <CustomerStats
        totalCustomers={customers.length}
        totalServices={totalServices}
        totalRevenue={totalRevenue}
        repairingServices={repairingServices}
        pendingServices={pendingServices}
        readyServices={readyServices}
        deliveredServices={deliveredServices}
        cancelledServices={cancelledServices}
      />

      <CustomerCounter
        count={customers.length}
        filteredCount={filteredCustomers.length}
      />

      {/* Customer Modal */}

      <button onClick={() => setIsFormOpen(true)}>+ افزودن مشتری</button>

      {(isFormOpen || editingCustomer) && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={closeModal}>
              x
            </button>
            <CustomerForm
              onAddCustomer={addCustomer}
              editingCustomer={editingCustomer}
              onUpdateCustomer={updateCustomer}
              onCancelEdit={cancelEdit}
            />
          </div>
        </div>
      )}

      <CustomerList
        onDeleteCustomer={deleteCustomer}
        onStartEdit={startEditCustomer}
        filteredCustomers={filteredCustomers}
        search={search}
        setSearch={setSearch}
      />

      {/*Service Section */}

      <button
        onClick={() => {
          setEditingService(null);
          setIsServiceFormOpen(true);
        }}
      >
        + افزودن خدمت
      </button>

      {(isServiceFormOpen || editingService) && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-close" onClick={cancelEditeService}>
              x
            </button>
            <ServiceForm
              customers={customers}
              onAddService={addService}
              editingService={editingService}
              onUpdateService={updateService}
              onCancelEdit={cancelEditeService}
            />
          </div>
        </div>
      )}

      {servicesLoading ? (
        <p>در حال دریافت خدمات </p>
      ) : servicesError ? (
        <p>{servicesError}</p>
      ) : (
        <ServiceList
          services={services}
          customers={customers}
          onDeleteService={deleteService}
          onStartEditService={startEditService}
        />
      )}
      {console.log(Number(services.cost))}
    </>
  );
}

export default App;
