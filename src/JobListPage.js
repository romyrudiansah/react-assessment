import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [fullTime, setFullTime] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchJobs = async () => {
    setIsLoading(true);

    const params = {
      description: searchTerm,
      location: location,
      full_time: fullTime ? 'true' : 'false',
      page: page,
    };

    try {
      const response = await axios.get(
        'http://dev3.dansmultipro.co.id/api/recruitment/positions.json',
        { params }
      );

      const newJobs = response.data;

      setJobs((prevJobs) => [...prevJobs, ...newJobs]);

      if (newJobs.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    fetchJobs();
  }, [page, isInitialLoad]);

  const handleSearch = () => {
    setPage(1);
    setJobs([]);
    setHasMore(true);
    setIsInitialLoad(true);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <section className="pt-28 lg:pt-44 pb-28 bg-violet-500 bg-center bg-cover relative">
        <div className="container mx-auto">
          <div className="grid">
            <div className="col-span-12">
              <div className="text-center text-white">
                <h3 className="mb-4 text-[26px]">Find Your Job</h3>
                <div className="page-next">
                  <nav className="inline-block" aria-label="breadcrumb text-center">
                    <ol className="flex flex-wrap justify-center text-sm font-medium uppercase">
                      <li className='mx-5'><Link>Home</Link></li>
                      <li className="mx-5 active" aria-current="page">Job List</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="search-job">
        <div className="container mx-auto my-4">
          <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
            <input
              className="appearance-none border border-blue-500 rounded bg-transparent w-2/4 text-gray-700 mr-3 p-4 leading-tight focus:outline-none"
              type="text"
              placeholder="Job Description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <input
              className="appearance-none border border-blue-500 rounded bg-transparent w-2/4 text-gray-700 mr-3 p-4 leading-tight focus:outline-none"
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <label className="flex w-1/4 items-center">
              <input
                className="mr-1"
                type="checkbox"
                checked={fullTime}
                onChange={(e) => setFullTime(e.target.checked)}
              />
              <span className="text-sm">Full Time Only</span>
            </label>
            <button
              className="bg-blue-500 w-1/4 hover:bg-blue-700 text-white font-bold p-4 ml-2 rounded focus:outline-none"
              type="submit"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </section>
      <section className="container mx-auto">
        {jobs.map((job) => (
          <div className="relative overflow-hidden transition-all duration-500 ease-in-out bg-white border rounded-md border-gray-100 hover:border-violet-500 hover:-translate-y-2 my-5" key={job.id}>
            <div className="p-6">
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 lg:col-span-1">
                  <div className="px-2 mb-4 text-center mb-md-0">
                    <Link to={job.company_url || 'N/A' }><img src={job.company_logo || 'N/A'} alt="" className="mx-auto img-fluid rounded-3" /></Link>
                  </div>
                </div>
                <div className="col-span-10">
                  <h5 className="mb-1 fs-17">
                    <Link to="" className="">{job.title || 'N/A'}</Link>
                  </h5>
                  <ul className="flex flex-wrap mb-0 lg:gap-3 gap-y-3">
                    <li>
                      <Link to={job.company_url || 'N/A' } className="mb-0 text-sm text-gray-500">{job.company || 'N/A'}</Link>
                    </li>
                  </ul>
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="bg-green-500/20 text-green-500 text-11 px-2 py-0.5 font-medium rounded">{job.type || 'N/A'}</span>
                      <span className="bg-sky-500/20 text-sky-500 text-11 px-2 py-0.5 font-medium rounded">{job.location || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-100">
              <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-6">
                  <ul className="flex flex-wrap gap-2 text-gray-700">
                    <li>Keywords :</li>
                    <li><Link className="primary-link text-muted">Lorem ipsum</Link>,</li>
                    <li><Link className="primary-link text-muted">Lorem ipsum sit dolor</Link></li>
                  </ul>
                </div>
                <div className="col-span-12 mt-2 lg:col-span-6 lg:mt-0">
                  <div className="text-right text-black">
                    <Link className="btn-item auction-btn mr-2" to={`/job-detail/${job.id}`}>
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && 
          <div class="text-center">
            <div role="status">
                <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
          </div>
        }
        {hasMore && !isLoading && (
          <button onClick={handleLoadMore} className='w-full p-3 bg-blue-700 rounded my-10 hover:bg-blue-800 text-white'>Load More</button>
        )}
      </section>
    </div>
  );
};

export default JobListPage;
