import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { User, Mail, Lock } from 'lucide-react';

type Role = 'admin' | 'docteur' | 'reception';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('admin');

  const roleRedirectMap: Record<Role, string> = {
    admin: 'http://localhost:5174',
    docteur: 'http://localhost:5176',
    reception: 'http://localhost:5177',
  };
  const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        alert(data.message || data.error || `Erreur de connexion (${response.status})`);
      }
    } catch (err) {
      console.error(err);
      alert(`Impossible de se connecter au serveur: ${err instanceof Error ? err.message : ''}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-emerald-50 p-4">
      <div className="w-full max-w-2xl grid md:grid-cols-2 gap-8 items-center">
        {/* branding side hidden on small screens */}
        <div className="hidden md:flex flex-col space-y-6 p-8">
          <div className="flex items-center space-x-3">
            <div className="bg-primary p-3 rounded-2xl shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">HealthConnect</h1>
              <p className="text-sm text-gray-600">Connexion centralisée</p>
            </div>
          </div>
          <p className="text-gray-600">
            Connectez‑vous en tant qu'administrateur, médecin ou récept.
          </p>
        </div>

        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center">Bienvenue</CardTitle>
            <CardDescription className="text-center">
              Choisissez votre rôle et identifiants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="signup">Inscription</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Rôle</Label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as Role)}
                      className="w-full border border-gray-200 rounded-md p-2"
                    >
                      <option value="admin">Administrateur</option>
                      <option value="docteur">Docteur</option>
                      <option value="reception">Réceptionniste</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="jean.dupont@exemple.com"
                        className="pl-10 bg-input-background border-gray-200 focus:border-primary"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-input-background border-gray-200 focus:border-primary"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Se connecter
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                  Inscription gérée dans les applications respectives.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginScreen;
