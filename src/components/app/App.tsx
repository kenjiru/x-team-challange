import * as React from "react";
import {ReactElement} from "react";
import {Provider} from "mobx-react";

import ProductList from "../product-list/ProductList";
import shopStore from "../../model/ShopStore";

import "./App.less";

class App extends React.Component<any, any> {
    public render(): ReactElement<any> {
        return (
            <Provider shopStore={shopStore}>
                <div className="app">
                    <header>
                        <h1>Discount Ascii Warehouse</h1>

                        <p>Here you're sure to find a bargain on some of the finest ascii available to purchase.
                            Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>

                        <p>But first, a word from our sponsors:</p>

                        <img className="ad" src={"/ad/?r=" + Math.floor(Math.random() * 1000)}/>
                    </header>

                    <section className="products">
                        <ProductList/>
                    </section>
                </div>
            </Provider>
        );
    }
}

export default App;
