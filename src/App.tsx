import React, { FC, useState } from "react";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	AndroidFilled,
	Html5Filled,
	ConsoleSqlOutlined,
	DeleteTwoTone,
	WomanOutlined,
	FileExcelTwoTone,
	HighlightFilled,
} from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Menu, Switch, theme } from "antd";
import UserList from "./components/UserList";
import Interview from "./components/Interview";
import Login from "./components/Login";

const { Content, Footer, Sider } = Layout;

const App: FC = () => {
	const [index, setIndex] = useState<string>("0"); // 设置菜单的分页
	const [collapsed, setCollapsed] = useState(false); // 设置菜单展开收起
	const [dark, setDark] = useState(false); // 设置主题黑暗
	const darkTheme = {
		token: {
			colorPrimary: "#95de64",
		},
		algorithm: theme.darkAlgorithm,
	};
	const lightTheme = {
		token: {
			colorPrimary: "#95de64",
		},
	};
	// 本地没有token说明未登录
	if (!localStorage.getItem("token")) {
		// 跳转到登录界面
		return <Login />;
	}
	return (
		<ConfigProvider theme={dark ? darkTheme : lightTheme}>
			<Layout
				style={{
					margin: 0,
					padding: 0,
					minHeight: "1000px",
				}}
			>
				<Sider
					trigger={null}
					collapsible
					collapsed={collapsed}
					breakpoint="lg"
					collapsedWidth="70px"
					theme="light"
				>
					<div
						style={{
							height: 32,
							margin: 16,
							fontSize: 25,
							textAlign: "center",
						}}
					>
						<DeleteTwoTone twoToneColor="#95de64" />
					</div>
					<Menu
						mode="inline"
						defaultSelectedKeys={["0"]}
						items={[
							{
								key: "0",
								icon: <Html5Filled />,
								label: "伟大的前端组",
							},
							{
								key: "1",
								icon: <ConsoleSqlOutlined />,
								label: "辉煌的后端组",
							},
							{
								key: "2",
								icon: <AndroidFilled />,
								label: "无敌的安卓组",
							},
							{
								key: "3",
								icon: <HighlightFilled />,
								label: "UUUUUUI组",
							},
							{
								key: "4",
								icon: <WomanOutlined />,
								label: "面试",
							},
						]}
						onClick={(e) => {
							setIndex(e.key);
						}}
					/>
				</Sider>
				<Layout>
					<div
						style={{
							position: "relative",
							padding: 0,
							height: "64px",
							lineHeight: "64px",
							boxShadow:
								"0 1px 2px 0 rgb(0 0 0 / 3%), 0 1px 6px -1px rgb(0 0 0 / 2%), 0 2px 4px 0 rgb(0 0 0 / 2%)",
						}}
					>
						{React.createElement(
							collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
							{
								style: {
									color: "#95de64",
									padding: "0 24px",
									fontSize: "18px",
									lineHeight: "64px",
									cursor: "pointer",
									transform: "color 0.3s",
								},
								onClick: () => setCollapsed(!collapsed),
							}
						)}
						<Switch
							checked={!dark}
							onChange={(value: boolean) => {
								setDark(!value);
							}}
							checkedChildren="Light"
							unCheckedChildren="Dark"
						/>
						{index !== "4" ? (
							<Button
								icon={<FileExcelTwoTone twoToneColor="#95de64" />}
								shape="round"
								style={{
									position: "absolute",
									top: 16,
									right: 10,
								}}
								onClick={() => {
									// 带上token跳转
									window.location.href = `https://wisstudio.top/api/admin/export/excel/${
										parseInt(index) + "?token=" + localStorage.getItem("token")
									}`;
								}}
							>
								导出EXcel表格
							</Button>
						) : (
							""
						)}
					</div>
					<Content style={{ margin: "24px 16px 0" }}>
						<div
							style={{
								padding: 24,
							}}
						>
							{index === "4" ? <Interview /> : <UserList index={index} />}
						</div>
					</Content>
					<Footer style={{ textAlign: "center" }}>
						WISStudio ©2023 Created by CJR
					</Footer>
				</Layout>
			</Layout>
		</ConfigProvider>
	);
};

export default App;
