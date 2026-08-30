// Messages renvoyés au VISITEUR, dans les deux langues du site.
//
// Le site est bilingue (français à la racine, anglais sous /en/) et le
// formulaire envoie la langue de la page dans le champ `langue`. Sans ce
// fichier, un visiteur anglophone remplissant /en/contact/ recevrait ses
// erreurs de validation en français : le formulaire serait traduit, mais pas
// ce qu'il répond — c'est-à-dire précisément le moment où le visiteur a besoin
// de comprendre.
//
// ⚠️ Ne concerne QUE les messages destinés au visiteur. Les réponses des routes
// d'administration restent en français : le dashboard est l'outil du gérant et
// n'est pas traduit.

const LOCALES = ["fr", "en"];
const DEFAUT = "fr";

/** Normalise ce qui arrive du formulaire : tout ce qui n'est pas connu → "fr". */
export const langueDe = (valeur) =>
  LOCALES.includes(String(valeur || "").toLowerCase())
    ? String(valeur).toLowerCase()
    : DEFAUT;

const MESSAGES = {
  fr: {
    tropRapide: "Envoi trop rapide. Vérifiez le formulaire et réessayez.",
    champsIncorrects: "Certains champs sont incomplets ou incorrects.",
    pieceJointeIndispo: "L'envoi de pièces jointes est momentanément indisponible.",
    nomManquant: "Indiquez votre nom.",
    nomTropLong: "Nom trop long.",
    telephoneManquant: "Indiquez un numéro de téléphone.",
    telephoneInvalide: "Ce numéro de téléphone semble incorrect.",
    emailManquant: "Indiquez votre e-mail.",
    emailInvalide: "Cette adresse e-mail semble incorrecte.",
    messageManquant: "Décrivez votre projet en quelques mots.",
    messageTropLong: "Message trop long.",
  },
  en: {
    tropRapide: "That was sent too quickly. Please check the form and try again.",
    champsIncorrects: "Some fields are incomplete or incorrect.",
    pieceJointeIndispo: "File attachments are temporarily unavailable.",
    nomManquant: "Please enter your name.",
    nomTropLong: "That name is too long.",
    telephoneManquant: "Please enter a phone number.",
    telephoneInvalide: "That phone number doesn't look right.",
    emailManquant: "Please enter your email address.",
    emailInvalide: "That email address doesn't look right.",
    messageManquant: "Tell us about your project in a few words.",
    messageTropLong: "That message is too long.",
  },
};

/** Dictionnaire d'une langue. `m("en").emailInvalide` */
export const m = (langue = DEFAUT) => MESSAGES[langueDe(langue)];
