import React, { memo } from "react";
import classNames from "classnames";
import styles from "./index.module.less";
import { Space } from "antd";
import { ConditionType } from "./Context.ts";

/**
 * Actions
 * @description Actions Props
 */
export type Actions = ConditionType;

/**
 * Actions
 * @description Actions Component
 * @constructor
 */
export const Actions: React.FC<Actions> = memo((props) => {
  console.log(props);
  return (
    <Space
      className={classNames(styles.actions)}
      style={{ justifyContent: "flex-start" }}
    >
      <a>添加条件</a>
      <a>添加条件组</a>
      <a>删除组</a>
    </Space>
  );
});
