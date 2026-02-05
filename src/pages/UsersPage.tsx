import { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import UserForm from "../components/UserForm";
import { createUser, getUsers } from "../api/user";
import type { User } from "../types/User";
import AppMessageBox from "../components/AppMessageBox";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const showMessage = (
    message: string,
    severity: "success" | "error" = "success",
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
    } catch {
      showMessage("Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (data: User) => {
    try {
      const newUser = await createUser(data);
      setUsers((prev) => [...prev, newUser]);
      showMessage("User added successfully");
    } catch {
      showMessage("Failed to add user", "error");
    }
  };

  return (
    <div>
      <h3>Users</h3>

      <UserForm onSubmit={handleCreateUser} />

      <UsersList
        users={users}
        loading={loading}
        refreshUsers={fetchUsers}
        showMessage={showMessage}
      />

      <AppMessageBox
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      />
    </div>
  );
};

export default UsersPage;
