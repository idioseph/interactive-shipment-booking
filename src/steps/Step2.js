import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Input from "../components/Input";

const Step2 = ({ formData, setFormData, setCurrentStep }) => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [cardType, setCardType] = useState("");

  useEffect(() => {
    setCurrentStep(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add card type detection function
  const detectCardType = (number) => {
    const cleanNumber = number.replace(/\s/g, '');
    if (/^4/.test(cleanNumber)) return "Visa";
    if (/^5[1-5]/.test(cleanNumber)) return "Mastercard";
    if (/^3[47]/.test(cleanNumber)) return "American Express";
    if (/^6(?:011|5)/.test(cleanNumber)) return "Discover";
    return "";
  };

  // Update validate function to check expiry date
  const validate = () => {
    const newErrors = {};
    if (!formData.cardNumber || !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = "16 digits please!";
    }
    if (!formData.expiry || !/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      newErrors.expiry = "MM/YY format - like 12/25";
    } else {
      const [month] = formData.expiry.split('/');
      if (parseInt(month) > 12 || parseInt(month) === 0) {
        newErrors.expiry = "Invalid month";
      }
    }
    if (!formData.cvv || !/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "3 or 4 digits from the back";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const TrackingNumber = generateTrackingNumber();
      setFormData((prevFormData) => ({
        ...prevFormData,
        trackingNumber: TrackingNumber,
      }));
      navigate("/step3");
    }
  };

  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      let month = cleaned.slice(0, 2);
      if (parseInt(month) > 12) month = "12";
      if (parseInt(month) === 0) month = "01";
      return month + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const generateTrackingNumber = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  // Go back to shipping details
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="step-container">
      <h2>Payment Details</h2>
      {cardType && <p className="card-type">{cardType} Card</p>}
      <p className="step-description">
        Almost there! Just need your payment info to secure the booking.
      </p>

      <form onSubmit={handleSubmit}>
        <Input
          id="cardNumber"
          type="text"
          label="Card Number"
          placeholder="1234 5678 9012 3456"
          value={formData.cardNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "").slice(0, 16);
            const formatted = value.replace(/(\d{4})/g, "$1 ").trim();
            setFormData({ ...formData, cardNumber: formatted });
            setCardType(detectCardType(value));
          }}
          error={errors.cardNumber}
          setErrors={setErrors}
        />

        <div style={{ display: "flex", gap: "30px" }}>
          <Input
            id="expiry"
            type="text"
            label="Expiry Date"
            placeholder="MM/YY"
            value={formData.expiry}
            onChange={(e) => {
              const formatted = formatExpiry(e.target.value);
              setFormData({ ...formData, expiry: formatted });
            }}
            error={errors.expiry}
            setErrors={setErrors}
          />

          <Input
            id="cvv"
            type="text"
            label="CVV"
            placeholder="123"
            value={formData.cvv}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 4);
              setFormData({ ...formData, cvv: value });
            }}
            error={errors.cvv}
            setErrors={setErrors}
          />
        </div>

        <div className="price-display">
          Total to Pay: ${formData.price.toFixed(2)}
        </div>

        <div className="button-group">
          <button
            type="button"
            className="secondary-button"
            onClick={handleBack}
          >
            Back to Shipping
          </button>
          <button type="submit" className="primary-button">
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default Step2;
