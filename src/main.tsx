import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, UserStore } from "./Store/UserStore.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
	<Provider store={UserStore}>
	<PersistGate loading={null} persistor={persistor}>
		<App />
	</PersistGate>
</Provider>
);
