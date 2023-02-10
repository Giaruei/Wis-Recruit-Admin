/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-01-11 21:55:51
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-02-10 13:05:24
 * @FilePath: \WIS-Recruit\src\components\UserList\index.tsx
 * @Description: 用于展示各个方向所有学生信息
 */
import { Card, Drawer } from "antd";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import UserInfo from "./UserInfo";

interface Iprops {
	// 本组件传参 各组对应的方向
	index: string;
}
interface Idata {
	// 请求本方向返回的所有人的数据
	userId: string;
	userName: string;
}
const api = axios.create({
	baseURL: "http://43.139.33.166/api/admin",
});
const UserList: FC<Iprops> = ({ index }) => {
	const [open, setOpen] = useState(false);
	const [userId, setUserId] = useState("");
	const [userData, setUserData] = useState<Idata[]>([]);
	useEffect(() => {
		api
			.get("/getUsersByDireciton", {
				method: "get",
				headers: {
					token: localStorage.getItem("token"),
				},
				params: {
					direction: index,
				},
			})
			.then((res) => {
				setUserData(res.data.data);
			});
	}, [index]);

	const showDrawer = (userId: string) => {
		setUserId(userId);
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Card style={{ marginTop: 18, cursor: "default" }}>
				{userData.map((data) => {
					return (
						<Card.Grid
							key={data.userId}
							style={{ width: "20%", textAlign: "center" }}
							onClick={() => {
								showDrawer(data.userId);
							}}
						>
							{data.userName}
						</Card.Grid>
					);
				})}
				<Drawer
					title="个人信息"
					placement="bottom"
					size="large"
					height={680}
					onClose={onClose}
					open={open}
				>
					<UserInfo userId={userId} />
				</Drawer>
			</Card>
		</>
	);
};

export default UserList;
