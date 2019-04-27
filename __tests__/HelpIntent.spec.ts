import { VirtualAlexa } from "virtual-alexa";
import { handler } from "../src";

describe("AMAZON.HelpIntent", () => {
  let alexa: VirtualAlexa;
  beforeEach(() => {
    alexa = VirtualAlexa.Builder()
      .handler(handler)
      .interactionModelFile("models/de-DE.json")
      .create();
  });

  it("Provide help message", async () => {
    const result: any = await alexa.utter("help");
    expect(result.response.outputSpeech.ssml).toContain("Das Metronom kann zwischen 30 und 300");
    expect(result.response.outputSpeech.ssml).toContain("Wieviele Schläge pro Minute sollen gespielt werden?");
    expect(result.response.reprompt.outputSpeech.ssml).toContain("Wieviele Schläge pro Minute sollen gespielt werden?");
    expect(result.response.shouldEndSession).toBe(false);
  });
});
