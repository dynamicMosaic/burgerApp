var db = require("../models");

module.exports = function(app) {
  app.get("/api/burgers", function(req, res) {
    db.burger.findAll({}).then(function(burger_db) {
      res.json(burger_db);
    });
  });

  app.get("/api/authors/:id", function(req, res) {
    db.Author.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(burger_db) {
      res.json(burger_db);
    });
  });

  app.post("/api/authors", function(req, res) {
    db.Author.create(req.body).then(function(burger_db) {
      res.json(burger_db);
    });
  });

  app.delete("/api/authors/:id", function(req, res) {
    db.Author.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });

};
