import React, { memo } from "react";
import classNames from "classnames";
import styles from "./index.module.less";
import { Space } from "antd";
import { ConditionType, useDispatch } from "./Context.ts";

/**
 * Actions
 * @description Actions Props
 */
export type Actions = ConditionType & {
  indexedKey: string;
};

/**
 * Actions
 * @description Actions Component
 * @constructor
 */
export const Actions: React.FC<Actions> = memo((props) => {
  const dispatch = useDispatch();
  return (
    <Space
      className={classNames(styles.actions)}
      style={{ justifyContent: "flex-start" }}
    >
      <a onClick={() => dispatch({ type: "ADD_CONDITION", payload: props })}>
        添加条件
      </a>
      <a
        onClick={() =>
          dispatch({ type: "ADD_CONDITION_GROUP", payload: props })
        }
      >
        添加条件组
      </a>
      <a
        onClick={() =>
          dispatch({ type: "DELETE_CONDITION_GROUP", payload: props })
        }
      >
        删除组
      </a>
    </Space>
  );
});
