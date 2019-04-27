import { VirtualAlexa } from "virtual-alexa";
import { handler } from "../src";

describe("LaunchRequest", () => {
  let alexa: VirtualAlexa;
  beforeEach(() => {
    alexa = VirtualAlexa.Builder()
      .handler(handler)
      .interactionModelFile("models/de-DE.json")
      .create();
  });

  test("Ask for bpm", async () => {
    const result = await alexa.launch();

    expect(result.response.outputSpeech.ssml).toContain("Wieviele Schläge pro Minute sollen gespielt werden?");
    expect(result.response.reprompt.outputSpeech.ssml).toContain("Wieviele Schläge pro Minute sollen gespielt werden?");
    expect(result.response.shouldEndSession).toBe(false);
  });
});
