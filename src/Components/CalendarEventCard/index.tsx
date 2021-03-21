import React from "react";
import { Link } from "react-router-dom";
import { EventElement } from "Utils/Types/events";
import monthnrToName from "Utils/fp/monthnrToName";

interface ICalendarEventCard {
  event: EventElement;
}

function CalendarEventCard({ event }: ICalendarEventCard) {
  if (event.website) {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="c-eventcard"
        href={event.website}
      >
        <div className="c-eventcard__datecontainer">
          <p className="c-eventcard__day">{event.start_date_details.day}</p>
          <p className="c-eventcard__month">
            {monthnrToName(event.start_date_details.month)}
          </p>
          <p className="c-eventcard__year">{event.start_date_details.year}</p>
        </div>
        <div className="c-eventcard__titlecontainer">
          <p className="c-eventcard__title">{event.title}</p>
        </div>
      </a>
    );
  } else {
    return (
      <Link to={`/evenementen/${event.id}`} className="c-eventcard">
        <div className="c-eventcard__datecontainer">
          <p className="c-eventcard__day">{event.start_date_details.day}</p>
          <p className="c-eventcard__month">
            {monthnrToName(event.start_date_details.month)}
          </p>
          <p className="c-eventcard__year">{event.start_date_details.year}</p>
        </div>
        <div className="c-eventcard__titlecontainer">
          <p className="c-eventcard__title">{event.title}</p>
        </div>
      </Link>
    );
  }
}

export default CalendarEventCard;
