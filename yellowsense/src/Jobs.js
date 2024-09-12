import React, { useState, useEffect, useCallback } from 'react';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch job listings
  const fetchJobs = useCallback(async (page) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      const result = await response.json();
      console.log(result);

      if (result && result.results && Array.isArray(result.results)) {
        setJobs((prevJobs) => {
          const newJobs = result.results.filter(job => !prevJobs.some(prevJob => prevJob.id === job.id));
          return [...prevJobs, ...newJobs];
        });
      } else {
        setError('Unexpected API response structure');
      }
    } catch (err) {
      setError('Error fetching jobs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs(page);
  }, [page, fetchJobs]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
      setPage(prevPage => prevPage + 1);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const bookmarkJob = (job) => {
    const savedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    const updatedJobs = [...savedJobs, job];
    localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedJobs));
    console.log('Bookmarked Jobs:', updatedJobs);
  };

  if (isLoading && jobs.length === 0) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (jobs.length === 0) return <div>No jobs available</div>;

  return (
    <div>
      {jobs.map((job) => (
        <div key={job.id} className="job-card">
          <h2>{job.title}</h2>
          <p>{job.primary_details?.location}</p>
          <p>{job.primary_details?.salary}</p>
          <p>{job.primary_details?.phone}</p>
          <button onClick={() => bookmarkJob(job)}>Bookmark</button>
        </div>
      ))}
      {isLoading && <div>Loading more jobs...</div>}
    </div>
  );
};

export default Jobs;