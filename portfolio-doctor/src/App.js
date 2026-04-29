import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import UrlInput from './components/UrlInput';
import LoadingState from './components/LoadingState';
import ScoreHero from './components/ScoreHero';
import CategoryCards from './components/CategoryCards';
import IssuesList from './components/IssuesList';
import SuggestionsList from './components/SuggestionsList';

function App() {
  // State'ler - uygulamanın hafızası
  const [url, setUrl] = useState('');           // kullanıcının girdiği URL
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('psi_api_key') || '');
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [results, setResults] = useState(null); // analiz sonuçları
  const [error, setError] = useState('');       // hata mesajı
  const [loadingStep, setLoadingStep] = useState(0); // loading animasyonu için

  // API key kaydet
  const handleSaveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('psi_api_key', key);
  };

  // Mock veri üretici (API key yokken)
  const generateMockData = (inputUrl) => {
    const seed = inputUrl.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const r = (min, max) => min + ((seed * 7 + 17) % (max - min + 1));
    const perf = r(42, 88);
    const seo = r(55, 95);
    const a11y = r(48, 92);
    const bp = r(60, 95);
    const overall = Math.round((perf + seo + a11y + bp) / 4);

    return {
      overall, perf, seo, a11y, bp,
      isReal: false,
      issues: [
        { title: 'Render-blocking resources detected', desc: 'Multiple CSS and JS files are blocking the initial render of your page', severity: 'high', cat: 'perf' },
        { title: 'Images not in next-gen format', desc: 'Serving WebP or AVIF instead of PNG/JPEG can reduce image transfer size significantly', severity: 'high', cat: 'perf' },
        { title: 'Missing meta description', desc: 'Add a unique meta description to improve click-through rates from search engines', severity: 'med', cat: 'seo' },
        { title: 'Links lack descriptive text', desc: '"Click here" links don\'t describe their destination to screen readers', severity: 'med', cat: 'a11y' },
        { title: 'Color contrast too low', desc: 'Some text elements don\'t meet WCAG AA contrast ratio requirements', severity: 'med', cat: 'a11y' },
        { title: 'Tap targets too small', desc: 'Some buttons and links are too small for comfortable mobile tapping', severity: 'low', cat: 'mobile' },
        { title: 'No structured data found', desc: 'Adding JSON-LD schema markup helps search engines understand your content', severity: 'low', cat: 'seo' },
      ]
    };
  };

  // Gerçek API çağrısı
  const fetchPSI = async (inputUrl) => {
    const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(inputUrl)}&strategy=mobile&key=${apiKey}&category=performance&category=seo&category=accessibility&category=best-practices`;
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const d = await res.json();

    const cats = d.lighthouseResult?.categories || {};
    const audits = d.lighthouseResult?.audits || {};

    const perf = Math.round((cats.performance?.score || 0) * 100);
    const seo = Math.round((cats.seo?.score || 0) * 100);
    const a11y = Math.round((cats.accessibility?.score || 0) * 100);
    const bp = Math.round((cats['best-practices']?.score || 0) * 100);
    const overall = Math.round((perf + seo + a11y + bp) / 4);

    const issues = Object.values(audits)
      .filter(a => a.score !== null && a.score < 0.9 && a.details)
      .slice(0, 8)
      .map(a => {
        const cat = a.id.includes('seo') || a.id.includes('meta') ? 'seo'
          : a.id.includes('color') || a.id.includes('aria') ? 'a11y'
          : a.id.includes('viewport') || a.id.includes('tap') ? 'mobile'
          : 'perf';
        return {
          title: a.title,
          desc: a.description?.split('.')[0] || '',
          severity: a.score < 0.5 ? 'high' : a.score < 0.8 ? 'med' : 'low',
          cat
        };
      });

    return { overall, perf, seo, a11y, bp, isReal: true, issues };
  };

  // Ana analiz fonksiyonu
  const handleAnalyze = async () => {
    if (!url) return;

    let cleanUrl = url;
    if (!cleanUrl.startsWith('http')) cleanUrl = 'https://' + cleanUrl;

    setStatus('loading');
    setResults(null);
    setError('');
    setLoadingStep(0);

    // Loading adımlarını simüle et
    const stepInterval = setInterval(() => {
      setLoadingStep(prev => {
        if (prev < 3) return prev + 1;
        clearInterval(stepInterval);
        return prev;
      });
    }, 800);

    try {
      let data;
      if (apiKey) {
        data = await fetchPSI(cleanUrl);
      } else {
        await new Promise(r => setTimeout(r, 3200)); // mock için bekleme
        data = generateMockData(cleanUrl);
      }
      clearInterval(stepInterval);
      setResults({ ...data, url: cleanUrl });
      setStatus('done');
    } catch (err) {
      clearInterval(stepInterval);
      setError(err.message || 'Analysis failed. Check your URL or API key.');
      setStatus('error');
    }
  };

  // Sıfırla
  const handleReset = () => {
    setStatus('idle');
    setResults(null);
    setError('');
    setUrl('');
    setLoadingStep(0);
  };

  return (
    <div className="app">
      <div className="glow" />

      <div className="wrapper">
        <Header />

        {/* idle veya error durumunda input göster */}
        {(status === 'idle' || status === 'error') && (
          <UrlInput
            url={url}
            setUrl={setUrl}
            apiKey={apiKey}
            onSaveApiKey={handleSaveApiKey}
            onAnalyze={handleAnalyze}
            error={error}
          />
        )}

        {/* Loading durumu */}
        {status === 'loading' && (
          <LoadingState currentStep={loadingStep} />
        )}

        {/* Sonuçlar */}
        {status === 'done' && results && (
          <div className="results">
            <ScoreHero results={results} />
            <CategoryCards results={results} />
            <IssuesList issues={results.issues} />
            <SuggestionsList />
            <div className="report-footer">
              <span className="report-url">{results.url}</span>
              <span className="report-time">{new Date().toLocaleTimeString()}</span>
              <button className="new-analysis-btn" onClick={handleReset}>
                New analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
