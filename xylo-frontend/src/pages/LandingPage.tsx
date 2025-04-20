
import { Button } from "../components/ui/button";
import { Layout } from "../components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Github, Code, Terminal, Globe, Cpu, Layers } from "lucide-react";

export function LandingPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-900 to-indigo-900 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Xylo.dev: Code Less, Make More
                </h1>
                <p className="max-w-[600px] text-gray-200 md:text-xl">
                  AI-powered software development platform that helps you build better software faster.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-200">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:ml-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 shadow-lg">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="flex-1 text-sm text-gray-300">terminal</div>
                </div>
                <div className="font-mono text-sm text-gray-300">
                  <p>$ xylo create new-project</p>
                  <p className="text-green-400">✓ Project initialized</p>
                  <p>$ xylo add feature user-auth</p>
                  <p className="text-green-400">✓ Feature added</p>
                  <p>$ xylo deploy</p>
                  <p className="text-green-400">✓ Deployed to production</p>
                  <p className="animate-pulse">_</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Features</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Xylo.dev provides powerful tools to streamline your development workflow.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <FeatureCard
              icon={<Code className="h-10 w-10 text-blue-600" />}
              title="Code Assistance"
              description="Modify code, run commands, and browse the web with AI assistance."
            />
            <FeatureCard
              icon={<Terminal className="h-10 w-10 text-blue-600" />}
              title="Command Execution"
              description="Run commands in a secure sandbox environment with full access control."
            />
            <FeatureCard
              icon={<Globe className="h-10 w-10 text-blue-600" />}
              title="Web Browsing"
              description="Browse the web and extract information to enhance your development."
            />
            <FeatureCard
              icon={<Cpu className="h-10 w-10 text-blue-600" />}
              title="AI Agents"
              description="Specialized agents for different development tasks and workflows."
            />
            <FeatureCard
              icon={<Layers className="h-10 w-10 text-blue-600" />}
              title="Microagents"
              description="Domain-specific knowledge and task workflows for enhanced productivity."
            />
            <FeatureCard
              icon={<Github className="h-10 w-10 text-blue-600" />}
              title="GitHub Integration"
              description="Seamless integration with GitHub for efficient code management."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ready to Get Started?</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join Xylo.dev today and transform your development workflow.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                Sign Up Now
              </Button>
              <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-center mb-2">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
