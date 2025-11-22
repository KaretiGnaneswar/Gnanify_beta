import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import jobsService from '@/services/jobsService';
import JobsHeader from '@/components/features/jobs/JobsHeader';
import JobsSearchFilters from '@/components/features/jobs/JobsSearchFilters';
import JobCard from '@/components/features/jobs/JobCard';
import JobPreferences from '@/components/features/jobs/JobPreferences';
import ProfileCompletionPrompt from '@/components/features/jobs/ProfileCompletionPrompt';

export default function JobsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceFilter, setExperienceFilter] = useState('');
  const [salaryFilter, setSalaryFilter] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobsService.getAllJobs();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      job.location.toLowerCase().includes(locationFilter.toLowerCase()) &&
      (salaryFilter ? job.salary.includes(salaryFilter) : true)
    );
  });

  if (loading) {
    return (
      <div className="p-4 max-w-5xl mx-auto space-y-6">
        <ProfileCompletionPrompt />
        <JobsHeader />
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6 max-w-5xl mx-auto">
      <ProfileCompletionPrompt />
      <JobsHeader />
      
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3 space-y-6">
          <JobsSearchFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6">
                <JobCard job={job} navigate={navigate} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:w-1/3 space-y-6">
          <JobPreferences />
        </div>
      </div>
    </div>
  );
}
