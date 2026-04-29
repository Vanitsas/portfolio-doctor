import { useEffect, useRef } from 'react';
import './CategoryCards.css';

const CATEGORIES = [
  { key: 'perf', name: 'Performance', icon: '⚡', color: '#7c6aff' },
  { key: 'seo',  name: 'SEO',         icon: '🔍', color: '#22d3a0' },
  { key: 'a11y', name: 'Accessibility', icon: '♿', color: '#f5a623' },
  { key: 'bp',   name: 'Best Practices', icon: '✓', color: '#a78bfa' },
];

function CategoryCards({ results }) {
  const barsRef = useRef([]);

  // Bar animasyonu — component mount olunca çalışır
  useEffect(() => {
    const timeout = setTimeout(() => {
      barsRef.current.forEach((bar, i) => {
        if (bar) bar.style.width = bar.dataset.width;
      });
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="categories">
      {CATEGORIES.map((cat, i) => {
        const score = results[cat.key];
        const color = score >= 70 ? cat.color : '#ff5f5f';
        return (
          <div className="cat-card" key={cat.key}>
            <div className="cat-icon">{cat.icon}</div>
            <div className="cat-name">{cat.name}</div>
            <div className="cat-score" style={{ color }}>{score}</div>
            <div className="cat-bar">
              <div
                className="cat-bar-fill"
                ref={el => barsRef.current[i] = el}
                data-width={`${score}%`}
                style={{ width: '0%', background: color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryCards;
