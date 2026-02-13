import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/app/contexts/ThemeContext';
import { useLanguage } from '@/app/contexts/LanguageContext';
import { useAdmin } from '@/app/contexts/AdminContext';
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';

export default function UsersScreen() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { users, deleteUser } = useAdmin();

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'patient':
        return 'bg-blue-100 text-blue-800';
      case 'médecin':
        return 'bg-green-100 text-green-800';
      case 'reception':
        return 'bg-purple-100 text-purple-800';
      case 'admin':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'actif':
        return isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800';
      case 'inactif':
        return isDark ? 'bg-gray-900/30 text-gray-400' : 'bg-gray-100 text-gray-800';
      case 'suspendu':
        return isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800';
      default:
        return isDark ? 'bg-gray-900/30 text-gray-400' : 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={isDark ? 'dark min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40' : 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50'}>
      {/* Header */}
      <header className={`${isDark ? 'bg-slate-900/75 border-cyan-900/40' : 'bg-white/80 border-gray-200/40'} border-b shadow-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className={`p-2 rounded-lg ${isDark ? 'bg-slate-900/60 hover:bg-slate-900/80' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {t('users.title')}
                </h1>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {users.length} {users.length === 1 ? 'utilisateur' : 'utilisateurs'}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate('/create-user')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>{t('users.add')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Users Table */}
        <div className={`rounded-lg shadow-md overflow-hidden ${isDark ? 'bg-slate-900/60 border border-cyan-900/30' : 'bg-white border border-gray-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={isDark ? 'bg-slate-900/50 border-b border-cyan-900/40' : 'bg-gray-50 border-b border-gray-200'}>
                  <th className={`px-6 py-3 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                    {t('users.name')}
                  </th>
                  <th className={`px-6 py-3 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                    {t('users.email')}
                  </th>
                  <th className={`px-6 py-3 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                    {t('users.phone')}
                  </th>
                  <th className={`px-6 py-3 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                    {t('users.role')}
                  </th>
                  <th className={`px-6 py-3 text-left text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                    {t('users.status')}
                  </th>
                  <th className={`px-6 py-3 text-center text-sm font-semibold ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className={`border-b transition-colors ${isDark ? 'border-cyan-900/40 hover:bg-slate-900/60' : 'border-gray-200 hover:bg-gray-50'}`}
                  >
                    <td className={`px-6 py-4 text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {user.nom}
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {user.email}
                    </td>
                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {user.phone}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.rôle)}`}>
                        {user.rôle}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(user.statut)}`}>
                        {user.statut}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="p-2 hover:bg-blue-500/20 rounded text-blue-600">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="p-2 hover:bg-red-500/20 rounded text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {users.length === 0 && (
          <div className={`text-center py-12 rounded-lg ${isDark ? 'bg-slate-900/60' : 'bg-gray-50'}`}>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Aucun utilisateur trouvé
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
