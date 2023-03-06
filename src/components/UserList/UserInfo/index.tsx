/* eslint-disable react-hooks/exhaustive-deps */
/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-01-14 14:32:49
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-03-07 00:08:40
 * @FilePath: \WIS-Recruit\src\components\UserList\UserInfo\index.tsx
 * @Description: 展示学生的个人信息和管理员的评价
 */
// todo: 本组件冗杂如屎山 需要拆分细化
import { Button, Descriptions, Input, Popconfirm, Space, Steps } from "antd";
import {
	DeleteTwoTone,
	EditTwoTone,
	HighlightTwoTone,
	RocketOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

interface Iprops {
	// 本组件传参 用户id
	userId: string;
}
interface Idata {
	// 请求用户返回的个人数据
	userName: string;
	stuNumber: string;
	academy: string;
	direction: string;
	phoneNum: string;
	introduction: string;
	progress: number;
	status: number;
}
interface Icomment {
	// 请求评论返回的数据
	id: string;
	adminName: string;
	context: string;
}
const api = axios.create({
	baseURL: "http://43.139.33.166/api/admin",
});
const UserInfo: FC<Iprops> = ({ userId }) => {
	const [userData, setUserData] = useState<Idata>();
	const [comment, setComment] = useState<Icomment[]>([]);
	const [putComment, setPutComment] = useState<string>("");
	const [addComment, setAddComment] = useState<string>("");
	const [progress, setProgress] = useState<number>(0);
	const [status, setStatus] = useState<number>(0);
	const navigate = useNavigate();
	// 获取评论的请求
	const queryComment = () => {
		api
			.get("/comment/" + userId, {
				method: "get",
				headers: {
					token: localStorage.getItem("token"),
				},
				// params: { userId: userId },
			})
			.then((res) => {
				// 把评论保存起来
				setComment(res.data.data);
			});
	};
	// 先获取个人的信息和大家对其的评论
	useEffect(() => {
		api
			.get("/info/" + userId, {
				method: "get",
				headers: {
					token: localStorage.getItem("token"),
				},
				// params: { userId: userId },
			})
			.then((res) => {
				if (res.data.success) {
					// 把个人信息保存起来
					setUserData(res.data.data);
					// 保存个人考核状态进度
					setProgress(res.data.data.progress);
					setStatus(res.data.data.status);
				} else {
					alert("token过期了，请重新登录");
					localStorage.removeItem("token");
					localStorage.removeItem("adminName");
					return navigate("");
				}
			});
		// 获取评论
		queryComment();
	}, [userId]);

	return (
		<Space direction="vertical" style={{ width: "100%" }}>
			<Descriptions bordered layout="vertical" column={5}>
				<Descriptions.Item label="姓名">{userData?.userName}</Descriptions.Item>
				<Descriptions.Item label="学院">{userData?.academy}</Descriptions.Item>
				<Descriptions.Item label="学号">
					{userData?.stuNumber}
				</Descriptions.Item>
				<Descriptions.Item label="手机">
					{userData?.phoneNum}
				</Descriptions.Item>
				<Descriptions.Item label="方向">
					{userData?.direction}
				</Descriptions.Item>
				<Descriptions.Item label="考核进度&考核状态" span={5}>
					<Steps
						current={progress}
						onChange={(value) => {
							setProgress(value);
						}}
						items={[
							{
								title: "笔试",
							},
							{
								title: "面试",
							},
							{
								title: "一轮考核",
							},
							{
								title: "二轮考核",
							},
						]}
					/>
					<Steps
						style={{
							marginTop: 20,
							marginBottom: 20,
						}}
						current={status}
						onChange={(v) => setStatus(v)}
						items={[
							{
								title: "进行中",
							},
							{
								title: "通过",
							},
							{
								title: "未通过",
							},
						]}
					/>
					<Popconfirm
						icon={<HighlightTwoTone twoToneColor="#95de64" />}
						placement="top"
						title="修改状态吗"
						description="点击确认即可修改状态"
						onConfirm={() => {
							api.put(
								"/progress/" + userId,
								{ progress: progress, status: status },
								{
									headers: {
										token: localStorage.getItem("token"),
									},
									// params: { userId: userId },
								}
							);
						}}
						okText="好的"
						cancelText="取消"
					>
						<Button style={{ marginLeft: 666 }}>修改状态</Button>
					</Popconfirm>
				</Descriptions.Item>
				<Descriptions.Item label="个人介绍" span={5}>
					{userData?.introduction}
				</Descriptions.Item>
				{comment.map((data) => {
					return (
						<Descriptions.Item label={data.adminName} key={data.id}>
							<Input
								defaultValue={data.context}
								bordered={false}
								style={{ width: "100%" }}
								onChange={(e) => {
									// todo: 输入防抖
									setPutComment(e.target.value);
								}}
							/>
							<Popconfirm
								icon={<DeleteTwoTone twoToneColor="#95de64" />}
								placement="top"
								title="删除评论吗？"
								description="点击确认即可删除评论"
								okText="好的"
								cancelText="取消"
								onConfirm={() => {
									api
										.delete("/comment/" + data.id, {
											headers: {
												token: localStorage.getItem("token"),
											},
											// params: {
											// 	id: data.id,
											// },
										})
										.then(() => {
											// 删除后重新加载评论
											queryComment();
										});
								}}
							>
								<DeleteTwoTone
									twoToneColor="#95de64"
									style={{
										marginLeft: "10px",
										fontSize: "18px",
									}}
								/>
							</Popconfirm>
							<Popconfirm
								icon={<EditTwoTone twoToneColor="#95de64" />}
								placement="top"
								title="修改评论吗？"
								description="点击确认即可修改评论"
								okText="好的"
								cancelText="取消"
								onConfirm={() => {
									api
										.put(
											"/comment/" + data.id,
											{ context: putComment },
											{
												headers: {
													token: localStorage.getItem("token"),
												},
												// params: { id: data.id },
											}
										)
										.then(() => {
											// 重新加载评论 好像也可以不用?
											queryComment();
										});
								}}
							>
								<EditTwoTone
									twoToneColor="#95de64"
									style={{
										marginLeft: "10px",
										fontSize: "18px",
									}}
								/>
							</Popconfirm>
						</Descriptions.Item>
					);
				})}
			</Descriptions>
			<TextArea
				value={addComment}
				onChange={(e) => {
					// todo: 输入防抖
					setAddComment(e.target.value);
				}}
				placeholder="说说你的看法吧~"
			/>
			<Button
				size="large"
				type="primary"
				icon={<RocketOutlined />}
				onClick={() => {
					// 判断输入框有无内容 只有有的情况下才会发请求
					if (addComment) {
						api
							.post(
								"/comment/" + userId,
								{
									context: addComment,
									adminName: localStorage.getItem("adminName"),
								},
								{
									headers: {
										token: localStorage.getItem("token"),
									},
									// params: { userId: userId },
								}
							)
							.then(() => {
								// 添加后重新加载评论
								queryComment();
							});
						setAddComment("");
					}
				}}
			>
				发表评论
			</Button>
		</Space>
	);
};

export default UserInfo;
