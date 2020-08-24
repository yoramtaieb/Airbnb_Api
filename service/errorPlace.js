exports default errorPlace = (description, rooms, bathrooms, maxGuests) => {
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
};
