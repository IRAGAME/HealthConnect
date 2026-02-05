export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="text-center">
        <div className="mb-4 text-4xl">🏥</div>
        <h1 className="text-2xl font-bold text-white mb-2">HealthConnect Admin</h1>
        <p className="text-gray-400">Chargement du tableau de bord...</p>
      </div>
    </div>
  );
}
