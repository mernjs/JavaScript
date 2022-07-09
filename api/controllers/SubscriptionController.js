const Utilities = require('../Utilities')
const User = require('../models/User')
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

class SubscriptionController {

    async createPlan(req, res){
        try {
            Utilities.apiResponse(res, 200, 'Plan Has Been Created Successfully!', {...user._doc, accessToken})
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    async createToken(req, res){
        try {
            Utilities.apiResponse(res, 200, 'Token Has Been Create Successfully!', {...user._doc, accessToken})
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    async createSubscription(req, res){
        try {
            Utilities.apiResponse(res, 200, 'Subscription Has Been Created Successfully!', {...data, accessToken})
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    async cancelSubscription(req, res){
        try {
            Utilities.apiResponse(res, 200, 'Subscription Has Been Canceled Successfully', users)
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    async webhook(req, res){
        try {
            const endpointSecret = process.env.WEBHOOK_SECRET_KEY
            const sig = req.headers['stripe-signature'];

            console.log('endpointSecret', {endpointSecret, sig})
            let event;
            try {
                event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            } catch (err) {
                console.log('err.message ===>>>', err.message)
                return Utilities.apiResponse(res, 400, err.message, [])
            }
            consol.log('event.type', event.type)
            switch (event.type) {
                case 'payment_intent.canceled':
                  const paymentIntentCanceled = event.data.object;
                  consol.log('payment_intent.canceled ====>>>>>', paymentIntentCanceled)
                  break;
                case 'payment_intent.created':
                  const paymentIntentCreated = event.data.object;
                  consol.log('payment_intent.created ====>>>>>', paymentIntentCreated)
                  break;
                case 'payment_intent.succeeded':
                  const paymentIntentSucceeded = event.data.object;
                  consol.log('payment_intent.succeeded ====>>>>>', paymentIntentSucceeded)
                  break;
                default:
                  console.log(`Unhandled event type ====>>>>> ${event.type}`);
            }
            consol.log('event.event ====>>>>>', event)
            Utilities.apiResponse(res, 200, 'Get User Details Successfully', {event: event, type: event.type})
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

}

module.exports = new SubscriptionController();