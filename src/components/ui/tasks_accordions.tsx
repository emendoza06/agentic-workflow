import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
} from "@material-tailwind/react";
import { Task } from "@/types/task";

export function TasksAccordion({ tasks }: { tasks: Array<Task> }) {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <div>
      {tasks.map((task, i) => (
        <Accordion
          key={i}
          open={open === i}
          className="mb-2 rounded-lg border border-blue-gray-100 px-4"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >

          {/* Task name */}
          <AccordionHeader
            onClick={() => handleOpen(i)}
            className={`workflow-task-name border-b-0 transition-colors ${open === i ? "text-green-400 hover:!text-green-400" : "text-gray-400 hover:!text-gray-300"}`}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {task.name}
          </AccordionHeader>

          {/* Task accordion body */}
          <AccordionBody className="pt-0 text-base font-normal">
            {/* Agent role */}
            <div className="mb-3">
              <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold m-1 sm:w-1/2">
                {task.agent?.role ?? "No Agent"}
              </span>
            </div>

            {/* Task description */}
            <div>
              <Typography
                className="task-description-workflow"
                variant="lead"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {task.description}
              </Typography>
            </div>

            {/* Expected output header */}
            <div className="workflow-expected-output-header">
              <Typography
                variant="h5"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Expected Output
              </Typography>

              {/* Expected output description */}
              <Typography
                variant="paragraph"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {task.expected_output}
              </Typography>
            </div>
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
}
