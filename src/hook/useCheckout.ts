import { useLazyQuery } from "@apollo/client";
import { useStripe } from "@stripe/stripe-react-native";
import { BOOK_EVENT } from "../config/query";
import { BookEventRequestVariables, BookEventResponse } from "../config/request.types";

export const usePayment = () => {
	const { initPaymentSheet, presentPaymentSheet } = useStripe();

	const [fetchPaymentSheetParam] = useLazyQuery<BookEventResponse, BookEventRequestVariables>(BOOK_EVENT, {
		onCompleted: async ({ bookEvent }) => {
			const { error } = await initPaymentSheet({
				paymentIntentClientSecret: bookEvent.paymentIntent,
				customerEphemeralKeySecret: bookEvent.ephemeralKey,
				// customerId: customer,
			});

			if (!error) {
				return presentPaymentSheet();
			}

			return { error };
		},
	});

	return { fetchPaymentSheetParam };
};
