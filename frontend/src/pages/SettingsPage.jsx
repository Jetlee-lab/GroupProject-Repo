import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ChangePassword from "@/account/ChangePassword";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  return (
    <div
      className={`p-10 w-full h-screen transition-all  'bg-blue-100 text-black'}`}
    >
      <h1 className="text-4xl font-bold mb-6">Settings</h1>

      <div className="mb-4">
        <Dialog>
          <DialogTrigger asChild>
            {/* <Link to="/account/password/change"> */}
              <Button variant="outline" className="mb-2">
                Change Password
              </Button>
            {/* </Link> */}
          </DialogTrigger>
          <DialogContent className="m-4 overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-bold"></DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <div className="grid gap-4">
              <ChangePassword />
            </div>
            <DialogFooter>
              {/* <Button type="submit">Save changes</Button> */}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SettingsPage;
