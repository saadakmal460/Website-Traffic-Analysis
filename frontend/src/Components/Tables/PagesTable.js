import React , {useState,useEffect} from 'react'


const PagesTable = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

  
  
  
  
    useEffect(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `http://localhost:5000/api/getPagesData`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const responseData = await response.json();
          setData(responseData);
          setIsLoading(false);
        } catch (error) {
          setError(error.message);
          setIsLoading(false);
        }
      };
  
      fetchData();
    });
  
    const formatDuration = (duration) => {
      const date = new Date(duration);
      const hours = ('0' + date.getUTCHours()).slice(-2);
      const minutes = ('0' + date.getUTCMinutes()).slice(-2);
      const seconds = ('0' + date.getUTCSeconds()).slice(-2);
      return `${hours}:${minutes}:${seconds}`;
    };
  
    const formattedData = data.map((item) => ({
      ...item,
      TimeSpent: formatDuration(item.TimeSpent),
    }));
  
    
  
    return (
      <div className="max-w-full mx-auto px-6 md:px-12 xl:px-6" style={{ overflowX: 'hidden' }}>
        <div className="mb-10 space-y-4 px-6 md:px-0" style={{ overflowX: 'hidden' }}>
          <h2 className="text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl mt-10">
            Pages Table
          </h2>
        </div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8" style={{ overflowX: 'hidden' }}>
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8" style={{ overflowX: 'hidden' }}>
            <div className="overflow-hidden" style={{ overflowX: 'hidden' }}>
              <div className="border rounded-lg border-white overflow-y-auto" style={{ maxHeight: '500px' }}>
                <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                  <thead className="border-b border-neutral-200 font-medium dark:border-white/10 dark:bg-gray-900" style={{ position: 'sticky', top: '0' }}>
                    <tr className="dark:bg-gray-900">
                      <th scope="col" className="px-5 py-4">
                      Website
                      </th>
                      <th scope="col" className="px-5 py-4">
                      PageName
                      </th>
                      <th scope="col" className="px-5 py-4">
                      PageType
                      </th>
                      <th scope="col" className="px-5 py-4">
                      PageViews
                      </th>
                      <th scope="col" className="px-5 py-4">
                      TimeSpent
                      </th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {formattedData.map((page, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-6 py-4">{page.Website}</td>
                        <td className="whitespace-nowrap px-6 py-4">{page.PageName}</td>
                        <td className="whitespace-nowrap px-6 py-4">{page.PageType}</td>
                        <td className="whitespace-nowrap px-6 py-4">{page.PageViews}</td>
                        <td className="whitespace-nowrap px-6 py-4">{page.TimeSpent}</td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default PagesTable
