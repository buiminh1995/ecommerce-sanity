import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
    try {
        if(!stripePromise) {
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        }
    } catch (error) {
        console.log(error)
    }
    return stripePromise;
}

export default getStripe;