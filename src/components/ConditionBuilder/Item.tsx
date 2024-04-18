import React, { memo } from "react";
import styles from "./index.module.less";
import classNames from "classnames";
import { ConditionType, useRenderField } from "./Context.ts";
import { DeleteOutlined } from "@ant-design/icons";

/**
 * ItemProps
 * @description Item Props
 */
export type ItemProps = {
  data: Omit<ConditionType, "conjunction" | "children">;
  indexedKey: string;
};

/**
 * Item
 * @description Item Component
 * @constructor
 */
export const Item: React.FC<ItemProps> = memo(({ data, indexedKey }) => {
  const renderField = useRenderField();
  return (
    <div className={classNames(styles.itemContainer)}>
      {renderField?.(data, indexedKey)}
      <DeleteOutlined style={{ cursor: "pointer", marginLeft: 20 }} />
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
