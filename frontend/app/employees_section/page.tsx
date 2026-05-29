import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EmployeesSectionPage() {
  return (
    <section className="bg-transparent py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <h1 className="text-4xl lg:text-5xl font-black text-slate-950">
            Employee&apos;s Section
          </h1>

          <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            For Willimedians only !!
          </p>
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
