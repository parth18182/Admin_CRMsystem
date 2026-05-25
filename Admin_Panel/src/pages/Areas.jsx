import axios from "axios";
import { useEffect, useState } from "react";
import AreaForm from "../components/AreaForm";

function Areas() {
  const [cities, setCities] = useState([]);

  const [areas, setAreas] = useState([]);

  const [selectedCity, setSelectedCity] = useState("");

  const [open, setOpen] = useState(false);

  const [editData, setEditData] = useState(null);

  useEffect(() => {
    getCities();
  }, []);

  const getCities = async () => {
    try {
      const res = await axios.get(
        "https://asgcrm-production.up.railway.app/cities",
      );

      setCities(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const getAreas = async (cityId) => {
    try {
      const res = await axios.get(
        `https://asgcrm-production.up.railway.app/cities/${cityId}/areas`,
      );

      setAreas(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const deleteArea = async (id) => {
    try {
      await axios.delete(
        `https://asgcrm-production.up.railway.app/admin/areas/${id}`,
      );

      getAreas(selectedCity);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Areas</h1>

        <button
          onClick={() => {
            setEditData(null);

            setOpen(true);
          }}
          className="
          rounded-xl
          bg-violet-600
          px-6 py-3
          text-white
          hover:bg-violet-700
          "
        >
          + Add Area
        </button>
      </div>

      <select
        value={selectedCity}
        onChange={(e) => {
          setSelectedCity(e.target.value);

          getAreas(e.target.value);
        }}
        className="
        mb-8
        w-72
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {areas?.map((area) => (
          <div
            key={area.id}
            className="
              rounded-3xl
              border border-white/10
              bg-white/5
              p-6
              "
          >
            <h2 className="text-xl font-bold text-white">📍 {area.name}</h2>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => {
                  setEditData(area);

                  setOpen(true);
                }}
                className="
                  flex-1
                  rounded-xl
                  bg-cyan-600
                  py-2
                  text-white
                  cursor-pointer
                  "
              >
                Update
              </button>

              <button
                onClick={() => deleteArea(area.id)}
                className="
                  flex-1
                  rounded-xl
                  bg-red-600
                  py-2
                  text-white
                  cursor-pointer
                  "
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <AreaForm
          setOpen={setOpen}
          editData={editData}
          refresh={() => getAreas(selectedCity)}
        />
      )}
    </div>
  );
}

export default Areas;
