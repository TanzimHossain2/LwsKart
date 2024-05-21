import RoleGate from "@/components/auth/role-gate";
import { currentRole } from "@/lib/authUser";

const AdminPage =async () => {
  const role =await currentRole();

  if (role !== "admin") {
    return <div>
      <h1>🔑 Admin Page</h1>
      <p>Role: {role}</p>
      <p>You do not have permission to view this content</p>
      <RoleGate allowedRole="admin">
        <p>Admin content</p>

      </RoleGate>
    </div>;
  }


  return <div>
    <h1>🔑 Admin Page</h1>
    <p>Role: {role}</p>
    <RoleGate allowedRole="admin">
        <p>Admin content</p>

      </RoleGate>
      </div>;
};

export default AdminPage;
