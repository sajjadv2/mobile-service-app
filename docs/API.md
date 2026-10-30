# API Documentation

# مستندات API سیستم مدیریت خدمات موبایل

**Base URL:**
`http://localhost:5000/api`

---

## 1. Customer APIs | API مشتریان

### 1.1 Get All Customers

دریافت فهرست تمام مشتریان.

- **Method:** GET
- **Endpoint:** `/customers`

**Success Response:** `200 OK`

```json
[
  {
    "id": 1,
    "name": "Ali Ahmadi",
    "phone": "09123456789",
    "city": "Tehran"
  }
]
```

### 1.2 Get Customer By ID

دریافت اطلاعات یک مشتری با شناسه مشخص.

- **Method:** GET
- **Endpoint:** `/customers/:id`

**Success Response:** `200 OK`

**Error Responses:**

- `400 Bad Request` – Invalid customer ID
- `404 Not Found` – Customer not found

### 1.3 Create Customer

ثبت مشتری جدید.

- **Method:** POST
- **Endpoint:** `/customers`

**Request Body:**

```json
{
  "name": "Ali Ahmadi",
  "phone": "09123456789",
  "city": "Tehran"
}
```

**Success Response:** `201 Created`

**Error Responses:**

- `400 Bad Request` – Validation failed

### 1.4 Update Customer

ویرایش اطلاعات مشتری.

- **Method:** PUT
- **Endpoint:** `/customers/:id`

**Request Body:**

```json
{
  "name": "Ali Ahmadi",
  "phone": "09123456789",
  "city": "Tehran"
}
```

**Success Response:** `200 OK`

**Error Responses:**

- `400 Bad Request` – Invalid ID or validation failed
- `404 Not Found` – Customer not found

### 1.5 Delete Customer

حذف مشتری.

- **Method:** DELETE
- **Endpoint:** `/customers/:id`

**Success Response:** `200 OK`

**Error Responses:**

- `400 Bad Request` – Invalid customer ID
- `404 Not Found` – Customer not found
- `409 Conflict` – Customer has registered services

---

## 2. Customer Data Validation | اعتبارسنجی مشتری

- `name`: Required, non-empty string
- `phone`: Must match `09XXXXXXXXX`
- `city`: Required, non-empty string

---

## 3. Service APIs | API خدمات

### 3.1 Get All Services

دریافت تمام خدمات ثبت‌شده به همراه اطلاعات مشتری مرتبط.

- **Method:** GET
- **Endpoint:** `/services`

**Success Response:** `200 OK`

```json
[
  {
    "id": 1,
    "customerId": 1,
    "device": "Samsung A52",
    "serviceType": "تعویض باتری",
    "status": "در حال تعمیر",
    "cost": 1500000,
    "customer": {
      "id": 1,
      "name": "Ali Ahmadi",
      "phone": "09123456789",
      "city": "Tehran"
    }
  }
]
```

### 3.2 Get Service By ID

دریافت اطلاعات یک خدمت با شناسه مشخص.

- **Method:** GET
- **Endpoint:** `/services/:id`

**Success Response:** `200 OK`

**Error Responses:**

- `400 Bad Request` – Invalid service ID
- `404 Not Found` – Service not found

### 3.3 Create Service

ثبت خدمت جدید برای یک مشتری.

- **Method:** POST
- **Endpoint:** `/services`

**Request Body:**

```json
{
  "customerId": 1,
  "device": "Samsung A52",
  "serviceType": "تعویض باتری",
  "status": "در حال تعمیر",
  "cost": 1500000
}
```

**Success Response:** `201 Created`

**Error Responses:**

- `400 Bad Request` – Validation failed
- `404 Not Found` – Customer not found

### 3.4 Update Service

ویرایش اطلاعات یک خدمت.

- **Method:** PUT
- **Endpoint:** `/services/:id`

**Request Body:**

```json
{
  "customerId": 1,
  "device": "Samsung A52",
  "serviceType": "تعویض باتری",
  "status": "آماده تحویل",
  "cost": 1500000
}
```

**Success Response:** `200 OK`

**Error Responses:**

- `400 Bad Request` – Invalid ID or validation failed
- `404 Not Found` – Service or customer not found

### 3.5 Delete Service

حذف یک خدمت.

- **Method:** DELETE
- **Endpoint:** `/services/:id`

**Success Response:** `200 OK`

**Error Responses:**

- `400 Bad Request` – Invalid service ID
- `404 Not Found` – Service not found

---

## 4. Service Data Validation | اعتبارسنجی خدمات

| Field       | Validation                 |
| ----------- | -------------------------- |
| customerId  | Positive integer           |
| device      | Required, non-empty string |
| serviceType | Required, non-empty string |
| status      | Required, non-empty string |
| cost        | Non-negative integer       |

---

## 5. Health Check APIs | بررسی وضعیت سرور

### Health Check

- **Method:** GET
- **Endpoint:** `/health`
- **Full URL:** `http://localhost:5000/api/health`

### Database Connection Test

- **Method:** GET
- **Endpoint:** `/db-test`
- **Full URL:** `http://localhost:5000/api/db-test/`
