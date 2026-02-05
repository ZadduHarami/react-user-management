export type UserField = {
  name: "firstName" | "lastName" | "phone" | "email" | "address" | "dob";
  label: string;
  type?: string;
  required?: boolean;
};

export const userFields: UserField[] = [
  { name: "firstName", label: "First Name", required: true },
  { name: "lastName", label: "Last Name", required: true },
  { name: "phone", label: "Phone Number", type: "number", required: true },
  { name: "email", label: "Email", type: "email", required: true },
];
