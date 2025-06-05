export default function ConditionsUtilisation() {
  return (
    <main
      className="min-h-screen py-12 px-6"
      style={{ backgroundColor: '#F7E5E1' }}
    >
      <div className="max-w-3xl mx-auto text-black">
        <h1 className="text-3xl font-bold mb-6 text-primary">
          Conditions d'utilisation
        </h1>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
          Acceptation des conditions
        </h2>
        <p className="mb-4">
          En accédant et en utilisant le site Dwell, vous acceptez les présentes conditions d'utilisation. Si vous n’êtes pas d’accord, veuillez ne pas utiliser nos services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
          Utilisation du site
        </h2>
        <p className="mb-4">
          L'utilisateur s'engage à ne pas utiliser le site à des fins illégales, nuisibles ou interdites par les présentes conditions. Toute tentative de perturber le fonctionnement de la plateforme est interdite.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
          Comptes utilisateurs
        </h2>
        <p className="mb-4">
          Pour accéder à certaines fonctionnalités, vous devez créer un compte personnel. Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités effectuées sous votre compte.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
          Données personnelles
        </h2>
        <p className="mb-4">
          Dwell collecte et traite certaines données personnelles dans le respect de la réglementation en vigueur. Consultez notre page <a href="/politique-confidentialite" className="text-primary underline">Politique de confidentialité</a> pour plus de détails.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
          Modifications des conditions
        </h2>
        <p className="mb-4">
          Dwell se réserve le droit de modifier les présentes conditions à tout moment. Les utilisateurs seront informés de toute mise à jour via le site.
        </p>

        <p className="text-sm text-gray-600 mt-10">
          Dernière mise à jour : Mai 2024
        </p>
      </div>
    </main>
  );
}
