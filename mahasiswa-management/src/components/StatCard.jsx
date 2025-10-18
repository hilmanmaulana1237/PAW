/**
 * StatCard.jsx
 * Kartu statistik untuk dashboard
 */

export default function StatCard({ title, value, icon, subtitle, onClick }) {
  const CardWrapper = onClick ? 'button' : 'div';
  const extraProps = onClick ? { onClick, className: 'stat-card clickable' } : { className: 'stat-card' };
  
  return (
    <CardWrapper {...extraProps}>
      <div className="stat-card-header">
        <span className="stat-icon">{icon}</span>
        <h3 className="stat-title">{title}</h3>
      </div>
      <div className="stat-value">{value}</div>
      {subtitle && <div className="stat-subtitle">{subtitle}</div>}
    </CardWrapper>
  );
}
