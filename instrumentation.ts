export function register() {
  console.log("register", process.env.NEXT_RUNTIME);
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const requireSoSlow = require("require-so-slow");

    const { Resource } = require("@opentelemetry/resources");
    const {
      SemanticResourceAttributes,
    } = require("@opentelemetry/semantic-conventions");
    const {
      NodeTracerProvider,
      SimpleSpanProcessor,
    } = require("@opentelemetry/sdk-trace-node");
    const {
      OTLPTraceExporter,
    } = require("@opentelemetry/exporter-trace-otlp-http");

    const provider = new NodeTracerProvider({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "next-app",
      }),
    });

    provider.register();

    provider.addSpanProcessor(
      new SimpleSpanProcessor(new OTLPTraceExporter({}))
    );

    requireSoSlow.write("require-trace.trace");
    console.log("written require-trace.trace");
  }
}
