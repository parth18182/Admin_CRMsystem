function CityCard({ city }) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-5
      hover:border-violet-500/30
      "
    >
      <h2 className="text-xl font-bold text-white">
        🏙 {city.cityName}
      </h2>

      <div className="mt-5 border-t border-white/10 pt-4">

        <p className="text-white/60">
          State:
          {" "}
          {city.state}
        </p>

      </div>
    </div>
  );
}

export default CityCard;