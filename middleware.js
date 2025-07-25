import { NextResponse } from "next/server";

export function middleware(req) {
  const host = req.headers.get("host"); // Récupère l'hôte de la requête

  // Redirige les sous-domaines Vercel vers le domaine principal
  if (host.endsWith(".vercel.app")) {
    return NextResponse.redirect("https://www.onlyfans-search-finder.com", 301); // Redirection permanente
  }

  // Si ce n'est pas un domaine Vercel, continue le traitement normal
  return NextResponse.next();
}
