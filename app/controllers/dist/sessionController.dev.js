"use strict";

var _require = require("../auth/Scrypt"),
    Scrypt = _require.Scrypt;

var _require2 = require("../middlewares/emailValidator"),
    emailValidator = _require2.emailValidator;

var _require3 = require("../models"),
    User = _require3.User;

var sessionController = {
  index: function index(req, res) {
    var notification = req.session.notification || null;
    req.session.notification = null;
    res.render("login", {
      notification: notification
    });
  },
  store: function store(req, res) {
    var _req$body, email, password, userExist, ok;

    return regeneratorRuntime.async(function store$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;

            if (emailValidator(email)) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.render("login", {
              error: "L'email est incorrect",
              notification: null
            }));

          case 3:
            if (!(password.length < 4)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.render("login", {
              error: "Le mot de passe n'est pas conforme",
              notification: null
            }));

          case 5:
            _context.next = 7;
            return regeneratorRuntime.awrap(User.findOne({
              where: {
                email: email
              }
            }));

          case 7:
            userExist = _context.sent;

            if (userExist) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.render("login", {
              error: "Une erreur s'est produite",
              notification: null
            }));

          case 10:
            _context.next = 12;
            return regeneratorRuntime.awrap(Scrypt.compare(password, userExist.password));

          case 12:
            ok = _context.sent;

            if (ok) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", res.render("login", {
              error: "Une erreur MP s'est produite",
              notification: null
            }));

          case 15:
            // ! On efface le password de l'utilisateur
            delete userExist.dataValues.password;
            delete userExist._previousDataValues.password;
            req.session.user = userExist;
            req.session.notification = null;
            res.redirect("/");

          case 20:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  destroy: function destroy(req, res) {
    return regeneratorRuntime.async(function destroy$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            req.session.user = null;
            req.session.notification = {
              message: "D\xE9connexion ok \xE0 bient\xF4t",
              level: "success"
            };
            res.redirect("/");

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  },
  apiStore: function apiStore(req, res) {
    var _req$body2, email, password, userExist, ok;

    return regeneratorRuntime.async(function apiStore$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password; // Validation de l'email

            if (emailValidator(email)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              error: "L'email est incorrect"
            }));

          case 3:
            if (!(password.length < 4)) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              error: "Le mot de passe est trop court"
            }));

          case 5:
            _context3.next = 7;
            return regeneratorRuntime.awrap(User.findOne({
              where: {
                email: email
              }
            }));

          case 7:
            userExist = _context3.sent;

            if (userExist) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              error: "Utilisateur non trouvé"
            }));

          case 10:
            _context3.next = 12;
            return regeneratorRuntime.awrap(Scrypt.compare(password, userExist.password));

          case 12:
            ok = _context3.sent;

            if (ok) {
              _context3.next = 15;
              break;
            }

            return _context3.abrupt("return", res.status(401).json({
              error: "Mot de passe incorrect"
            }));

          case 15:
            // Supprime le mot de passe avant de renvoyer les informations utilisateur
            delete userExist.dataValues.password; // Option 1 : Avec session - Assigne l'utilisateur à la session

            req.session.user = userExist; // Option 2 : Avec JWT - Créer un token pour le front
            // const token = jwt.sign({ id: userExist.id }, process.env.SECRET, { expiresIn: '1h' });

            res.status(200).json({
              message: "Connexion réussie",
              user: userExist // token: token, // à envoyer si JWT

            });

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    });
  }
};
module.exports = {
  sessionController: sessionController
};