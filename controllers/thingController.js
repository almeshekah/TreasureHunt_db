const { Thing} = require("../db/models");

exports.fetchThing = async (thingId, next) => {
    try {
      const foundThing = await Thing.findByPk(thingId);
      return foundThing;
    } catch (error) {
      next(error);
    }
};
  
exports.thingList = async (req, res, next) => {
    try {
      const _things = await Thing.findAll();
      res.json(_things);
    } catch (error) {
      next(error);
    }
};


exports.thingCreate = async (req, res, next) => {
    try {
       if (req.file) {
            req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
       }    
      const newThing = await Thing.create(req.body);
      res.status(201).json(newThing);
    } catch (error) {
      next(error);
    }
};
  