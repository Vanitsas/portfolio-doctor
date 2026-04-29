import './LoadingState.css';

const STEPS = [
  'Fetching performance data',
  'Checking SEO signals',
  'Testing accessibility',
  'Generating report',
];

function LoadingState({ currentStep }) {
  return (
    <div className="loading">
      <div className="loading-spinner" />
      <div className="loading-text">Analyzing your portfolio...</div>
      <div className="loading-steps">
        {STEPS.map((step, i) => {
          const isDone = i < currentStep;
          const isActive = i === currentStep;
          return (
            <div
              key={i}
              className={`loading-step ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}
            >
              <span className="step-icon">{isDone ? '✓' : i + 1}</span>
              {step}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LoadingState;
