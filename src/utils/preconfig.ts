import Building from "../components/SVG/Building";
import Power from "../components/SVG/Power";
import Wallet from "../components/SVG/Wallet";
import { SettingsItem } from "../types";

export const defaultAvatar = "https://avatars.dicebear.com/v2/identicon/8b2a644a959335af9df45bb9710df09e.png";

export const EventCategories = ["Tailgating", "Outdoor", "House", "Inaugration", "Match"];

export const SetttingsMenu: SettingsItem[] = [
	{
		icon: Wallet,
		title: "Transactions",
		description: "Check all in and out transactions.",
		navigation: "TransactionsList",
	},
	{
		icon: Building,
		title: "Events",
		description: "Check all the events you've created.",
		navigation: "MyEventsList",
	},
	{
		icon: Power,
		title: "Logout",
		description: "",
		isLogout: true,
	},
];
