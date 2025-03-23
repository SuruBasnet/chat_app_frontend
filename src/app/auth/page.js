import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import LoginForm from "../../../components/auth/login"
import RegisterForm from "../../../components/auth/register"

export default function Auth() {
  return (
    <div id="main" className="flex justify-center items-center min-h-screen">
        <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
            <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                Register if you dont have a account
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <LoginForm/>
            </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="register">
            <Card>
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                Login if you already have a account
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <RegisterForm/>
            </CardContent>
            </Card>
        </TabsContent>
        </Tabs>
    </div>
  )
}
