import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Signup and register to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="your name" required />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="retype-password">Retype Password</Label>
                </div>
                <Input id="retype-password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
