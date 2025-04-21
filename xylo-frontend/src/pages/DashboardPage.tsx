import { useState } from "react";
import { Layout } from "../components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Code, Terminal, Globe, Cpu, Check, GitBranch, TestTube, Rocket } from "lucide-react";
import { Badge } from "../components/ui/badge";

export function DashboardPage() {
  const [activeAgents, setActiveAgents] = useState({
    code: false,
    git: false,
    testing: false,
    deployment: false
  });

  return (
    <Layout>
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Xylo.dev Dashboard</h1>
        
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="terminal" className="flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              <span>Terminal</span>
            </TabsTrigger>
            <TabsTrigger value="browser" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>Browser</span>
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              <span>Agents</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="space-y-4">
            <div className="flex h-[600px] border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
              {/* VS Code-like top menu bar */}
              <div className="absolute top-0 left-0 right-0 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-1 flex items-center text-sm">
                <div className="flex space-x-4">
                  <span className="text-gray-700 dark:text-gray-300">File</span>
                  <span className="text-gray-700 dark:text-gray-300">Edit</span>
                  <span className="text-gray-700 dark:text-gray-300">Selection</span>
                  <span className="text-gray-700 dark:text-gray-300">View</span>
                  <span className="text-gray-700 dark:text-gray-300">Go</span>
                  <span className="text-gray-700 dark:text-gray-300">Run</span>
                </div>
                <div className="ml-auto flex items-center">
                  <Input 
                    placeholder="emilist-dreamteam-finder" 
                    className="h-7 text-xs bg-gray-200 dark:bg-gray-700 border-0"
                  />
                </div>
              </div>
              
              {/* VS Code-like file explorer */}
              <div className="w-64 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="p-2 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                  EXPLORER
                </div>
                <div className="p-2">
                  <div className="mb-2">
                    <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 rotate-90">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      <span>OPEN EDITORS</span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 rotate-90">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      <span>EMILIST-DREAMTEAM-FINDER</span>
                    </div>
                    <div className="ml-4 mt-1">
                      <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        <span>.qodo</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        <span>public</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 rotate-90">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                        <span>src</span>
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                          <span>components</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                          <span>hooks</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                          <span>lib</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                          <span>pages</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                          <span>services</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                          <span>utils</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                          <span className="text-blue-500 mr-1">#</span>
                          <span>App.css</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                          <span className="text-orange-500 mr-1">📄</span>
                          <span>App.tsx</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                          <span className="text-blue-500 mr-1">#</span>
                          <span>index.css</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                          <span className="text-orange-500 mr-1">📄</span>
                          <span>main.tsx</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                          <span className="text-orange-500 mr-1">📄</span>
                          <span>vite-env.d.ts</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                        <span className="text-gray-500 mr-1">◇</span>
                        <span>.gitignore</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                        <span className="text-gray-500 mr-1">≡</span>
                        <span>bun.lockb</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                        <span className="text-yellow-500 mr-1">{ }</span>
                        <span>components.json</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                        <span className="text-blue-500 mr-1">◉</span>
                        <span>eslint.config.js</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 py-1">
                        <span className="text-orange-500 mr-1">◇</span>
                        <span>index.html</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main content area */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 bg-white dark:bg-gray-900 p-4">
                  <div className="flex flex-col h-full">
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="h-32 w-32 mx-auto text-gray-300 dark:text-gray-700">
                          <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Terminal area */}
                <div className="h-64 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                    <div className="px-4 py-1 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 cursor-pointer">PROBLEMS</div>
                    <div className="px-4 py-1 border-r border-gray-200 dark:border-gray-700 cursor-pointer">OUTPUT</div>
                    <div className="px-4 py-1 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 cursor-pointer">TERMINAL</div>
                    <div className="px-4 py-1 border-r border-gray-200 dark:border-gray-700 cursor-pointer">DEBUG CONSOLE</div>
                    <div className="px-4 py-1 cursor-pointer">PORTS</div>
                    <div className="ml-auto flex items-center px-2 text-gray-400">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                          <path d="m18 15-6-6-6 6" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                  <div className="bg-black text-green-400 p-2 font-mono text-xs h-[calc(100%-28px)] overflow-auto">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex">
                        <span className="text-blue-400 mr-2">xylo@dev:~$</span>
                        <span>ls -la</span>
                      </div>
                      <div>total 24</div>
                      <div>drwxr-xr-x 4 xylo dev 4096 Apr 20 00:00 .</div>
                      <div>drwxr-xr-x 3 xylo dev 4096 Apr 20 00:00 ..</div>
                      <div>-rw-r--r-- 1 xylo dev  125 Apr 20 00:00 index.html</div>
                      <div>-rw-r--r-- 1 xylo dev  250 Apr 20 00:00 main.js</div>
                      <div>-rw-r--r-- 1 xylo dev  350 Apr 20 00:00 package.json</div>
                      <div className="flex">
                        <span className="text-blue-400 mr-2">xylo@dev:~$</span>
                        <span>cd project</span>
                      </div>
                      <div className="flex">
                        <span className="text-blue-400 mr-2">xylo@dev:~/project$</span>
                        <span>npm install</span>
                      </div>
                      <div>added 1250 packages, and audited 1251 packages in 3s</div>
                      <div>125 packages are looking for funding</div>
                      <div className="text-yellow-400">10 moderate severity vulnerabilities</div>
                      <div className="flex">
                        <span className="text-blue-400 mr-2">xylo@dev:~/project$</span>
                        <span>npm run dev</span>
                      </div>
                      <div className="text-cyan-400">{'>'} project@0.1.0 dev</div>
                      <div className="text-cyan-400">{'>'} vite</div>
                      <div className="text-purple-400">VITE v5.0.0 ready in 150 ms</div>
                      <div className="text-white">➜ Local: http://localhost:5173/</div>
                      <div className="text-gray-400">➜ Network: use --host to expose</div>
                      <div className="flex">
                        <span className="text-blue-400 mr-2">xylo@dev:~/project$</span>
                        <span className="animate-pulse">_</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-blue-500 mr-2">$</span>
                    <Input 
                      placeholder="Enter command..." 
                      className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                    />
                    <Button size="sm" variant="ghost" className="ml-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <polyline points="9 10 4 15 9 20" />
                        <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="terminal">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-gray-500" />
                    <CardTitle>Terminal</CardTitle>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="icon" className="h-6 w-6">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 16h.01" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="h-6 w-6">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </Button>
                  </div>
                </div>
                <CardDescription className="text-xs">
                  Run commands in a secure sandbox environment
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-4 py-1 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-xs text-gray-500">xylo@dev:~/project</div>
                </div>
                <div className="bg-black text-green-400 p-4 font-mono text-sm flex-1 overflow-auto">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex">
                      <span className="text-blue-400 mr-2">xylo@dev:~$</span>
                      <span>ls -la</span>
                    </div>
                    <div>total 24</div>
                    <div>drwxr-xr-x 4 xylo dev 4096 Apr 20 00:00 .</div>
                    <div>drwxr-xr-x 3 xylo dev 4096 Apr 20 00:00 ..</div>
                    <div>-rw-r--r-- 1 xylo dev  125 Apr 20 00:00 index.html</div>
                    <div>-rw-r--r-- 1 xylo dev  250 Apr 20 00:00 main.js</div>
                    <div>-rw-r--r-- 1 xylo dev  350 Apr 20 00:00 package.json</div>
                    <div className="flex">
                      <span className="text-blue-400 mr-2">xylo@dev:~$</span>
                      <span>cd project</span>
                    </div>
                    <div className="flex">
                      <span className="text-blue-400 mr-2">xylo@dev:~/project$</span>
                      <span>npm install</span>
                    </div>
                    <div>added 1250 packages, and audited 1251 packages in 3s</div>
                    <div>125 packages are looking for funding</div>
                    <div className="text-yellow-400">10 moderate severity vulnerabilities</div>
                    <div className="flex">
                      <span className="text-blue-400 mr-2">xylo@dev:~/project$</span>
                      <span>npm run dev</span>
                    </div>
                    <div className="text-cyan-400">{'>'} project@0.1.0 dev</div>
                    <div className="text-cyan-400">{'>'} vite</div>
                    <div className="text-purple-400">VITE v5.0.0 ready in 150 ms</div>
                    <div className="text-white">➜ Local: http://localhost:5173/</div>
                    <div className="text-gray-400">➜ Network: use --host to expose</div>
                    <div className="flex">
                      <span className="text-blue-400 mr-2">xylo@dev:~/project$</span>
                      <span className="animate-pulse">_</span>
                    </div>
                  </div>
                </div>
                <div className="flex border-t border-gray-700">
                  <div className="flex text-xs bg-gray-800 text-gray-300">
                    <div className="px-4 py-1 border-r border-gray-700 bg-gray-900 text-white">PROBLEMS</div>
                    <div className="px-4 py-1 border-r border-gray-700">OUTPUT</div>
                    <div className="px-4 py-1 border-r border-gray-700 bg-gray-900 text-white">TERMINAL</div>
                    <div className="px-4 py-1 border-r border-gray-700">DEBUG CONSOLE</div>
                    <div className="px-4 py-1">PORTS</div>
                  </div>
                  <div className="ml-auto flex items-center px-2 text-gray-400">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                        <path d="m18 15-6-6-6 6" />
                      </svg>
                    </Button>
                  </div>
                </div>
                <div className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-blue-500 mr-2">$</span>
                  <Input 
                    placeholder="Enter command..." 
                    className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                  />
                  <Button size="sm" variant="ghost" className="ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <polyline points="9 10 4 15 9 20" />
                      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                    </svg>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="browser">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle>Browser</CardTitle>
                <CardDescription>
                  Browse the web and extract information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-md h-[450px] overflow-auto">
                  <div className="border-b p-2 flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M2 12a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z" />
                        <path d="M12 2v10l4.5 4.5" />
                      </svg>
                    </Button>
                    <Input
                      className="flex-1"
                      placeholder="Enter URL..."
                      defaultValue="https://example.com"
                    />
                  </div>
                  <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Example Domain</h1>
                    <p className="mb-4">
                      This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.
                    </p>
                    <p>
                      <a href="https://www.iana.org/domains/example" className="text-blue-600 hover:underline">
                        More information...
                      </a>
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Input placeholder="Enter URL..." />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="agents">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle>AI Agents</CardTitle>
                <CardDescription>
                  Specialized agents for different development tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className={activeAgents.code ? "border-2 border-blue-500" : ""}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-blue-500" />
                        <CardTitle className="text-lg">Code Agent</CardTitle>
                      </div>
                      {activeAgents.code && (
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          <Check className="h-3 w-3 mr-1" /> Active
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">
                        Helps with code generation, refactoring, and debugging
                      </p>
                      <Button 
                        onClick={() => setActiveAgents(prev => ({ ...prev, code: !prev.code }))}
                        variant={activeAgents.code ? "outline" : "default"}
                      >
                        {activeAgents.code ? "Deactivate" : "Activate"}
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className={activeAgents.git ? "border-2 border-green-500" : ""}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GitBranch className="h-5 w-5 text-green-500" />
                        <CardTitle className="text-lg">Git Agent</CardTitle>
                      </div>
                      {activeAgents.git && (
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          <Check className="h-3 w-3 mr-1" /> Active
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">
                        Assists with version control and GitHub operations
                      </p>
                      <Button 
                        onClick={() => setActiveAgents(prev => ({ ...prev, git: !prev.git }))}
                        variant={activeAgents.git ? "outline" : "default"}
                      >
                        {activeAgents.git ? "Deactivate" : "Activate"}
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className={activeAgents.testing ? "border-2 border-purple-500" : ""}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TestTube className="h-5 w-5 text-purple-500" />
                        <CardTitle className="text-lg">Testing Agent</CardTitle>
                      </div>
                      {activeAgents.testing && (
                        <Badge variant="outline" className="bg-purple-100 text-purple-800">
                          <Check className="h-3 w-3 mr-1" /> Active
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">
                        Generates and runs tests for your code
                      </p>
                      <Button 
                        onClick={() => setActiveAgents(prev => ({ ...prev, testing: !prev.testing }))}
                        variant={activeAgents.testing ? "outline" : "default"}
                      >
                        {activeAgents.testing ? "Deactivate" : "Activate"}
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className={activeAgents.deployment ? "border-2 border-orange-500" : ""}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Rocket className="h-5 w-5 text-orange-500" />
                        <CardTitle className="text-lg">Deployment Agent</CardTitle>
                      </div>
                      {activeAgents.deployment && (
                        <Badge variant="outline" className="bg-orange-100 text-orange-800">
                          <Check className="h-3 w-3 mr-1" /> Active
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">
                        Helps with deploying your applications
                      </p>
                      <Button 
                        onClick={() => setActiveAgents(prev => ({ ...prev, deployment: !prev.deployment }))}
                        variant={activeAgents.deployment ? "outline" : "default"}
                      >
                        {activeAgents.deployment ? "Deactivate" : "Activate"}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
