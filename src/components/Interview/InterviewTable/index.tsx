/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-01-19 15:02:57
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-02-21 09:29:03
 * @FilePath: \WIS-Recruit\src\components\Interview\InterviewTable\index.tsx
 * @Description: 展示面试人员的列表 可修改考核状态
 */
import { Card, Drawer, Space } from "antd";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import UserInfo from "../../UserList/UserInfo";
import Select from "./Select-index";

interface Iprops {
	direction: number;
}
interface Idata {
	userName: string;
	interviewTime: string;
	id: string;
	status: string;
	userId: string;
}

const api = axios.create({
	baseURL: "http://43.139.33.166/api/admin",
});

const InterviewTable: FC<Iprops> = ({ direction }) => {
	const [data, setData] = useState<Array<Idata>>([]);
	useEffect(() => {
		api
			.get("/interviewTime/" + direction, {
				method: "get",
				headers: {
					token: localStorage.getItem("token"),
				},
				// params: { direction: direction },
			})
			.then((res) => {
				setData(res.data.data);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const [open, setOpen] = useState(false);
	const [userId, setUserId] = useState("");
	const showDrawer = (userId: string) => {
		setUserId(userId);
		setOpen(true);
	};
	return (
		<Space direction="vertical" style={{ width: "400px" }}>
			{data?.map((data) => {
				return (
					<Card key={data.id}>
						<Space direction="vertical" onClick={() => showDrawer(data.userId)}>
							<h2>{data.userName}</h2>
							<p style={{ marginTop: -10, fontSize: 18 }}>
								{data.interviewTime}
							</p>
						</Space>
						<Select status={data.status} id={data.id} />
					</Card>
				);
			})}
			<Drawer
				title="个人信息"
				placement="bottom"
				size="large"
				height={680}
				onClose={() => setOpen(false)}
				open={open}
			>
				<UserInfo userId={userId} />
			</Drawer>
		</Space>
	);
};

export default InterviewTable;
