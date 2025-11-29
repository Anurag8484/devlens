'use client'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();

  const handleGitHubLogin = () => {
    // This will be connected to actual OAuth later
    console.log("GitHub login clicked");
    // For now, just redirect to repositories
    setTimeout(() => router.push("/dashboard"), 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating background elements */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-32 h-32 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          x: [0, -20, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 right-10 w-40 h-40 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md p-8 text-center space-y-6 backdrop-blur-sm bg-card/80 dark:bg-card/90 border-border/50 shadow-xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <GitBranch className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">DevLens</h1>
            </div>
            <h2 className="text-2xl font-semibold">Welcome Back</h2>
            <p className="text-muted-foreground">
              Sign in with your GitHub account to get started tracking issues
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="py-8"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Github className="w-12 h-12 text-primary" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              className="w-full gap-2 hover-scale"
              onClick={()=>signIn('github',{callbackUrl:'/dashboard'})}
              
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </Button>
          </motion.div>

          <p className="text-xs text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
