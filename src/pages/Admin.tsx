import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Save, X, GripVertical } from 'lucide-react';
import * as api from '@/api';

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [volunteering, setVolunteering] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [awards, setAwards] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [hobbies, setHobbies] = useState<any[]>([]);
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [competitiveProfiles, setCompetitiveProfiles] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchData();
  }, []);

  const sortItems = (items: any[]) => {
    return items.sort((a, b) => (a.order || 0) - (b.order || 0));
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        profileData, projectsData, experienceData, educationData, 
        volunteeringData, certificatesData, awardsData, skillsData, 
        hobbiesData, socialLinksData, competitiveProfilesData
      ] = await Promise.all([
        api.getProfile().catch(() => ({ data: {} })),
        api.getProjects().catch(() => ({ data: [] })),
        api.getExperience().catch(() => ({ data: [] })),
        api.getEducation().catch(() => ({ data: [] })),
        api.getVolunteering().catch(() => ({ data: [] })),
        api.getCertificates().catch(() => ({ data: [] })),
        api.getAwards().catch(() => ({ data: [] })),
        api.getSkills().catch(() => ({ data: [] })),
        api.getHobbies().catch(() => ({ data: [] })),
        api.getSocialLinks().catch(() => ({ data: [] })),
        api.getCompetitiveProfiles().catch(() => ({ data: [] }))
      ]);

      setProfile(profileData.data);
      setProjects(sortItems(projectsData.data));
      setExperience(sortItems(experienceData.data));
      setEducation(sortItems(educationData.data));
      setVolunteering(sortItems(volunteeringData.data));
      setCertificates(sortItems(certificatesData.data));
      setAwards(sortItems(awardsData.data));
      setSkills(sortItems(skillsData.data));
      setHobbies(sortItems(hobbiesData.data));
      setSocialLinks(sortItems(socialLinksData.data));
      setCompetitiveProfiles(sortItems(competitiveProfilesData.data));
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 401) navigate('/login');
      toast({ title: "Error fetching data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Profile Handler
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateProfile(profile);
      toast({ title: "Profile Updated" });
    } catch (error) {
      toast({ title: "Update Failed", variant: "destructive" });
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="destructive" onClick={handleLogout}>Logout</Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 justify-start">
        {['Profile', 'Projects', 'Experience', 'Education', 'Volunteering', 'Certificates', 'Awards', 'Skills', 'Hobbies', 'Social', 'Competitive'].map(tab => (
          <TabsTrigger key={tab} value={tab.toLowerCase()} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border border-border">
            {tab}
          </TabsTrigger>
        ))}
      </TabsList>        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader><CardTitle>Edit Profile</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input value={profile?.name || ''} onChange={e => setProfile({...profile, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={profile?.title || ''} onChange={e => setProfile({...profile, title: e.target.value})} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Textarea className="min-h-[150px]" value={profile?.bio || ''} onChange={e => setProfile({...profile, bio: e.target.value})} />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                    <Label>Profile Image URL</Label>
                    <Input value={profile?.profile_image_url || ''} onChange={e => setProfile({...profile, profile_image_url: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>CV URL</Label>
                    <Input value={profile?.cv_url || ''} onChange={e => setProfile({...profile, cv_url: e.target.value})} />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input value={profile?.email || ''} onChange={e => setProfile({...profile, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input value={profile?.phone || ''} onChange={e => setProfile({...profile, phone: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input value={profile?.location || ''} onChange={e => setProfile({...profile, location: e.target.value})} />
                  </div>
                </div>
                <Button type="submit"><Save className="w-4 h-4 mr-2" /> Save Profile</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects">
          <SectionManager 
            title="Projects" 
            resource="projects"
            items={projects} 
            setItems={setProjects}
            apiCreate={api.createProject}
            apiUpdate={api.updateProject}
            apiDelete={api.deleteProject}
            fields={[
              { name: 'title', label: 'Title', type: 'text' },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'technologies', label: 'Technologies (comma separated)', type: 'text' },
              { name: 'details', label: 'Details (comma separated)', type: 'text' },
              { name: 'category', label: 'Category', type: 'text' },
              { name: 'demo_link', label: 'Live Link', type: 'text' },
              { name: 'github_link', label: 'GitHub Link', type: 'text' },
              { name: 'image_url', label: 'Image URL', type: 'text' }
            ]}
          />
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience">
          <SectionManager 
            title="Work Experience" 
            resource="experience"
            items={experience} 
            setItems={setExperience}
            apiCreate={api.createExperience}
            apiUpdate={api.updateExperience}
            apiDelete={api.deleteExperience}
            fields={[
              { name: 'position', label: 'Position', type: 'text' },
              { name: 'company', label: 'Company', type: 'text' },
              { name: 'duration', label: 'Duration', type: 'text' },
              { name: 'location', label: 'Location', type: 'text' },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'achievements', label: 'Achievements', type: 'textarea' },
              { name: 'type', label: 'Type (Full-time/Part-time)', type: 'text' }
            ]}
          />
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education">
          <SectionManager 
            title="Education" 
            resource="education"
            items={education} 
            setItems={setEducation}
            apiCreate={api.createEducation}
            apiUpdate={api.updateEducation}
            apiDelete={api.deleteEducation}
            fields={[
              { name: 'degree', label: 'Degree', type: 'text' },
              { name: 'institution', label: 'Institution', type: 'text' },
              { name: 'duration', label: 'Duration', type: 'text' },
              { name: 'status', label: 'Status', type: 'text' },
              { name: 'gpa', label: 'GPA', type: 'text' },
              { name: 'description', label: 'Description', type: 'textarea' }
            ]}
          />
        </TabsContent>

        {/* Volunteering Tab */}
        <TabsContent value="volunteering">
          <SectionManager 
            title="Volunteering" 
            resource="volunteering"
            items={volunteering} 
            setItems={setVolunteering}
            apiCreate={api.createVolunteering}
            apiUpdate={api.updateVolunteering}
            apiDelete={api.deleteVolunteering}
            fields={[
              { name: 'role', label: 'Role', type: 'text' },
              { name: 'organization', label: 'Organization', type: 'text' },
              { name: 'duration', label: 'Duration', type: 'text' },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'impact', label: 'Key Impact', type: 'text' },
              { name: 'color_class', label: 'Color Class', type: 'text' }
            ]}
          />
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates">
          <SectionManager 
            title="Certificates" 
            resource="certificates"
            items={certificates} 
            setItems={setCertificates}
            apiCreate={api.createCertificate}
            apiUpdate={api.updateCertificate}
            apiDelete={api.deleteCertificate}
            fields={[
              { name: 'title', label: 'Title', type: 'text' },
              { name: 'issuer', label: 'Issuer', type: 'text' },
              { name: 'date', label: 'Date', type: 'text' },
              { name: 'category', label: 'Category', type: 'text' },
              { name: 'skills', label: 'Skills', type: 'text' },
              { name: 'link', label: 'Link', type: 'text' }
            ]}
          />
        </TabsContent>

        {/* Awards Tab */}
        <TabsContent value="awards">
          <SectionManager 
            title="Awards" 
            resource="awards"
            items={awards} 
            setItems={setAwards}
            apiCreate={api.createAward}
            apiUpdate={api.updateAward}
            apiDelete={api.deleteAward}
            fields={[
              { name: 'title', label: 'Title', type: 'text' },
              { name: 'organization', label: 'Organization', type: 'text' },
              { name: 'year', label: 'Year', type: 'text' },
              { name: 'rank', label: 'Rank/Position', type: 'text' },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'link', label: 'Image/Proof Link', type: 'text' },
              { name: 'color_class', label: 'Color Class', type: 'text' }
            ]}
          />
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills">
          <SectionManager 
            title="Skills" 
            resource="skills"
            items={skills} 
            setItems={setSkills}
            apiCreate={api.createSkill}
            apiUpdate={api.updateSkill}
            apiDelete={api.deleteSkill}
            fields={[
              { name: 'name', label: 'Skill Name', type: 'text' },
              { name: 'category', label: 'Category', type: 'text' },
              { name: 'color_class', label: 'Color Class', type: 'text' }
            ]}
          />
        </TabsContent>

        {/* Hobbies Tab */}
        <TabsContent value="hobbies">
          <SectionManager 
            title="Hobbies" 
            resource="hobbies"
            items={hobbies} 
            setItems={setHobbies}
            apiCreate={api.createHobby}
            apiUpdate={api.updateHobby}
            apiDelete={api.deleteHobby}
            fields={[
              { name: 'name', label: 'Hobby Name', type: 'text' },
              { name: 'description', label: 'Description', type: 'textarea' },
              { name: 'color_class', label: 'Color Class', type: 'text' },
              { name: 'icon_name', label: 'Icon Name (Lucide)', type: 'text' }
            ]}
          />
        </TabsContent>

      {/* Social Links Tab */}
      <TabsContent value="social">
        <SectionManager 
          title="Social Links" 
          resource="social-links"
          items={socialLinks} 
          setItems={setSocialLinks}
          apiCreate={api.createSocialLink}
          apiUpdate={api.updateSocialLink}
          apiDelete={api.deleteSocialLink}
          fields={[
            { name: 'platform', label: 'Platform', type: 'text' },
            { name: 'url', label: 'URL', type: 'text' },
            { name: 'icon_name', label: 'Icon Name', type: 'text' }
          ]}
        />
      </TabsContent>

      {/* Competitive Profiles Tab */}
      <TabsContent value="competitive">
        <SectionManager 
          title="Competitive Profiles" 
          resource="competitive_profiles"
          items={competitiveProfiles} 
          setItems={setCompetitiveProfiles}
          apiCreate={api.createCompetitiveProfile}
          apiUpdate={api.updateCompetitiveProfile}
          apiDelete={api.deleteCompetitiveProfile}
          fields={[
            { name: 'platform', label: 'Platform', type: 'text' },
            { name: 'profile_link', label: 'Profile URL', type: 'text' },
            { name: 'rating', label: 'Rating (Optional)', type: 'text' },
            { name: 'solved_count', label: 'Solved Count (Optional)', type: 'text' },
            { name: 'icon', label: 'Icon Name (Optional)', type: 'text' }
          ]}
        />
      </TabsContent>
    </Tabs>
    </div>
  );
};

// Reusable Component for Managing Lists of Items
const SectionManager = ({ title, resource, items, setItems, apiCreate, apiUpdate, apiDelete, fields }: any) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [draggedItem, setDraggedItem] = useState<any>(null);
  const [hasOrderChanged, setHasOrderChanged] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentItem.id) {
        await apiUpdate(currentItem.id, currentItem);
        setItems(items.map((i: any) => i.id === currentItem.id ? currentItem : i));
        toast({ title: "Updated successfully" });
      } else {
        const res = await apiCreate(currentItem);
        setItems([...items, res.data]);
        toast({ title: "Created successfully" });
      }
      setIsDialogOpen(false);
      setCurrentItem(null);
    } catch (error) {
      toast({ title: "Operation failed", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this item?")) return;
    try {
      await apiDelete(id);
      setItems(items.filter((i: any) => i.id !== id));
      toast({ title: "Deleted successfully" });
    } catch (error) {
      toast({ title: "Delete failed", variant: "destructive" });
    }
  };

  const handleSaveOrder = async () => {
    try {
      await api.reorderItems(resource, items);
      setHasOrderChanged(false);
      toast({ title: "Order saved successfully" });
    } catch (error) {
      toast({ title: "Failed to save order", variant: "destructive" });
    }
  };

  const handleDragStart = (e: React.DragEvent, item: any) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
    // Set a transparent image or similar if needed, but default is usually fine
    // e.dataTransfer.setDragImage(e.currentTarget as Element, 0, 0);
    (e.target as HTMLElement).style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setDraggedItem(null);
    (e.target as HTMLElement).style.opacity = '1';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (!draggedItem) return;
    
    const draggedOverItem = items[index];
    if (draggedItem === draggedOverItem) return;

    const newItems = items.filter((item: any) => item !== draggedItem);
    newItems.splice(index, 0, draggedItem);

    setItems(newItems);
    setHasOrderChanged(true);
  };

  const openCreate = () => {
    setCurrentItem({});
    setIsDialogOpen(true);
  };

  const openEdit = (item: any) => {
    setCurrentItem({ ...item });
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <div className="flex gap-2">
          {hasOrderChanged && (
            <Button onClick={handleSaveOrder} size="sm" variant="secondary">
              <Save className="w-4 h-4 mr-2" /> Save Order
            </Button>
          )}
          <Button onClick={openCreate} size="sm"><Plus className="w-4 h-4 mr-2" /> Add New</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.length === 0 && <p className="text-muted-foreground text-center py-4">No items found.</p>}
          {items.map((item: any, index: number) => (
            <div 
              key={item.id || index} 
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, index)}
              className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors cursor-move"
            >
              <div className="flex items-center gap-4 overflow-hidden">
                <GripVertical className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                <div className="space-y-1 overflow-hidden">
                  <h3 className="font-semibold truncate">{item.title || item.name || item.position || item.degree || item.role || item.platform}</h3>
                  <p className="text-sm text-muted-foreground truncate max-w-md">
                    {item.description || item.company || item.institution || item.organization || item.url}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="w-4 h-4" /></Button>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{currentItem?.id ? 'Edit' : 'Add'} {title.slice(0, -1)}</DialogTitle>
              <DialogDescription>
                Make changes to your {title.toLowerCase()} here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {fields.map((field: any) => (
                <div key={field.name} className="space-y-2">
                  <Label>{field.label}</Label>
                  {field.type === 'textarea' ? (
                    <Textarea 
                      value={currentItem?.[field.name] || ''} 
                      onChange={e => setCurrentItem({...currentItem, [field.name]: e.target.value})}
                    />
                  ) : (
                    <Input 
                      value={currentItem?.[field.name] || ''} 
                      onChange={e => setCurrentItem({...currentItem, [field.name]: e.target.value})}
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default Admin;
