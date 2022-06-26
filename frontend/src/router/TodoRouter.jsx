import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DefaultLayout } from "../components/layout/DefaultLayout";
// import { OldTodoPage } from "../components/pages/OldTodoPage";
import { TaskListPage } from "../components/pages/TaskListPage";
import { TopPage } from "../components/pages/TopPage";


export const TodoRouter = () => {
  console.log('TodoRousterコンポーネント')
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<TopPage />} />
        <Route exact path='/todos' element={
          <DefaultLayout >
            <TaskListPage />
          </DefaultLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
