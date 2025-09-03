import React, {useState} from 'react'
import TableCell from './TableCell';
import "./Table.css";

const Table = () => {
     const currentDate = new Date();
     const upcomingDays = Array.from({ length: 7 }, (_, i) => {
       const nextDate = new Date(currentDate);
       nextDate.setDate(currentDate.getDate() + i);

       return {
         day: nextDate.toLocaleDateString("en-US", { weekday: "long" }), // e.g. Tuesday
         date: `${nextDate.getDate()} ${nextDate.toLocaleDateString("en-US", {
           month: "short",
         })} ${nextDate.getFullYear()}`, // e.g. 20 Aug 2025
       };
     });

  
  return (
    <div>
      <form>
        <table className="menu_table">
          <tr>
            <th>Time/Days</th>
            {upcomingDays.map((d, index) => (
              <th key={index}>
                {d.day}
                <br />
                {d.date}
              </th>
            ))}
          </tr>

          <tr>
            <td>8:00 am - 9:00 am</td>
            {upcomingDays.map((d, i) => (
              <TableCell
                key={i}
                day={d.day}
                date={d.date}
                time="8:00 am - 9:00 am"
              />
            ))}
          </tr>
          <tr>
            <td>9:00 am - 10:00 am</td>
            {upcomingDays.map((d, i) => (
              <TableCell
                key={i}
                day={d.day}
                date={d.date}
                time="9:00 am - 10:00 am"
              />
            ))}
          </tr>
          <tr>
            <td>10:00 am - 11:00 am</td>
            {upcomingDays.map((d, i) => (
              <TableCell
                key={i}
                day={d.day}
                date={d.date}
                time="10:00 am - 11:00 am"
              />
            ))}
          </tr>
          <tr>
            <td>11:00 am - 12:00 pm</td>
            {upcomingDays.map((d, i) => (
              <TableCell
                key={i}
                day={d.day}
                date={d.date}
                time="11:00 am - 12:00 pm"
              />
            ))}
          </tr>
          <tr>
            <td>12:00 pm - 1:00 pm</td>
            {upcomingDays.map((d, i) => (
              <TableCell
                key={i}
                day={d.day}
                date={d.date}
                time="12:00 pm - 1:00 pm"
              />
            ))}
          </tr>
          <tr>
            <td>1:00 pm - 2:00 pm</td>
            {upcomingDays.map((d, i) => (
              <TableCell
                key={i}
                day={d.day}
                date={d.date}
                time="1:00 pm - 2:00 pm"
              />
            ))}
          </tr>
          <tr>
            <td>2:00 pm - 3:00 pm</td>
            {upcomingDays.map((d, i) => (
              <TableCell
                key={i}
                day={d.day}
                date={d.date}
                time="2:00 pm - 3:00 pm"
              />
            ))}
          </tr>
          <tr>
            <td>3:00 pm - 4:00 pm</td>
            {upcomingDays.map((d, i) => (
              <TableCell
                key={i}
                day={d.day}
                date={d.date}
                time="3:00 pm - 4:00 pm"
              />
            ))}
          </tr>
          <tr>
            <td>4:00 pm - 5:00 pm</td>
            {upcomingDays.map((d, i) => (
              <TableCell
                key={i}
                day={d.day}
                date={d.date}
                time="4:00 pm - 5:00 pm"
              />
            ))}
          </tr>
          <tr>
            <td>5:00 pm - 6:00 pm</td>
            {upcomingDays.map((d, i) => (
              <TableCell
                key={i}
                day={d.day}
                date={d.date}
                time="5:00 pm - 6:00 pm"
              />
            ))}
          </tr>
          <tr>
            <td>6:00 pm - 7:00 pm</td>
            {upcomingDays.map((d, i) => (
              <TableCell
                key={i}
                day={d.day}
                date={d.date}
                time="6:00 pm - 7:00 pm"
              />
            ))}
          </tr>
          <tr>
            <td>7:00 pm - 8:00 pm</td>
            {upcomingDays.map((d, i) => (
              <TableCell
                key={i}
                day={d.day}
                date={d.date}
                time="7:00 pm - 8:00 pm"
              />
            ))}
          </tr>
          <tr>
            <td>8:00 pm - 9:00 pm</td>
            {upcomingDays.map((d, i) => (
              <TableCell
                key={i}
                day={d.day}
                date={d.date}
                time="8:00 pm - 9:00 pm"
              />
            ))}
          </tr>
          <tr>
            <td>9:00 pm - 10:00 pm</td>
            {upcomingDays.map((d, i) => (
              <TableCell
                key={i}
                day={d.day}
                date={d.date}
                time="9:00 pm - 10:00 pm"
              />
            ))}
          </tr>
        </table>
      </form>
    </div>
  );
}

export default Table
