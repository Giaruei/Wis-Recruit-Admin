/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-01-30 16:40:24
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-02-22 16:56:46
 * @FilePath: \WIS-Recruit\src\components\Login\index.tsx
 * @Description:
 */
import { Button, ConfigProvider, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import ParticlesBg from "particles-bg";
import { useNavigate } from "react-router-dom";

interface Idata {
	adminNum: string;
	password: string;
}

const Login = () => {
	const navigate = useNavigate();
	const onFinish = (values: Idata) => {
		const api = axios.create({
			baseURL: "http://43.139.33.166/api/admin/login",
		});
		api
			.post("", {
				adminNum: values.adminNum,
				password: values.password,
			})
			.then((res) => {
				if (res.data.code) {
					console.log(res);
					// 如果正确则跳进主页面
					// 把token和用户名存储在浏览器中
					localStorage.setItem("token", res.data.data.token);
					localStorage.setItem("adminName", res.data.data.adminName);
					return navigate("/");
				} else {
					// 若数据库没有这个账号密码则提示错误
					alert("学号/密码错误，请重新输入");
				}
			});
	};
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#95de64",
				},
			}}
		>
			<Form
				name="basic"
				style={{
					minWidth: 300,
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -60%)",
				}}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				autoComplete="off"
			>
				<h1
					style={{
						textAlign: "center",
						color: "#95de64",
					}}
				>
					欢迎来到WISSdudio~
				</h1>
				<Form.Item
					name="adminNum"
					rules={[{ required: true, message: "请输入学号" }]}
				>
					<Input prefix={<UserOutlined />} placeholder="学号" />
				</Form.Item>
				<Form.Item
					name="password"
					rules={[{ required: true, message: "请输入密码" }]}
				>
					<Input prefix={<LockOutlined />} type="password" placeholder="密码" />
				</Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					style={{
						width: "100%",
					}}
				>
					登录
				</Button>
			</Form>
			<ParticlesBg type="square" />
		</ConfigProvider>
	);
};
export default Login;
