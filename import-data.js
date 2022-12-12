require('dotenv').config()
const mongoose=require("mongoose")
const { Schema } = mongoose;
const filmingLocationSchema = new Schema({
    filmType:  String,
    filmProducerName: String,
    endDate: Date,
    filmName: String,
    district: String,
    geolocation: {
        coordinates: {
            type: [Number]
        },
        type: {
            type: String,
            enum: ['Point'],
        }
    },
    sourceLocationId : String,
    filmDirectorName: String,
    address: String,
    startDate: Date,
    year: Number
});

const Location = mongoose.model("Location",filmingLocationSchema)
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

async function main (){
    const result = await mongoose.connect(process.env.MONGO_URI);
    console.log("Success")
    //loadLocations();
    /*deleteByID('');
    locationByID('');
    locationsByName('');
    console.log("Connected with success");
    await loadLocations();
    console.log("Loading all elements to the database...");*/
    await deleteByID('639728b8c8aa2d28ebdb259f');
    await locationByID('639728b8c8aa2d28ebdb25c7');
    await locationsByName('ENGRENAGES SAISON 8');
    const instance = new Location({filmType : "Long métrage",
        filmProducerName : "Shyamalan",
        endDate: new Date("2017-11-10T00:00:00.000+00:00"),
        filmName: "Glass",
        district: "81300",
        geolocation: [42,12],
        sourceLocationId : "2017-404",
        filmDirectorName: "Shyamalan",
        address: "Commonwealth Pennsylvanie",
        startDate: new Date("2017-10-02T00:00:00.000+00:00"),
        year: parseInt("2017")})
    addLocation(instance);
    locationsByName("Glass");
    await locationsByName("Glass");
    const update = {$set: {filmProducerName: "bonjour"}};
    updateLocation("639728b8c8aa2d28ebdb25c7", update);
    await locationsByName("Glass");

}

async function loadLocations () {
    for(let pas =0; pas<filmingLocations.length; pas++)
    {
        const instance = new Location({
            filmType : filmingLocations[pas].fields.type_tournage,
            filmProducerName : filmingLocations[pas].fields.nom_producteur,
            endDate: new Date(filmingLocations[pas].fields.date_fin),
            filmName: filmingLocations[pas].fields.nom_tournage,
            district: filmingLocations[pas].fields.ardt_lieu,
            geolocation: filmingLocations[pas].fields.geo_shape,
            sourceLocationId : filmingLocations[pas].fields.id_lieu,
            filmDirectorName: filmingLocations[pas].fields.nom_realisateur,
            address: filmingLocations[pas].fields.adresse_lieu,
            startDate: new Date(filmingLocations[pas].fields.date_debut),
            year: parseInt(filmingLocations[pas].fields.annee_tournage)
            })
        await instance.save()
    }
    console.log("End")
}

async function locationByID(idToFind) {
    Location.findById(idToFind).then(film => console.log(film));
    Location.findById(idToFind).then(film => console.log("Location by ID : ", film));
}

async function locationsByName(filmName) {
    Location.find({filmName: filmName}).then(films => console.log("Results : ", films));
    Location.find({filmName: filmName}).then(films => console.log("Locations by Name : ", films));
}

async function deleteByID(id) {
    Location.findOneAndDelete({_id: id}).then(console.log("Retirer"));
    try {
        Location.findOneAndDelete({_id: id}).then(console.log("Retirer"));
    } catch (e) {
        console.log("detruit ou non existant");
    }

}

function addLocation(location) {
    try {
        location.save();
    } catch (e) {
        console.log("erreur");

    }
}

function updateLocation(id, update) {
    try {
        Location.updateOne({id: id}, update).then(console.log("Instance updated"));
    } catch (e) {
        console.log("Petit probleme");
    }
}

main()
