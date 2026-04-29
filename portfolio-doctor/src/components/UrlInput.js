import { useState } from 'react';
import './UrlInput.css';

function UrlInput({ url, setUrl, apiKey, onSaveApiKey, onAnalyze, error }) {
  const [keyInput, setKeyInput] = useState(apiKey);
  const [keySaved, setKeySaved] = useState(false);

  const handleSave = () => {
    onSaveApiKey(keyInput);
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  };

  // Enter tuşuna basınca analiz başlasın
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onAnalyze();
  };

  return (
    <div>
      {/* URL input kartı */}
      <div className="input-card">
        <span className="input-label">Portfolio URL</span>
        <div className="input-row">
          <input
            type="text"
            className="url-input"
            placeholder="https://yourportfolio.dev"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="analyze-btn" onClick={onAnalyze}>
            Analyze ↗
          </button>
        </div>
      </div>

      {/* API key bölümü */}
      <div className="api-notice">
        <span className="api-notice-icon">⚡</span>
        <div>
          Powered by <strong>Google PageSpeed Insights API</strong>.
          Get your free key at{' '}
          <a
            href="https://developers.google.com/speed/docs/insights/v5/get-started"
            target="_blank"
            rel="noreferrer"
          >
            Google Cloud Console
          </a>{' '}
          — free and takes 2 minutes.
          <div className="api-key-row">
            <input
              type="password"
              className="api-key-input"
              placeholder="Paste your API key here..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
            />
            <button className="save-key-btn" onClick={handleSave}>
              {keySaved ? 'Saved ✓' : 'Save key'}
            </button>
          </div>
        </div>
      </div>

      {/* Hata mesajı */}
      {error && <div className="error-box">{error}</div>}
    </div>
  );
}

export default UrlInput;
