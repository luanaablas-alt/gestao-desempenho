import { supabase } from './supabase.js';

const ROUTES = {
  login:  '/login.html',
  admin:  '/admin/',
  gestor: '/gestor/',
};

export async function initAuth(requiredRole = null) {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (error || !session) {
    redirectTo(ROUTES.login);
    return null;
  }

  const { data: usuario, error: profileErr } = await supabase
    .from('usuarios')
    .select('id, nome, email, perfil, ativo')
    .eq('id', session.user.id)
    .single();

  if (profileErr || !usuario || !usuario.ativo) {
    await supabase.auth.signOut();
    redirectTo(ROUTES.login);
    return null;
  }

  if (requiredRole && usuario.perfil !== requiredRole) {
    const dest = usuario.perfil === 'admin' ? ROUTES.admin : ROUTES.gestor;
    redirectTo(dest);
    return null;
  }

  return { session, usuario };
}

export function redirectByRole(perfil) {
  redirectTo(perfil === 'admin' ? ROUTES.admin : ROUTES.gestor);
}

export async function logout() {
  await supabase.auth.signOut();
  redirectTo(ROUTES.login);
}

function redirectTo(path) {
  if (window.location.pathname !== path) {
    window.location.replace(path);
  }
}

export function renderUserBadge(usuario) {
  const el = document.getElementById('user-name');
  if (el) el.textContent = usuario.nome;
  const badge = document.getElementById('user-role');
  if (badge) badge.textContent = usuario.perfil === 'admin' ? 'Admin RH' : 'Gestor';
}
