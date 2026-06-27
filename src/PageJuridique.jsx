import { useState } from "react";

export default function PageJuridique({ onRetour }) {
  const [onglet, setOnglet] = useState("cgu");

  const bouton = (id, titre) => (
    <button
      onClick={() => setOnglet(id)}
      style={{
        padding: "12px",
        borderRadius: 12,
        border: "none",
        cursor: "pointer",
        fontWeight: 700,
        background: onglet === id ? "#FFB800" : "#232323",
        color: onglet === id ? "#111" : "#fff",
        marginBottom: 10,
      }}
    >
      {titre}
    </button>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#08120F",
        color: "white",
        padding: 20,
      }}
    >
      <button
        onClick={onRetour}
        style={{
          background: "none",
          border: "none",
          color: "#FFB800",
          fontSize: 22,
          cursor: "pointer",
        }}
      >
        ← Retour
      </button>

      <h1 style={{ marginTop: 20 }}>⚖️ Centre juridique</h1>

      <p style={{ color: "#aaa" }}>
        Tous les documents officiels de Déwari-abenatchai.
      </p>

      <div
        style={{
          display: "grid",
          gap: 10,
          marginTop: 25,
        }}
      >
        {bouton("cgu", "📜 Conditions générales")}
        {bouton("conf", "🔒 Confidentialité")}
        {bouton("regles", "🎲 Règlement officiel")}
        {bouton("finance", "💰 Conditions financières")}
        {bouton("fraude", "🚫 Politique anti-triche")}
        {bouton("copyright", "©️ Propriété intellectuelle")}
      </div>

      <div
        style={{
          marginTop: 25,
          background: "#131313",
          borderRadius: 18,
          padding: 20,
        }}
      >
        {onglet === "cgu" && (
          <>
            <h2>Conditions Générales d'Utilisation</h2>

            <p>
              Bienvenue sur Déwari-abenatchai.
            </p>

            <p>
              L'utilisation de cette plateforme implique
              l'acceptation des présentes Conditions Générales
              d'Utilisation.
            </p>

            <p>
              Les joueurs s'engagent à respecter les règles
              officielles du jeu ainsi que toutes les politiques
              publiées sur la plateforme.
            </p>
          </>
        )}

        {onglet === "conf" && (
          <>
            <h2>Politique de confidentialité</h2>

            <p>
              Déwari-abenatchai protège les informations personnelles
              des utilisateurs conformément aux lois applicables.
            </p>
          </>
        )}

        {onglet === "regles" && (
          <>
            <h2>Règlement officiel du Déwari</h2>

            <p>
              Les règles officielles du Déwari sont applicables
              à toutes les parties organisées sur la plateforme.
            </p>
          </>
        )}

        {onglet === "finance" && (
          <>
            <h2>Conditions financières</h2>

            <p>
              Les parties avec mise sont soumises aux conditions
              financières publiées par Déwari-abenatchai.
            </p>
          </>
        )}

        {onglet === "fraude" && (
          <>
            <h2>Politique anti-triche</h2>

            <p>
              Toute tentative de fraude, manipulation ou exploitation
              d'une faille peut entraîner la suspension du compte.
            </p>
          </>
        )}

        {onglet === "copyright" && (
          <>
            <h2>Propriété intellectuelle</h2>

            <p>
              Le nom Déwari-abenatchai, son identité visuelle,
              son code source et tous les contenus originaux
              sont protégés.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
