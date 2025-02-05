const ProgressBar = ({ currentStep }) => {
  console.log("Current Step:", currentStep)
  return (
    <div className="progress-bar">
      {/* Map through steps 1-3 and highlight active/completed steps */}
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`step ${step <= currentStep ? "active" : ""}`}
        >
          Step {step}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
