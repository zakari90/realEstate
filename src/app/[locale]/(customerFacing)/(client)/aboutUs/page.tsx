import EmailjsComponent from "@/components/emailjsComponent"
import StepsComponent from "@/components/stepsComponent"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[400px] bg-[url('https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">ZProperty</h1>
        </div>
      </section>

      {/* Company Description */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">ZProperty </h2>
        <p className="text-lg mb-4">
  Welcome to Zproperty, your innovative partner in ethical real estate investment. As a new player in the market, we empower buyers to take control by allowing them to submit their own offers and preferred payment terms, creating a more transparent and personalized buying experience.
</p>
<p className="text-lg">
  Whether you are looking to buy, sell, or invest, our dedicated team is here to guide you through the process, ensuring it aligns with your values and goals. Join us in reshaping the future of real estate with thoughtful investments that benefit both you and the community.
</p>
      </section>

      {/* TODO: Team Section */}
      {/* <section className="py-16 px-4 md:px-8 bg-secondary">
        <h2 className="text-3xl font-semibold mb-10 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { name: "Jane Doe", role: "Founder & CEO", image: "/placeholder.svg?height=200&width=200" },
            { name: "John Smith", role: "Senior Agent", image: "/placeholder.svg?height=200&width=200" },
            { name: "Emily Brown", role: "Marketing Director", image: "/placeholder.svg?height=200&width=200" },
          ].map((member) => (
            <Card key={member.name} className="overflow-hidden">
              <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      {/* Mission Statement */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center">Our Mission</h2>
        <blockquote className="text-xl italic text-center">
        To empower clients to make informed real estate choices with exceptional service and sustainable solutions.
        </blockquote>
      </section>

      {/* Footer */}
      <StepsComponent/>
      <footer className="bg-primary text-primary-foreground py-8 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
            <EmailjsComponent/>
          <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
          <p>123 Real Estate Street, Cityville, State 12345</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@horizonrealty.com</p>
        </div>
      </footer>
    </div>
  )
}