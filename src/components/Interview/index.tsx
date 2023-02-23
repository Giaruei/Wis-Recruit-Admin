/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-01-15 19:28:41
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-02-23 23:58:56
 * @FilePath: \WIS-Recruit\src\components\Interview\index.tsx
 * @Description: 面试页面的名单
 */
import React from "react";
import { Space } from "antd";
import InterviewTable from "./InterviewTable";

const App: React.FC = () => (
	<Space size={"middle"}>
		<InterviewTable direction={0}></InterviewTable>
		<InterviewTable direction={1}></InterviewTable>
		<InterviewTable direction={2}></InterviewTable>
		<InterviewTable direction={3}></InterviewTable>
	</Space>
);

export default App;
