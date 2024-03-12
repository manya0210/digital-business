import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import useCalender from "../../store/Calender";
import "./Calender.css"
import { createEventId } from "../../data/data";
/* eslint-disable no-restricted-globals */

const CalendarComponent = () => {
  const { currentEvents, setCurrentEvents } = useCalender();

  const handleEvents = async(events)=>{
    await Promise.resolve(setCurrentEvents(events));
  };

  const handleDataSelect = (selectInfo) => {
    let title = prompt("Please enter the title for the event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect();
    if(title){
        calendarApi.addEvent({
            id: createEventId(),
            title,
            start: selectInfo.start,
            end: selectInfo.end,
            allDay: selectInfo.allDay,
        })
    }
  };
  const handleEventClick = (clickinfo)=>{
    if(
        confirm("Are you sure you want to delete it ?")
    )(
        clickinfo.event.remove()
    )
}

  return (
    <div className="calender-container">
      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          allDaySlot={false}
          initialView="timeGridWeek"
          slotDuration={"01:00:00"}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          nowIndicator={true}
          initialEvents={currentEvents}
          eventsSet={handleEvents}
          select={handleDataSelect}
          eventClick={handleEventClick}
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
