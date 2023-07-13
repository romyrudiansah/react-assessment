import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(
          `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`
        );
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job detail:', error);
      }
    };

    fetchJobDetail();
  }, [id]);

  if (!job) {
    return <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
              <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
              <span className="sr-only">Loading...</span>
            </div>;
  }

  return (
    <div>
      <section className="pt-28 lg:pt-44 pb-28 bg-violet-500 bg-center bg-cover relative">
        <div className="container mx-auto">
          <div className="grid">
            <div className="col-span-12">
              <div className="text-center text-white">
                <h3 className="mb-4 text-[26px]">Job Details</h3>
                <div className="page-next">
                  <nav className="inline-block" aria-label="breadcrumb text-center">
                    <ol className="flex flex-wrap justify-center text-sm font-medium uppercase">
                      <li className='mx-5'><Link>Home</Link></li>
                      <li className='mx-5'><Link>Job List</Link></li>
                      <li className="mx-5 active" aria-current="page">Job Detail</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto">
        <div className="border-gray-100/30 m-10">
          <div className="relative mb-5">
            <h3 className="mb-1 text-lg font-bold text-gray-900">{job.title}</h3>
            <ul className="flex gap-4 text-gray-500">
              <li>
                {job.type} / {job.location}
              </li>
            </ul>
          </div>
          <div className="detail-content">
            <div dangerouslySetInnerHTML={{ __html: job.description || 'N/A' }}></div>
          </div>
          <div className="link-back mt-10 ">
            <Link to="/job-list" className='font-bold underline hover:text-gray-400'>Back to Job List</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetailPage;
