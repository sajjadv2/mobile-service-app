import { useEffect, useState } from "react";

export default function ServiceForm({
  customers,
  onAddService,
  editingService,
  onUpdateService,
  onCancelEdit,
}) {
  const [customerId, setCustomerId] = useState("");
  const [device, setDevice] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [status, setStatus] = useState("");
  const [cost, setCost] = useState("");

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingService) {
      setCustomerId(String(editingService.customerId));
      setDevice(editingService.device);
      setServiceType(editingService.serviceType);
      setStatus(editingService.status);
      setCost(String(editingService.cost));
      setErrors({});
    } else {
      setCustomerId("");
      setDevice("");
      setServiceType("");
      setStatus("");
      setCost("");
      setErrors({});
    }
  }, [editingService]);

  const validateForm = () => {
    const newErrors = {};
    if (!customerId) {
      newErrors.customerId = "اطفا مشتری را انتخاب کنید";
    }

    if (!device.trim()) {
      newErrors.device = "لطفا مدل گوشی را انتخاب کنید";
    }
    if (!serviceType) {
      newErrors.serviceType = "لطفا نوع خدمت را انتخاب کنید";
    }
    if (!status) {
      newErrors.status = "لطفا وضعیت تعمیر را مشخص کنید";
    }
    if (!cost) {
      newErrors.cost = "لطفاهزینه را وارد کنید";
    } else if (Number(cost) < 0) {
      newErrors.cost = "هزینه نمی تواند منفی باشد";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validatioErrors = validateForm();
    if (Object.keys(validatioErrors).length > 0) {
      setErrors(validatioErrors);
      return;
    }

    const service = {
      customerId: Number(customerId),
      device: device.trim(),
      serviceType,
      status,
      cost: Number(cost),
    };

    if (editingService) {
      onUpdateService(editingService.id, service);
    } else {
      onAddService(service);
    }
  };

  return (
    <div>
      <h2>{editingService ? "ویرایش خدمت " : "ثبت خدمت جدید"}</h2>

      <form onSubmit={handleSubmit}>
        {/*------Customer------*/}
        <select
          value={customerId}
          onChange={(e) => {
            setCustomerId(e.target.value);
            if (e.target.value) {
              setErrors((prev) => ({
                ...prev,
                customerId: "",
              }));
            }
          }}
        >
          <option value="">انتخاب مشتری</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
        {errors.customerId && <p>{errors.customerId}</p>}

        {/*---------Device---------- */}
        <input
          type="text"
          value={device}
          onChange={(e) => {
            setDevice(e.target.value);
            if (e.target.value.trim()) {
              setErrors((prev) => ({
                ...prev,
                device: "",
              }));
            }
          }}
          placeholder="مدل دستگاه"
        />
        {errors.device && <p>{errors.device}</p>}

        {/*--------- Service Type ------- */}
        <select
          value={serviceType}
          onChange={(e) => {
            setServiceType(e.target.value);
            if (e.target.value) {
              setErrors((prev) => ({
                ...prev,
                serviceType: "",
              }));
            }
          }}
        >
          <option value="">انتخاب نوع خدمت </option>
          <option value="تعویض باتری">تعویض باتری</option>
          <option value="تعویض صفحه">تعویض صفحه</option>
          <option value="فلش">فلش</option>
          <option value="رفع مشکل نرم افزاری">رفع مشکل نرم افزاری</option>
          <option value="تعمیر سخت افزاری">تعمیر سخت افزاری</option>
        </select>
        {errors.serviceType && <p>{errors.serviceType}</p>}

        {/*----------Status----------- */}

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            if (e.target.value) {
              setErrors((prev) => ({
                ...prev,
                status: "",
              }));
            }
          }}
        >
          <option value="">وضعیت تعمیر</option>
          <option value="در انتظار بررسی">در انتظار بررسی</option>
          <option value="درحال تعمیر">درحال تعمیر</option>
          <option value="آماده تحویل">آماده تحویل</option>
          <option value="تحویل شده">تحویل شده</option>
          <option value="لغو شده">لغو شده</option>
        </select>
        {errors.status && <p>{errors.status}</p>}

        {/*-------cost------- */}
        <input
          type="number"
          value={cost}
          onChange={(e) => {
            setCost(e.target.value);
            if (e.target.value && Number(e.target.value) >= 0) {
              setErrors((prev) => ({
                ...prev,
                cost: "",
              }));
            }
          }}
          placeholder="هزینه تعمیر"
        />
        {errors.cost && <p>{errors.cost}</p>}

        {/*-------Buttons-------- */}
        <button type="submit">
          {editingService ? "ویرایش خدمت" : "ثبت خدمت"}
        </button>
        {editingService && (
          <button type="button" onClick={onCancelEdit}>
            انصراف
          </button>
        )}
      </form>
    </div>
  );
}
