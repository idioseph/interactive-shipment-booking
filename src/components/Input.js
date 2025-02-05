// Custom Input component

const Input = ({
  label,
  type,
  value,
  onChange,
  error,
  style,
  id,
  placeholder,
  min,
  step,
  setErrors,
}) => {
  const resetError = () => {
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  return (
    <div className="form-group" style={{ ...style }}>
      <label htmlFor={label}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onInput={resetError}
        placeholder={placeholder}
        className={error ? "error" : ""}
        min={min}
        step={step}
        style={{ padding: "10px", width: "100%" }}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Input;
