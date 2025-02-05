// Import necessary dependencies
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProgressBar from "./components/ProgressBar";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import "./App.css";

function App() {
  // Initialize form state with empty values
  // This central state management ensures data persistence across steps
  const initialFormData = {
    pickupAddress: "",
    deliveryAddress: "",
    weight: "",
    dimensions: { length: "", width: "", height: "" },
    price: 0,
    cardNumber: "",
    expiry: "",
    cvv: "",
    trackingNumber: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
  };

  // Track current step for progress bar
  const [currentStep, setCurrentStep] = useState(1);

  // Calculate shipping price based on weight and dimensions
  const calculatePrice = () => {
    const basePrice = 10; // Base shipping cost
    const weightPrice = formData.weight * 0.5; // $0.50 per unit of weight
    const dimensionPrice =
      (formData.dimensions.length *
        formData.dimensions.width *
        formData.dimensions.height) /
      1000; // Volume-based pricing
    return basePrice + weightPrice + dimensionPrice;
  };

  return (
    <Router>
      <h1 className="title">Interactive Booking Form</h1>
      <div className="container">
        <ProgressBar currentStep={currentStep} />
        <Routes>
          {/* Step 1: Shipping Details */}
          <Route
            path="/"
            element={
              <Step1
                formData={formData}
                setFormData={setFormData}
                setCurrentStep={setCurrentStep}
                calculatePrice={calculatePrice}
              />
            }
          />
          {/* Step 2: Payment Information */}
          <Route
            path="/step2"
            element={
              <Step2
                formData={formData}
                setFormData={setFormData}
                setCurrentStep={setCurrentStep}
              />
            }
          />
          {/* Step 3: Confirmation */}
          <Route
            path="/step3"
            element={
              <Step3
                formData={formData}
                setCurrentStep={setCurrentStep}
                resetForm={resetForm}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
