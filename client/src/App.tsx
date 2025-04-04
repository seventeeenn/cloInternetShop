import { useEffect, useState } from 'react';

interface DataResponse {
  message: string;
}

function App() {
  const [data, setData] = useState<string>('');

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data: DataResponse) => setData(data.message));
  }, []);

  return (
    <div>
      <h1>Backend Response: {data}</h1>
    </div>
  );
}

export default App;