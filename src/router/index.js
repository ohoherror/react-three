
// useRoutes  根据路由配置  创建路由
import { useRoutes } from "react-router-dom";
//导入两个页面
import Home from "../pages/Home";
import About from "../pages/About";
import GUI from '../pages/GUI'
import ResizeScreen from '../pages/part1/ResizeScreen'

function RouterView(){
    //路由基本配置
    const baseRoutes = [
        {path:"",element:<Home></Home>},
        {path:"/about",element:<About></About>},
        {path:"/GUI",element:<GUI></GUI>},
        {path:'/ResizeScreen',element:<ResizeScreen></ResizeScreen>}
    ]
    //创建路由
    const element = useRoutes(baseRoutes)
    //返回路由内容
    return ( <>{element}</> )
}
 
export default RouterView;