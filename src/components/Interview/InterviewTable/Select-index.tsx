/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-01-29 22:11:34
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-02-24 19:58:26
 * @FilePath: \WIS-Recruit\src\components\Interview\InterviewTable\Select-index.tsx
 * @Description: 这个组件用以修改面试的状态
 */
import { Segmented } from "antd";
import axios from "axios";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
interface Iprops {
	status: number;
	// 0 未开始 1 已结束
	id: string;
}
const Select: FC<Iprops> = ({ status, id }) => {
	const [state, setState] = useState<number>(status);
	const navigate = useNavigate();
	const api = axios.create({
		baseURL: "http://43.139.33.166/api/admin",
	});
	return (
		<Segmented
			options={["面试未开始", "面试已结束"]}
			value={state === 0 ? "面试未开始" : "面试已结束"}
			onChange={(v) => {
				if (v === "面试已结束") {
					setState(1);
					api
						.put(
							"/interview/" + id,
							{},
							{
								headers: {
									token: localStorage.getItem("token"),
								},
								// params: { id: id },
							}
						)
						.then((res) => {
							if (!res.data.success) {
								alert("token过期了，请重新登录");
								localStorage.removeItem("token");
								localStorage.removeItem("adminName")
								return navigate("");
							}
						});
				}
			}}
		/>
	);
};

export default Select;
