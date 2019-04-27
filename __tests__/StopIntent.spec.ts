import { VirtualAlexa } from "virtual-alexa";
import { handler } from "../src";

describe("AMAZON.StopIntent, AMAZON.CancelIntent", () => {
  let alexa: VirtualAlexa;
  beforeEach(() => {
    alexa = VirtualAlexa.Builder()
      .handler(handler)
      .interactionModelFile("models/de-DE.json")
      .create();
    alexa.context().device().audioPlayerSupported(false);
  });

  it("StopIntent ends session", async () => {
    const result: any = await alexa.intend("AMAZON.StopIntent");
    expect(result.response.shouldEndSession).toBe(true);
  });

  it("CancelIntent ends session", async () => {
    const result = await alexa.intend("AMAZON.CancelIntent");
    expect(result.response.shouldEndSession).toBe(true);
  });

});
