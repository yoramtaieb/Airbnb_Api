const model = require('../../models');
const Place = model.Place;
const City = model.City;
const jwtToken = require('../../utils/jwt');
const NOSTRING_REGEX = /^\d+$/;

module.exports = {
  postAppart: async (req, res) => {
    const { idCity, name, description, rooms, bathrooms, maxGuests, priceByNight } = req.body;

    const headerAuth = req.headers['authorization'];
    const userId = jwtToken.getUserId(headerAuth);

    if (userId < 0)
      return res
        .status(401)
        .json({ message: 'Vous devez être connecté pour accéder à cette ressource' });

    // errorPlace(description, rooms, bathrooms, maxGuests);
    if (description === null || description === undefined) {
      res.status(400).json({ message: "Le champ description n'est pas renseigné" });
    }
    if (
      !NOSTRING_REGEX.test(rooms) ||
      !NOSTRING_REGEX.test(bathrooms) ||
      !NOSTRING_REGEX.test(maxGuests)
    ) {
      return res.status(400).json({ message: 'Le champ doit être un nombre entier' });
    }

    // const placeFound = await Place.findOne({ where: { id: idCity }, include: City });
    // const placeFound = await Place.findByPk(idCity, { attributes: ['name'] });
    // console.log('console log de placefound :', placeFound);
    // if (placeFound) {
    //   await Place.create({
    //     idCity: idCity,
    //     name: name,
    //     description: description,
    //     rooms: rooms,
    //     bathrooms: bathrooms,
    //     maxGuests: maxGuests,
    //     priceByNight: priceByNight,
    //   });
    //   return res.status(201).json({
    //     idCity: placeFound.City.dataValues.name,
    //     name: placeFound.name,
    //     description: placeFound.description,
    //     rooms: placeFound.rooms,
    //     bathrooms: placeFound.bathrooms,
    //     priceByNight: placeFound.priceByNight,
    //     maxGuests: placeFound.maxGuests,
    //   });
    // } else
    //   res.status(409).json({
    //     message: 'erreur',
    //   });

    const cityFound = await City.findByPk(idCity, { attributes: ['name'] });

    const newPlaces = await Place.create({
      idCity: idCity,
      name: name,
      description: description,
      rooms: rooms,
      bathrooms: bathrooms,
      maxGuests: maxGuests,
      priceByNight: priceByNight,
    });
    return res.status(201).json({
      id: newPlaces.id,
      city: cityFound.name,
      name: newPlaces.name,
      description: newPlaces.description,
      rooms: newPlaces.rooms,
      bathrooms: newPlaces.bathrooms,
      priceByNight: newPlaces.priceByNight,
      maxGuests: newPlaces.maxGuests,
    });
  },

  getAllPlaces: async (req, res) => {
    const where = {};
    if (req.query.city) {
      const cityFound = await City.findOne({
        where: { name: req.query.city },
        attributes: ['id'],
        raw: true,
      });
      where.idCity = cityFound.id;
    }
    // const where = {};
    // if (req.query.city) {
    //   where.idCity = cityFound.id;
    // }

    const findPlaces = await Place.findAll({
      include: [
        {
          model: City,
          attributes: ['name'],
        },
      ],
      raw: true,
      attributes: ['id', 'name', 'description', 'rooms', 'bathrooms', 'maxGuests', 'priceByNight'],
      where,
    });
    return res.status(201).json(findPlaces);
  },

  getOnePlaces: async (req, res) => {
    const { id } = req.params;
    const placeFound = await Place.findByPk(id, {
      include: [
        {
          model: City,
          attributes: ['name'],
        },
      ],
    });
    return res.status(201).json(placeFound);
  },

  // updatePlace: async (promoId, data) => {
  //   const [, affectedRow] = await Promo.update(data, {
  //     where: { id: promoId },
  //     returning: true,
  //     plain: true
  //   });
  //   const { id, titre, iteration } = affectedRow;
  //   const updatedData = { id, titre, iteration };
  //   return updatedData;
  // },
};
