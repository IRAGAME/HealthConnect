import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { User, Mail, Phone, Lock, Heart, Stethoscope, AlertTriangle } from 'lucide-react';

export default function AuthScreen() {
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    // VÃ©rifier si une redirection avec utilisateur authentifiÃ© est prÃ©sente dans l'URL
    const searchParams = new URLSearchParams(window.location.search);
    const authUserParam = searchParams.get('auth_user');

    if (authUserParam) {
      localStorage.clear(); // Nettoyer le localStorage avant de rediriger
      try {
        const parsedUser = JSON.parse(decodeURIComponent(authUserParam));
        localStorage.setItem('patient_user', JSON.stringify(parsedUser));
        localStorage.setItem('patientName', parsedUser.name);
        navigate('/select-hopital');
        return;
      } catch (error) {
        // Afficher un message d'erreur pour aider Ã  dÃ©bugger
        console.error("Erreur lors de l'analyse des donnÃ©es de l'utilisateur:", error);
        alert("Une erreur s'est produite lors de la connexion. Veuillez rÃ©essayer.");

        console.error("Erreur lors de l'analyse de l'utilisateur authentifiÃ©", error);
      }
    }

    // VÃ©rifier si une session existe dÃ©jÃ 
    const savedUser = localStorage.getItem('patient_user');
    if (savedUser) {
      navigate('/select-hopital');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const response = await fetch('http://localhost:5000/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, motdepasse: loginPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        // Connexion rÃ©ussie : on stocke le token et les infos
        localStorage.setItem('token', data.token);
        localStorage.setItem('patientName', data.user.nom);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('patient_user', JSON.stringify(data.user));
        console.log('Connexion rÃ©ussie, redirection vers sÃ©lection hÃ´pital');
        navigate('/select-hopital');
      } else {
        // Erreur (ex: utilisateur non trouvÃ©, mot de passe incorrect)
        setLoginError(data.message || "Erreur de connexion");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setLoginError("Impossible de se connecter au serveur. VÃ©rifiez votre connexion.");
      // Mode dÃ©mo de secours si le backend est Ã©teint
      if (window.confirm("Le serveur (port 5000) est inaccessible. Voulez-vous entrer en mode DÃ‰MO pour tester l'interface ?")) {
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('patientName', 'Patient Test');
        localStorage.setItem('user', JSON.stringify({ nom: 'Patient Test', email: loginEmail }));
        localStorage.setItem('patient_user', JSON.stringify({ nom: 'Patient Test', email: loginEmail }));
        console.log('Mode dÃ©mo activÃ©, redirection vers sÃ©lection hÃ´pital');
        navigate('/select-hopital');
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register/patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: signupName,
          email: signupEmail,
          motdepasse: signupPassword,
          telephone: signupPhone
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Compte crÃ©Ã© avec succÃ¨s ! Veuillez vous connecter.");
        // On vide les champs pour inviter Ã  la connexion
        setSignupName('');
        setSignupEmail('');
        setSignupPassword('');
        setSignupPhone('');
      } else {
        alert(data.message || "Erreur d'inscription");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible de s'inscrire.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-white to-emerald-50 p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:flex flex-col space-y-6 p-8">
          <div className="flex items-center space-x-3">
            <div className="bg-primary p-3 rounded-2xl shadow-lg">
              <Heart className="w-8 h-8 text-white" fill="white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">HealthConnect</h1>
              <p className="text-sm text-gray-600">Votre santÃ©, notre prioritÃ©</p>
            </div>
          </div>
          
          <div className="space-y-6 mt-12">
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-100 p-3 rounded-xl">
                <Stethoscope className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">MÃ©decins experts</h3>
                <p className="text-sm text-gray-600">AccÃ¨s aux meilleurs professionnels de santÃ©</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Planification facile</h3>
                <p className="text-sm text-gray-600">Prenez rendez-vous en quelques secondes</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-violet-100 p-3 rounded-xl">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Rappels intelligents</h3>
                <p className="text-sm text-gray-600">Ne manquez jamais un rendez-vous</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl text-center">Bienvenue</CardTitle>
            <CardDescription className="text-center">
              Connectez-vous Ã  votre compte ou crÃ©ez-en un nouveau
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="signup">Inscription</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && (
                    <div className="rounded-2xl border border-red-200/80 bg-red-50/80 px-4 py-3 text-sm text-red-700 shadow-sm">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="mt-0.5 h-4 w-4 text-red-500" />
                        <span>{loginError}</span>
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="jean.dupont@exemple.com"
                        className="pl-10 bg-input-background border-gray-200 focus:border-primary"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
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
                        placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                        className="pl-10 bg-input-background border-gray-200 focus:border-primary"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white shadow-md">
                    Se connecter
                  </Button>
                  
                  <p className="text-center text-sm text-muted-foreground">
                    <a href="#" className="text-primary hover:underline">
                      Mot de passe oubliÃ© ?
                    </a>
                  </p>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nom complet</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Jean Dupont"
                        className="pl-10 bg-input-background border-gray-200 focus:border-primary"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="jean.dupont@exemple.com"
                        className="pl-10 bg-input-background border-gray-200 focus:border-primary"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">NumÃ©ro de tÃ©lÃ©phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="06 12 34 56 78"
                        className="pl-10 bg-input-background border-gray-200 focus:border-primary"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Mot de passe</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                        className="pl-10 bg-input-background border-gray-200 focus:border-primary"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white shadow-md">
                    CrÃ©er un compte
                  </Button>
                  
                  <p className="text-center text-xs text-muted-foreground">
                    En vous inscrivant, vous acceptez nos Conditions d'utilisation et notre Politique de confidentialitÃ©
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
