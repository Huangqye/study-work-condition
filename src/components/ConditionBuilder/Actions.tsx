import React, { memo } from "react";
import classNames from "classnames";
import styles from "./index.module.less";
import { Space } from "antd";
import { ConditionType, useDispatch } from "./Context.ts";

/**
 * Actions
 * @description Actions Props
 */
export type Actions = {
  data: ConditionType;
  indexedKey: string;
};

/**
 * Actions
 * @description Actions Component
 * @constructor
 */
export const Actions: React.FC<Actions> = memo((props) => {
  const dispatch = useDispatch();
  const payload = {
    ...props.data,
    indexedKey: props.indexedKey,
  };
  const allowDeletion = props.indexedKey !== "0";
  return (
    <Space
      className={classNames(styles.actions)}
      style={{ justifyContent: "flex-start" }}
    >
      <a onClick={() => dispatch({ type: "ADD_CONDITION", payload })}>
        添加条件
      </a>
      <a onClick={() => dispatch({ type: "ADD_CONDITION_GROUP", payload })}>
        添加条件组
      </a>
      {allowDeletion && (
        <a
          onClick={() => dispatch({ type: "DELETE_CONDITION_GROUP", payload })}
        >
          删除组
        </a>
      )}
    </Space>
  );
});
