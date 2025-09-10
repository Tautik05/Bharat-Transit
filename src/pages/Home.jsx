import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/todos/1")
            .then((res) => setData(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold">Home Page</h1>
            <p className="mt-2">Hello World with API Fetching:</p>
            <pre className="bg-gray-100 p-2 rounded mt-2">
                {data ? JSON.stringify(data, null, 2) : "Loading..."}
            </pre>
        </div>
    );
}
