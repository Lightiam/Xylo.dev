import React, { useState, useEffect } from "react";
import { Layout } from "../components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Code, Terminal, Globe, Cpu, Check, GitBranch, TestTube, Rocket } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { chatService, ChatMessage, Model } from "../services/chat";
import { useAuth } from "../App";
import { Badge } from "../components/ui/badge";

export function DashboardPage() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "system", content: "Welcome to Xylo.dev! How can I help you today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState("llama3-70b-8192");
  const [error, setError] = useState("");
  const [activeAgents, setActiveAgents] = useState({
    code: false,
    git: false,
    testing: false,
    deployment: false
  });
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const modelList = await chatService.getModels();
        setModels(modelList);
        if (modelList.length > 0) {
          setSelectedModel(modelList[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch models:", err);
        setError("Failed to load available models. Please try again later.");
      }
    };

    if (isAuthenticated) {
      fetchModels();
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    const userMessage = { role: "user", content: prompt };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError("");
    setPrompt("");
    
    try {
      const messagesToSend = [...messages.filter(m => m.role !== "system"), userMessage];
      
      const response = await chatService.sendMessage({
        messages: messagesToSend,
        model: selectedModel
      });
      
      setMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: response.content
        }
      ]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setError(err.response?.data?.detail || "Failed to get a response. Please try again.");
      
      setMessages(prev => [
        ...prev,
        { 
          role: "assistant", 
          content: "I'm sorry, I encountered an error while processing your request. Please try again later." 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle>AI Assistant</CardTitle>
                    <CardDescription>
                      Chat with your AI development assistant
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-auto flex flex-col">
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <Select value={selectedModel} onValueChange={setSelectedModel}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                          <SelectContent>
                            {models.map((model) => (
                              <SelectItem key={model.id} value={model.id}>
                                {model.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-4 mb-4 overflow-auto">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${
                            message.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              message.role === "user"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}
                      
                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="max-w-[80%] rounded-lg px-4 py-2 bg-gray-100 text-gray-800">
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                          {error}
                        </div>
                      )}
                    </div>
                    
                    <form onSubmit={handleSubmit} className="flex gap-2">
                      <Textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Type your message here..."
                        className="flex-1 resize-none"
                        disabled={isLoading}
                      />
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Sending..." : "Send"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card className="h-[600px]">
                  <CardHeader>
                    <CardTitle>Project Files</CardTitle>
                    <CardDescription>
                      Your project files and directories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
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
                          <path d="M2 9V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1" />
                        </svg>
                        <span>src</span>
                      </div>
                      <div className="flex items-center gap-2 pl-6">
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
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <path d="M9 15h6" />
                          <path d="M9 11h6" />
                        </svg>
                        <span>main.js</span>
                      </div>
                      <div className="flex items-center gap-2 pl-6">
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
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <path d="M9 15h6" />
                          <path d="M9 11h6" />
                        </svg>
                        <span>index.html</span>
                      </div>
                      <div className="flex items-center gap-2">
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
                          <path d="M2 9V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1" />
                        </svg>
                        <span>public</span>
                      </div>
                      <div className="flex items-center gap-2">
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
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <path d="M9 15h6" />
                          <path d="M9 11h6" />
                        </svg>
                        <span>package.json</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="terminal">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle>Terminal</CardTitle>
                <CardDescription>
                  Run commands in a secure sandbox environment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-black text-green-400 p-4 rounded-md h-[450px] font-mono text-sm overflow-auto">
                  <div>$ ls -la</div>
                  <div>total 24</div>
                  <div>drwxr-xr-x 4 user user 4096 Apr 20 00:00 .</div>
                  <div>drwxr-xr-x 3 user user 4096 Apr 20 00:00 ..</div>
                  <div>-rw-r--r-- 1 user user  125 Apr 20 00:00 index.html</div>
                  <div>-rw-r--r-- 1 user user  250 Apr 20 00:00 main.js</div>
                  <div>-rw-r--r-- 1 user user  350 Apr 20 00:00 package.json</div>
                  <div>$ _</div>
                </div>
                <div className="mt-4">
                  <Input placeholder="Enter command..." />
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
