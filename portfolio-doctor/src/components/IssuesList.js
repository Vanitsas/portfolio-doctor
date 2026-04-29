import './IssuesList.css';

const SEV_CLASS = { high: 'sev-high', med: 'sev-med', low: 'sev-low' };
const TAG_CLASS  = { perf: 'tag-perf', seo: 'tag-seo', a11y: 'tag-a11y', mobile: 'tag-mobile' };
const TAG_LABEL  = { perf: 'Performance', seo: 'SEO', a11y: 'Accessibility', mobile: 'Mobile' };

function IssuesList({ issues }) {
  if (!issues || issues.length === 0) {
    return (
      <div className="issues-section">
        <div className="section-title">Issues found</div>
        <p style={{ color: 'var(--green)', fontSize: 14 }}>No major issues detected! 🎉</p>
      </div>
    );
  }

  return (
    <div className="issues-section">
      <div className="section-title">Issues found</div>
      {issues.map((issue, i) => (
        <div className="issue-item" key={i}>
          <div className={`issue-severity ${SEV_CLASS[issue.severity]}`} />
          <div className="issue-body">
            <h4>{issue.title}</h4>
            <p>{issue.desc}</p>
            <span className={`issue-tag ${TAG_CLASS[issue.cat]}`}>
              {TAG_LABEL[issue.cat]}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default IssuesList;
