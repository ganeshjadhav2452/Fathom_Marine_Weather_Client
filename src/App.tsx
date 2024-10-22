import Cities from "./pages/cities/Cities";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageView from "./pages/pageView/PageView";

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PageView />}>
					<Route path="" element={<Home />} />
					<Route path="city" element={<Cities />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
