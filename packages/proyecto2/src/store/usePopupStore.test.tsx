/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import usePopupsStore from "./usePopupsStore";

describe("usePopupsStore", () => {
  beforeEach(() => {
    // Mock de crypto.randomUUID()
    jest
      .spyOn(globalThis.crypto, "randomUUID")
      .mockReturnValue("123e4567-e89b-12d3-a456-426614174000");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should add a popup", () => {
    const { addPopup, popups } = usePopupsStore.getState();
    addPopup("test", "test");

    const { popups: updatedPopups } = usePopupsStore.getState();

    expect(updatedPopups).toHaveLength(1);
    expect(updatedPopups[0]?.title).toBe("test");
    expect(updatedPopups[0]?.content).toBe("test");
  });

  it("should close the first popup", () => {
    const { closePopup, popups } = usePopupsStore.getState();
    if (popups[0]) {
      closePopup(popups[0].id);
    }
  });
});