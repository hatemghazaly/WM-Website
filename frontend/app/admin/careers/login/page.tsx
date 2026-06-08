import { Suspense } from "react";

import CareersAdminLoginClient from "./login-client";

export default function CareersAdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <CareersAdminLoginClient />
    </Suspense>
  );
}
