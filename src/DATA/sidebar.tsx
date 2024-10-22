import { FaCity } from "react-icons/fa";
import { HiHome } from "react-icons/hi";

interface sidebarTab {
	id: number;
	label: string;
	path: string;
	icon: React.ReactNode;
}

export const sidebarTabs: sidebarTab[] = [
	{ id: 1, label: "Home", path: "/", icon: <HiHome size={24} /> },
	{ id: 2, label: "Cities", path: "/city", icon: <FaCity size={24} /> },
];
