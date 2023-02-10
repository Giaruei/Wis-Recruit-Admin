/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-01-30 16:37:11
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-01-30 16:46:01
 * @FilePath: \antd-demo-ts\src\router\index.tsx
 * @Description: 路由
 */
import { useRoutes } from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
const RouterConfig = () => {
	return useRoutes([
		// todo: 做一个404的界面
		{
			path: "*",
			element: <App />,
		},
		{
			path: "/login",
			element: <Login />,
		},
	]);
};
export default RouterConfig;
