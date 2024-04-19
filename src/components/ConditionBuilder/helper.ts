import {uniqueId} from "lodash-es";

export function generateKey() {
  // 说明：你也可以使用一个自增变量，每次调用自增1
  return uniqueId();
}
