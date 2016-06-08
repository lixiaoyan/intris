import R from "ramda";

import Input from "./data/input.json";

import storage from "./utils/storage";
import Ticker from "./utils/ticker";
import Keyboard from "./input/keyboard";
import KeyStore from "./input/utils/key-store";
import KeyMapper from "./input/utils/key-mapper";

export default class Game {
  constructor() {
    const ticker = Ticker();
    const input =
      KeyStore(Input.keys)(
        KeyMapper(storage.listen("input.keyboard").map(R.defaultTo(Input.methods.keyboard)))(
          Keyboard(document)));
    this.subscription =
      ticker.sample((count, input) => ({
        count, input
      }), ticker, input)
        .subscribe({});
  }
  destroy() {
    this.subscription.unsubscribe();
  }
}