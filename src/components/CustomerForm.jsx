import { useState, useEffect } from "react";

export default function CustomerForm({
  onAddCustomer,
  editingCustomer,
  onUpdateCustomer,
  onCancelEdit,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingCustomer) {
      setName(editingCustomer.name);
      setPhone(editingCustomer.phone);
      setCity(editingCustomer.city);
    } else {
      setName("");
      setPhone("");
      setCity("");
    }
  }, [editingCustomer]);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "نام الزامی است";
    }
    if (!phone.trim()) {
      newErrors.phone = "لطفا شماره موبایل را وارد کنید ";
    } else if (!/^09\d{9}$/.test(phone)) {
      newErrors.phone = "شماره موبایل معتبر نیست";
    }

    if (!city.trim()) {
      newErrors.city = " نام شهر الزامی است";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const customer = {
      name,
      phone,
      city,
    };

    if (editingCustomer) {
      onUpdateCustomer(editingCustomer.id, customer);
    } else {
      onAddCustomer(customer);
    }

    setName("");
    setPhone("");
    setCity("");

    setErrors({});
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value.trim()) {
              setErrors((prev) => ({
                ...prev,
                name: "",
              }));
            }
          }}
          placeholder="Enter Your Name"
        />
        {errors.name && <p>{errors.name}</p>}
        <input
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (e.target.value.trim()) {
              setErrors((prev) => ({
                ...prev,
                phone: "",
              }));
            }
          }}
          placeholder="Enter Your phonr"
        />
        {errors.phone && <p>{errors.phone}</p>}
        <input
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            if (e.target.value.trim()) {
              setErrors((prev) => ({
                ...prev,
                city: "",
              }));
            }
          }}
          placeholder="Enter Your city"
        />
        {errors.city && <p>{errors.city}</p>}

        <button type="submit">{editingCustomer ? "Update" : "Add"}</button>

        {editingCustomer && (
            <button type="button" onClick={onCancelEdit}>
              Cancel
            </button>)
          }
      </form>
    </div>
  );
}
