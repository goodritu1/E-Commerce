const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


router.get('/', async (req, res) => {
  // find all categories
   // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({
      include: [{
         model: Product,
         as :'products'
         }],
    });
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Error finding categories'});
    }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
    Category.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Product
      }]
    })
   .then(category => {
      res.json(category);
    })
   .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Error finding category' });
    });
  });
  


router.post('/', (req, res) => {
  // create a new category
 
    Category.create(req.body)
      .then(newCategory => {
        res.json(newCategory);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Error creating category' });
      });
  });


router.put('/:id', (req, res) => {
  // update a category by its `id` value
    Category.findByPk(req.params.id)
      .then(category => {
        if (!category) {
          res.status(404).json({ message: 'Category not found' });
        } else {
          category.update(req.body)
            .then(updatedCategory => {
              res.json(updatedCategory);
            })
            .catch(err => {
              console.error(err);
              res.status(500).json({ message: 'Error updating category' });
            });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Error finding category' });
      });
  });


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
 
    Category.findByPk(req.params.id)
      .then(category => {
        if (!category) {
          res.status(404).json({ message: 'Category not found' });
        } else {
          category.destroy()
            .then(() => {
              res.json({ message: 'Category deleted successfully' });
            })
            .catch(err => {
              console.error(err);
              res.status(500).json({ message: 'Error deleting category' });
            });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Error finding category' });
      });
  });
  


module.exports = router;
