//@ts-nocheck
import PageDivider from "Components/PageDivider";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import endpoints from "Utils/endpoints";
import { axiosI } from "Utils/Types/axiosInstance";
import { Event, EventElement, ImageClass } from "Utils/Types/events";
import parse from "html-react-parser";

function EventPage() {
  const { eventid }: any = useParams();
  const [event, setEvent] = useState<EventElement>();

  useEffect(() => {
    const fetchEvent = async () => {
      axiosI
        .get<EventElement>(`${endpoints.getevent}${eventid}`)
        .then(({ data }) => {
          setEvent(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchEvent();
  }, []);

  return (
    <>
      <PageDivider title="Evenement" />
      <div className="c-page">
        {event && event.image.url && (
          <img src={event.image.url} alt={"event page titel"} />
        )}
        {event && parse(event.description)}
      </div>
    </>
  );
}

export default EventPage;
