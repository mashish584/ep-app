import { useMutation } from "@apollo/client";
import { useStripe } from "@stripe/stripe-react-native";
import { BOOK_EVENT } from "../config/mutations";
import { BookEventRequestVariables, BookEventResponse } from "../config/request.types";
import { useAuth } from "../utils/store";

export const usePayment = () => {
	const customerId = useAuth((state) => state.user?.stripe_customer_id);
	const { initPaymentSheet, presentPaymentSheet } = useStripe();

	const [fetchPaymentSheetParam] = useMutation<BookEventResponse, BookEventRequestVariables>(BOOK_EVENT, {
		onCompleted: async ({ bookEvent }) => {
			const { error } = await initPaymentSheet({
				paymentIntentClientSecret: bookEvent.paymentIntent,
				customerEphemeralKeySecret: bookEvent.ephemeralKey,
				customerId,
			});

			if (!error) {
				return presentPaymentSheet();
			}

			return { error };
		},
		onError: (err) => {
			console.log({ err });
		},
	});

	return { fetchPaymentSheetParam };
};
