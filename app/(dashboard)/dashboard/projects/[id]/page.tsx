// app/(dashboard)/dashboard/projects/[id]/page.tsx

import { notFound } from 'next/navigation';
import { getProjectById, getRelatedProjects } from '../../../../lib/actions/project.actions';
import { getDonationsByProjectId } from '../../../../lib/actions/donation.actions';
import { getCurrentUser } from '../../../../lib/actions/user.actions';
import DonationForm from '../../../../components/donors/DonationForm';
import DonationList from '../../../../components/donors/DonationList';
import ProjectCard from '../../../../components/dashboard/ProjectCard';
import ProgressBar from '../../../../components/ui/ProgressBar';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';
import { Card, CardContent } from '../../../../components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/Tabs';
import { Calendar, MapPin, Users, Target, Heart, Share2, Bookmark } from 'lucide-react';
import Link from 'next/link';

// Define TypeScript interfaces for your data
interface Milestone {
  id: string;
  title: string;
  description: string;
  date: Date;
  status?: string;
}

interface ProjectUpdate {
  id: string;
  title: string;
  content: string;
  date: Date;
  images?: string[];
  //createdAt: Date;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface Organization {
  name: string;
  logo?: string;
  description?: string;
  projectsCount?: number;
}

// Update ProjectData to handle Decimal values
interface ProjectData {
  id: string;
  _id?: string;
  title: string;
  description: string;
  shortDescription?: string;
  category: string;
  location: string;
  status: string;
  goalAmount: number | any; // Allow Decimal type
  currentAmount: number | any; // Allow Decimal type
  amountRaised?: number | any; // Allow Decimal type
  totalDonors?: number;
  featuredImage?: string;
  image?: string;
  endDate?: Date;
  deadline?: Date;
  beneficiaries?: string;
  organization?: Organization;
  milestones?: Milestone[];
  updates?: ProjectUpdate[];
  faqs?: FAQItem[];
  faq?: FAQItem[];
  _count?: {
    donations: number;
  };
}

interface RelatedProject {
  _id: string;
  title: string;
  description: string;
  shortDescription?: string;
  progress: number;
  raised: number | any; // Allow Decimal type
  target: number | any; // Allow Decimal type
  donors: number;
  category: string;
  location: string;
  status: string;
  image?: string;
}

// Define a helper type for Decimal conversion
type Decimal = {
  toNumber(): number;
  toString(): string;
  // Add other Decimal methods as needed
}

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// Helper function to convert Decimal to number
const toNumber = (value: number | any): number => {
  if (typeof value === 'number') return value;
  if (value && typeof value.toNumber === 'function') return value.toNumber();
  if (value && typeof value.toString === 'function') return parseFloat(value.toString());
  return 0;
};

