import React, { useEffect } from "react";

function Event() {
  useEffect(() => {
    return () => {};
  }, []);

  return <div></div>;
}

export default Event;
