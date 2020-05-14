const HttpError = require('../models/Http-error');


const Dummy = [
    {
        id: "p1",
        title:"Empire State",
        description: "El rascacielos mas famoso del mundo.",
        location: {
            lat: 40.7484474,
            lng: -73.9871516
        },
        address: "20 W 34th St, New York, NY, 10001",
        creator: "u1"
    }    
];
const getPlacesById = (req, res, next) => {
    const placeId = req.params.pid;
    const places = Dummy.filter(p=> {
        return(p.id === placeId);
    });
    if(!places){
        throw new HttpError('No se encontro el place con el id solicitado', 404);
    }
    res.json({place:places})
}

const getPlacesByUser = (req,res,next) => {
    const userId = req.params.pid;
    const places = Dummy.filter(p => (p.creator === userId));
    if(!places){
        throw new HttpError('No se encontro el place con el id solicitado', 404);
    }
    res.json({place:places})
}
const createPlace = (req, res, next) => {
    const {title,description,coordinates, address, creator} = req.body;
    const createPlace = {
        title,
        description,
        location: coordinates,
        address,
        creator
    }
    Dummy.push(createPlace);
    res.status(201).json({message: 'Se agregó al place exitosamente.'})
};

const updatePlace = (req, res, next) =>{
    const {title, description} = req.body;
    const placeId = req.params.pid;
    const updatePlace = {...Dummy.find(p=>(p.id===placeId))};
    const placeIndex = Dummy.findIndex(p=>(p.id===placeId));
    updatePlace.title = title;
    updatePlace.description = description;
    console.log(Dummy);
    Dummy[placeIndex] = updatePlace;
    res.estatus(200).json({"message": "Sitio modificado exitosamente."})
}
const deletePLace = (req, res, next) => {
const placeId = req.params.pid;
Dummy = Dummy.filter(p=> (p.id !== placeId));
res.status(200).json({message: "sitio eliminado exitosamente"});
};

exports.getPlacesById = getPlacesById;
exports.getPlacesByUser = getPlacesByUser;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePLace = deletePLace;