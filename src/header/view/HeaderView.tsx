import * as React from 'react';
import store from '@/store/store';
import changeUserName from '@/header/model/actions/changeUserName';

const HeaderView = () => {
  const { headerText } = store.getSelectors();
  store.useSelectors([headerText]);

  return (
    <div>
      <h1>{headerText.value}</h1>
      <label>User name:</label>
      <input onChange={({ target: { value } }) => changeUserName(value)} />
    </div>
  );
};

export default HeaderView;
