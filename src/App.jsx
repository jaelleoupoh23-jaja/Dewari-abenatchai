function ModalAuth({ contexte, onFermer, onSuccesSalon, onSuccesTournoi, tournoi }) {
  const [mode, setMode] = useState('inscription')
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [numero, setNumero] = useState('')
  const [erreur, setErreur] = useState('')
  const [occupe, setOccupe] = useState(false)

  const pourTournoi = !!contexte.pourTournoi
  const salonCible = contexte.pourSalon

  async function valider(e) {
    e.preventDefault()
    setErreur('')
    setOccupe(true)

    if (mode === 'connexion') {
