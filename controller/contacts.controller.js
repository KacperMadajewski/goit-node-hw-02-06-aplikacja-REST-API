const contactsService = require("../services/contacts.service");

const get = async (req, res, next) => {
  try {
    const results = await contactsService.getAll();
    res.json({
      status: "success",
      code: 200,
      data: { contacts: results },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await contactsService.getOne(id);
    res.json({
      status: "success",
      code: 200,
      data: { contact: results },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { body } = req;
    const results = await contactsService.create(body);
    res.json({
      status: "success",
      code: 200,
      data: { contact: results },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const results = await contactsService.update(id, body);
    res.json({
      status: "success",
      code: 200,
      data: { contact: results },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const results = await contactsService.updateFavorite(id, { body });
    res.json({
      status: "success",
      code: 200,
      data: { contact: results },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await contactsService.remove(id);
    res.json({
      status: "success",
      code: 200,
      data: { contacts: results },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateFavorite,
  remove,
};
