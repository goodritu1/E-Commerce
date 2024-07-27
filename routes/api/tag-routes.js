const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll({
      include: [{
        model: Product,
        as: 'products'
      }]
    });
    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(400).json({message: 'Error finding tags'});
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        as: 'products'
      }]
    });
    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(400).json({message: 'Error finding tag'});
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try{
    const tagData = await Tag.create(req.body);
    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(400).json({message: 'Error creating tag'});
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(400).json({message: 'Error updating tag'});
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json(tagData);
  } catch (err) {
    console.error(err);
    res.status(400).json({message: 'Error deleting tag'});
  }
});

module.exports = router;
