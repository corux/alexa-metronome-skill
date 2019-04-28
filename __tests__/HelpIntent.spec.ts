import { VirtualAlexa } from "virtual-alexa";
import { handler } from "../src";
import { supportedBpm } from "../src/utils";

describe("AMAZON.HelpIntent", () => {
  let alexa: VirtualAlexa;
  beforeEach(() => {
    alexa = VirtualAlexa.Builder()
      .handler(handler)
      .interactionModelFile("models/de-DE.json")
      .create();
    alexa.filter((requestJSON) => {
      requestJSON.request.locale = "de-DE";
    });
    supportedBpm.push(30, 300);
  });

  it("Provide help message", async () => {
    const result = await alexa.intend("AMAZON.HelpIntent");
    expect(result.response.outputSpeech.ssml).toContain("Das Metronom kann zwischen 30 und 300");
    expect(result.response.outputSpeech.ssml).toContain("Wieviele Schläge pro Minute sollen gespielt werden?");
    expect(result.response.reprompt.outputSpeech.ssml).toContain("Wieviele Schläge pro Minute sollen gespielt werden?");
    expect(result.response.shouldEndSession).toBe(false);
  });
});
