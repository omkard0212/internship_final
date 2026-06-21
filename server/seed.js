/**
 * Seed script — run once to populate MongoDB with mock data
 * Usage: node seed.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Internship = require('./models/Internship');
const Application = require('./models/Application');

const MONGO_URI = process.env.MONGODB_URI;

// ── Mock users ────────────────────────────────────────────────────────────────
const users = [
  // Students
  {
    email: 'john.doe@student.com', password: 'password123', userType: 'student',
    name: 'John Doe', bio: 'Passionate software developer with experience in full-stack web development.',
    college: 'FRCRCE', degree: 'B.E. Computer Engineering',
    graduationYear: '2026', skills: ['React','Node.js','Python','SQL','Git'], gpa: 8.7,
  },
  {
    email: 'priya.nair@student.com', password: 'password123', userType: 'student',
    name: 'Priya Nair', bio: 'Final year IT student specializing in data science.',
    college: 'FRCRCE', degree: 'B.E. Information Technology',
    graduationYear: '2025', skills: ['Java','Spring Boot','SQL','AWS','Python'], gpa: 9.1,
  },
  {
    email: 'aditya.sharma@student.com', password: 'password123', userType: 'student',
    name: 'Aditya Sharma', college: 'FRCRCE', degree: 'B.E. Computer Engineering',
    graduationYear: '2026', skills: ['React','Node.js','Python'], gpa: 8.2,
  },
  {
    email: 'sneha.patil@student.com', password: 'password123', userType: 'student',
    name: 'Sneha Patil', college: 'FRCRCE', degree: 'B.E. Computer Engineering',
    graduationYear: '2027', skills: ['Python','ML','TensorFlow'], gpa: 8.5,
  },
  {
    email: 'ananya.iyer@student.com', password: 'password123', userType: 'student',
    name: 'Ananya Iyer', college: 'FRCRCE', degree: 'B.E. Information Technology',
    graduationYear: '2026', skills: ['React','TypeScript','MongoDB'], gpa: 8.9,
  },
  {
    email: 'kiran.desai@student.com', password: 'password123', userType: 'student',
    name: 'Kiran Desai', college: 'FRCRCE', degree: 'B.E. Mechanical Engineering',
    graduationYear: '2025', skills: ['AutoCAD','SolidWorks','ANSYS'], gpa: 7.5,
  },
  {
    email: 'rohan.mehta@student.com', password: 'password123', userType: 'student',
    name: 'Rohan Mehta', college: 'FRCRCE', degree: 'B.E. Electronics & Telecommunication',
    graduationYear: '2026', skills: ['Embedded C','Arduino','MATLAB'], gpa: 7.8,
  },
  {
    email: 'riya.fernandes@student.com', password: 'password123', userType: 'student',
    name: 'Riya Fernandes', college: 'FRCRCE', degree: 'B.E. Information Technology',
    graduationYear: '2025', skills: ['Data Science','R','Tableau'], gpa: 9.3,
  },
  // University
  {
    email: 'admin@frcrce.ac.in', password: 'frcrce2024', userType: 'university',
    name: 'FRCRCE Admin', bio: 'Fr. Conceicao Rodrigues College of Engineering, Mumbai',
    website: 'www.frcrce.ac.in', address: 'Fr. Agnel Ashram, Bandra (W), Mumbai - 400050',
    accreditation: 'NAAC',
  },
  // Companies
  {
    email: 'hr@techcorp.com', password: 'techcorp2024', userType: 'company',
    name: 'TechCorp Solutions', bio: 'Leading software development company based in Mumbai.',
    industry: 'Software Development', website: 'www.techcorp.in',
    location: 'Andheri East, Mumbai - 400069',
  },
  {
    email: 'hr@infosys.com', password: 'infosys2024', userType: 'company',
    name: 'Infosys', bio: 'Global IT services and consulting company.',
    industry: 'IT Services', website: 'www.infosys.com', location: 'Pune & Mumbai',
  },
  {
    email: 'hr@ailabs.com', password: 'ailabs2024', userType: 'company',
    name: 'AI Labs', bio: 'Artificial intelligence research and product company.',
    industry: 'Artificial Intelligence', website: 'www.ailabs.in',
    location: 'BKC, Mumbai - 400051',
  },
  {
    email: 'hr@datasoft.com', password: 'datasoft2024', userType: 'company',
    name: 'DataSoft', bio: 'Data analytics and business intelligence solutions.',
    industry: 'Data Analytics', website: 'www.datasoft.in',
    location: 'Lower Parel, Mumbai - 400013',
  },
  {
    email: 'hr@cloudbase.com', password: 'cloudbase2024', userType: 'company',
    name: 'CloudBase', bio: 'Cloud infrastructure and DevOps solutions provider.',
    industry: 'Cloud Computing', website: 'www.cloudbase.in',
    location: 'Powai, Mumbai - 400076',
  },
  {
    email: 'hr@webagency.com', password: 'webagency2024', userType: 'company',
    name: 'WebAgency', bio: 'Digital marketing and web development agency.',
    industry: 'Digital Marketing', website: 'www.webagency.in',
    location: 'Bandra (W), Mumbai - 400050',
  },
];

// ── Mock internships ──────────────────────────────────────────────────────────
const internshipSeeds = [
  {
    position: 'React Developer', company: 'TechCorp Solutions', companyEmail: 'hr@techcorp.com',
    department: 'Computer Engineering', duration: '3 months', stipend: '₹15,000/month',
    location: 'Andheri, Mumbai', deadline: new Date('2026-08-01'),
    description: 'Build modern web interfaces using React and related technologies for our growing product.',
    skills: ['React','JavaScript','CSS'], requirements: ['Knowledge of React','Basic JavaScript','Git experience'],
    sdgs: ['SDG 9: Industry, Innovation and Infrastructure'],
    pos: ['PO1: Engineering Knowledge','PO3: Design Solutions'],
    peos: ['PEO1: Technical Proficiency'], status: 'open', approvedByUniversity: true,
  },
  {
    position: 'ML Engineer Intern', company: 'AI Labs', companyEmail: 'hr@ailabs.com',
    department: 'Computer Engineering', duration: '6 months', stipend: '₹20,000/month',
    location: 'BKC, Mumbai', deadline: new Date('2026-07-15'),
    description: 'Work on machine learning models and data pipelines for production AI systems.',
    skills: ['Python','TensorFlow','Pandas'], requirements: ['Python proficiency','Basic ML knowledge','Statistics'],
    sdgs: ['SDG 4: Quality Education','SDG 9: Industry, Innovation and Infrastructure'],
    pos: ['PO1: Engineering Knowledge','PO2: Problem Analysis'],
    peos: ['PEO2: Research & Innovation'], status: 'open', approvedByUniversity: true,
  },
  {
    position: 'DevOps Intern', company: 'CloudBase', companyEmail: 'hr@cloudbase.com',
    department: 'Information Technology', duration: '4 months', stipend: '₹18,000/month',
    location: 'Powai, Mumbai', deadline: new Date('2026-08-15'),
    description: 'Manage CI/CD pipelines and cloud infrastructure for enterprise clients.',
    skills: ['Docker','AWS','Linux'], requirements: ['Linux basics','Scripting skills','Cloud fundamentals'],
    sdgs: ['SDG 9: Industry, Innovation and Infrastructure'],
    pos: ['PO3: Design Solutions','PO5: Modern Tool Usage'],
    peos: ['PEO1: Technical Proficiency'], status: 'open', approvedByUniversity: true,
  },
  {
    position: 'Data Analyst Intern', company: 'DataSoft', companyEmail: 'hr@datasoft.com',
    department: 'Information Technology', duration: '3 months', stipend: '₹12,000/month',
    location: 'Lower Parel, Mumbai', deadline: new Date('2026-09-01'),
    description: 'Analyze business data and create dashboards to drive data-driven decisions.',
    skills: ['SQL','Python','Tableau','Excel'], requirements: ['SQL knowledge','Data visualization basics'],
    sdgs: ['SDG 8: Decent Work and Economic Growth'],
    pos: ['PO2: Problem Analysis','PO4: Investigation'],
    peos: ['PEO3: Professional Excellence'], status: 'open', approvedByUniversity: true,
  },
  {
    position: 'Backend Developer', company: 'Infosys', companyEmail: 'hr@infosys.com',
    department: 'Computer Engineering', duration: '6 months', stipend: '₹25,000/month',
    location: 'Thane, Mumbai', deadline: new Date('2026-07-30'),
    description: 'Develop and maintain scalable backend services for enterprise applications.',
    skills: ['Java','Spring Boot','MySQL','REST API'], requirements: ['Java programming','OOP concepts','Database fundamentals'],
    sdgs: ['SDG 8: Decent Work and Economic Growth','SDG 9: Industry, Innovation and Infrastructure'],
    pos: ['PO1: Engineering Knowledge','PO3: Design Solutions'],
    peos: ['PEO1: Technical Proficiency'], status: 'open', approvedByUniversity: true,
  },
  {
    position: 'UI/UX Design Intern', company: 'WebAgency', companyEmail: 'hr@webagency.com',
    department: 'Information Technology', duration: '3 months', stipend: '₹10,000/month',
    location: 'Bandra, Mumbai', deadline: new Date('2026-08-20'),
    description: 'Design intuitive user interfaces and conduct user research for digital products.',
    skills: ['Figma','Adobe XD','User Research'], requirements: ['Figma proficiency','Eye for design','Portfolio required'],
    sdgs: ['SDG 4: Quality Education'],
    pos: ['PO3: Design Solutions','PO6: Engineering Ethics'],
    peos: ['PEO2: Research & Innovation'], status: 'open', approvedByUniversity: false,
  },
  {
    position: 'Full Stack Developer', company: 'TechCorp Solutions', companyEmail: 'hr@techcorp.com',
    department: 'Computer Engineering', duration: '4 months', stipend: '₹17,000/month',
    location: 'Andheri, Mumbai', deadline: new Date('2026-09-15'),
    description: 'Work on both frontend and backend of a SaaS product used by 10,000+ users.',
    skills: ['React','Node.js','MongoDB'], requirements: ['React basics','Node.js knowledge','MongoDB'],
    sdgs: ['SDG 9: Industry, Innovation and Infrastructure','SDG 8: Decent Work and Economic Growth'],
    pos: ['PO1: Engineering Knowledge','PO3: Design Solutions'],
    peos: ['PEO1: Technical Proficiency'], status: 'open', approvedByUniversity: true,
  },
  {
    position: 'IoT Engineer Intern', company: 'CloudBase', companyEmail: 'hr@cloudbase.com',
    department: 'Electronics & Telecommunication', duration: '5 months', stipend: '₹14,000/month',
    location: 'Powai, Mumbai', deadline: new Date('2026-07-01'),
    description: 'Design and implement IoT solutions for smart building management systems.',
    skills: ['Raspberry Pi','MQTT','Python','Arduino'],
    requirements: ['Embedded systems knowledge','Python basics','Electronics fundamentals'],
    sdgs: ['SDG 9: Industry, Innovation and Infrastructure','SDG 11: Sustainable Cities and Communities'],
    pos: ['PO3: Design Solutions','PO5: Modern Tool Usage'],
    peos: ['PEO1: Technical Proficiency'], status: 'open', approvedByUniversity: true,
  },
];

// ── Seed applications (which student applied where) ───────────────────────────
// Format: [studentEmail, internshipPosition+company, status]
const applicationSeeds = [
  ['john.doe@student.com',       'React Developer',       'TechCorp Solutions',  'Ongoing'],
  ['john.doe@student.com',       'Full Stack Developer',  'TechCorp Solutions',  'Pending'],
  ['john.doe@student.com',       'ML Engineer Intern',    'AI Labs',             'Under Review'],
  ['priya.nair@student.com',     'Backend Developer',     'Infosys',             'Completed'],
  ['priya.nair@student.com',     'ML Engineer Intern',    'AI Labs',             'Shortlisted'],
  ['aditya.sharma@student.com',  'React Developer',       'TechCorp Solutions',  'Shortlisted'],
  ['aditya.sharma@student.com',  'Full Stack Developer',  'TechCorp Solutions',  'Interview'],
  ['sneha.patil@student.com',    'ML Engineer Intern',    'AI Labs',             'Pending'],
  ['ananya.iyer@student.com',    'UI/UX Design Intern',   'WebAgency',           'Accepted'],
  ['ananya.iyer@student.com',    'DevOps Intern',         'CloudBase',           'Ongoing'],
  ['kiran.desai@student.com',    'Data Analyst Intern',   'DataSoft',            'Completed'],
  ['rohan.mehta@student.com',    'IoT Engineer Intern',   'CloudBase',           'Pending'],
  ['riya.fernandes@student.com', 'Data Analyst Intern',   'DataSoft',            'Accepted'],
  ['riya.fernandes@student.com', 'Backend Developer',     'Infosys',             'Completed'],
];

// ── Main seed function ────────────────────────────────────────────────────────
async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log('✅ MongoDB connected');

  // Clear existing data
  await User.deleteMany({});
  await Internship.deleteMany({});
  await Application.deleteMany({});
  console.log('🗑️  Cleared existing data');

  // Hash passwords and create users
  const createdUsers = {};
  for (const u of users) {
    const hashed = await bcrypt.hash(u.password, 10);
    // Use insertOne directly to bypass the pre-save hook (which would double-hash)
    const result = await User.collection.insertOne({
      ...u,
      password: hashed,
      isProfileComplete: false,
      completedInternships: [],
      ongoingInternships: [],
      reviews: [],
      createdAt: new Date(),
    });
    const user = { ...u, _id: result.insertedId };
    createdUsers[u.email] = user;
    console.log(`👤 Created user: ${u.email} (${u.userType})`);
  }

  // Create internships, link to company user
  const createdInternships = {};
  for (const i of internshipSeeds) {
    const companyUser = createdUsers[i.companyEmail];
    const internship = await Internship.create({
      ...i,
      companyId: companyUser?._id,
      companyEmail: undefined,
    });
    createdInternships[`${i.position}|${i.company}`] = internship;
    console.log(`📋 Created internship: ${i.position} @ ${i.company}`);
  }

  // Create applications
  for (const [studentEmail, position, company, status] of applicationSeeds) {
    const student = createdUsers[studentEmail];
    const internship = createdInternships[`${position}|${company}`];
    if (!student || !internship) {
      console.warn(`⚠️  Skipping application: ${studentEmail} → ${position} @ ${company}`);
      continue;
    }
    await Application.create({
      studentId: student._id,
      internshipId: internship._id,
      position,
      company,
      status,
    });
    console.log(`📨 Applied: ${studentEmail} → ${position} [${status}]`);
  }

  console.log('\n✅ Seed complete!');
  console.log('\n📌 Login credentials:');
  console.log('  🎓 Students:    john.doe@student.com / password123');
  console.log('                  priya.nair@student.com / password123');
  console.log('                  (+ 6 more students)');
  console.log('  🏫 University:  admin@frcrce.ac.in / frcrce2024');
  console.log('  🏢 TechCorp:    hr@techcorp.com / techcorp2024');
  console.log('  🏢 Infosys:     hr@infosys.com / infosys2024');
  console.log('  🏢 AI Labs:     hr@ailabs.com / ailabs2024');
  console.log('  🏢 DataSoft:    hr@datasoft.com / datasoft2024');
  console.log('  🏢 CloudBase:   hr@cloudbase.com / cloudbase2024');
  console.log('  🏢 WebAgency:   hr@webagency.com / webagency2024');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
