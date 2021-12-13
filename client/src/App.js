import { Provider } from 'react-redux'

import { IndexRouter } from "./router/IndexRouter";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";


function App() {

    return (
        <>
            <Provider store={ store }>
                <BrowserRouter>
                    <IndexRouter/>
                </BrowserRouter>
            </Provider>
        </>
    );
}

export default App;
