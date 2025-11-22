import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import jobsService from '@/services/jobsService';
import PropTypes from 'prop-types';

// Import components
import JobHeader from '@/components/features/jobs/JobDetailPage/JobHeader';
import JobHighlights from '@/components/features/jobs/JobDetailPage/JobHighlights';
import JobDescription from '@/components/features/jobs/JobDetailPage/JobDescription';
import JobSkills from '@/components/features/jobs/JobDetailPage/JobSkills';
import JobInfo from '@/components/features/jobs/JobDetailPage/JobInfo';
import CompanyInfo from '@/components/features/jobs/JobDetailPage/CompanyInfo';
import JobMeta from '@/components/features/jobs/JobDetailPage/JobMeta';
import JobWarning from '@/components/features/jobs/JobDetailPage/JobWarning';
import RecommendedJobs from '@/components/features/jobs/JobDetailPage/RecommendedJobs';

const JobDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        console.log('Fetching job data for ID:', id); // Debug log
        const [jobData, recommendedJobsData] = await Promise.all([
          jobsService.getJobById(id),
          jobsService.getRecommendedJobs(id)
        ]);
        
        console.log('Job data:', jobData); // Debug log
        console.log('Recommended jobs:', recommendedJobsData); // Debug log
        
        setJob(jobData);
        setRecommendedJobs(recommendedJobsData || []); // Ensure array even if undefined
      } catch (error) {
        console.error('Error fetching job data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobData();
  }, [id]);

  if (loading) {
    return (
      <div className="p-4 max-w-5xl mx-auto">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 max-w-5xl mx-auto">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">Error loading job details</p>
          <button 
            onClick={() => navigate('/jobs')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Browse All Jobs
          </button>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-4 max-w-5xl mx-auto">
        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">Job not found</p>
          <button 
            onClick={() => navigate('/jobs')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Browse All Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 space-y-6">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6">
            <JobHeader job={job} navigate={navigate} />
            <JobHighlights job={job} />
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6">
            <JobDescription job={job} />
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6">
            <JobSkills job={job} />
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6">
            <JobInfo job={job} />
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6">
            <CompanyInfo job={job} />
            <JobMeta job={job} />
          </div>
        </div>

        <div className="lg:w-1/3 space-y-6">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6">
            {loading ? (
              <p className="text-gray-500 dark:text-gray-400">Loading recommendations...</p>
            ) : (
              <RecommendedJobs jobs={recommendedJobs} loading={loading} />
            )}
          </div>
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6">
            <JobWarning />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
