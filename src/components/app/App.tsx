import * as React from "react";
import {ReactElement} from "react";

import ProductList from "../product-list/ProductList";
import shopStore from "../../model/ShopStore";

class App extends React.Component<any, any> {
    public render(): ReactElement<any> {
        return (
            <div className="app">
                <h1>Discount Ascii Warehouse</h1>
                <ProductList shopStore={shopStore}/>
            </div>
        );
    }
}

export default App;
