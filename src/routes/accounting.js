import React from "react";
import PropTypes from 'prop-types';
import withAuth from "../components/auth/withAuth";
import AccountingView from "../components/accounting/accounting";

const Accounting = (props) => {
  return (
    <AccountingView groupId={props.groupId}/>
  );
}

Accounting.propTypes = {
  groupId: PropTypes.string.isRequired,
};
export default withAuth(Accounting);