const router = require('nordic/ragnar').router();
const formService = require('../services/form');

function getPlaces(req, res, next) {
  formService.getPlaces()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(err => next(err));
}

router.get('/', getPlaces);

module.exports = router;
