export default function MentionsLegales() {
  return (
    <main
      className="min-h-screen py-12 px-6"
      style={{ backgroundColor: '#F7E5E1' }}
    >
      <div className="max-w-3xl mx-auto text-black">
        <h1 className="text-3xl font-bold mb-6 text-primary">
          Mentions légales
        </h1>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
          Éditeur du site
        </h2>
        <p className="mb-4">
          Le site Dwell est édité par la société DWELL SAS, immatriculée au RCS de Paris sous le numéro 123 456 789.
        </p>

        <ul className="list-disc pl-6 mb-4">
          <li>Siège social : 123 Avenue des Champs-Élysées, 75008 Paris</li>
          <li>Email : contact@dwell.fr</li>
          <li>Téléphone : +33 1 23 45 67 89</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
          Directeur de la publication
        </h2>
        <p className="mb-4">
          M. Jean Dupont, en qualité de Président de la société DWELL SAS.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
          Hébergement
        </h2>
        <p className="mb-4">
          Le site est hébergé par la plateforme <strong>Vercel Inc.</strong>
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Adresse : 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
          <li>Site web : <a href="https://vercel.com" className="text-primary underline">vercel.com</a></li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
          Propriété intellectuelle
        </h2>
        <p className="mb-4">
          Tous les contenus présents sur le site Dwell (textes, images, logo, code, etc.) sont protégés par le droit de la propriété intellectuelle. Toute reproduction, distribution ou modification sans autorisation est interdite.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-primary">
          Responsabilité
        </h2>
        <p className="mb-4">
          Dwell ne saurait être tenu responsable en cas de dommage direct ou indirect lié à l’utilisation du site. Les liens hypertextes peuvent renvoyer vers des sites externes pour lesquels nous déclinons toute responsabilité.
        </p>

        <p className="text-sm text-gray-600 mt-10">
          Dernière mise à jour : Mai 2024
        </p>
      </div>
    </main>
  );
}
