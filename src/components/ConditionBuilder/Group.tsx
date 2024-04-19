import React, { memo, useMemo } from "react";
import { ConditionType, useDispatch, useHoveringStore } from "./Context.ts";
import { EmptyItem, Item } from "./Item.tsx";
import styles from "./index.module.less";
import { Divider, Space } from "antd";
import classNames from "classnames";
import { useThrottleFn, useToggle } from "ahooks";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Actions } from "./Actions.tsx";
import { uniqueId } from "lodash-es";

/**
 * GroupProps
 * @description Group Props
 */
export type GroupProps = {
  data: ConditionType;
  indexedKey: string;
  hoverable?: boolean;
};

const GroupContainer: React.FC<{ id: React.Key; hoverable?: boolean }> = memo(
  ({ id, hoverable, children }) => {
    const [hoveringId, setHoveringId] = useHoveringStore();

    const setHoveringIdThrottle = useThrottleFn(setHoveringId, {
      wait: 300,
    });

    return (
      <div
        className={classNames(
          styles.groupContainer,
          hoverable && hoveringId === id && styles.hovering
        )}
        onMouseOver={
          !hoverable
            ? undefined
            : (e) => {
                e.stopPropagation();
                if (hoveringId != id) setHoveringIdThrottle.run(id);
              }
        }
        onMouseLeave={
          !hoverable
            ? undefined
            : (e) => {
                e.stopPropagation();
                setHoveringId(undefined);
              }
        }
      >
        {children}
      </div>
    );
  }
);

/**
 * Group
 * @description Group Component
 * @constructor
 */
export const Group: React.FC<GroupProps> = memo((props) => {
  const [toggleState, { toggle, set }] = useToggle(true);
  const dispatch = useDispatch();

  const displayData = useMemo(() => {
    return toggleState
      ? props.data?.children
      : props.data?.children?.slice(0, 1);
  }, [props.data?.children, toggleState]);

  return (
    <GroupContainer
      id={props.data?.key || uniqueId()}
      hoverable={props.hoverable ?? true}
    >
      <aside
        className={classNames(
          props.data?.conjunction === "or" ? styles.or : styles.and
        )}
      >
        <div
          className={classNames(styles.conjunction)}
          title={"点击切换"}
          onClick={() =>
            dispatch({
              type: "CHANGE_CONJUNCTION",
              payload: { ...props.data, indexedKey: props.indexedKey },
            })
          }
        >
          {props.data?.conjunction === "or" ? <span>或</span> : <span>且</span>}
        </div>
        {(props.data?.children?.length ?? 0) > 1 && (
          <div className={styles.toggle} onClick={toggle}>
            {toggleState ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
          </div>
        )}
      </aside>
      <Space direction={"vertical"} className={classNames(styles.content)}>
        {props.data?.children?.length ? (
          <>
            {displayData?.map((item, index) => {
              const indexedKey = `${
                props.indexedKey ? `${props.indexedKey}-` : ""
              }${index}`;
              return item.conjunction ? (
                <Group indexedKey={indexedKey} data={item} key={item.key} />
              ) : (
                <Item indexedKey={indexedKey} data={item} key={item.key} />
              );
            })}
          </>
        ) : (
          <EmptyItem />
        )}
        {!toggleState && (
          <Divider className={styles.divider}>
            <span onClick={() => set(true)}>
              展开全部 <ArrowDownOutlined />
            </span>
          </Divider>
        )}
        {/* 操作按钮 */}
        {toggleState && props.data && (
          <Actions indexedKey={props.indexedKey} {...props.data} />
        )}
      </Space>
    </GroupContainer>
  );
});
