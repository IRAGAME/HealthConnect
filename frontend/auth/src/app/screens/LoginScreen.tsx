import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { User, Mail, Lock, ShieldCheck, Sparkles, Stethoscope, AlertTriangle } from 'lucide-react';

type Role = 'admin' | 'docteur' | 'reception';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('admin');
  const [loginError, setLoginError] = useState<string | null>(null);

  const roleRedirectMap: Record<Role, string> = {
    admin: 'http://localhost:5174',
    docteur: 'http://localhost:5176',
    reception: 'http://localhost:5177',
  };
  const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, motdepasse: password, role }),
      });
      const data = await response.json().catch(() => ({} as { message?: string; error?: string }));

      if (response.ok) {
        // Store session and redirect to the role-specific frontend app.
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('role', role);
        window.location.assign(roleRedirectMap[role]);
      } else {
        setLoginError(data.message || data.error || `Erreur de connexion (${response.status})`);
      }
    } catch (err) {
      console.error(err);
      setLoginError(`Impossible de se connecter au serveur: ${err instanceof Error ? err.message : ''}`);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50">
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-cyan-200/70 via-emerald-200/60 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-[-10%] h-[24rem] w-[24rem] rounded-full bg-gradient-to-tr from-amber-200/60 via-rose-100/60 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,116,144,0.12),transparent_55%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-12">
        <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xl shadow-cyan-500/20">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-700/80">
                  Portail sécurisé
                </p>
                <h1 className="font-display text-4xl font-semibold text-slate-900 sm:text-5xl">
                  HealthConnect
                </h1>
              </div>
            </div>

            <p className="max-w-xl text-lg text-slate-600">
              Connexion centralisée pour administrateurs, médecins et réceptionnistes. Accédez
              rapidement aux outils essentiels de votre établissement.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur-md">
                <ShieldCheck className="mb-3 h-5 w-5 text-cyan-600" />
                <p className="text-sm font-semibold text-slate-900">Sécurité renforcée</p>
                <p className="text-xs text-slate-500">Sessions chiffrées et contrôles par rôle.</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur-md">
                <Stethoscope className="mb-3 h-5 w-5 text-emerald-600" />
                <p className="text-sm font-semibold text-slate-900">Parcours métier</p>
                <p className="text-xs text-slate-500">Un accès direct selon votre profil.</p>
              </div>
              <div className="rounded-2xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur-md">
                <Sparkles className="mb-3 h-5 w-5 text-amber-600" />
                <p className="text-sm font-semibold text-slate-900">Interface moderne</p>
                <p className="text-xs text-slate-500">Conçue pour la vitesse et la clarté.</p>
              </div>
            </div>
          </div>

          <Card className="relative border border-white/70 bg-white/80 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-cyan-500 via-emerald-400 to-amber-300" />
            <CardHeader className="space-y-2 pb-6 pt-8">
              <CardTitle className="font-display text-2xl text-center text-slate-900">
                Bienvenue
              </CardTitle>
              <CardDescription className="text-center text-slate-500">
                Choisissez votre rôle et renseignez vos identifiants.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full gap-6">
                <TabsList className="grid w-full grid-cols-2 rounded-full bg-slate-900/5 p-1">
                  <TabsTrigger
                    value="login"
                    className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 text-slate-500"
                  >
                    Connexion
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-slate-900 text-slate-500"
                  >
                    Inscription
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {loginError && (
                      <div className="rounded-2xl border border-red-200/80 bg-red-50/80 px-4 py-3 text-sm text-red-700 shadow-sm">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="mt-0.5 h-4 w-4 text-red-500" />
                          <span>{loginError}</span>
                        </div>
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-slate-700">Rôle</Label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as Role)}
                        className="w-full rounded-xl border border-slate-200/80 bg-white/80 px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                      >
                        <option value="admin">Administrateur</option>
                        <option value="docteur">Docteur</option>
                        <option value="reception">Réceptionniste</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-sm font-medium text-slate-700">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="jean.dupont@exemple.com"
                          className="h-11 rounded-xl border-slate-200/80 bg-white/80 pl-10 text-sm text-slate-800 shadow-sm focus:border-cyan-500 focus-visible:ring-cyan-100"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-sm font-medium text-slate-700">
                        Mot de passe
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          className="h-11 rounded-xl border-slate-200/80 bg-white/80 pl-10 text-sm text-slate-800 shadow-sm focus:border-cyan-500 focus-visible:ring-cyan-100"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Accès sécurisé et traçable</span>
                      <span className="text-cyan-600">Besoin d'aide ?</span>
                    </div>

                    <Button type="submit" className="h-11 w-full text-base">
                      Se connecter
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500">
                    L'inscription est gérée dans les applications respectives.
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
