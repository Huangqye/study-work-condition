import { uniqueId } from "lodash-es";
import "./App.css";
import { ConditionBuilder } from "./components/ConditionBuilder";
import { Tag } from "antd";

function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ConditionBuilder
        renderConditionField={(filedProps, indexKey) => {
          return (
            <Tag>
              {filedProps.key} 索引序号:{indexKey}
            </Tag>
          );
        }}
        conditions={[
          {
            key: uniqueId(),
            conjunction: "and",
            children: [
              {
                key: uniqueId(),
              },
              {
                key: uniqueId(),
              },
              {
                key: uniqueId(),
                conjunction: "and",
                children: [
                  {
                    key: uniqueId(),
                    conjunction: "and",
                    children: [
                      {
                        key: uniqueId(),
                      },
                    ],
                  },
                  {
                    key: uniqueId(),
                  },
                ],
              },
              {
                key: uniqueId(),
                conjunction: "or",
                children: [
                  {
                    key: uniqueId(),
                  },
                  {
                    key: uniqueId(),
                  },
                ],
              },
              {
                key: uniqueId(),
                conjunction: "or",
                children: [],
              },
            ],
          },
        ]}
      />
    </div>
  );
}

export default App;
