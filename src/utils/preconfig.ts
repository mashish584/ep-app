import Building from "../components/SVG/Building";
import Power from "../components/SVG/Power";
import Wallet from "../components/SVG/Wallet";

export const EventCategories = ["Tailgating", "Outdoor", "House", "Inaugration", "Match"];

export const SetttingsMenu = [
	{
		icon: Wallet,
		title: "Transactions",
		description: "Check all in and out transactions.",
	},
	{
		icon: Building,
		title: "Events",
		description: "Check all the events you've created.",
	},
	{
		icon: Power,
		title: "Logout",
		description: "",
		isLogout: true,
	},
];
