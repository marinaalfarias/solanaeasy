import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  Zap,
  Shield,
  BarChart2,
  Code2,
  Check,
  Terminal,
  Package,
  Key,
  Play,
  ChevronRight,
  Globe,
  Cpu,
} from "lucide-react";
import { CodeBlock } from "../components/CodeBlock";
import logoSolanaEasy from '../../assets/logo.svg';

const installCode = `# Core SDK (calls SolanaEasy backend)
pip install solanaeasy

# With direct Solana network access
pip install solanaeasy[solana]`;

const integrationCode = `from solanaeasy import SolanaEasy

sdk = SolanaEasy(api_key="sk_test_...")

# Create a payment session
session = sdk.create_payment(
    amount=50.00,
    currency="USDC",
    order_id="order_123",
    description="Nike Air Max",
)

print(session.payment_url)   # → redirect your customer here
print(session.session_id)    # → save this to track the payment

# Wait for confirmation (auto-polling, no loop needed)
status = sdk.wait_for_confirmation(session.session_id, timeout=120)
print(status.human_message)  # → "Payment confirmed in 2.3s"`;

const webhookCode = `// Webhook para confirmação no backend
sdk = SolanaEasy(api_key="sk_...", webhook_secret="whsec_...")

# Register handlers using the decorator
@sdk.on("payment.confirmed")
def on_confirmed(event):
    fulfill_order(event.session_id)
    print(event.data.human_message)  # "Payment confirmed in 2.3s"

@sdk.on("payment.failed")
def on_failed(event):
    notify_customer(event.session_id)

# In your webhook endpoint (Flask / FastAPI / Django)
@app.post("/webhook/solana")
def webhook_endpoint(request):
    sdk.process_webhook(
        payload=request.body,
        signature=request.headers["X-SolanaEasy-Signature"],
    )
    return 200`;

const steps = [
  {
    number: "01",
    icon: Package,
    title: "Install the SDK",
    desc: "A single pip install is all it takes to get started with our powerful SolanaEasy SDK.",
    code: installCode,
    language: "bash",
  },
  {
    number: "02",
    icon: Key,
    title: "Add Your API Key",
    desc: "Get your key from the dashboard and configure it in seconds",
    code: 'sdk = SolanaEasy(api_key="sk_test_...")',
    language: "python",
  },
  {
    number: "03",
    icon: Play,
    title: "Call initiatePayment()",
    desc: "The widget appears automatically for the customer",
    code: 'sdk.create_payment(amount=50.00, ...)',
    language: "python",
  },
];

const features = [
  {
    icon: Zap,
    title: "Manage cryptographic keypairs with ease",
    code: 'sdk.create_payment(amount=50.00, ...)',
    color: "#14F195",
  },
  {
    icon: Shield,
    title: "Parse RPC errors into human language",
    code: 'status.human_message in plain English',
    language: "python",
    color: "#9945FF",
  },
  {
    icon: BarChart2,
    title: "Easy build webhook verification",
    code: 'sdk.verify_webhook_signature(payload, sig)',
    language: "python",
    color: "#FBB724",
  },
  {
    icon: Code2,
    title: "Async Support",
    code: 'await sdk.create_payment(amount=50.00, ...)',
    language: "python",
    color: "#14F195",
  },
  {
    icon: Globe,
    title: "CLI",
    desc: "Command-line tool for quick interactions and testing",
    color: "#9945FF",
  },
  {
    icon: Cpu,
    title: "Idempotency",
    desc: "Pass idempotency_key to prevent duplicate charges on network retries",
    color: "#FBB724",
  },
];

