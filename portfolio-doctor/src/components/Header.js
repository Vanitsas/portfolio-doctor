import './Header.css';

function Header() {
  return (
    <div className="header">
      <div className="badge">
        <span className="badge-dot" />
        Portfolio Analyzer
      </div>
      <h1>Your portfolio,<br /><em>diagnosed.</em></h1>
      <p className="subtitle">
        Paste any portfolio URL and get a detailed quality report —
        performance, SEO, accessibility, and mobile readiness.
      </p>
    </div>
  );
}

export default Header;
