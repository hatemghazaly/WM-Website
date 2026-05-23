import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          About Us
        </h1>
        <p className="text-muted-foreground">
          WM Website is not just a project; it&apos;s a commitment to building clean,
          modern, and
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Who We Are</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground sm:text-base">
          <p>
            We are a team that values simplicity, quality, and user-friendly
            design.
          </p>
          <p>
            Our mission is to deliver helpful digital solutions for real-world
            needs.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
