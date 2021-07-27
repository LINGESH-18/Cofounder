import React, { Fragment } from "react";
import Moment from "moment";
import { connect } from "react-redux";

const Education = ({ education }) => {
  const educations = education.map((edu) => {
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td className="hide-sm">
        <Moment format="yyyy/mm/dd">{edu.from}</Moment>
      </td>{" "}
      -{" "}
      {(edu.to = null ? "Now" : <Moment format="yyyy/mm/dd">{edu.to}</Moment>)}
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>;
  });
  return (
    <>
      <h2 className="my-2">education credential</h2>
      <table className="head">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

export default connect()(Education);
