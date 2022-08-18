const Utilities = require('./Utilities')
const express = require('express');
const Route = express.Router();
const bodyParser 	= require('body-parser')

const AuthController = require('./controllers/AuthController')
const CrudController = require('./controllers/CrudController')
const SubscriptionController = require('./controllers/SubscriptionController')

/**
 * APIs V1 Routes
 */
Route.route('/api')
	.get((req, res) => Utilities.apiResponse(res, 200, 'Welcome API'))
	.all(Utilities.send405);

Route.route('/api/v1')
	.get((req, res) => Utilities.apiResponse(res, 200, 'APIs V1'))
	.all(Utilities.send405);

Route.route('/api/v1/auth/login')
	.post(AuthController.login)
	.all(Utilities.send405);

Route.route('/api/v1/auth/signup')
	.post(AuthController.signup)
	.all(Utilities.send405);

Route.route('/api/v1/auth/user')
	.get(Utilities.verifyAccessToken, AuthController.getUserDetails)
	.all(Utilities.send405);

Route.route('/api/v1/crud/users')
	.get(CrudController.getAllUsers)
	.all(Utilities.send405);

Route.route('/api/v1/crud/user')
	.post(CrudController.create)
	.all(Utilities.send405);

Route.route('/api/v1/crud/user')
	.get(CrudController.read)
	.all(Utilities.send405);

Route.route('/api/v1/crud/user/:user_id')
	.put(CrudController.update)
	.all(Utilities.send405);

Route.route('/api/v1/crud/user/:user_id')
	.delete(CrudController.delete)
	.all(Utilities.send405);

Route.route('/api/v1/subscription/create-token')
	.post(express.raw({type: 'application/json'}), SubscriptionController.createToken)
	.all(Utilities.send405);

Route.route('/api/v1/subscription/create-payemnt-method')
	.post(express.raw({type: 'application/json'}), SubscriptionController.createPaymentMethod)
	.all(Utilities.send405);

Route.route('/api/v1/subscription/create-subscription')
	.post(express.raw({type: 'application/json'}), SubscriptionController.createSubscription)
	.all(Utilities.send405);

Route.route('/api/v1/subscription/confirm-payemnt-intent')
	.post(express.raw({type: 'application/json'}), SubscriptionController.confirmPaymentIntent)
	.all(Utilities.send405);

Route.route('/api/v1/subscription/webhook')
	.post(express.raw({type: 'application/json'}), SubscriptionController.webhook)
	.all(Utilities.send405);
module.exports = Route