import * as v1 from "./v1.js";
import * as v2 from "./v2.js";

export * from "./v2.js";

export { v1, v2 };
export default {
    ...v2,
    v2,
    v1
};
