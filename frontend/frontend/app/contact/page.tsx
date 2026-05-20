import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Contact Us
        </h1>
        <p className="text-muted-foreground">
          We would love to hear from you. Reach out using the details below.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground sm:text-base">
          <p>Email: hello@wmwebsite.com</p>
          <p>Phone: +20 100 000 0000</p>
          <p>Address: Cairo, Egypt</p>
        </CardContent>
      </Card>
    </section>
  );
}
