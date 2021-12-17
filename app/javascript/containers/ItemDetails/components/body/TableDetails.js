import React from "react";
import CurrencyFormat from "react-currency-format";
import CSSModules from "react-css-modules";
import style from "../../styles/body.module.scss";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import { formatDate, fullAddress } from "../../../../utils";

const TableDetails = ({ item }) => {
  const apartment = item.apartment;
  return (
    <>
      <div styleName="body__title">Details</div>
      <Table borderless responsive hover styleName="body__table">
        <tbody>
          <tr>
            <th scope="row">Full Address</th>
            <td>{fullAddress(apartment.rent_address)}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th scope="row">Initial Start Date</th>
            <td>{formatDate(item.initial_start_date)}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th scope="row">Initial End Date</th>
            <td>{formatDate(item.initial_end_date)}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th scope="row">Area</th>
            <td>
              {apartment.size} m<sup>2</sup>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th scope="row">Initial allowance</th>
            <td>{apartment.initial_allowance} person(s)</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th scope="row">Max allowance</th>
            <td>{apartment.max_allowance} person(s)</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th scope="row">Person Exceed Fee</th>
            <td>
              <CurrencyFormat
                value={apartment.extra_fee_each_person}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
export default CSSModules(TableDetails, style);
