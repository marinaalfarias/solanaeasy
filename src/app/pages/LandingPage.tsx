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

const installCode = `npm install @SolEasy/sdk`;

const integrationCode = `import { SolEasy } from '@SolEasy/sdk';

// 1. Inicialize com sua chave de API
const SolEasy = new SolEasy({
  apiKey: 'sp_live_sua_chave_aqui',
  network: 'mainnet-beta',
  currency: 'BRL',
});

// 2. Configure os eventos
SolEasy.on('pagamento:confirmado', (tx) => {
  console.log('Pago!', tx.signature);
  fulfillOrder(tx.orderId);
});

SolEasy.on('pagamento:falhou', (err) => {
  console.error('Falha:', err.human_message);
});

// 3. Inicie o pagamento
async function checkout(order) {
  await SolEasy.iniciarPagamento({
    valor: order.total,
    pedidoId: order.id,
    descricao: \`Pedido \${order.id}\`,
  });
}`;

const webhookCode = `// Webhook para confirmação no backend
app.post('/webhook/SolEasy', async (req, res) => {
  const evento = SolEasy.verificarWebhook(req);
  
  if (evento.tipo === 'pagamento.confirmado') {
    await atualizarPedido(evento.pedidoId, 'pago');
    await enviarEmail(evento.cliente.email);
  }
  
  res.json({ recebido: true });
});`;

const steps = [
  {
    number: "01",
    icon: Package,
    title: "Instale o SDK",
    desc: "Um único comando npm instala tudo que você precisa",
    code: installCode,
    language: "bash",
  },
  {
    number: "02",
    icon: Key,
    title: "Adicione sua chave de API",
    desc: "Obtenha sua chave no dashboard e configure em segundos",
    code: `const SolEasy = new SolEasy({ apiKey: 'sp_live_...' });`,
    language: "typescript",
  },
  {
    number: "03",
    icon: Play,
    title: "Chame iniciarPagamento()",
    desc: "O widget aparece automaticamente para o cliente",
    code: `await SolEasy.iniciarPagamento({ valor: 149.99 });`,
    language: "typescript",
  },
];

const features = [
  {
    icon: Zap,
    title: "< 400ms Latency",
    desc: "Solana processes 65,000 TPS. Your customers don't wait.",
    color: "#14F195",
  },
  {
    icon: Shield,
    title: "On-Chain Security",
    desc: "Each transaction is cryptographically signed and immutable.",
    color: "#9945FF",
  },
  {
    icon: BarChart2,
    title: "Total Observability",
    desc: "Real-time dashboard with AI-powered error analysis.",
    color: "#FBB724",
  },
  {
    icon: Code2,
    title: "3 Lines of Code",
    desc: "The simplest integration in the crypto market.",
    color: "#14F195",
  },
  {
    icon: Globe,
    title: "Multi-Currency",
    desc: "Accept SOL, USDC or automatically convert to BRL.",
    color: "#9945FF",
  },
  {
    icon: Cpu,
    title: "Integrated AI",
    desc: "Technical errors translated into human language.",
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

              {/* Trust badges */}
              <div className="mt-10 flex flex-wrap gap-6">
                {[
                  { value: "65K", label: "TPS on Solana" },
                  { value: "$0.00025", label: "Average Fee" },
                  { value: "99.9%", label: "Uptime" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p style={{ color: "#14F195", fontWeight: 800, fontSize: "1.5rem" }}>
                      {stat.value}
                    </p>
                    <p className="text-sm" style={{ color: "#8B949E" }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
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
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #9945FF, #14F195)" }}
            >
              <Zap className="w-3 h-3 text-white" fill="white" />
            </div>
            <span style={{ color: "#F9FAFB", fontWeight: 700 }}>SolEasy SDK</span>
          </div>
          <p className="text-sm" style={{ color: "#4A5568" }}>
            © 2026 SolEasy SDK. Built with ❤️ for the Solana community.
          </p>
          <div className="flex gap-4 text-sm" style={{ color: "#4A5568" }}>
            <a href="#" style={{ color: "#8B949E" }}>Docs</a>
            <a href="#" style={{ color: "#8B949E" }}>GitHub</a>
            <a href="#" style={{ color: "#8B949E" }}>Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
