import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Github, Linkedin, Mail, MapPin, Phone, Download, ExternalLink, Briefcase, GraduationCap, Code2, Terminal } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-black selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-100 via-transparent to-transparent dark:from-slate-900 dark:via-transparent dark:to-transparent opacity-70"></div>
          <div className="container relative mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-8">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                    Nguyen Quang <br />
                    <span className="text-slate-500 dark:text-slate-400">Trung Nhan</span>
                  </h1>
                  <p className="text-xl text-slate-600 dark:text-slate-300 max-w-xl">
                    Software Developer based in Ho Chi Minh City. 
                    Specializing in Backend Development with Ruby on Rails and GoLang.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-w-[200px]">
                  <Button className="w-full rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200">
                    <Download className="mr-2 h-4 w-4" /> Download CV
                  </Button>
                  <div className="flex justify-center gap-4">
                    <Link href="https://github.com/trungnhann" target="_blank" className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                      <Github className="h-6 w-6" />
                    </Link>
                    <Link href="#" className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                      <Linkedin className="h-6 w-6" />
                    </Link>
                    <Link href="mailto:trungnhanforwork@gmail.com" className="p-2 text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors">
                      <Mail className="h-6 w-6" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400 mb-12">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Ho Chi Minh City, Vietnam
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> 0971 694 818
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> trungnhanforwork@gmail.com
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-slate-50/50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Education */}
              <div className="md:col-span-1 space-y-6">
                <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
                  <GraduationCap className="h-5 w-5" /> Education
                </div>
                <Card className="border-none shadow-none bg-transparent">
                  <CardHeader className="p-0 space-y-1">
                    <CardTitle className="text-base font-medium">Academy of Cryptography Techniques</CardTitle>
                    <CardDescription className="text-sm">Ho Chi Minh City</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 pt-2 text-sm text-slate-600 dark:text-slate-400">
                    <p>Bachelor of Information Technology</p>
                    <p>Major: Software Development</p>
                    <p className="mt-1 text-xs text-slate-500">Dec 2025 (Expected) • GPA: 3.1</p>
                  </CardContent>
                </Card>

                <Separator className="my-6 md:hidden" />

                <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white pt-4">
                  <Terminal className="h-5 w-5" /> Skills
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Technical</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="font-normal">Ruby</Badge>
                      <Badge variant="secondary" className="font-normal">GoLang</Badge>
                      <Badge variant="secondary" className="font-normal">PostgreSQL</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Frameworks</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="font-normal">Ruby on Rails</Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="font-normal">English</Badge>
                      <Badge variant="outline" className="font-normal">Vietnamese</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience */}
              <div className="md:col-span-2 space-y-8">
                <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
                  <Briefcase className="h-5 w-5" /> Experience
                </div>

                <div className="relative border-l border-slate-200 dark:border-slate-800 pl-8 space-y-10">
                  {/* Nanoco Backend */}
                  <div className="relative">
                    <div className="absolute -left-[37px] h-4 w-4 rounded-full border-2 border-white bg-blue-500 dark:border-slate-950"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Backend Developer</h3>
                      <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Dec 2024 – Present</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-medium mb-4">Nanoco</p>
                    
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                          Project: Ampo (B2B Platform)
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          Internal e-commerce management platform built with Ruby on Rails, handling business logic, data processing, and 3rd-party integrations.
                        </p>
                        <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc list-outside ml-4 space-y-1">
                          <li>Develop and maintain backend APIs and business logic using Ruby on Rails.</li>
                          <li>Collaborate with frontend and QA teams to deliver features and fix bugs.</li>
                          <li>Integrate external services (SMS, cloud storage, shipping).</li>
                          <li>Support deployment and troubleshoot production issues.</li>
                        </ul>
                        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                          <Badge variant="outline" className="text-xs">Ruby on Rails</Badge>
                          <Badge variant="outline" className="text-xs">PostgreSQL</Badge>
                          <Badge variant="outline" className="text-xs">AWS</Badge>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-100 dark:border-slate-800">
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                          Project: Payflow
                        </h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                          Internal platform to automate and manage business payment processes with robust logic and secure data processing.
                        </p>
                        <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc list-outside ml-4 space-y-1">
                          <li>Develop and maintain backend APIs and business logic.</li>
                          <li>Implement batch processing for payment status and accounting updates.</li>
                          <li>Integrate with AWS S3 for document storage.</li>
                          <li>Document generation (DOCX/PDF/XLSX) for agreements and confirmations.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Nanoco Intern */}
                  <div className="relative">
                    <div className="absolute -left-[37px] h-4 w-4 rounded-full border-2 border-white bg-slate-300 dark:border-slate-950 dark:bg-slate-700"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Software Development Intern</h3>
                      <span className="text-sm text-slate-500 dark:text-slate-400">Sep 2024 – Dec 2024</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-medium mb-2">Nanoco</p>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc list-outside ml-4 space-y-1">
                      <li>Developed database schema and APIs for certificate management tool (Ruby On Rails, Postgres, MongoDB, Google Cloud).</li>
                      <li>Collaborated in a team of eight using Scrum to develop an e-commerce webapp (Ruby On Rails, PostgreSQL, GraphQL).</li>
                    </ul>
                  </div>

                  {/* MindX */}
                  <div className="relative">
                    <div className="absolute -left-[37px] h-4 w-4 rounded-full border-2 border-white bg-slate-300 dark:border-slate-950 dark:bg-slate-700"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Lecturer, Teaching Assistant</h3>
                      <span className="text-sm text-slate-500 dark:text-slate-400">Sep 2022 – Present</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-medium mb-2">MindX Technology School</p>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 list-disc list-outside ml-4 space-y-1">
                      <li>Teaching & supporting students during learning processing.</li>
                      <li>Contributing problem-solving to Teaching Executive Group Leader.</li>
                      <li>Supporting in software, network in workplace.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white mb-8">
                <Code2 className="h-5 w-5" /> Personal Projects
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="https://github.com/trungnhann/microservice-with-go" target="_blank" className="group">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-slate-200 dark:border-slate-800 dark:bg-slate-900/50 group-hover:border-blue-200 dark:group-hover:border-blue-900">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          Student & Certificate Management
                        </CardTitle>
                        <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-500" />
                      </div>
                      <CardDescription>Microservice Architecture</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        A distributed system for managing students and certificates built with Go.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800">Go</Badge>
                        <Badge variant="secondary" className="bg-slate-100 dark:bg-slate-800">Microservices</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
