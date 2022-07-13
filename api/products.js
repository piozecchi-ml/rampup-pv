const router = require('nordic/ragnar').router();
const productsService = require('../services/products');

function getProducts(req, res, next) {
  productsService.getProducts(req.platform.siteId, 20)
    .then((data) => {
      res.status(200).json(data.results);
    })
    .catch(err => next(err));
}

router.get('/', getProducts);

module.exports = router;
