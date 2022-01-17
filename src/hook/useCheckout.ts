import { useMutation } from "@apollo/client";
import { useStripe } from "@stripe/stripe-react-native";
import { BOOK_EVENT } from "../config/mutations";
import { BookEventRequestVariables, BookEventResponse } from "../config/request.types";

export const usePayment = () => {
	const { initPaymentSheet, presentPaymentSheet } = useStripe();

	const [fetchPaymentSheetParam] = useMutation<BookEventResponse, BookEventRequestVariables>(BOOK_EVENT, {
		onCompleted: async ({ bookEvent }) => {
			console.log({ bookEvent });
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
		onError: (err) => {
			console.log({ err });
		},
	});

	return { fetchPaymentSheetParam };
};
