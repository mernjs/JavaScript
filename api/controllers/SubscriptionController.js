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
            let { card_number, exp_month, exp_year, cvc } = req.body
            const card = {
                number: card_number,
                exp_month: exp_month,
                exp_year: exp_year,
                cvc: cvc,
            }
            console.log('createToken ===>>>', card)
            const token = await stripe.tokens.create({card})
            Utilities.apiResponse(res, 200, 'Token Has Been Create Successfully!', token)
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    async createPaymentMethod(req, res){
        try {
            let { card_number, exp_month, exp_year, cvc } = req.body
            const card = {
                number: card_number,
                exp_month: exp_month,
                exp_year: exp_year,
                cvc: cvc,
            }
            const paymentMethod = await stripe.paymentMethods.create({type: 'card', card});
            Utilities.apiResponse(res, 200, 'Token Has Been Create Successfully!', paymentMethod)
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    async createSubscription(req, res){
        try {
            let { email, name, source } = req.body
            const stripeCustomer = await stripe.customers.create({email, name, source})
            const planId = 'price_1LHpILDWHqk2O3AcSpuiPATB'
            const subscription = await stripe.subscriptions.create({
                customer: stripeCustomer.id,
                description: "Subscription Purchase",
                items: [
                    {price: planId},
                ],
                payment_behavior: 'default_incomplete',
                expand: ['latest_invoice.payment_intent'],
            })
            Utilities.apiResponse(res, 200, 'Subscription Has Been Created Successfully!', subscription)
        } catch (error) {
            Utilities.apiResponse(res, 500, error)
        }
    }

    async confirmPaymentIntent(req, res){
        try {
            let { payment_method, payment_intent } = req.body
            const paymentIntent = await stripe.paymentIntents.confirm(payment_intent,{payment_method: payment_method})
            Utilities.apiResponse(res, 200, 'Subscription Has Been Created Successfully!', paymentIntent)
        } catch (error) {
            Utilities.apiResponse(res, 500, error.message)
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

            console.log('endpointSecret ===>>>>', endpointSecret,"<<<<<====== endpointSecretEnd")
            console.log('signature ===>>>>', sig , "<<<<<====== signatureEnd")
            console.log('req.rawBody ===>>>', req.rawBody,"<<<<<====== rawBodyEnd")
            console.log('req.body ===>>>', req.body,"<<<<<====== bodyEnd")
            const payload = {
                id: req.body.id,
                object: 'event',
            }
            const payloadString = JSON.stringify(payload, null, 2);
              
            const header = stripe.webhooks.generateTestHeaderString({
                payload: payloadString,
                endpointSecret,
            });

            console.log('payloadString ====>>>>>>>', payloadString, "<<<<<========payloadStringEnd")
            console.log('header ====>>>>>>>', header, "<<<<<=======headerEnd")

            let event;
            try {
                
                event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
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