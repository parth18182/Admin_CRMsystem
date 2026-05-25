import axios from "axios";
import { useState } from "react";

function UserForm({ setOpen }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");

      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://asgcrm-production.up.railway.app/admin/users",
        {
          name: form.name,
          email: form.email,
          password: form.password,
        },
      );

      console.log("Success:", res.data);

      setForm({
        name: "",
        email: "",
        password: "",
      });

      setOpen(false);
    } catch (error) {
      console.log("API Error:", error.response?.data);

      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      fixed inset-0
      flex items-center justify-center
      bg-black/70
      "
    >
      <div
        className="
        w-full max-w-lg
        rounded-3xl
        border border-white/10
        bg-[#161625]
        p-8
        "
      >
        <div className="mb-6 flex justify-between">
          <h1 className="text-2xl font-bold text-white">Add User</h1>

          <button onClick={() => setOpen(false)} className="text-red-400 cursor-pointer">
            ✕
          </button>
        </div>

        <div className="space-y-5">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="
            w-full
            rounded-xl
            border border-white/10
            bg-white/5
            p-4
            text-white
            "
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="
            w-full
            rounded-xl
            border border-white/10
            bg-white/5
            p-4
            text-white
            "
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="
            w-full
            rounded-xl
            border border-white/10
            bg-white/5
            p-4
            text-white
            "
          />

          <button
            onClick={submit}
            disabled={loading}
            className="
            w-full
            rounded-xl
            bg-violet-600
            py-4
            text-white
            cursor-pointer
            hover:bg-violet-700
            disabled:opacity-50
            "
          >
            {loading ? "Saving..." : "Save User"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
