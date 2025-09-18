import { useState, type ChangeEvent } from "react";

export const useGetValues = <T extends Record<string, any>>(
  initialState: T
) => {
  const [formData, setFormData] = useState<T>(initialState);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { formData, handleChange, setFormData };
};
