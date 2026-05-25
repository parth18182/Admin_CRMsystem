import axios from "axios";
import { useEffect, useState } from "react";

function AreaForm({ setOpen, editData, refresh }) {
  const [cities, setCities] = useState([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    city_id: "",
  });

  useEffect(() => {
    getCities();
  }, []);

  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name,

        city_id: editData.city_id,
      });
    }
  }, [editData]);

  const getCities = async () => {
    try {
      const res = await axios.get(
        "https://asgcrm-production.up.railway.app/cities",
      );

      setCities(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    if (!form.name || !form.city_id) {
      return alert("All fields required");
    }

    try {
      setLoading(true);

      if (editData) {
        await axios.put(
          `https://asgcrm-production.up.railway.app/admin/areas/${editData.id}`,
          {
            name: form.name,

            city_id: Number(form.city_id),
          },
        );
      } else {
        await axios.post(
          "https://asgcrm-production.up.railway.app/admin/areas",
          {
            name: form.name,

            city_id: Number(form.city_id),
          },
        );
      }

      refresh();

      setOpen(false);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
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
            {editData ? "Update Area" : "Add Area"}
          </h1>

          <button onClick={() => setOpen(false)} className="text-red-400 cursor-pointer">
            ✕
          </button>
        </div>

        <div className="space-y-5">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Area Name"
            className="
            w-full
            rounded-xl
            border border-white/10
            bg-white/5
            p-4
            text-white
            "
          />

          <select
            name="city_id"
            value={form.city_id}
            onChange={handleChange}
            className="
            w-full
            rounded-xl
            border border-white/10
            bg-white/5
            p-4
            text-white
            "
          >
            <option value="" className="bg-[#161625]">
              Select City
            </option>

            {cities.map((city) => (
              <option key={city.id} value={city.id} className="bg-[#161625]">
                {city.name}
              </option>
            ))}
          </select>

          <button
            disabled={loading}
            onClick={submit}
            className="
            w-full
            rounded-xl
            bg-violet-600
            cursor-pointer
            py-4
            text-white
            "
          >
            {loading ? "Saving..." : editData ? "Update Area" : "Save Area"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AreaForm;
