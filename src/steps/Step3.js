import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Step3 = ({ formData, setCurrentStep, resetForm }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentStep(3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reset = () => {
    resetForm();
    navigate("/");
  };

  const handleCopy = () => {
    console.log("Copying tracking number");
    navigator.clipboard
      .writeText(formData.trackingNumber)
      .then(() => {
        alert(
          ` Tracking number ${formData.trackingNumber} copied to clipboard`
        );
      })
      .catch(() => {
        alert("Error copying tracking number to clipboard");
      });
  };

  return (
    <div className="confirmation">
      <h2>🎉 Booking Confirmed!</h2>
      <p>Thank you for your booking. Your shipment is being processed.</p>

      <div className="price-display">
        Total Paid: ${formData.price.toFixed(2)}
      </div>

      <div className="tracking-number">
        Tracking Number: {formData.trackingNumber}
        <button onClick={handleCopy}>
          <img src={"/copy.png"} alt="copy" />
        </button>
      </div>

      <p>
        You will receive a confirmation email shortly with your tracking
        details.
      </p>

      <p>
        Shipping from: {formData.pickupAddress}
        <br />
        To: {formData.deliveryAddress}
      </p>

      <div className="button-group" style={{ marginTop: "20px" }}>
        <button type="submit" className="primary-button" onClick={reset}>
          Book another shipment
        </button>
      </div>
    </div>
  );
};

export default Step3;
