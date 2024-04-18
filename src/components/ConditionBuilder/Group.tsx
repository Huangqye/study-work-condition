import { PropsWithChildren, memo, useMemo, useState } from "react";
import { ConditionType } from "./Context";
import { useToggle } from "ahooks";
import classNames from "classnames";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import { Button, Divider, Space } from "antd";
import { EmptyItem, Item } from "./Item";

/**
 * GroupProps
 * @description Group Props
 */
export type GroupProps = {
  data?: ConditionType;
};

const GroupContainer: React.FC<PropsWithChildren<any>> = memo(
  ({ children }) => {
    const [hovering, setHovering] = useState(false);
    return (
      <div
        className={classNames(
          styles.groupContainer,
          hovering && styles.hovering
        )}
        onMouseEnter={(e) => {
          e.stopPropagation();
          setHovering(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setHovering(false);
        }}
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

  //   展示全部还是一个
  const displayData = useMemo(() => {
    return toggleState
      ? props.data?.children
      : props.data?.children?.slice(0, 1);
  }, [props.data?.children, toggleState]);

  return (
    <GroupContainer>
      <aside
        className={classNames(
          props.data?.conjunction === "or" ? styles.or : styles.and
        )}
      >
        <div className={classNames(styles.conjunction)}>
          {props.data?.conjunction === "or" ? <span>或</span> : <span>且</span>}
        </div>
        {(props.data?.children?.length ?? 0) > 1 && (
          <div className={styles.toggle} onClick={toggle}>
            {toggleState ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
          </div>
        )}
      </aside>
      <Space direction={"vertical"} style={{ flex: 1 }}>
        {props.data?.children?.length ? (
          <>
            {displayData?.map((item) =>
              item.conjunction ? (
                <Group data={item} key={item.key} />
              ) : (
                <Item data={item} key={item.key} />
              )
            )}
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
        {toggleState && (
          <Space
            className={classNames(styles.actions)}
            style={{ justifyContent: "flex-start" }}
          >
            <Button type={"link"} size={"small"}>
              添加条件
            </Button>
            <Button type={"link"} size={"small"}>
              添加条件组
            </Button>
            <Button type={"link"} size={"small"}>
              删除组
            </Button>
          </Space>
        )}
      </Space>
    </GroupContainer>
  );
});
