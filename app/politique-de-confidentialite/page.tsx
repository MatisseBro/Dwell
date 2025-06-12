export default function PolitiqueDeConfidentialite() {
  return (
    <main
      className="min-h-screen py-12 px-6"
      style={{ backgroundColor: '#F7E5E1' }}
    >
      <div className="max-w-3xl mx-auto text-black">
        <h1 className="text-3xl font-bold mb-6 text-primary">
          Politique de confidentialité
        </h1>

        <p className="mb-4">
          Chez Dwell, la confidentialité de vos données personnelles est une priorité. Cette politique décrit comment nous collectons, utilisons et protégeons vos informations.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">1. Données collectées</h2>
        <p className="mb-4">
          Nous collectons les informations suivantes lors de votre inscription ou de l&rsquo;utilisation de la plateforme :
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Nom, prénom, adresse e-mail, numéro de téléphone</li>
          <li>Rôle (locataire ou propriétaire)</li>
          <li>Informations liées aux annonces publiées ou consultées</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">2. Utilisation des données</h2>
        <p className="mb-4">
          Vos données sont utilisées pour :
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Vous permettre d&rsquo;accéder à votre compte</li>
          <li>Publier et consulter des annonces</li>
          <li>Gérer les interactions entre utilisateurs (likes, messages)</li>
          <li>Améliorer les services de la plateforme</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">3. Partage des données</h2>
        <p className="mb-4">
          Vos données ne sont jamais vendues. Elles peuvent être partagées uniquement avec :
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Des prestataires techniques (hébergement, base de données Supabase)</li>
          <li>Les autorités légales si cela est requis</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">4. Durée de conservation</h2>
        <p className="mb-4">
          Les données sont conservées pendant la durée de l&rsquo;utilisation de votre compte, puis archivées ou supprimées après résiliation.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">5. Vos droits</h2>
        <p className="mb-4">
          Conformément au RGPD, vous disposez d&rsquo;un droit d&rsquo;accès, de modification, de suppression et de portabilité de vos données. Contactez-nous à <strong>contact@dwell.fr</strong> pour toute demande.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">6. Sécurité</h2>
        <p className="mb-4">
          Toutes les données sont stockées sur des serveurs sécurisés et les échanges sont chiffrés. Seules les personnes autorisées peuvent y accéder.
        </p>

        <p className="text-sm text-gray-600 mt-10">
          Dernière mise à jour : Mai 2024
        </p>
      </div>
    </main>
  );
}
