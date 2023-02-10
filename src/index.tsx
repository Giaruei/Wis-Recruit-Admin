/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-01-11 16:06:36
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-01-30 16:45:11
 * @FilePath: \antd-demo-ts\src\index.tsx
 * @Description:
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "./router";
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<RouterConfig />
		</BrowserRouter>
	</React.StrictMode>
);
