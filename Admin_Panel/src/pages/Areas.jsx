import axios from "axios";
import { useEffect, useState } from "react";
import AreaForm from "../components/AreaForm";

function Areas() {
  const [cities, setCities] = useState([]);

  const [selectedCity, setSelectedCity] = useState("");

  const [areas, setAreas] = useState([]);

  const [open, setOpen] = useState(false);

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
      console.log(error);
    }
  };

  const getAreas = async (cityId) => {
    try {
      const res = await axios.get(
        `https://asgcrm-production.up.railway.app/cities/${cityId}/areas`,
      );

      setAreas(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Areas</h1>

        <button
          onClick={() => setOpen(true)}
          className="
          rounded-xl
          bg-violet-600
          px-6 py-3
          text-white
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
          </div>
        ))}
      </div>

      {open && <AreaForm setOpen={setOpen} />}
    </div>
  );
}

export default Areas;
