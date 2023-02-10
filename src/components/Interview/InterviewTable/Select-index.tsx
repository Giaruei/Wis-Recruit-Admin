import { Segmented } from "antd";
import axios from "axios";
import { FC, useState } from "react";

/*
 * @Author: 前端天才蔡嘉睿
 * @Date: 2023-01-29 22:11:34
 * @LastEditors: Giaruei 247658354@qq.com
 * @LastEditTime: 2023-01-29 22:20:48
 * @FilePath: \antd-demo-ts\src\components\Interview\InterviewTable\Select-index.tsx
 * @Description:
 */
interface Iprops {
	status: string;
	id: string;
}
const Select: FC<Iprops> = ({ status, id }) => {
	const [state, setState] = useState(status);
	const api = axios.create({
		baseURL: "http://43.139.33.166/api/admin",
	});
	return (
		<Segmented
			options={["面试未开始", "面试已结束"]}
			value={state}
			onChange={(v) => {
				if (v === "面试已结束") {
					setState(v as string);
					api.put(
						"/interview/",
						{},
						{
							headers: {
								token: localStorage.getItem("token"),
							},
							params: { id: id },
						}
					);
				}
			}}
		/>
	);
};

export default Select;