export function LandingPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A0C10 0%, #0F0520 50%, #051A0F 100%)" }}
      >
        {/* Background decoration */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: "#9945FF" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{ background: "#14F195" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1
                style={{ color: "#F9FAFB", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1.1 }}
              >
                Embed
                <br />
                <span
                  style={{
                    background: "linear-gradient(90deg, #9945FF, #14F195)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  SolanaEasy
                </span>
                <br />
                in minutes
              </h1>

              <p
                className="mt-6 text-lg"
                style={{ color: "#8B949E", lineHeight: 1.7 }}
              >
                The easier SDK to accept Solana paymetns on your website. Built for developers who value simplicity, performance, and a seamless user experience.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/widget"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl transition-all"
                  style={{
                    background: "linear-gradient(135deg, #9945FF, #14F195)",
                    color: "#111827",
                    fontWeight: 700,
                    boxShadow: "0 4px 24px rgba(153,69,255,0.4)",
                  }}
                >
                  Start integrating now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl transition-all"
                  style={{
                    color: "#F9FAFB",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  See Dashboard
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            {/* Right - Code preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <CodeBlock code={integrationCode} language="typescript" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4" style={{ background: "#F9FAFB" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2
              style={{ color: "#111827", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              Everything you need,
              <span style={{ color: "#9945FF" }}> nothing you don't</span>
            </h2>
            <p className="mt-3" style={{ color: "#6B7280" }}>
              Designed for developers who value simplicity and performance
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(0,0,0,0.06)",
                  boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${feature.color}18` }}
                >
                  <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                </div>
                <h3 style={{ color: "#111827", fontWeight: 700 }}>{feature.title}</h3>
                <p className="mt-2 text-sm" style={{ color: "#6B7280", lineHeight: 1.6 }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started — Split Screen */}
      <section className="py-20" style={{ background: "#0A0C10" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2
              style={{ color: "#F9FAFB", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}
            >
              Ready in{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #9945FF, #14F195)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                3 steps
              </span>
            </h2>
            <p className="mt-3" style={{ color: "#8B949E" }}>
              Get started in less than 10 minutes
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left — Steps */}
            <div className="space-y-4">
              {steps.map((step, i) => {
                const isActive = activeStep === i;
                return (
                  <button
                    key={step.number}
                    onClick={() => setActiveStep(i)}
                    className="w-full text-left p-5 rounded-2xl transition-all"
                    style={{
                      background: isActive ? "rgba(153,69,255,0.08)" : "rgba(255,255,255,0.03)",
                      border: isActive
                        ? "1px solid rgba(153,69,255,0.3)"
                        : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          background: isActive
                            ? "linear-gradient(135deg, #9945FF, #14F195)"
                            : "rgba(255,255,255,0.06)",
                          color: isActive ? "#111827" : "#8B949E",
                        }}
                      >
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs"
                            style={{ color: isActive ? "#9945FF" : "#4A5568", fontWeight: 600 }}
                          >
                            STEP {step.number}
                          </span>
                        </div>
                        <h3
                          className="mt-0.5"
                          style={{ color: isActive ? "#F9FAFB" : "#8B949E", fontWeight: 600 }}
                        >
                          {step.title}
                        </h3>
                        <p className="text-sm mt-1" style={{ color: "#4A5568" }}>
                          {step.desc}
                        </p>
                      </div>
                      {isActive && (
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: "#14F195" }}
                        >
                          <Check className="w-3 h-3" style={{ color: "#111827" }} />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}

              {/* Full example button */}
              <div
                className="p-4 rounded-2xl"
                style={{ background: "rgba(20,241,149,0.05)", border: "1px solid rgba(20,241,149,0.15)" }}
              >
                <p className="text-sm" style={{ color: "#14F195", fontWeight: 600 }}>
                  ✅ That's it!
                </p>
                <p className="text-sm mt-1" style={{ color: "#8B949E" }}>
                  The widget appears automatically on your site with a responsive design, QR Code
                  SolanaEasy, support for multiple wallets, and real-time visual feedback.
                </p>
              </div>
            </div>

            {/* Right — Code Block */}
            <div>
              <CodeBlock
                code={steps[activeStep].code}
                language={steps[activeStep].language}
              />

              {/* Full integration code below */}
              <div className="mt-4">
                <p className="text-xs mb-3" style={{ color: "#4A5568" }}>
                  Complete integration example:
                </p>
                <CodeBlock code={integrationCode} language="typescript" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-24 px-4 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0A0C10, #0F0520)" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, #9945FF 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto"
        >
          <h2
            style={{ color: "#F9FAFB", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Ready to accept
            <br />
            <span
              style={{
                background: "linear-gradient(90deg, #9945FF, #14F195)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SolanaEasy?
            </span>
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/widget"
              className="flex items-center gap-2 px-8 py-4 rounded-xl transition-all"
              style={{
                background: "linear-gradient(135deg, #9945FF, #14F195)",
                color: "#111827",
                fontWeight: 700,
                fontSize: "1.1rem",
                boxShadow: "0 4px 32px rgba(153,69,255,0.5)",
              }}
            >
              Start integrating now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-8 py-4 rounded-xl"
              style={{
                color: "#F9FAFB",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              View Dashboard Demo
            </Link>
          </div>

          <p className="mt-6 text-sm" style={{ color: "#4A5568" }}>
            Free to get started • No credit card required • Setup in 5 minutes
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 px-4"
        style={{ background: "#0A0C10", borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src={logoSolanaEasy}
              alt="Logo SolEasy"
              className="w-6 h-6 object-contain rounded-md"
            />
            <span style={{ color: "#F9FAFB", fontWeight: 700 }}>SolEasy SDK</span>
          </div>
          <p className="text-sm" style={{ color: "#4A5568" }}>
            © 2026 SolEasy SDK. Built with ❤️ for the Solana community.
          </p>
          <div className="flex gap-4 text-sm" style={{ color: "#4A5568" }}>
            <a href="https://medeirosdev.github.io/solanaeasy/" target="_blank" rel="noopener noreferrer" 
  style={{ color: "#8B949E", transition: "color 0.2s" }}
  className="hover:text-white">Docs</a>
            <a href="https://github.com/medeirosdev/solanaeasy" target="_blank" rel="noopener noreferrer" 
  style={{ color: "#8B949E", transition: "color 0.2s" }}
  className="hover:text-white">GitHub</a>
            <a href="https://pypi.org/project/solanaeasy/" target="_blank" rel="noopener noreferrer" 
  style={{ color: "#8B949E", transition: "color 0.2s" }}
  className="hover:text-white">SDK</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
