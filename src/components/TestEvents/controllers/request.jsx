import React from 'react';
import RequestPanel from '@components/Request/requestPanel';

const RequestCtrl = (props) => {
  const { value, onChange } = props;

  const handleChange = (key, value) => {
    console.log(key, value, '999999999');
  };

  return (
    <div>
      <div></div>
      <div className="top">
        <RequestPanel data={value?.request || {}} onChange={handleChange} />
      </div>
    </div>
  );
};

export default RequestCtrl;
