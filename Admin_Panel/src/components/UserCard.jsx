function UserCard({ user }) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-white/10
      bg-white/5
      p-5
      transition-all
      hover:border-violet-500/30
      hover:bg-white/[0.07]
      "
    >
      <div className="mb-4">

        <h2 className="text-xl font-bold text-white">
          👤 {user.name}
        </h2>

        <p className="mt-2 text-sm text-white/50">
          📧 {user.email}
        </p>

        <p className="mt-1 text-sm text-white/50">
          📞 {user.phone}
        </p>

      </div>

      <div className="border-t border-white/10 pt-3 text-xs text-white/40">
        User Details
      </div>
    </div>
  );
}

export default UserCard;