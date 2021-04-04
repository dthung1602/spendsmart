import React, { useContext } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Select from "../../components/Modal";
import FAB from "../../components/FAB";
import Tab from "../../components/Tab";
import PageHeaderHighLight from "../../parts/PageHeaderHighLight";
import TransactionList from "../../parts/TransactionList";
import { GlobalContext } from "../../GlobalContext";
import { Transaction } from "../../database";
import "./Dashboard.less";

const mockTransactions = [
  new Transaction(
    1,
    new Date(2020, 12, 12),
    "Title 1 and some random words",
    ["Title", "1"],
    ["cat1", "cat2"],
    "cat2",
    "faHome",
    1234.2,
    false,
    new Date(2020, 12, 12),
    new Date(2020, 12, 12),
    undefined
  ),
  new Transaction(
    2,
    new Date(2020, 11, 11),
    "Title 2 and a bunch of words",
    ["Title", "1"],
    ["cat1", "cat2", "cat3", "cat4", "cat5"],
    "cat5",
    "faFaucet",
    1234234,
    true,
    new Date(2020, 11, 11),
    new Date(2020, 11, 11),
    undefined
  ),
  new Transaction(
    3,
    new Date(2020, 10, 10),
    "Title 3 and a bunch of words",
    ["Title", "1"],
    ["cat6"],
    "cat6",
    "faPhone",
    12334,
    false,
    new Date(2020, 10, 10),
    new Date(2020, 10, 10),
    undefined
  ),
  new Transaction(
    4,
    new Date(2020, 9, 9),
    "Title 4 and a bunch of words",
    ["Title", "1"],
    ["cat6"],
    "cat6",
    "faBook",
    12334,
    false,
    new Date(2020, 9, 9),
    new Date(2020, 9, 9),
    undefined
  ),
  new Transaction(
    5,
    new Date(2020, 9, 9),
    "Title 5 and a bunch of words",
    ["Title", "1"],
    ["cat6"],
    "cat6",
    "faWifi",
    12334,
    false,
    new Date(2020, 9, 9),
    new Date(2020, 9, 9),
    undefined
  ),
];

function Dashboard(): JSX.Element {
  const [{ overlayOpen }, updateContext] = useContext(GlobalContext);

  return (
    <div className="dashboard-page">
      <PageHeaderHighLight thisWeek={1234567} thisMonth={12345678} />
      <Tab onTabChange={(tab) => console.log("tab clicked: ", tab)}>
        {Array(10)
          .fill(null)
          .map((v, i) => (
            <Tab.TabPane key={`tab${i}`} tab={`tab${i}`} title={`Tab ${i}`}>
              <div style={{ height: "200px" }}>
                {" "}
                This is the content of tab {i}
              </div>
            </Tab.TabPane>
          ))}
      </Tab>
      <TransactionList transactions={mockTransactions} />
      <FAB
        icon={faPlus}
        type="success"
        hide={overlayOpen}
        onClick={() => updateContext({ overlayOpen: true })}
      />
      <Select
        title="New transaction"
        open={overlayOpen}
        onClose={() => updateContext({ overlayOpen: false })}
      >
        <Select.Option>Option 1</Select.Option>
        <Select.Option>Option 2</Select.Option>
        <Select.Option>Option 3</Select.Option>
        <Select.Option>Option 4</Select.Option>
      </Select>
    </div>
  );
}

export default Dashboard;
