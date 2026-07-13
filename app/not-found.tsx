import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <p className="font-glitch text-fluid-mega leading-none">404</p>
      <h1 className="font-display text-fluid-2xl">Cette page n'existe pas.</h1>
      <p className="max-w-md text-fluid-base text-bone-300 text-pretty">
        Tu t'es perdu·e en route. Pas grave, le drop t'attend.
      </p>
      <div className="flex gap-3">
        <Link href="/" className="btn-primary">Retour à l'accueil</Link>
        <Link href="/shop" className="btn-outline">Voir le shop</Link>
      </div>
    </div>
  );
}
