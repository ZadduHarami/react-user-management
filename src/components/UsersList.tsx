import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { deleteUser, updateUser } from "../api/user";
import type { User } from "../types/User";
import UserForm from "./UserForm";
import { userFields } from "../utils/userFields";

type Props = {
  users: User[];
  loading: boolean;
  refreshUsers: () => void;
  showMessage: (message: string, severity?: "success" | "error") => void;
};

const UsersList = ({ users, loading, refreshUsers, showMessage }: Props) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDeleteConfirm = async () => {
    if (!selectedUser?.id) return;

    try {
      await deleteUser(selectedUser.id);
      refreshUsers();
      showMessage("User deleted successfully");
    } catch {
      showMessage("Failed to delete user", "error");
    } finally {
      setDeleteOpen(false);
      setSelectedUser(null);
    }
  };

  const handleUpdateUser = async (data: User) => {
    if (!data.id) return;

    try {
      await updateUser(data.id, data);
      refreshUsers();
      showMessage("User updated successfully");
    } catch {
      showMessage("Failed to update user", "error");
    } finally {
      setEditOpen(false);
      setSelectedUser(null);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <Paper style={{ marginTop: 20, overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {userFields.map((field) => (
                <TableCell key={field.name}>{field.label}</TableCell>
              ))}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={userFields.length + 1} align="center">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={String(user.id)}>
                  {userFields.map((field) => (
                    <TableCell
                      key={field.name}
                      style={{
                        maxWidth: 180,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                      title={String(user[field.name] ?? "")}
                    >
                      {user[field.name] ?? "-"}
                    </TableCell>
                  ))}

                  <TableCell align="right">
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        justifyContent: "flex-end",
                        flexWrap: "wrap",
                      }}
                    >
                      <Button
                        size="small"
                        onClick={() => {
                          setSelectedUser(user);
                          setEditOpen(true);
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        color="error"
                        size="small"
                        onClick={() => {
                          setSelectedUser(user);
                          setDeleteOpen(true);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>

      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <UserForm
            initialData={selectedUser}
            onSubmit={handleUpdateUser}
            onCancel={() => setEditOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UsersList;
