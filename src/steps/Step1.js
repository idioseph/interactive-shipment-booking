import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";

const Step1 = ({ formData, setFormData, setCurrentStep, calculatePrice }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Hey! This sets up our first step and calculates initial pricing
    // We update the price whenever weight or dimensions change - neat, right?
    setCurrentStep(1);
    setFormData((prev) => ({
      ...prev,
      price: calculatePrice(),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.weight, formData.dimensions]);

  // Simple but effective validation - nobody likes missing fields!
  const validate = () => {
    const newErrors = {};
    if (!formData.pickupAddress)
      newErrors.pickupAddress = "Oops! We need a pickup address";
    if (!formData.deliveryAddress)
      newErrors.deliveryAddress = "Don't forget where it's going!";
    if (!formData.weight || formData.weight <= 0)
      newErrors.weight = "Weight should be greater than 0";
    if (!formData.dimensions.length) {
      newErrors.length = "We need length to calculate shipping";
    }
    if (!formData.dimensions.width) {
      newErrors.width = "We need width to calculate shipping";
    }
    if (!formData.dimensions.height) {
      newErrors.height = "We need height to calculate shipping";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) navigate("/step2");
  };

  // Keep our dimension handling clean and tidy
  const handleDimensionChange = (dimension, value) => {
    setFormData((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [dimension]: value,
      },
    }));
  };

  return (
    <div className="step-container">
      <h2>Shipping Details</h2>
      <p className="step-description">
        Let's get your package moving! Fill in the details below.
      </p>

      <form onSubmit={handleSubmit}>
        <Input
          id="pickupAddress"
          label="Pickup Address"
          placeholder="Where should we collect your package?"
          type="text"
          value={formData.pickupAddress}
          onChange={(e) =>
            setFormData({ ...formData, pickupAddress: e.target.value })
          }
          error={errors.pickupAddress}
          setErrors={setErrors}
        />

        <Input
          id="deliveryAddress"
          label="Delivery Address"
          placeholder="Where's it heading?"
          type="text"
          value={formData.deliveryAddress}
          onChange={(e) =>
            setFormData({ ...formData, deliveryAddress: e.target.value })
          }
          error={errors.deliveryAddress}
          setErrors={setErrors}
        />

        <Input
          id="weight"
          type="number"
          label="Weight"
          placeholder="Weight in kg"
          value={formData.weight}
          onChange={(e) =>
            setFormData({
              ...formData,
              weight: parseFloat(e.target.value) || "",
            })
          }
          error={errors.weight}
          min="0.1"
          step="0.1"
          setErrors={setErrors}
        />

        <div className="form-group">
          <label>Package Dimensions (cm)</label>
          <div className="dimensions-grid">
            <Input
              type="number"
              id="length"
              placeholder="Length"
              value={formData.dimensions.length}
              onChange={(e) => handleDimensionChange("length", e.target.value)}
              error={errors.length}
              min="1"
              setErrors={setErrors}
            />
            <Input
              type="number"
              id="width"
              placeholder="Width"
              value={formData.dimensions.width}
              onChange={(e) => handleDimensionChange("width", e.target.value)}
              error={errors.width}
              min="1"
              setErrors={setErrors}
            />
            <Input
              type="number"
              id="height"
              placeholder="Height"
              value={formData.dimensions.height}
              onChange={(e) => handleDimensionChange("height", e.target.value)}
              error={errors.height}
              min="1"
              setErrors={setErrors}
            />
          </div>
        </div>

        {errors.dimensions && (
          <div className="error-message">{errors.dimensions}</div>
        )}

        <div className="price-display">
          Estimated Price: ${formData.price.toFixed(2)}
        </div>

        <div className="button-group">
          <button type="submit" className="primary-button">
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step1;
