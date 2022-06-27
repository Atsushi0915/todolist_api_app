import React from "react";

import { FlashProvider } from "./providers/FlashProvider";
import { TaskProvider } from "./providers/TaskProvider";

import { FlashMessage } from "./components/flashMessage/FlashMessage";
import { TodoRouter } from "./router/TodoRouter";
import { CompleteTaskProvider } from "./providers/CompleteTaskProvider";

export const App = () => {
  return (
    <>
      <FlashProvider>
        <TaskProvider>
          <CompleteTaskProvider>
            <FlashMessage />
            <React.StrictMode>
              <TodoRouter />
            </React.StrictMode>
          </CompleteTaskProvider>
        </TaskProvider>
      </FlashProvider>
    </>
  );
}
