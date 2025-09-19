import React, { } from "react";
import NAVBAR from "../components/Navbar";
import STARFIELD from "../components/Starfield";
const Blogs = () => {

    const blogsData = [
       
        {
            id: 1,
            title: 'Dive into Generative AI and BadgeMonster Platform',
            date: '23rd July, 2025',
            attendees: 67,
            location: 'CCPC Meeting Hall',
            content: (
                <>
                  <h3 id="title" className="text-xl font-semibold text-pink-500 mt-6 mb-2">Session Overview:</h3>
                  <p className="text-lg text-gray-300 mb-4">
                  <p style={{ textAlign: 'justify' }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;On 23rd July 2025, the Code Crafter Programming Club (CCPC) of Central University of Jharkhand, Ranchi organized a tech session for all students of Computer Science & Engineering. The session was led by Amin U., accompanied by three associates and one intern, and aimed to expose students to cutting-edge developments in Generative Artificial Intelligence and provide insights into the BadgeMonster platform—a tool for self-paced skill development and certification.
                  </p>
                  </p>
                  <h3 className="text-xl font-semibold text-pink-500 mt-6 mb-2">Session Flow:</h3>
                  <ul className="pl-5 space-y-2 text-gray-300">
                      <li className="text-white mb-2 ">
                      <p style={{ textAlign: 'justify' }}>
                        <li className="text-white text-lg">
                          <strong>1. Generative AI Introduction</strong>
                          </li> 
                          <ul className="pl-4 text-gray-300">
                          <p style={{ textAlign: 'justify' }}>
                            The session began with a clear and engaging explanation of Generative AI, its significance, and its real-world impact. The covered topics go as follows:
                            </p>
                            </ul>
                          <ul className="list-disc pl-14">
                              <li className="text-gray-300">Definition of Generative AI</li>
                              <li className="text-gray-300">Career relevance and industry applications</li>
                          </ul>
                          </p>
                      </li>
                      <li className="text-white mb-2">
                      <p style={{ textAlign: 'justify' }}>
                        <li className="text-white text-lg">
                          <strong>2. Tools & Concepts: Perplexity AI, AI Agents, and RAG</strong> 
                          </li>
                          <ul className="pl-4 text-gray-300">
                          <p style={{ textAlign: 'justify' }}>
                            After laying the foundation, Amin U. introduced the audience to key tools and techniques in the AI landscape:
                            </p>
                            </ul>
                          <ul className="list-disc pl-14">
                              <li className="text-gray-300">Perplexity AI: An advanced AI-driven knowledge assistant</li>
                              <li className="text-gray-300">AI Agents: Self-operating digital agents capable of learning and task execution</li>
                              <li className="text-gray-300">RAG (Retrieval-Augmented Generation): An architecture that enhances AI performance by retrieving external information</li>
                          </ul>
                          </p>
                      </li>
                      <li className="text-white mb-2">
                      <p style={{ textAlign: 'justify' }}>
                        <li className="text-white text-lg">
                          <strong>3. Introduction to BadgeMonster</strong> 
                          </li>
                          <ul className="pl-4 text-gray-300">
                          <p style={{ textAlign:  'justify' }}>
                            Toward the end of the session, the speaker introduced BadgeMonster, his own platform that helps students structure their learning journey. Highlights of the platform goes as follows:
                            </p>
                            </ul>
                          <ul className="list-disc pl-14">
                              <li className="text-gray-300">Monthly learning roadmaps for targeted growth</li>
                              <li className="text-gray-300">Modules and tasks leading to tangible skill-building</li>
                              <li className="text-gray-300">Assessments like the AHS test to validate learning</li>
                              <li className="text-gray-300">Digital badges, certificates, and T-shirts as performance rewards</li>
                          </ul>
                          </p>
                      </li>
                      <li className="text-white mb-2">
                      <p style={{ textAlign: 'justify' }}>
                        <li className="text-white text-lg">
                          <strong>4. Incentives & Takeaways:</strong> 
                          </li>
                          <ul className="list-disc pl-14">
                              <li className="text-gray-300">Refreshments were provided to all attendees during the event</li>
                              <li className="text-gray-300">T-shirts were distributed to selected participants on the same day</li>
                              <li className="text-gray-300">Certificates will be awarded in the upcoming days based on student performance and completion of tasks on the platform</li>
                          </ul>
                          </p>
                      </li>
                      <li className="text-white mb-2">
                      <p style={{ textAlign: 'justify' }}>
                        <li className="text-white text-lg">
                          <strong>5. Session Objective</strong> 
                          </li>
                          <ul className="pl-4 text-gray-300">
                          <p style={{ textAlign: 'justify' }}>
                            This tech session aimed to:
                            </p>
                            </ul>
                          <ul className="list-disc pl-14">
                              <li className="text-gray-300">Educate students about the latest advancements in AI and digital assistants</li>
                              <li className="text-gray-300">Promote the use of a structured skill development platform</li>
                              <li className="text-gray-300">Encourage self-paced learning through interactive and gamified models</li>
                          </ul>
                          </p>
                      </li>
                      <h3 className="text-xl font-semibold text-pink-500 mt-6 mb-2">Conclusion</h3>
                        <p className="text-lg text-gray-300 mb-4">
                  <p style={{ textAlign: 'justify' }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;The session conducted by Amin U. was informative, inspiring, and action-oriented. It successfully merged AI education with a practical platform for skill enhancement—BadgeMonster—leaving students with a clearer vision of their learning path. Such initiatives reflect the university's dedication to integrating industry exposure into academic life and empowering students to take charge of their career development.

                  </p>
                  </p>
                  </ul>
              </>
            ),
            author: "~Neha Kumari"
        },
        {
            id: 2,
            title: 'GitHub Unlocked: Mastering Collabrotion & Automation',
            date: '25th Feb, 2025',
            attendees: 38,
            location: 'CCPC Meeting Hall',
            content: (
                <>
                    <p style={{ textAlign: 'justify' }}>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;On February 25, 2025, at 4:00 PM, a session on Git and GitHub was conducted, hosted by Mr. Krish Kumar and Mr. Hemant Prakash. A total of 35 participants attended the meeting, which focused on providing a fundamental understanding of Git and GitHub. Key topics included version control, repository management, branching, merging, and collaborative development. The session also covered essential operations such as cloning repositories, making commits, and managing pull requests.
                    </p>
                    <p>&nbsp;</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Participants were introduced to the significance of GitHub in software development, highlighting its role in open-source contributions and team collaboration. Additionally, discussions were held on smart cards and portfolio management, emphasizing their importance in professional development. The session provided practical knowledge, enabling participants to work efficiently with Git and GitHub. Overall, the meeting was informative and helped attendees enhance their understanding of modern version control systems and software development practices.
                    </p>

                    </p>               
                </>
            ),
            author: "~Srishti Pathak"
        },
        {
            id: 3,
            title: 'Career in Tech',
            date: '18th Feb, 2025',
            attendees: 23,
            location: 'CCPC Meeting Hall',
            content: (
                <>
                    <p style={{ textAlign: 'justify' }}>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;The session commenced with an introduction to various career paths in the tech industry, including software development, data science, UI/UX design, and cybersecurity by Aditya Sir. Later on, Om Vishesh Sir provided a detailed overview of the skills required for each role, emphasizing the importance of continuous learning and certifications. He highlighted key certifications such as AWS Certified Developer, Microsoft Azure Fundamentals, and Google Cloud Professional Cloud Developer, which are crucial for career advancement along with the respective examinations and scholarships and fellowship programs hackathons.
                    Aditya Singh Chandel then took the stage to discuss emerging trends in technology, such as cybersecurity, IoT, blockchain, robotics, and quantum computing. He explained how these technologies are shaping the future and the opportunities they present for aspiring tech professionals. Aditya also shared valuable resources for continuous learning, including online platforms like Coursera, edX, and Udemy, and encouraged participants to engage in hackathons and competitions to hone their skills.
                    The session concluded with a Q&A segment, where participants asked questions about career strategies, and techniques. Both speakers provided practical advice on how to stand out in the competitive tech industry, stressing the importance of networking, certifications, and hands-on experience.
                    </p>
                    <p>&nbsp;</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;Overall, the session was highly informative and motivating, leaving participants with a clearer understanding of the tech landscape and actionable steps to advance their careers.</p>

                    </p>               
                </>
            ),
            author: "~Namrata Dey"
        },
        {
            id: 4,
            title: 'Weekly Meeting of CCPC',
            date: '25th July, 2024',
            attendees: 17,
            location: 'CCPC Meeting Hall',
            content: (
              <>
                  <h3 id="title" className="text-xl font-semibold text-pink-500 mt-6 mb-2">Objective:</h3>
                  <p className="text-lg text-gray-300 mb-4">
                  <p style={{ textAlign: 'justify' }}>
                  &nbsp;&nbsp;&nbsp;&nbsp;The objective of the event is to launch our club's website, introduce the new student body, and kick off the Season of Code (SOC) initiative. We will showcase summer projects, outline plans for future sessions, and explain the registration process for new members. Additionally, we will introduce the Autumn Coding Challenge, aimed at enhancing coding skills and fostering innovation and collaboration.
                  </p>
                  </p>
                  <h3 className="text-xl font-semibold text-pink-500 mt-6 mb-2">Activities:</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      <li className="text-white mb-2">
                      <p style={{ textAlign: 'justify' }}>
                          <strong>Website Launching:</strong> We are thrilled to announce the launch of our club's official website. The website will serve as the central hub for all our activities, updates, and resources. It includes sections for event announcements, project showcases, member profiles, and a blog for sharing insights and experiences. This platform will enhance our communication and engagement with both current and prospective members.
                        </p>
                      </li>
                      <li className="text-white mb-2">
                      <p style={{ textAlign: 'justify' }}>
                          <strong>Club's Student Body Declaration:</strong> The new student body for the club has been officially declared. Here are the key positions and the students who will be leading our club:
                          <ul className="list-disc pl-5 mt-2 space-y-2">
                              <li className="text-gray-300">President: Abhimaan Kumar</li>
                              <li className="text-gray-300">Vice-President: Krish Kumar & Priyanshu Verma</li>
                              <li className="text-gray-300">General Secretaries: Aditya Singh Chandel</li>
                              <li className="text-gray-300">Executives: Om Vishesh (Design Team) & Apurba Das (Technical Team)</li>
                              <li className="text-gray-300">Treasurer: Sandeep Mahato</li>
                          </ul>
                          </p>
                      </li>
                      <li className="text-white mb-2">
                      <p style={{ textAlign: 'justify' }}>
                          <strong>Introduction of SOC (Season of Code):</strong> SOC (Season of Code) is an initiative aimed at encouraging students to participate in open-source projects and develop their coding skills. During SOC, students will have the opportunity to:
                          <ul className="list-disc pl-5 mt-2 space-y-2">
                              <li className="text-gray-300">Collaborate with peers on real-world coding projects.</li>
                              <li className="text-gray-300">Receive mentorship from seniors.</li>
                              <li className="text-gray-300">Enhance their problem-solving and coding abilities.</li>
                              <li className="text-gray-300">Build a portfolio of projects to showcase for internships.</li>
                          </ul>
                          </p>
                      </li>
                      <li className="text-white mb-2">
                      <p style={{ textAlign: 'justify' }}>
                        <strong>Summer Project Showcase:</strong> This summer, our club members worked on various innovative projects based on:
                          <ul className="list-disc pl-5 mt-2 space-y-2">
                              <li className="text-gray-300">Web Development</li>
                              <li className="text-gray-300">Graphics or UI/UX</li>
                          </ul>
                          </p>
                      </li>
                      <li className="text-white mb-2">
                      <p style={{ textAlign: 'justify' }}>
                          <strong>How the Club Will Function:</strong> Our club will function through a structured approach:
                          <ul className="list-disc pl-5 mt-2 space-y-2">
                              <li className="text-gray-300">Monthly Meetings</li>
                              <li className="text-gray-300">Workshops</li>
                              <li className="text-gray-300">Committees for different aspects</li>
                              <li className="text-gray-300">Feedback Mechanism</li>
                          </ul>
                          </p>
                      </li>
                      <li className="text-white mb-2">
                      <p style={{ textAlign: 'justify' }}>
                          <strong>Roadmap of a Coding Competition: Autumn Coding Challenge:</strong> We are excited to announce that we are planning a coding competition named the Autumn Coding Challenge which will be held during October and November. Here are the key details:
                          <ul className="list-disc pl-5 mt-2 space-y-2">
                              <li className="text-gray-300"><strong>Objective:</strong> To challenge and enhance the coding skills of participants.</li>
                              <li className="text-gray-300"><strong>Registration:</strong> Open to all students; registration details will be available on our website.</li>
                              <li className="text-gray-300"><strong>Timeline:</strong> The competition will take place over the months of October and November, with specific dates to be announced soon.</li>
                          </ul>
                        </p>  
                      </li>
                  </ul>
              </>
          ),
          author: "~Shradha Singh"          
        },
          
        {
            id: 5,
            title: 'Computer Graphics & Future Outlook',
            date: '16th May, 2024',
            attendees: 18,
            location: 'CCPC Meeting Hall',
            content: (
                <>
                    <p style={{ textAlign: 'justify' }}>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;The Code Crafter Programming Club hosted an introduction to computer graphics on May 16. Twenty-five people who were eager to learn and make something new showed up for the session. The fundamentals of graphic design software and methods for producing eye-catching digital art were covered in the workshop. An introduction to computer graphics, OPENGL, and their applications in the modern world opens the session. Mr. Om Vishesh installed Microsoft Visual Studio 2022 and OPENGL following the session using C++and how to import libraries like glw 32. Subsequently, Mr. Priyanshu Verma demonstrated to us how to install OpenGL in Python by using basic command prompt phrases, such as Glfw pyopengl and Pygame. Mr. Priyasnshu Verma showcased two 3D cube projects for us and gave us building instructions. Within a month, the members hope to offer some future activities to help all CCPC members learn the fundamentals of OPENGL. The main objective of the programme is to familiarise all members with the basics of OPENGL and provide them with the necessary skills to create their own 3D projects. Additionally, the programme aims to encourage collaboration and creativity among members in exploring the capabilities of OPENGL for future projects.</p>
                    </p>               
                </>
            ),
            author: "~Apurba Das"
        },
        {
            id: 6,
            title: 'GitHub basics and Collaborative coding',
            date: '1st March, 2024',
            attendees: 20,
            location: 'CCPC Meeting Hall',
            content: (
                <>
                    <p style={{ textAlign: 'justify' }}>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;On March 1, 2024, the Code Crafter Programming Club organized a GitHub basics and collaborative coding session for its members. The session was attended by 20 people who wanted to learn more about GitHub and its features. The main objective of the session was to expose and familiarize the participants to GitHub and its collaborative coding techniques. The session started with a welcome and introduction by Mr. Aditya Singh Chandel, followed by a presentation by Mr. Abhimaan on GitHub and version control systems. He explained the importance of collaborative coding and how to use repositories for different projects. Next, Mr. Krish showed us how to create a GitHub account, link it to our student ID, and access the student developer pack. He also demonstrated how to create a repository, collaborate with others, and deploy different versions of our pages. The club coordinators were very helpful and answered our questions throughout the session. The session was very informative. At the end, we were given a task to create a contact card in GitHub with our basic contact details and deploy it online.</p>
                    </p>
                </>
            ),
            author: "~Basil Joy"
        }
    ];

    return (
        <div className="relative min-h-screen bg-black text-white">
            {/* Background Starfield */}
            <STARFIELD />
            
            {/* Navbar */}
            <div className="relative z-20">
                <NAVBAR />
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center z-10 px-4 py-8 md:py-16">
                <div className="max-w-6xl w-full text-center">
                    <h1 className="text-4xl mt-20 lg:mt-10 md:text-5xl font-bold leading-tight mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                        Our Blogs
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 mb-10">
                        Read the latest updates and insights from our club members.
                    </p>

                    {/* Blog List */}
                    <div className="space-y-8 text-left mb-2">
                        {blogsData.map((blog) => (
                            <div key={blog.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
                                <h2 className="text-2xl font-semibold text-white mb-4">{blog.title}</h2>
                                <span className="text-gray-400 mb-4">{`Date: ${blog.date} | ${blog.attendees} people attended | ${blog.location}`}</span>
                                <div className="text-gray-300 mb-4">
                                    {blog.content}
                                </div>
                                <p className="text-right text-gray-500">{blog.author}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;