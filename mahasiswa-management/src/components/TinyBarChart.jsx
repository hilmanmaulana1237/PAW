/**
 * TinyBarChart.jsx
 * Mini chart SVG untuk visualisasi distribusi data
 */

export default function TinyBarChart({ data, title }) {
  if (!data || data.length === 0) {
    return (
      <div className="tiny-chart">
        <h3 className="chart-title">{title}</h3>
        <p className="chart-empty">Tidak ada data</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.count));
  const barWidth = 100 / data.length;

  return (
    <div className="tiny-chart">
      <h3 className="chart-title">{title}</h3>
      <svg className="chart-svg" viewBox="0 0 100 60" preserveAspectRatio="none">
        {data.map((item, index) => {
          const height = (item.count / maxValue) * 50;
          const x = index * barWidth;
          const y = 55 - height;
          
          return (
            <g key={index}>
              <rect
                x={x + barWidth * 0.1}
                y={y}
                width={barWidth * 0.8}
                height={height}
                fill="var(--color-primary)"
                opacity="0.8"
              />
              <title>{`${item.label || item.jurusan || item.fakultas || item.semester}: ${item.count}`}</title>
            </g>
          );
        })}
      </svg>
      <div className="chart-labels">
        {data.map((item, idx) => (
          <div key={idx} className="chart-label">
            <span className="label-text">{item.label || item.jurusan || item.fakultas || `Sem ${item.semester}`}</span>
            <span className="label-count">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
