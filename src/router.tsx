import {createHashRouter} from 'react-router'
import BasicLayout from "./components/layout/BasicLayout.tsx";
import Home from "./home/page.tsx";
import KnowledgeBase from "./knowledgeBase/page.tsx";
import Case from "./case/page.tsx";

const router = createHashRouter([
  {
    path: '/',
    element: <BasicLayout/>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/knowledgeBase',
        element: <KnowledgeBase/>,
      },
      {
        path: '/case',
        element: <Case/>,
      }
    ]
  }
])


export default router