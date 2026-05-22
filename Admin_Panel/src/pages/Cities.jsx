import axios from "axios";
import { useEffect, useState } from "react";
import CityForm from "../components/CityForm";

function Cities() {

  const [cities, setCities] =
    useState([]);

  const [open, setOpen] =
    useState(false);

  useEffect(() => {

    getCities();

  }, []);

  const getCities =
    async () => {

      try {

        const res =
          await axios.get(
            "https://asgcrm-production.up.railway.app/cities"
          );

        setCities(
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
          Cities
        </h1>

        <button
          onClick={() =>
            setOpen(true)
          }
          className="
          rounded-xl
          bg-violet-600
          px-6 py-3
          text-white
          "
        >
          + Add City
        </button>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {cities?.map(
          (city) => (

            <div
              key={city.id}
              className="
              rounded-3xl
              border border-white/10
              bg-white/5
              p-6
              "
            >

              <h2 className="text-xl font-bold text-white">
                🏙 {city.name}
              </h2>

            </div>

          )
        )}

      </div>

      {open && (
        <CityForm
          setOpen={setOpen}
        />
      )}

    </div>
  );
}

export default Cities;