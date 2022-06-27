import React from "react";

import { FlashProvider } from "./providers/FlashProvider";
import { TaskProvider } from "./providers/TaskProvider";

import { FlashMessage } from "./components/flashMessage/FlashMessage";
import { TodoRouter } from "./router/TodoRouter";
import { CompleteTaskProvider } from "./providers/CompleteTaskProvider";
import { OldTaskProvider } from "./providers/OldTaskProvider";
import { SearchNameProvider } from "./providers/SearchNameProvider";

export const App = () => {
  return (
    <>
      <FlashProvider>
        <TaskProvider>
          <CompleteTaskProvider>
            <OldTaskProvider>
              <SearchNameProvider>
                <FlashMessage />
                <React.StrictMode>
                  <TodoRouter />
                </React.StrictMode>
              </SearchNameProvider>
            </OldTaskProvider>
          </CompleteTaskProvider>
        </TaskProvider>
      </FlashProvider>
    </>
  );
}
