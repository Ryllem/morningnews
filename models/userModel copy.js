let mongoose = require('mongoose')

let contratSchema = mongoose.Schema({
lastname1: {type: String, required: [true, "Merci de saisir un 'nom'"], minLength: [2, "Votre nom doit contenir 2 caractères minimum"]},
firstname1: {type: String, required: [true, "Merci de saisir un 'prénom'"], minLength: [3, "Votre nom doit contenir 3 caractères minimum"]},
age1: {type: Data},

lastname2: {type: String, required: [true, "Merci de saisir un 'nom'"], minLength: [2, "Votre nom doit contenir 2 caractères minimum"]},
firstname2: {type: String, required: [true, "Merci de saisir un 'prénom'"], minLength: [3, "Votre nom doit contenir 3 caractères minimum"]},
age2: {type: Data},

email1: {type: String, required: [true, "Merci de saisir un email"], unique: true},
email2: {type: String},

phone1: {type: Number, required: [true, "Merci de saisir un numéro de téléphone"]},
phone2: {type: Number},

adressedom: {type: String, required: [true, "Merci de saisir votre adresse (domicile)"]},
lngdom: {type: Number},
latdom: {type: Number},

personj: {type: String},

dateweeding: {type: Date, required: [true, "Merci de sélectionner une date"]},
adressesalle: {type: String, required: [true, "Merci de saisir l'adresse de la salle"]},
lngsalle: {type: Number},
latsalle: {type: Number},

timemairie: {type: String},
timeeglise: {type: String},
timesalle: {type: String},

nbrconvive: {type: Number},
nbrenfant: {type: Number},
moyenneage: {type: Number},

formule: {type: String},

animation: {type: Array},
repas: {type: Object}, // add a new model

musique_entree: {type: String},
musique_ouverture: {type: String},
musique_gateau: {type: String},

musique_rouge: {type: Array},
musique_like: {type: Array},
musique_style: {type: Array},

infos_diverses: {type: Array},

status: {type: String},
dj: {type: String}

})
let contratModel = mongoose.model('contrat', contratSchema);

module.exports = userModel;