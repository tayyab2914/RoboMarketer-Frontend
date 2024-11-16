import React, { useState } from "react";
import { Modal, Input, Button, Collapse } from "antd";
import MyIcon from "../Icon/MyIcon";
import ProductForm from "../ProductForm/ProductForm";


const AddProductModal = ({ isVisible, onClose, onAddProduct }) => {
  const [type, setType] = useState("product"); 
  const [newProductName, setNewProductName] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [coreBenefits, setCoreBenefits] = useState(""); 
  const [features, setFeatures] = useState("");
  const [useCase, setUseCase] = useState(""); 
  const [uniqueSellingPoint, setUniqueSellingPoint] = useState(""); 
  const [customerTestimonials, setCustomerTestimonials] = useState("");
  const [pricing, setPricing] = useState(""); 
  const [targetAudienceDescription, setTargetAudienceDescription] = useState("");

  const [ageRange, setAgeRange] = useState("");
  const [gender, setGender] = useState(""); 
  const [educationLevel, setEducationLevel] = useState(""); 
  const [incomeRange, setIncomeRange] = useState(""); 
  const [occupation, setOccupation] = useState("");

  const [primaryInterests, setPrimaryInterests] = useState(""); 
  const [secondaryInterests, setSecondaryInterests] = useState("");

  const [paidPoints, setPaidPoints] = useState(""); 
  const [goals, setGoals] = useState("");
  const [desiredBenefits, setDesiredBenefits] = useState(""); 
  const [emotionalDrivers, setEmotionalDrivers] = useState(""); 
  const [uniqueNeeds, setUniqueNeeds] = useState(""); 

  const handleAdd = () => {
    if (newProductName.trim()) {
      const newProduct = { type, name: newProductName,  description,  coreBenefits,  features,  useCase,  uniqueSellingPoint,  customerTestimonials,  pricing,  targetAudienceDescription, ageRange,  gender,  educationLevel,  incomeRange,  occupation,  primaryInterests,  secondaryInterests,  paidPoints,  goals,  desiredBenefits,  emotionalDrivers,  uniqueNeeds  };
      onAddProduct(newProduct); 
      
      setNewProductName(""); 
      setDescription(""); 
      setCoreBenefits(""); 
      setFeatures("");
      setUseCase(""); 
      setUniqueSellingPoint(""); 
      setCustomerTestimonials(""); 
      setPricing(""); 
      setTargetAudienceDescription("");
      setAgeRange(""); 
      setGender(""); 
      setEducationLevel(""); 
      setIncomeRange(""); 
      setOccupation(""); 
      setPrimaryInterests(""); 
      setSecondaryInterests(""); 
      setPaidPoints(""); 
      setGoals(""); 
      setDesiredBenefits(""); 
      setEmotionalDrivers(""); 
      setUniqueNeeds("");
      setType("product")
      onClose(); 
    }
  };

  return (
    <Modal
      title="Add Product / Service"
      visible={isVisible}
      onCancel={onClose}
      centered
      footer={[
        <div className="modal-actions">
          <span className='btn-1'>
            <Button onClick={onClose} className="cancel-btn">
              <MyIcon type={'cross_red'}/>Cancel
            </Button>
          </span>
          <span className='btn-2'>
            <Button type="primary" onClick={handleAdd} className="create-btn">
              <MyIcon type={'tick'}/>Add Product
            </Button>
          </span>
        </div>
      ]}
    >
      <ProductForm 
        initialValues={{type, newProductName, description, coreBenefits, features, useCase, uniqueSellingPoint,  customerTestimonials, pricing, targetAudienceDescription, ageRange, gender,  educationLevel, incomeRange, occupation, primaryInterests, secondaryInterests,  paidPoints, goals, desiredBenefits, emotionalDrivers, uniqueNeeds }}
        callbacks={{setType, setNewProductName, setDescription, setCoreBenefits, setFeatures, setUseCase,  setUniqueSellingPoint, setCustomerTestimonials, setPricing, setTargetAudienceDescription, setAgeRange, setGender, setEducationLevel, setIncomeRange, setOccupation,  setPrimaryInterests, setSecondaryInterests, setPaidPoints, setGoals, setDesiredBenefits,  setEmotionalDrivers, setUniqueNeeds}}
      />
    </Modal>
  );
};

export default AddProductModal;
