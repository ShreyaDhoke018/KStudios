import React, {useState} from 'react'
import TableCell from './TableCell';
import "./Table.css";

const Table = () => {
     const currentDate = new Date();
     const currentDayIndex = currentDate.getDay();
     const daysOfWeek = [
       "Sunday",
       "Monday",
       "Tuesday",
       "Wednesday",
       "Thursday",
       "Friday",
       "Saturday",
     ];
    const upcomingDays = Array.from({ length: 7 }, (_, i) => {
      return daysOfWeek[(currentDayIndex + i) % 7];
    });
  
  return (
    <div>
      <form>
        <table className="menu_table">
          <tr>
            <th>Time/Days</th>
            {upcomingDays.map((day, index) => (
              <th key={index}>{day}</th>
            ))}
          </tr>

          <tr>
            <td>8:00 am - 9:00 am</td>
            <TableCell day={upcomingDays[0]} time="8:00 am - 9:00 am" />
            <TableCell day={upcomingDays[1]} time="8:00 am - 9:00 am" />
            <TableCell day={upcomingDays[2]} time="8:00 am - 9:00 am" />
            <TableCell day={upcomingDays[3]} time="8:00 am - 9:00 am" />
            <TableCell day={upcomingDays[4]} time="8:00 am - 9:00 am" />
            <TableCell day={upcomingDays[5]} time="8:00 am - 9:00 am" />
            <TableCell day={upcomingDays[6]} time="8:00 am - 9:00 am" />
          </tr>
          <tr>
            <td>9:00 am - 10:00 am</td>
            <TableCell day={upcomingDays[0]} time="9:00 am - 10:00 am" />
            <TableCell day={upcomingDays[1]} time="9:00 am - 10:00 am" />
            <TableCell day={upcomingDays[2]} time="9:00 am - 10:00 am" />
            <TableCell day={upcomingDays[3]} time="9:00 am - 10:00 am" />
            <TableCell day={upcomingDays[4]} time="9:00 am - 10:00 am" />
            <TableCell day={upcomingDays[5]} time="9:00 am - 10:00 am" />
            <TableCell day={upcomingDays[6]} time="9:00 am - 10:00 am" />
          </tr>
          <tr>
            <td>10:00 am - 11:00 am</td>
            <TableCell day={upcomingDays[0]} time="10:00 am - 11:00 am" />
            <TableCell day={upcomingDays[1]} time="10:00 am - 11:00 am" />
            <TableCell day={upcomingDays[2]} time="10:00 am - 11:00 am" />
            <TableCell day={upcomingDays[3]} time="10:00 am - 11:00 am" />
            <TableCell day={upcomingDays[4]} time="10:00 am - 11:00 am" />
            <TableCell day={upcomingDays[5]} time="10:00 am - 11:00 am" />
            <TableCell day={upcomingDays[6]} time="10:00 am - 11:00 am" />
          </tr>
          <tr>
            <td>11:00 am - 12:00 am</td>
            <TableCell day={upcomingDays[0]} time="11:00 am - 12:00 am" />
            <TableCell day={upcomingDays[1]} time="11:00 am - 12:00 am" />
            <TableCell day={upcomingDays[2]} time="11:00 am - 12:00 am" />
            <TableCell day={upcomingDays[3]} time="11:00 am - 12:00 am" />
            <TableCell day={upcomingDays[4]} time="11:00 am - 12:00 am" />
            <TableCell day={upcomingDays[5]} time="11:00 am - 12:00 am" />
            <TableCell day={upcomingDays[6]} time="11:00 am - 12:00 am" />
          </tr>
          <tr>
            <td>12:00 pm - 1:00 pm</td>
            <TableCell day={upcomingDays[0]} time="12:00 pm - 1:00 pm" />
            <TableCell day={upcomingDays[1]} time="12:00 pm - 1:00 pm" />
            <TableCell day={upcomingDays[2]} time="12:00 pm - 1:00 pm" />
            <TableCell day={upcomingDays[3]} time="12:00 pm - 1:00 pm" />
            <TableCell day={upcomingDays[4]} time="12:00 pm - 1:00 pm" />
            <TableCell day={upcomingDays[5]} time="12:00 pm - 1:00 pm" />
            <TableCell day={upcomingDays[6]} time="12:00 pm - 1:00 pm" />
          </tr>
          <tr>
            <td>1:00 pm - 2:00 pm</td>
            <TableCell day={upcomingDays[0]} time="1:00 pm - 2:00 pm" />
            <TableCell day={upcomingDays[1]} time="1:00 pm - 2:00 pm" />
            <TableCell day={upcomingDays[2]} time="1:00 pm - 2:00 pm" />
            <TableCell day={upcomingDays[3]} time="1:00 pm - 2:00 pm" />
            <TableCell day={upcomingDays[4]} time="1:00 pm - 2:00 pm" />
            <TableCell day={upcomingDays[5]} time="1:00 pm - 2:00 pm" />
            <TableCell day={upcomingDays[6]} time="1:00 pm - 2:00 pm" />
          </tr>
          <tr>
            <td>2:00 pm - 3:00 pm</td>
            <TableCell day={upcomingDays[0]} time="2:00 pm - 3:00 pm" />
            <TableCell day={upcomingDays[1]} time="2:00 pm - 3:00 pm" />
            <TableCell day={upcomingDays[2]} time="2:00 pm - 3:00 pm" />
            <TableCell day={upcomingDays[3]} time="2:00 pm - 3:00 pm" />
            <TableCell day={upcomingDays[4]} time="2:00 pm - 3:00 pm" />
            <TableCell day={upcomingDays[5]} time="2:00 pm - 3:00 pm" />
            <TableCell day={upcomingDays[6]} time="2:00 pm - 3:00 pm" />
          </tr>
          <tr>
            <td>3:00 pm - 4:00 pm</td>
            <TableCell day={upcomingDays[0]} time="3:00 pm - 4:00 pm" />
            <TableCell day={upcomingDays[1]} time="3:00 pm - 4:00 pm" />
            <TableCell day={upcomingDays[2]} time="3:00 pm - 4:00 pm" />
            <TableCell day={upcomingDays[3]} time="3:00 pm - 4:00 pm" />
            <TableCell day={upcomingDays[4]} time="3:00 pm - 4:00 pm" />
            <TableCell day={upcomingDays[5]} time="3:00 pm - 4:00 pm" />
            <TableCell day={upcomingDays[6]} time="3:00 pm - 4:00 pm" />
          </tr>
          <tr>
            <td>4:00 pm - 5:00 pm</td>
            <TableCell day={upcomingDays[0]} time="4:00 pm - 5:00 pm" />
            <TableCell day={upcomingDays[1]} time="4:00 pm - 5:00 pm" />
            <TableCell day={upcomingDays[2]} time="4:00 pm - 5:00 pm" />
            <TableCell day={upcomingDays[3]} time="4:00 pm - 5:00 pm" />
            <TableCell day={upcomingDays[4]} time="4:00 pm - 5:00 pm" />
            <TableCell day={upcomingDays[5]} time="4:00 pm - 5:00 pm" />
            <TableCell day={upcomingDays[6]} time="4:00 pm - 5:00 pm" />
          </tr>
          <tr>
            <td>5:00 pm - 6:00 pm</td>
            <TableCell day={upcomingDays[0]} time="5:00 pm - 6:00 pm" />
            <TableCell day={upcomingDays[1]} time="5:00 pm - 6:00 pm" />
            <TableCell day={upcomingDays[2]} time="5:00 pm - 6:00 pm" />
            <TableCell day={upcomingDays[3]} time="5:00 pm - 6:00 pm" />
            <TableCell day={upcomingDays[4]} time="5:00 pm - 6:00 pm" />
            <TableCell day={upcomingDays[5]} time="5:00 pm - 6:00 pm" />
            <TableCell day={upcomingDays[6]} time="5:00 pm - 6:00 pm" />
          </tr>
          <tr>
            <td>6:00 pm - 7:00 pm</td>
            <TableCell day={upcomingDays[0]} time="6:00 pm - 7:00 pm" />
            <TableCell day={upcomingDays[1]} time="6:00 pm - 7:00 pm" />
            <TableCell day={upcomingDays[2]} time="6:00 pm - 7:00 pm" />
            <TableCell day={upcomingDays[3]} time="6:00 pm - 7:00 pm" />
            <TableCell day={upcomingDays[4]} time="6:00 pm - 7:00 pm" />
            <TableCell day={upcomingDays[5]} time="6:00 pm - 7:00 pm" />
            <TableCell day={upcomingDays[6]} time="6:00 pm - 7:00 pm" />
          </tr>
          <tr>
            <td>7:00 pm - 8:00 pm</td>
            <TableCell day={upcomingDays[0]} time="7:00 pm - 8:00 pm" />
            <TableCell day={upcomingDays[1]} time="7:00 pm - 8:00 pm" />
            <TableCell day={upcomingDays[2]} time="7:00 pm - 8:00 pm" />
            <TableCell day={upcomingDays[3]} time="7:00 pm - 8:00 pm" />
            <TableCell day={upcomingDays[4]} time="7:00 pm - 8:00 pm" />
            <TableCell day={upcomingDays[5]} time="7:00 pm - 8:00 pm" />
            <TableCell day={upcomingDays[6]} time="7:00 pm - 8:00 pm" />
          </tr>
          <tr>
            <td>8:00 pm - 9:00 pm</td>
            <TableCell day={upcomingDays[0]} time="8:00 pm - 9:00 pm" />
            <TableCell day={upcomingDays[1]} time="8:00 pm - 9:00 pm" />
            <TableCell day={upcomingDays[2]} time="8:00 pm - 9:00 pm" />
            <TableCell day={upcomingDays[3]} time="8:00 pm - 9:00 pm" />
            <TableCell day={upcomingDays[4]} time="8:00 pm - 9:00 pm" />
            <TableCell day={upcomingDays[5]} time="8:00 pm - 9:00 pm" />
            <TableCell day={upcomingDays[6]} time="8:00 pm - 9:00 pm" />
          </tr>
          <tr>
            <td>9:00 pm - 10:00 pm</td>
            <TableCell day={upcomingDays[0]} time="9:00 pm - 10:00 pm" />
            <TableCell day={upcomingDays[1]} time="9:00 pm - 10:00 pm" />
            <TableCell day={upcomingDays[2]} time="9:00 pm - 10:00 pm" />
            <TableCell day={upcomingDays[3]} time="9:00 pm - 10:00 pm" />
            <TableCell day={upcomingDays[4]} time="9:00 pm - 10:00 pm" />
            <TableCell day={upcomingDays[5]} time="9:00 pm - 10:00 pm" />
            <TableCell day={upcomingDays[6]} time="9:00 pm - 10:00 pm" />
          </tr>
        </table>
      </form>
    </div>
  );
}

export default Table