export default async function ProjectPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  
  try {
    // Fetch data in parallel
    const [project, currentUser, donations, relatedProjects] = await Promise.all([
      getProjectById(id),
      getCurrentUser(),
      getDonationsByProjectId(id, 5), // Get last 5 donations
      getRelatedProjects(id, 3) // Get 3 related projects
    ]);

    if (!project) {
      notFound();
    }

    // Convert Decimal values to numbers for the project data
    const projectData = {
      ...project,
      goalAmount: toNumber(project.goalAmount),
      currentAmount: toNumber(project.currentAmount),
      amountRaised: toNumber(project.amountRaised || project.currentAmount),
    } as ProjectData;

    // Calculate progress
    const amountRaised = projectData.amountRaised || projectData.currentAmount || 0;
    const progress = projectData.goalAmount > 0 
      ? Math.min((amountRaised / projectData.goalAmount) * 100, 100)
      : 0;

    // Format dates
    const formatDate = (date: Date) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    // Get total donors
    const totalDonors = projectData.totalDonors || projectData._count?.donations || 0;

    // Check if user has bookmarked this project
    const projectId = projectData._id || projectData.id;
    const isBookmarked = currentUser?.bookmarkedProjects?.includes(projectId) || false;

    // Get image URL
    const imageUrl = projectData.image || projectData.featuredImage || '/placeholder-project.jpg';

    // Convert donations to have proper number types
    const formattedDonations = donations.map((donation: any) => ({
      ...donation,
      amount: toNumber(donation.amount)
    }));

    // Convert related projects to have proper number types
    const formattedRelatedProjects = relatedProjects.map((project: any) => ({
      ...project,
      raised: toNumber(project.raised),
      target: toNumber(project.target)
    }));

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary">
                  Dashboard
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link href="/dashboard/projects" className="ml-1 text-sm font-medium text-gray-500 hover:text-primary md:ml-2">
                    Projects
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="ml-1 text-sm font-medium text-gray-700 truncate max-w-xs">
                    {projectData.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Header */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={projectData.status === 'active' || projectData.status === 'ACTIVE' ? 'default' : 'secondary'}>
                        {projectData.status.charAt(0).toUpperCase() + projectData.status.slice(1).toLowerCase()}
                      </Badge>
                      <Badge variant="outline">
                        {projectData.category}
                      </Badge>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{projectData.title}</h1>
                    <p className="text-gray-600 mb-4">{projectData.shortDescription || projectData.description.substring(0, 200)}...</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-primary' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Project Image */}
                <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-6">
                  <img
                    src={imageUrl}
                    alt={projectData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white text-gray-900">
                      <Heart className="h-3 w-3 mr-1 text-red-500" />
                      {totalDonors}
                    </Badge>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-2xl font-bold text-primary">
                      ${amountRaised.toLocaleString()}
                    </div>
                    <div className="text-gray-600">
                      raised of ${projectData.goalAmount.toLocaleString()} goal
                    </div>
                  </div>
                  <ProgressBar value={progress} className="h-3" />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>{progress.toFixed(1)}% funded</span>
                    <span>{totalDonors} donors</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Target className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="text-lg font-semibold">{projectData.goalAmount.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Goal</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="text-lg font-semibold">{totalDonors}</div>
                      <div className="text-sm text-gray-600">Donors</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="text-lg font-semibold">
                        {projectData.endDate || projectData.deadline 
                          ? new Date(projectData.endDate || projectData.deadline!).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                          : 'Ongoing'
                        }
                      </div>
                      <div className="text-sm text-gray-600">Deadline</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="text-lg font-semibold">{projectData.location}</div>
                      <div className="text-sm text-gray-600">Location</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Tabs Section */}
              <Tabs defaultValue="description" className="bg-white rounded-lg shadow-sm border">
                <TabsList className="w-full border-b rounded-t-lg">
                  <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
                  <TabsTrigger value="updates" className="flex-1">Updates</TabsTrigger>
                  <TabsTrigger value="donors" className="flex-1">Donors</TabsTrigger>
                  <TabsTrigger value="faq" className="flex-1">FAQ</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="p-6">
                  <div className="prose max-w-none">
                    <h2 className="text-2xl font-bold mb-4">About this Project</h2>
                    <div dangerouslySetInnerHTML={{ __html: projectData.description }} />
                    
                    {projectData.beneficiaries && (
                      <>
                        <h3 className="text-xl font-semibold mt-6 mb-3">Beneficiaries</h3>
                        <p className="text-gray-700">{projectData.beneficiaries}</p>
                      </>
                    )}
                    
                    {projectData.milestones && projectData.milestones.length > 0 && (
                      <>
                        <h3 className="text-xl font-semibold mt-6 mb-3">Project Milestones</h3>
                        <div className="space-y-4">
                          {projectData.milestones.map((milestone: Milestone, index: number) => (
                            <div key={milestone.id || index} className="border-l-4 border-primary pl-4 py-2">
                              <div className="font-semibold">{milestone.title}</div>
                              <div className="text-sm text-gray-600">
                                {formatDate(milestone.date)} - {milestone.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="updates" className="p-6">
                  <div className="space-y-6">
                    {projectData.updates && projectData.updates.length > 0 ? (
                      projectData.updates.map((update: ProjectUpdate, index: number) => (
                        <div key={update.id || index} className="border-b pb-6 last:border-b-0">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold">{update.title}</h3>
                            <span className="text-sm text-gray-500">
  {formatDate(update.date)} {/* Just use date field */}
</span>
                          </div>
                          <p className="text-gray-700 mb-3">{update.content}</p>
                          {update.images && update.images.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 mt-3">
                              {update.images.map((img: string, imgIndex: number) => (
                                <img
                                  key={imgIndex}
                                  src={img}
                                  alt={`Update ${index + 1} - Image ${imgIndex + 1}`}
                                  className="rounded-lg w-full h-32 object-cover"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        No updates yet. Check back soon!
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="donors" className="p-6">
                  <DonationList 
                    donations={formattedDonations}
                    showProjectInfo={false}
                  />
                  {formattedDonations.length > 0 && (
                    <div className="text-center mt-6">
                      <Link href={`/dashboard/projects/${id}/donations`}>
                        <Button variant="outline">
                          View All Donations
                        </Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="faq" className="p-6">
                  {((projectData.faq || projectData.faqs) && (projectData.faq || projectData.faqs)!.length > 0) ? (
                    <div className="space-y-4">
                      {(projectData.faq || projectData.faqs)!.map((item: FAQItem, index: number) => (
                        <div key={item.id || index} className="border rounded-lg p-4">
                          <h4 className="font-semibold text-lg mb-2">{item.question}</h4>
                          <p className="text-gray-700">{item.answer}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      No frequently asked questions yet.
                    </div>
                  )}
                </TabsContent>
              </Tabs>

              {/* Related Projects */}
              {formattedRelatedProjects.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {formattedRelatedProjects.map((relatedProject: RelatedProject) => (
                      <ProjectCard
                        key={relatedProject._id}
                        title={relatedProject.title}
                        organization="" // Add organization data if available
                        progress={relatedProject.progress}
                        raised={toNumber(relatedProject.raised)}
                        target={toNumber(relatedProject.target)}
                        donors={relatedProject.donors}
                        category={relatedProject.category}
                        location={relatedProject.location}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Donation Form & Info */}
            <div className="space-y-6">
              {/* Donation Form Card */}
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Support this Project</h3>
                  <DonationForm 
                    projectId={id}
                    projectTitle={projectData.title}
                    projectImage={imageUrl}
                    currentUser={currentUser}
                  />
                </CardContent>
              </Card>

              {/* Project Organizer Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Organizer</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                      {projectData.organization?.logo ? (
                        <img 
                          src={projectData.organization.logo} 
                          alt={projectData.organization.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary text-white font-semibold">
                          {projectData.organization?.name?.charAt(0) || 'N'}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{projectData.organization?.name || 'Non-Profit Organization'}</h4>
                      <p className="text-sm text-gray-600">
                        {projectData.organization?.projectsCount || 0} projects
                      </p>
                    </div>
                  </div>
                  {projectData.organization?.description && (
                    <p className="mt-4 text-sm text-gray-700">
                      {projectData.organization.description}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Share & Social Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Share this Project</h3>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                      Share on Twitter
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                      </svg>
                      Share on Facebook
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                      </svg>
                      Share on LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading project:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-4">The project you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/dashboard/projects">
            <Button>Browse Projects</Button>
          </Link>
        </div>
      </div>
    );
  }
}