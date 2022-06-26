import React from "react";

import { FlashProvider } from "./providers/FlashProvider";
import { TaskProvider } from "./providers/TaskProvider";

import { FlashMessage } from "./components/flashMessage/FlashMessage";
import { TodoRouter } from "./router/TodoRouter";




export const App = () => {
  return (
    <>
      <FlashProvider>
        <TaskProvider>
          <FlashMessage />
          <TodoRouter />
        </TaskProvider>
      </FlashProvider>
    </>
  );
}
