import React from "react";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export function PricingPage() {
  return (
    <Layout>
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Transparent Pricing for Every Team</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that's right for you and start building with Xylo.dev today.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Tier */}
          <Card className="flex flex-col border-2">
            <CardHeader className="flex flex-col space-y-1.5">
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription>For individual developers and small projects</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                <PricingFeature>Access to AI Assistant</PricingFeature>
                <PricingFeature>Basic code assistance</PricingFeature>
                <PricingFeature>Limited terminal commands</PricingFeature>
                <PricingFeature>5 AI requests per day</PricingFeature>
                <PricingFeature>Community support</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link to="/signup">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Tier */}
          <Card className="flex flex-col border-2 border-blue-600 shadow-lg relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <CardHeader className="flex flex-col space-y-1.5">
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription>For professional developers and teams</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                <PricingFeature>Everything in Free</PricingFeature>
                <PricingFeature>Advanced code assistance</PricingFeature>
                <PricingFeature>Full terminal access</PricingFeature>
                <PricingFeature>Web browsing capabilities</PricingFeature>
                <PricingFeature>Unlimited AI requests</PricingFeature>
                <PricingFeature>Access to all AI models</PricingFeature>
                <PricingFeature>Priority support</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link to="/signup">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Tier */}
          <Card className="flex flex-col border-2">
            <CardHeader className="flex flex-col space-y-1.5">
              <CardTitle className="text-2xl">Enterprise</CardTitle>
              <CardDescription>For organizations with advanced needs</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$99</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                <PricingFeature>Everything in Pro</PricingFeature>
                <PricingFeature>Custom AI agents</PricingFeature>
                <PricingFeature>Microagents for specialized tasks</PricingFeature>
                <PricingFeature>Team collaboration features</PricingFeature>
                <PricingFeature>Advanced security features</PricingFeature>
                <PricingFeature>SSO and SAML integration</PricingFeature>
                <PricingFeature>Dedicated support</PricingFeature>
                <PricingFeature>Custom onboarding</PricingFeature>
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full" variant="outline">
                <Link to="/signup">Contact Sales</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I switch plans later?</h3>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Do you offer a free trial?</h3>
              <p className="text-muted-foreground">Yes, all paid plans come with a 14-day free trial. No credit card required to start.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Is there a refund policy?</h3>
              <p className="text-muted-foreground">We offer a 30-day money-back guarantee for all paid plans if you're not satisfied with our service.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface PricingFeatureProps {
  children: React.ReactNode;
}

function PricingFeature({ children }: PricingFeatureProps) {
  return (
    <li className="flex items-center">
      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
      <span>{children}</span>
    </li>
  );
}
