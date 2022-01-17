import { useMutation } from "@apollo/client";
import { useStripe } from "@stripe/stripe-react-native";
import { BOOK_EVENT, CONFIRM_BOOK_EVENT } from "../config/mutations";
import { BookEventRequestVariables, BookEventResponse, ConfirmBookingRequestVariable, ConfirmBookingResponse } from "../config/request.types";
import { useAuth } from "../utils/store";

export const usePayment = () => {
	const customerId = useAuth((state) => state.user?.stripe_customer_id);
	const { initPaymentSheet, presentPaymentSheet } = useStripe();

	const [confirmBooking] = useMutation<ConfirmBookingResponse, ConfirmBookingRequestVariable>(CONFIRM_BOOK_EVENT, {
		onCompleted: (response) => {},
		onError: (err) => {
			console.log({ err });
		},
	});

	const [fetchPaymentSheetParam] = useMutation<BookEventResponse, BookEventRequestVariables>(BOOK_EVENT, {
		onCompleted: async ({ bookEvent }) => {
			const { error } = await initPaymentSheet({
				paymentIntentClientSecret: bookEvent.paymentIntent,
				customerEphemeralKeySecret: bookEvent.ephemeralKey,
				customerId,
			});

			if (!error) {
				const response = await presentPaymentSheet();

				if (!response.error) {
					confirmBooking({ variables: { event: bookEvent.eventId, paymentId: bookEvent.paymentId } });
				}
			}

			return { error };
		},
		onError: (err) => {
			console.log({ err });
		},
	});

	return { fetchPaymentSheetParam };
};
