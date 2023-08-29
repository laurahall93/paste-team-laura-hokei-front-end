import { render, screen } from "../testUtils/testUtils";
import { MyComponent } from "./MyComponent";

//An example of using react-testing-library
describe("MyComponent", async () => {
    test("Should have text Hello from Ho Kei and Laura on it", () => {
        render(<MyComponent />);
        const elem = screen.getByText("Hello from Ho Kei and Laura");
        expect(elem).toBeInTheDocument();
    });
});
