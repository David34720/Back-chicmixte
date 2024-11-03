const homeController = {
	async index(req, res) {
		const notification = req.session.notification || null;
		req.session.notification = null;

		res.render("index", { notification });
	},
};

module.exports = { homeController };
