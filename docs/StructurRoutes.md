src/
├── controllers/
│   ├── adminController.js
│   ├── attributeController.js
│   ├── categoryController.js
│   ├── homeController.js
│   ├── productController.js
│   ├── registerController.js
│   └── sessionController.js
├── middlewares/
│   ├── auth.js
│   ├── handlers.js
│   ├── initSession.js
│   ├── initUserSession.js
│   └── isAdmin.js
├── models/
│   └── ... (vos modèles Sequelize)
├── routes/
│   ├── adminRouter.js
│   ├── apiRouter.js
│   ├── authRouter.js
│   ├── attributeRouter.js
│   ├── categoryRouter.js
│   └── productRouter.js
├── server/
│   └── websocket-server.js
├── views/
│   └── ... (vos vues EJS)
├── app.js
└── server.js
