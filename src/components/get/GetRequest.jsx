import scss from "./GetRequest.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
const url =
	"https://api.elchocrud.pro/api/v1/b9c81ad7243ced8c76fab7df9b2e17e3/get";
const GetRequest = () => {
	const [state, setState] = useState([]);
	const [data, setData] = useState("");
	const [name, setName] = useState("");
	const getRequest = async () => {
		const response = await axios.get(url);
		setState(response.data);
	};
	useEffect(() => {
		getRequest();
	}, []);

	const handleAdd = async () => {
		const newData = {
			data: data,
			name: name,
		};
		const response = await axios.post(url, newData);
		setState(response.data);
	};

	const Delete = async (_id) => {
		const response = await axios.delete(`${url}/ ${_id}`);
		setState(response.data);
	};
	const putRequest = async (_id) => {
		const response = await axios.put(`${url}/ ${_id}`);
		setState(response.data);
	};

	return (
		<div className="container">
			<input
				type="text"
				value={name}
				placeholder="Введите текст"
				onChange={(e) => setName(e.target.value)}
			/>
			<input
				type="text"
				value={data}
				placeholder="Введите текст"
				onChange={(e) => setData(e.target.value)}
			/>
			<button onClick={handleAdd}> POST</button>

			{state.map((item, index) => (
				<div className={scss.container} key={index}>
					<h1>{item.name}</h1>
					<p>{item.data}</p>
					<button onClick={() => Delete(item._id)}> delete</button>
					<button onClick={() => putRequest(item._id)}>update</button>
				</div>
			))}
		</div>
	);
};

export default GetRequest;
