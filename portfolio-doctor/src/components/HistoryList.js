import './HistoryList.css';

function getScoreColor(score) {
  if (score >= 90) return '#22d3a0';
  if (score >= 70) return '#7c6aff';
  if (score >= 50) return '#f5a623';
  return '#ff5f5f';
}

function HistoryList({ history, onReanalyze, onClear, onExport }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="history-section">
      <div className="history-header">
        <div className="section-title">Recent analyses</div>
        <div className="history-actions">
          <button className="export-btn" onClick={onExport}>Export CSV</button>
          <button className="clear-btn" onClick={onClear}>Clear all</button>
        </div>
      </div>

      <div className="history-list">
        {history.map((entry) => (
          <div className="history-item" key={entry.id}>
            <div className="history-score" style={{ color: getScoreColor(entry.overall) }}>
              {entry.overall}
            </div>
            <div className="history-meta">
              <div className="history-url">{entry.url}</div>
              <div className="history-date">
                {entry.date} · {entry.isReal ? 'Real analysis' : 'Demo'}
              </div>
              <div className="history-cats">
                <span>⚡ {entry.perf}</span>
                <span>🔍 {entry.seo}</span>
                <span>♿ {entry.a11y}</span>
                <span>✓ {entry.bp}</span>
              </div>
            </div>
            <button
              className="reanalyze-btn"
              onClick={() => onReanalyze(entry.url)}
              title="Analyze again"
            >
              ↻
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryList;