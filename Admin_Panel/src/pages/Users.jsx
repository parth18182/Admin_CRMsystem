import axios from "axios";
import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";

function Users() {

  const [users, setUsers] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  useEffect(() => {
    getUsers();
  }, [open]);

  const getUsers =
    async () => {

      try {

        const res =
          await axios.get(
            "https://asgcrm-production.up.railway.app/users"
          );

        setUsers(
          res.data
        );

      } catch (error) {

        console.log(
          error
        );

      }
    };

  return (
    <div>

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold text-white">
          Users
        </h1>

        <button
          onClick={() =>
            setOpen(true)
          }
          className="
          cursor-pointer
          rounded-xl
          bg-violet-600
          px-6 py-3
          text-white
          "
        >
          + Add User
        </button>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {users?.map(
          (user) => (

            <div
              key={user.id}
              className="
              rounded-3xl
              border border-white/10
              bg-white/5
              p-6
              "
            >
              <h2 className="text-xl font-bold text-white">
                {user.name}
              </h2>

              <p className="mt-3 text-white/60">
                📧 {user.email}
              </p>
            </div>

          )
        )}

      </div>

      {open && (
        <UserForm
          setOpen={setOpen}
        />
      )}

    </div>
  );
}

export default Users;