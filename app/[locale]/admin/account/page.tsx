import { AdminContainer } from "@/app/[locale]/admin/admin-container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MyAccountPage() {
  return (
    <AdminContainer
      className="px-4 gap-6"
      breadcrumb={[
        { label: "Dashboard", href: "/admin" },
        { label: "Account" },
      ]}
    >
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Update your profile information to keep it up to date.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Form to edit profile information goes here.</p>
          {/* Add your form components here */}
          <form></form>
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button type="submit" className="btn btn-primary">
              Save Changes
            </Button>
          </CardAction>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Form to edit profile information goes here.</p>
          {/* Add your form components here */}
          <form></form>
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button type="submit" className="btn btn-primary">
              Change Password
            </Button>
          </CardAction>
        </CardFooter>
      </Card>
    </AdminContainer>
  );
}
