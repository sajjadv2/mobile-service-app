import "../style/dashboard.css";
export default function CustomerStats({
  totalCustomers,
  totalServices,
  totalRevenue,
  repairingServices,
  pendingServices,
  readyServices,
  deliveredServices,
  cancelledServices,
}) {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>👥مشتریان</h3>
        <p>{totalCustomers}</p>
      </div>

      <div className="stat-card">
        <h3>🔧خدمات</h3>
        <p>{totalServices}</p>
      </div>

      <div className="stat-card">
        <h3>💰 درآمد</h3>
        <p>{totalRevenue}</p>
      </div>
      <div className="stat-card">
        <h3>🔍 در انتظار بررسی</h3>
        <p>{pendingServices}</p>
      </div>

      <div className="stat-card">
        <h3>🔧 در حال تعمیر</h3>
        <p>{repairingServices}</p>
      </div>

      <div className="stat-card">
        <h3>📦 آماده تحویل</h3>
        <p>{readyServices}</p>
      </div>

      <div className="stat-card">
        <h3>✅ تحویل شده</h3>
        <p>{deliveredServices}</p>
      </div>

      <div className="stat-card">
        <h3>❌ لغو شده</h3>
        <p>{cancelledServices}</p>
      </div>
    </div>
  );
}
