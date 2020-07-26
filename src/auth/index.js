import * as utils from "./utils";
import * as strategies from "./strategy";

const pipe = (...functions) => (args) =>
  functions.reduce((arg, fn) => fn(arg), args);

const initialiseAuthentication = (app) => {
  utils.setup();

  pipe(strategies.FacebookStrategy)(app);
};

export { utils, initialiseAuthentication, strategies };
