import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import Home from "../pages/index"
import "@testing-library/jest-dom"
import { store } from "../store/store";

describe("Home", () => {
    it("renders a heading", () => {
        render(
            <Provider store={store}>
                <Home />
            </Provider>
        )
        const heading = screen.getByRole("heading", {
            name: "Home Page"
        })

        expect(heading).toBeInTheDocument()
    })
})
