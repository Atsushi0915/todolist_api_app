import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import { EditTaskPage } from "../components/pages/EditTaskPage";
import { OldTaskPage } from "../components/pages/OldTaskPage";
import { TaskListPage } from "../components/pages/TaskListPage";
import { TopPage } from "../components/pages/TopPage";


export const TodoRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<TopPage />} />
        <Route exact path='/tasks' element={
          <DefaultLayout >
            <TaskListPage />
          </DefaultLayout>} />
        <Route exact path='/oldtasks' element={
          <DefaultLayout>
            <OldTaskPage />
          </DefaultLayout>} />
        <Route exact path='/edittask/:id' element={
          <DefaultLayout>
            <EditTaskPage />
          </DefaultLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
