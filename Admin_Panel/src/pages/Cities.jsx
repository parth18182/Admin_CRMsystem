import axios from "axios";
import { useEffect, useState } from "react";
import CityForm from "../components/CityForm";

function Cities() {
  const [cities, setCities] = useState([]);

  const [open, setOpen] = useState(false);

  const [editData, setEditData] = useState(null);

  useEffect(() => {
    getCities();
  }, [open]);

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

  const deleteCity = async (id) => {
    try {
      await axios.delete(
        `https://asgcrm-production.up.railway.app/admin/cities/${id}`,
      );

      getCities();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mb-8 flex justify-between">
        <h1 className="text-3xl font-bold text-white">Cities</h1>

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
          cursor-pointer
          "
        >
          + Add City
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cities?.map((city) => (
          <div
            key={city.id}
            className="
              rounded-3xl
              border border-white/10
              bg-white/5
              p-6
              "
          >
            <h2 className="text-xl text-white font-bold">🏙 {city.name}</h2>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => {
                  setEditData(city);

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
                onClick={() => deleteCity(city.id)}
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
        <CityForm setOpen={setOpen} editData={editData} refresh={getCities} />
      )}
    </div>
  );
}

export default Cities;
