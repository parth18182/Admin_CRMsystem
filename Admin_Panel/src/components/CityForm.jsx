import axios from "axios";
import { useEffect, useState } from "react";

function CityForm({ setOpen, editData, refresh }) {
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setName(editData.name);
    }
  }, [editData]);

  const submit = async () => {
    if (name.length === 0) {
      return alert("City name required");
    }

    try {
      setLoading(true);

      if (editData) {
        await axios.put(
          `https://asgcrm-production.up.railway.app/admin/cities/${editData.id}`,
          {
            name,
          },
        );
      } else {
        await axios.post(
          "https://asgcrm-production.up.railway.app/admin/cities",
          {
            name,
          },
        );
      }

      refresh();

      setName("");

      setOpen(false);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      fixed inset-0
      flex items-center
      justify-center
      bg-black/70
      "
    >
      <div
        className="
        w-full
        max-w-lg
        rounded-3xl
        border border-white/10
        bg-[#161625]
        p-8
        "
      >
        <div className="mb-6 flex justify-between">
          <h1 className="text-2xl font-bold text-white">
            {editData ? "Update City" : "Add City"}
          </h1>

          <button
            onClick={() => setOpen(false)}
            className="
            text-red-400
            text-xl
            cursor-pointer
            "
          >
            ✕
          </button>
        </div>

        <div className="space-y-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="City Name"
            className="
            w-full
            rounded-xl
            border border-white/10
            bg-white/5
            p-4
            text-white
            outline-none
            "
          />

          <button
            disabled={loading}
            onClick={submit}
            className="
            w-full
            rounded-xl
            bg-violet-600
            py-4
            text-white
            hover:bg-violet-700
            disabled:opacity-50
            cursor-pointer
            "
          >
            {loading ? "Saving..." : editData ? "Update City" : "Save City"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CityForm;
