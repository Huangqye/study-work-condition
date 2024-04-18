import React, { memo } from "react";
import styles from "./index.module.less";
import classNames from "classnames";
import { ConditionType } from "./Context.ts";

/**
 * ItemProps
 * @description Item Props
 */
export type ItemProps = {
  data: Omit<ConditionType, "conjunction" | "children">;
};

/**
 * Item
 * @description Item Component
 * @constructor
 */
export const Item: React.FC<ItemProps> = memo(({ data }) => {
  return (
    <div className={classNames(styles.itemContainer)}>
      <span>{String(data.key)}</span>
    </div>
  );
});

export const EmptyItem = memo(() => {
  return (
    <div className={classNames(styles.itemContainer)}>
      <span>空</span>
    </div>
  );
});
