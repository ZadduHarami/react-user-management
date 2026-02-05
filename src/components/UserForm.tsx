import { useEffect, useState } from "react";
import { TextField, Button, Paper, CircularProgress } from "@mui/material";
import type { User } from "../types/User";
import { userFields } from "../utils/userFields";

type Props = {
  initialData?: User | null;
  onSubmit: (data: User) => Promise<void>;
  onCancel?: () => void;
};

const UserForm = ({ initialData, onSubmit, onCancel }: Props) => {
  const [formData, setFormData] = useState<User>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setErrors({});
    }
  }, [initialData]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    userFields.forEach((field) => {
      const value = formData[field.name]?.toString().trim() || "";

      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      if (field.type === "email" && value) {
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = "Enter a valid email address";
        }
      }

      if (field.name === "phone" && value) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) {
          newErrors[field.name] = "Phone number must be exactly 10 digits";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({});
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await onSubmit(formData);

      if (!initialData) {
        resetForm();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper style={{ padding: 16, marginBottom: 20 }}>
      <form onSubmit={handleSubmit}>
        {userFields.map((field) => (
          <TextField
            key={field.name}
            label={field.label}
            type={field.type || "text"}
            value={formData[field.name] || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            fullWidth
            required={field.required}
            error={!!errors[field.name]}
            helperText={errors[field.name]}
            margin="normal"
          />
        ))}

        <div style={{ marginTop: 12 }}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={18} color="inherit" /> : null
            }
          >
            {loading ? "Saving..." : "Save"}
          </Button>

          {onCancel && (
            <Button style={{ marginLeft: 8 }} onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Paper>
  );
};

export default UserForm;
