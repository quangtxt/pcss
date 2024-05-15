import React, { useState } from "react";
import MentionTextInput from "../../components/MentionTextInput/MentionTextInput";

const DemoTagPage = (props) => {
  const [value, setValue] = useState(
    "Chào @[Nguyễn Ngọc Trường](user:truong1), \n\n với @[Nguyễn Ngọc Trường](user:truong2) cùng với "
  );

  function onChange(event, newValue, newPlainTextValue, mentions) {
    setValue(newValue);
  }

  function send() {
    console.log(value);
  }
  console.log("haa");

  return (
    <>
      <h1>Demo</h1>
      <div className="multiple-triggers">
        <MentionTextInput value={value} readonly={false} onChange={onChange} />
        <button onClick={send}>Gửi</button>
      </div>
    </>
  );
};

export default DemoTagPage;
