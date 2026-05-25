import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EmployeesSectionPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-[36px] border border-transparent bg-white/75 p-8 backdrop-blur-2xl">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Employee's Section
          </h1>
          <p className="text-muted-foreground">For Willimedians only !!.</p>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <a
              href="https://mail.willimed.com"
              target="_blank"
              rel="noreferrer noopener"
              className="block"
            >
              <Card className="h-full hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle>Willi Med</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Contact Willi Med via email: hello@wmwebsite.com
                </CardContent>
              </Card>
            </a>

            <a
              href="https://willimed.wm360.info"
              target="_blank"
              rel="noreferrer noopener"
              className="block"
            >
              <Card className="h-full hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle>CRM Support</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Open your mail client to contact CRM: crm@wmwebsite.com
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
