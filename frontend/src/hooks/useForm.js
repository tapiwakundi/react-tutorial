import { useState, useCallback } from "react";

/**
 * Custom hook for managing form state
 * @param {Object} initialValues - Initial form values
 * @returns {Object} Form state and handlers
 */
export const useForm = (initialValues = {}) => {
  const [formData, setFormData] = useState(initialValues);

  // Handle input changes
  const handleChange = useCallback((e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? value : value,
    }));
  }, []);

  // Set form data directly
  const setFieldValue = useCallback((name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // Set multiple fields at once
  const setFields = useCallback((values) => {
    setFormData((prev) => ({
      ...prev,
      ...values,
    }));
  }, []);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setFormData(initialValues);
  }, [initialValues]);

  // Clear form (set all to empty)
  const clearForm = useCallback(() => {
    const emptyValues = Object.keys(formData).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {});
    setFormData(emptyValues);
  }, [formData]);

  return {
    formData,
    handleChange,
    setFieldValue,
    setFields,
    resetForm,
    clearForm,
  };
};
