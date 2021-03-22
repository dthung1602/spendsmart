import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Select from "../../components/Modal";
import FAB from "../../components/FAB";
import PageHeaderHighLight from "../../parts/PageHeaderHighLight";
import "./Dashboard.less";

function Dashboard(): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="dashboard-page">
      <PageHeaderHighLight thisWeek={1234567} thisMonth={12345678} />
      <FAB icon={faPlus} type="success" onClick={() => setOpen(true)} />
      <Select
        title="New transaction"
        open={open}
        onClose={() => setOpen(false)}
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
