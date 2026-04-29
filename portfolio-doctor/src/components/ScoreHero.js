import { useEffect, useState } from 'react';
import './ScoreHero.css';

// Skora göre renk döndüren yardımcı fonksiyon
function getScoreColor(score) {
  if (score >= 90) return '#22d3a0';
  if (score >= 70) return '#7c6aff';
  if (score >= 50) return '#f5a623';
  return '#ff5f5f';
}

function getGrade(score) {
  if (score >= 90) return { label: 'Excellent', style: 'grade-excellent' };
  if (score >= 70) return { label: 'Good',      style: 'grade-good' };
  if (score >= 50) return { label: 'Needs work', style: 'grade-warn' };
  return { label: 'Critical', style: 'grade-critical' };
}

function ScoreHero({ results }) {
  const [displayScore, setDisplayScore] = useState(0);
  const [arcOffset, setArcOffset] = useState(289);

  const color = getScoreColor(results.overall);
  const grade = getGrade(results.overall);
  const circumference = 289;

  // Sayı animasyonu
  useEffect(() => {
    let n = 0;
    const timer = setInterval(() => {
      n = Math.min(n + 3, results.overall);
      setDisplayScore(n);
      if (n >= results.overall) clearInterval(timer);
    }, 20);

    // Arc animasyonu
    setTimeout(() => {
      setArcOffset(circumference - (results.overall / 100) * circumference);
    }, 50);

    return () => clearInterval(timer);
  }, [results.overall]);

  return (
    <div className="score-hero">
      {/* SVG ring */}
      <div className="score-ring-wrap">
        <svg width="110" height="110" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r="46" fill="none" stroke="#ffffff10" strokeWidth="8" />
          <circle
            cx="55" cy="55" r="46"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={arcOffset}
            transform="rotate(-90 55 55)"
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)' }}
          />
        </svg>
        <div className="score-number">
          <span className="score-num" style={{ color }}>{displayScore}</span>
          <span className="score-label">/100</span>
        </div>
      </div>

      {/* Metin kısmı */}
      <div className="score-meta">
        <div className={`score-grade ${grade.style}`}>{grade.label}</div>
        <h2>{results.isReal ? 'Real analysis complete' : 'Demo report (no API key)'}</h2>
        <p>
          {results.isReal
            ? `Analyzed via Google PageSpeed Insights. ${results.issues.length} issues found.`
            : 'Add your free Google PSI API key for a real analysis. This is a simulated report.'}
        </p>
      </div>
    </div>
  );
}

export default ScoreHero;
