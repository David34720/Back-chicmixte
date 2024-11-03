"use strict";

var homeController = {
  index: function index(req, res) {
    var notification;
    return regeneratorRuntime.async(function index$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            notification = req.session.notification || null;
            req.session.notification = null;
            res.render("index", {
              notification: notification
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};
module.exports = {
  homeController: homeController
};