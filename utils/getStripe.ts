import {loadStripe} from "@stripe/stripe-js";

let stripePromise : any;

const getStripe = () => {
    if(!stripePromise){
        stripePromise = loadStripe((process.env.NEXT_PUBLIC_STRIPE_API_KEY!).toString());
    }

    return stripePromise;
}

export default getStripe;