const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findOne } = require('../../models/Tag');

// The `/api/categories` endpoint                             
router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err),
      res.status(500).json(err);
    });

});

// CREATE new Category         
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err)
    });
});
  // UPDATE a category by its `id` value  
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(dbData => {
        if (!dbData) {
            res.status(404).json({ message: 'No post found with this id' })
            return;
        }
        res.json(dbData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});
  // DELETE a category by id          
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbData => {
    if (!dbData) {
      res.status(404).json({ message: 'No Category found with this id' })
      return;
    }
    res.json(dbData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

module.exports = router;