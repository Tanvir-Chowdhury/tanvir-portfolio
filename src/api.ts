import axios from 'axios';

const API_URL = 'https://portfolio-backend-s06z.onrender.com/api'; // Adjust if needed

const api = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (username, password) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  const response = await axios.post('https://portfolio-backend-s06z.onrender.com/token', formData);
  return response.data;
};

export const getProfile = () => api.get('/profile');
export const updateProfile = (data) => api.post('/profile', data);

export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

export const getExperience = () => api.get('/experience');
export const createExperience = (data) => api.post('/experience', data);
export const updateExperience = (id, data) => api.put(`/experience/${id}`, data);
export const deleteExperience = (id) => api.delete(`/experience/${id}`);

export const getEducation = () => api.get('/education');
export const createEducation = (data) => api.post('/education', data);
export const updateEducation = (id, data) => api.put(`/education/${id}`, data);
export const deleteEducation = (id) => api.delete(`/education/${id}`);

export const getVolunteering = () => api.get('/volunteering');
export const createVolunteering = (data) => api.post('/volunteering', data);
export const updateVolunteering = (id, data) => api.put(`/volunteering/${id}`, data);
export const deleteVolunteering = (id) => api.delete(`/volunteering/${id}`);

export const getCertificates = () => api.get('/certificates');
export const createCertificate = (data) => api.post('/certificates', data);
export const updateCertificate = (id, data) => api.put(`/certificates/${id}`, data);
export const deleteCertificate = (id) => api.delete(`/certificates/${id}`);

export const getAwards = () => api.get('/awards');
export const createAward = (data) => api.post('/awards', data);
export const updateAward = (id, data) => api.put(`/awards/${id}`, data);
export const deleteAward = (id) => api.delete(`/awards/${id}`);

export const getSkills = () => api.get('/skills');
export const createSkill = (data) => api.post('/skills', data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);

export const getHobbies = () => api.get('/hobbies');
export const createHobby = (data) => api.post('/hobbies', data);
export const updateHobby = (id, data) => api.put(`/hobbies/${id}`, data);
export const deleteHobby = (id) => api.delete(`/hobbies/${id}`);

export const getSocialLinks = () => api.get('/social-links');
export const createSocialLink = (data) => api.post('/social-links', data);
export const updateSocialLink = (id, data) => api.put(`/social-links/${id}`, data);
export const deleteSocialLink = (id) => api.delete(`/social-links/${id}`);

export const getCompetitiveProfiles = () => api.get('/competitive-profiles');
export const createCompetitiveProfile = (data) => api.post('/competitive-profiles', data);
export const updateCompetitiveProfile = (id, data) => api.put(`/competitive-profiles/${id}`, data);
export const deleteCompetitiveProfile = (id) => api.delete(`/competitive-profiles/${id}`);

export default api;

export const reorderItems = (resource: string, items: any[]) => {
  // This is a placeholder. The backend needs to implement a bulk update or reorder endpoint.
  // For now, we will assume the backend accepts a list of { id, order } to update.
  const updates = items.map((item, index) => ({ id: item.id, order: index }));
  return api.post(`/${resource}/reorder`, { items: updates });
};
