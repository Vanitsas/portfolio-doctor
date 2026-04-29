import './SuggestionsList.css';

const SUGGESTIONS = [
  {
    title: 'Compress & convert images to WebP',
    desc: 'Use Squoosh or Sharp to batch-convert images. This alone can cut page weight by 30–60%.',
  },
  {
    title: 'Add proper semantic HTML structure',
    desc: 'Use <main>, <article>, <nav>, <header> tags — improves both SEO crawlability and screen reader UX.',
  },
  {
    title: 'Defer non-critical JavaScript',
    desc: 'Add loading="lazy" to images and defer non-essential scripts to reduce Time to Interactive.',
  },
  {
    title: 'Write unique meta descriptions',
    desc: 'Each page needs a 150–160 char description. This directly improves search click-through rates.',
  },
  {
    title: 'Fix color contrast ratios',
    desc: 'Use a contrast checker (WebAIM) to ensure all text meets WCAG AA standard (4.5:1 for body text).',
  },
];

function SuggestionsList() {
  return (
    <div className="issues-section">
      <div className="section-title">Improvement roadmap</div>
      {SUGGESTIONS.map((s, i) => (
        <div className="sugg-item" key={i}>
          <div className="sugg-num">{i + 1}</div>
          <div className="sugg-body">
            <h4>{s.title}</h4>
            <p>{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SuggestionsList;
