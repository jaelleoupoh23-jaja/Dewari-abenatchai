export function estCaseSecurisee(position) {
  return [0, 8, 13, 21, 26, 34, 39, 47].includes(position)
}

export function creerPartie(couleurs = ['rouge', 'vert']) {
  const pions = {}
  couleurs.forEach((couleur) => {
    pions[couleur] = Array.from({ length: 4 }, () => ({
      etat: 'base',
      position: -1,
    }))
  })

  return {
    couleurs,
    pions,
    tourActuel: 0,
    dernierDe: null,
    sixConsecutifs: 0,
    vainqueur: null,
    doitRejouer: false,
  }
}

export function coupsValides(partie, couleur, valeur) {
  return (partie.pions[couleur] || [])
    .map((pion, index) => ({ pion, index }))
    .filter(({ pion }) => {
      if (pion.etat === 'arrivee') return false
      if (pion.etat === 'base') return valeur === 6
      if (pion.etat === 'parcours') return pion.position + valeur <= 51
      if (pion.etat === 'couloir') return pion.position + valeur <= 5
      return false
    })
}

export function lancerDe(partie) {
  const valeur = Math.floor(Math.random() * 6) + 1
  const couleur = partie.couleurs[partie.tourActuel]
  const sixConsecutifs = valeur === 6 ? partie.sixConsecutifs + 1 : 0

  let nouvellePartie = {
    ...partie,
    dernierDe: valeur,
    sixConsecutifs,
    doitRejouer: false,
  }

  if (sixConsecutifs >= 3) {
    nouvellePartie = passerAuJoueurSuivant(nouvellePartie)
    return { partie: nouvellePartie, valeur, coups: [], aucunCoup: true, tourAnnule: true }
  }

  const coups = coupsValides(nouvellePartie, couleur, valeur)

  if (coups.length === 0) {
    nouvellePartie = valeur === 6 ? nouvellePartie : passerAuJoueurSuivant(nouvellePartie)
    return { partie: nouvellePartie, valeur, coups: [], aucunCoup: true, tourAnnule: false }
  }

  return { partie: nouvellePartie, valeur, coups, aucunCoup: false, tourAnnule: false }
}

export function jouerCoup(partie, index, valeur) {
  const couleur = partie.couleurs[partie.tourActuel]
  const pionsCouleur = [...partie.pions[couleur]]
  const pion = { ...pionsCouleur[index] }

  if (pion.etat === 'base' && valeur === 6) {
    pion.etat = 'parcours'
    pion.position = 0
  } else if (pion.etat === 'parcours') {
    pion.position += valeur
    if (pion.position >= 51) {
      pion.etat = 'couloir'
      pion.position = 0
    }
  } else if (pion.etat === 'couloir') {
    pion.position += valeur
    if (pion.position >= 5) {
      pion.etat = 'arrivee'
      pion.position = 5
    }
  }

  pionsCouleur[index] = pion

  let nouvellePartie = {
    ...partie,
    pions: {
      ...partie.pions,
      [couleur]: pionsCouleur,
    },
    dernierDe: null,
    doitRejouer: valeur === 6,
  }

  nouvellePartie = capturerPions(nouvellePartie, couleur, pion)

  if (nouvellePartie.pions[couleur].every((p) => p.etat === 'arrivee')) {
    nouvellePartie.vainqueur = couleur
    nouvellePartie.doitRejouer = false
  }

  return nouvellePartie
}

function capturerPions(partie, couleurActuelle, pionJoue) {
  if (pionJoue.etat !== 'parcours') return partie
  if (estCaseSecurisee(pionJoue.position)) return partie

  const nouveauxPions = { ...partie.pions }

  partie.couleurs.forEach((couleur) => {
    if (couleur === couleurActuelle) return

    nouveauxPions[couleur] = partie.pions[couleur].map((pion) => {
      if (pion.etat === 'parcours' && pion.position === pionJoue.position) {
        return { etat: 'base', position: -1 }
      }
      return pion
    })
  })

  return { ...partie, pions: nouveauxPions }
}

export function passerAuJoueurSuivant(partie) {
  return {
    ...partie,
    tourActuel: (partie.tourActuel + 1) % partie.couleurs.length,
    dernierDe: null,
    sixConsecutifs: 0,
    doitRejouer: false,
  }
}
